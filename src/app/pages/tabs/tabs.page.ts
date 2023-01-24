import {Component, EventEmitter} from '@angular/core';
import {IonTabs, ModalController} from "@ionic/angular";
import {DirectModePage} from "../direct-mode/direct-mode.page";
import {PortfolioService} from "../../services/portfolio.service";
import {UserService} from "../../services/user.service";
import {Icon} from "../../model/Icon";
import * as Events from "events";
import {User} from "../../model/user";

import {PostSignupPage} from "../post-signup/post-signup.page";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public directIcon: Icon = null;
  private activeTab?: HTMLElement;
  public user: User;

  constructor(private modalController: ModalController,
              private portfolioService: PortfolioService,
              private userService: UserService,
  ) {
  }


  async onDirectClicked() {
    const modal = await this.modalController.create({
      component: DirectModePage,
      showBackdrop: false
    })
    await modal.present();
  }

  tabChange(tabsRef: IonTabs) {
    this.activeTab = tabsRef.outlet.activatedView.element;
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
    this.fetchUser();
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

  // private async fetchUser() {
  //   this.userService.userObservable.subscribe(async (user) => {
  //     this.user = user;
  //     this.showSetDataModal();
  //     this.directIcon = await this.portfolioService.getItemByIcon(this.user.directIconId);
  //   })

  // }

  private async fetchUser() {
    this.userService.userObservable.subscribe(async (user) => {
      this.user = user;
     // this.showSetDataModal();
    //  this.directIcon = await this.portfolioService.getItemByIcon(this.user.directIconId);
    })

  }



  async showSetDataModal() {
    console.log(this.user);
    if (this.user.firstName!=null && this.user.userType!=null) {
      return;
    }

    const modal = await this.modalController.create({
      component: PostSignupPage
    })

    modal.present();
  }


}
