import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ChangeUsernamePage} from "../change-username/change-username.page";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  activeSegment: any = 0;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  async changeUserName() {
    const modal = await this.modalController.create({component: ChangeUsernamePage});
    modal.present();
  }
}
