import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalController} from "@ionic/angular";
import { InstitutesService } from 'src/app/services/institutes.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-post-signup',
  templateUrl: './post-signup.page.html',
  styleUrls: ['./post-signup.page.scss'],
})
export class PostSignupPage implements OnInit {

  public user: User = new User();

  institutes: any[] = [];
  institute: any;
  

  constructor(private userService: UserService,
              private modalController: ModalController,
              private institutesService: InstitutesService
  ) {
  }

  ngOnInit() {
   // this.loadIntitutes();
  }

  ionViewDidEnter() {
    this.user = this.userService.getUser();
    this.loadInstitutes();
  }

  async loadInstitutes() {
    this.institutes = await this.institutesService.getAll();
    console.log(this.institutes);
  }

  
  async setInstituteDb($event){
    console.log($event.target.value);
    this.institute = await this.institutesService.getInstituteById($event.target.value); 
    console.log( this.institute[0].branchDb);
    this.user.branchDb =  this.institute[0].branchDb;

  }

  async save() {
    console.log(this.user)
    await this.userService.updateUser(this.user);
    this.modalController.dismiss();
  }

}
