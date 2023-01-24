import {Component, OnInit} from '@angular/core';
import {FunctionsService} from 'src/app/utilities/functions.service';
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {UserService} from "../../services/user.service";
import { LoaderComponent } from 'src/app/component/loader/loader.component';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/services/display.service';
import { ModalController, Platform } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.page.html',
  styleUrls: ['./starter.page.scss'],
})
export class StarterPage implements OnInit {
  isShield: boolean = false;


  constructor(private fun: FunctionsService,
              private userService: UserService,
              private router: Router,
              private displayService: DisplayService,
              private modalController: ModalController,
              private platform: Platform
  ) {


  }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    await this.checkAutoLogin();
  }

  async checkAutoLogin() {
    this.isShield = true;
    try {
      await this.userService.autoLogin();
      this.router.navigateByUrl('tabs', {replaceUrl: true})
      this.isShield = false;
    } catch (e) {
      this.isShield = false;
      console.error(e);
    }
  }


  async openLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      showBackdrop: false
    })
    modal.present();
  }

  get isIos() {
    return this.platform.is('ios')
  }
}
