import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {GenericService} from 'src/app/services/api/generic.service';
import {User} from 'src/app/model/user';
import {first} from "rxjs/operators";
import {LoaderComponent} from "../../component/loader/loader.component";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  confirmationResult: firebase.auth.ConfirmationResult;
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public genericService: GenericService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

  }

  getSavedLogin() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // Sign in with email/password
  SignIn(email, password) {
    LoaderComponent.showLoader();
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        LoaderComponent.hideLoader();
        return result.user;
      }).catch((error) => {
        LoaderComponent.hideLoader();
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        //  this.SendVerificationMail();

        //  this.SetUserData(result.user);
        return result;
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    console.log("User Data:" + JSON.stringify(user))
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      mobile_no: '',
      refreshToken: '',
      display_name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    //  localStorage.setItem('user', JSON.stringify(user));

    return userRef.set(userData, {
      merge: true
    })

  }

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    LoaderComponent.showLoader();
    return new Promise<any>((resolve, reject) => {

      this.afAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
          LoaderComponent.hideLoader();
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
          LoaderComponent.hideLoader();
        });
    });
  }

  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut();
  }

}
