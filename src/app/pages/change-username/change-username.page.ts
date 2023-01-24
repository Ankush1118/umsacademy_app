import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ModalController} from "@ionic/angular";
import {User} from "../../model/user";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.page.html',
  styleUrls: ['./change-username.page.scss'],
})
export class ChangeUsernamePage implements OnInit {

  private username: string;

  constructor(private userService: UserService,
              private modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    const user : User = this.userService.getUser();
    if(user.username){
      this.username = user.username;
    }
  }

  async setUsername() {
    await this.userService.updateUsername(this.username);
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }
}
