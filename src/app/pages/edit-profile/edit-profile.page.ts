import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/services/display.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  public user: User = new User();
 userForm : FormGroup;
 isEdit: boolean=false;
 submitted = false;



  constructor(private userService: UserService, private modalController : ModalController, private formBuilder: FormBuilder, private displayService: DisplayService, private fun: FunctionsService) {
    this.userForm = this.formBuilder.group({
      userId: [''],
      displayName: ['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      location: ['',],
      aboutUs: ['', ],
    });
  }

  
  ngOnInit() {
    this.user = this.userService.getUser();
    console.log(this.user)
    if(this.user.userId !="" || this.user.userId!=null){
    console.log(this.user)
      this.userForm.patchValue({
        userId: this.user.userId,
        displayName: this.user.displayName,
        location: this.user.location,
        email: this.user.email,
        aboutUs: this.user.aboutUs,
      });
    }else{
      this.isEdit=true;
      this.userForm.patchValue({ userId: ""})
    }
  }



  ionViewDidEnter() {
    // this.user = this.userService.getUser();
  }

  get fUser() {
    return this.userForm.controls;
  }

  async saveUser() {
    console.log("submit")
    this.submitted= true
    if(this.userForm.invalid){
      return;
    }
    console.log(this.userForm.value)
    const user = await this.userService.updateUser(this.userForm.value);
    console.log(user);
    if(user) {
      // await this.closeModal();
      this.displayService.toast("User Edited Successfully");
   //   this.modalController.dismiss();
      // location.reload();
  
    }

  }

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }

}
