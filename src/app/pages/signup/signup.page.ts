import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/api/fireauth.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { environment } from 'src/environments/environment';
import { GenericService } from '../../services/api/generic.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  baseUrl: string = environment.url;
  submitted:boolean= false;
  userForm : FormGroup;

  isShowPassword: boolean = false;

  constructor(private fun: FunctionsService, private http: HttpClient, private genericService: GenericService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private fireauth: FireauthService) {
    this.userForm = this.formBuilder.group({
      userId:[''],
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',Validators.required],
      uid: [''],
      photoUrl: [''],
      roleId:[''],
      userTypeId: [''],
      emailVerified: [''],
      mobileNo: [''],
      logoUrl: [''],
      organization: [''],
      designation:[''],
      aboutUs: ['']
    });

  }

  ngOnInit() {

  }


  get fUser() { return this.userForm.controls; }

  signup() {
    this.submitted = true;
    if (this.userForm.invalid) {
        return;
    }
    if (this.fun.validateEmail(this.userForm.controls['email'].value) && this.userForm.controls['password'].value !== '') {
      this.fun.presentLoading();
      // console.log(this.auth.SignUp(this.email, this.password));
      this.fireauth
      .SignUp(this.userForm.controls['email'].value, this.userForm.controls['password'].value)
        .then(result => {
          console.log(result);
          if (result) {
            const emailVerified = 0
            if(result.user.emailVerified){
              const emailVerified = 1
            }else{
              const emailVerified = 0;
            }

            this.userForm.patchValue({
              uid: result.user.uid,
              photoUrl: result.user.photoURL,
              roleId:2,
              userTypeId:2,
              emailVerified: emailVerified
            })

            // this.apiService.createItem('user/addUser',this.userForm.value).subscribe((response) => {
            //   this.fun.presentToast("User Register SuccessFul..!", true, 'bottom', 2100);
            // });

            this.genericService.addSingle('user/addUser',this.userForm.value).subscribe(
              data => {console.log(data);
                this.submitted = false;
                this.loadingController.dismiss().then(() => console.log('dismissed'));
                this.fun.presentToast("User Register Successful", true, 'bottom', 2100);
                this.userForm.reset();
              //  this.imageURL ='';
              },
              err => {console.log('HTTP Error', err)
              this.submitted = false;
                this.fun.presentToast("Something Went Wrong"+err.message, true, 'bottom', 2100);
               // this.addFormLoading = false;
               this.loadingController.dismiss().then(() => console.log('dismissed'));
              },
              () => console.log('HTTP request completed.')
            );
          }else{
            this.loadingController.dismiss().then(() => console.log('dismissed'));
          }
        })
        .catch(err => {
          this.loadingController.dismiss().then(() => console.log('dismissed'));
          console.log(`login failed ${err}`);

          this.fun.presentToast(err.message, true, 'bottom', 2100);
        });
    }else{
      this.loadingController.dismiss().then(() => console.log('dismissed'));
      this.fun.presentToast('Wrong Input or Blank Input!', true, 'bottom', 2100);
    }
  }



  toggleShowHidePassword(){
    this.isShowPassword = !this.isShowPassword;
  }
}
