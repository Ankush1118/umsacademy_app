import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FireauthService} from 'src/app/services/api/fireauth.service';
import {GenericService} from 'src/app/services/api/generic.service';
import {FunctionsService} from 'src/app/utilities/functions.service';
import {UserService} from '../../services/user.service';
import {DisplayService} from '../../services/display.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { User } from 'src/app/model/user';
// import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  otp: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  loginRes= {
    status: false,
    message:'',
    data: []
  };

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '14%',
      'height': '14%'
    }
  };

  email: string;
  password: string;
  //email: string = 'manuarya@gmail.com';
  //password: string = '12345678';

  user: User;

  isShowPassword: boolean = false;

  isKeyboardActive: boolean = false;

  constructor(private fun: FunctionsService,
              private userService: UserService,
              private fireauthService: FireauthService,
              private displayService: DisplayService,
              private alertController: AlertController,
              private genericService: GenericService,
              private modalController: ModalController
  ) {

  }

  onOtpChange(otp) {
    this.otp = otp;
  }

  toggleShowHidePassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  async fireLogin() {
    try {
      await this.userService.firebaseLogin(this.email, this.password);
      this.fun.navigate('tabs');
    } catch (e) {
      this.displayService.toast(JSON.stringify(e));
     // this.displayService.toast('Login failed');
    }

  }

  onKeyboard() {

  }

  toggleKeyboardActive(b: boolean) {
    this.isKeyboardActive = b;
  }


  // Firebase OTP Verification

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.fireauthService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.showOTPInput = true;
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  async fireOtpVerification(){
    try {
      await this.userService.fireOtpVerification(this.PhoneNo,this.otp);
      await this.closeModal();
      this.fun.navigate('tabs');
    } catch (e) {
      this.displayService.toast(JSON.stringify(e));
    //  this.displayService.toast('Login failed');
    }
  }

  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          console.log(res.otp);
          this.fireauthService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);

              const body ={
                mobileNo: this.PhoneNo,
                uid: userData.uid
              }
              // this.user.mobileNo = this.PhoneNo;
              // this.user.uid = userData.uid;

              this.genericService.addSingle('user/addUser',body).subscribe(
                data => {console.log(data);
                //  this.submitted = false;
                 // this.loadingController.dismiss().then(() => console.log('dismissed'));
                  this.fun.presentToast("User Register Successful", true, 'bottom', 2100);
                //  this.userForm.reset();
                //  this.imageURL ='';
                },
                err => {console.log('HTTP Error', err)
               // this.submitted = false;
                  this.fun.presentToast("Something Went Wrong"+err.message, true, 'bottom', 2100);
                 // this.addFormLoading = false;
                // this.loadingController.dismiss().then(() => console.log('dismissed'));
                },
                () => console.log('HTTP request completed.')
              );
              setTimeout(() => {
                this.closeModal();
              }, 1000);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

  async checkMobileNo(mobileNo){
    try {
     const res = await this.userService.checkMobileNoForBranch(mobileNo);
     this.loginRes = res;
     console.log(res);
    } catch (e) {
      this.displayService.toast(JSON.stringify(e));
     // this.displayService.toast('Login failed');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
