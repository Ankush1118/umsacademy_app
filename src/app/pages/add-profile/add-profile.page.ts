import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/api/fireauth.service';
import { GenericService } from 'src/app/services/api/generic.service';
import { FunctionsService } from 'src/app/utilities/functions.service';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.page.html',
  styleUrls: ['./add-profile.page.scss'],
})
export class AddProfilePage implements OnInit {

  userForm : FormGroup;
  userProfile : any ={};

  constructor(private fun: FunctionsService,
    private genericService: GenericService, private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private fireauthService: FireauthService,
    private router: Router) {

    this.userForm = this.formBuilder.group({
      userId: ['',Validators.required],
      displayName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.required],
      uid: ['', [Validators.required]],
      photoUrl: [''],
      logoUrl: [''],
      organization: ['',Validators.required ],
      designation:['', Validators.required],
      location:['', Validators.required],
      aboutUs: ['']
    });

    if(this.fireauthService.isLoggedIn){
      console.log("is Login:"+this.fireauthService.isLoggedIn);
      const user = JSON.parse(localStorage.getItem('user'));
      if(user !== null){
        this.userProfile = JSON.parse(localStorage.getItem('user'));
        console.log(this.userProfile);
        this.genericService.getSingle('user/getUserByUid?uid='+this.userProfile.uid).subscribe(
          data => {console.log(data);
            console.log(data.data);
            if(data.status){
              localStorage.setItem('user',JSON.stringify(data.data))
              this.userProfile = JSON.parse(localStorage.getItem('user'));
              this.userForm.patchValue({
                userId: this.userProfile.userId,
                uid: this.userProfile.uid,
                displayName: this.userProfile.displayName,
                organization: this.userProfile.organization,
                designation: this.userProfile.designation,
                aboutUs: this.userProfile.aboutUs,
                location: this.userProfile.location,
                email: this.userProfile.email
              })
            }else{
              localStorage.removeItem('user');
            }
          },
          err => {console.log('HTTP Error', err)
            localStorage.removeItem('user');
          },
            () => console.log('HTTP request completed.')
        );
      }else{
        this.fun.navigate('login',true)
      }

    }else{
        this.fun.navigate('login',true)
    }
  }
  
  get fUser() {
    return this.userForm.controls;
  }


  ngOnInit() {

  }

  saveProfile(){
  //  this.fun.presentLoading();
    console.log(JSON.stringify(this.userForm.value));

    this.genericService.addSingle('user/addUser',this.userForm.value).subscribe(
      data => {

        console.log(data);

        localStorage.setItem('user',JSON.stringify(data.data))
        this.userProfile = JSON.parse(localStorage.getItem('user'));
        this.fun.presentToast("User Saved", true, 'bottom', 2100);
        this.loadingController.dismiss().then(() => console.log('dismissed'));
        //this.fun.navigate('edit-profile',true)

        setTimeout(() => {
          this.router.navigate(['/edit-profile']);
        }, 1000);


      //  this.imageURL ='';
      },
      err => {console.log('HTTP Error', err)
        this.fun.presentToast("Something Went Wrong..!"+err.message, true, 'bottom', 2100);
       // this.addFormLoading = false;
       this.loadingController.dismiss().then(() => console.log('dismissed'));
      },
      () => console.log('HTTP request completed.')
    );
  }

}
