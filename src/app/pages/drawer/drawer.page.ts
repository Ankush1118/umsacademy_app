import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/api/fireauth.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { ModalController } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { User } from "../../model/user";
import { BranchPlanPage } from '../branch-plan/branch-plan.page';
import { SubscriptionService } from 'src/app/services/api/subscription.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.page.html',
  styleUrls: ['./drawer.page.scss'],
})
export class DrawerPage implements OnInit {

  public user: User = new User();
  endDate: Date;
  // subscription: any;
  subscriptions: any;
  planValid: boolean;
  noPlan: boolean;

  constructor(private userService: UserService,
    private modalController: ModalController,
    private router: Router,
    private fireauth: FireauthService,
    private fun: FunctionsService,
    private subscriptionService: SubscriptionService
  ) {
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.user = await this.userService.getUser();
    await this.getSubscription();
  }

  async logout() {
    await this.fireauth.SignOut();
    this.router.navigate(['starter']);
  }

  closeModal() {
    this.modalController.dismiss()
  }

  async changeProfileMode() {
    const response = await this.userService.updateProfileMode(this.user.mode);
    console.log(response);
  }

  async openBranchPlan() {
    const modal = await this.modalController.create({
      component: BranchPlanPage,
      showBackdrop: false,
      componentProps: { subscription: this.subscriptions[0] }
    })
    modal.present();
  }

  async getSubscription() {
    console.log(this.user.branchId);
    const res = await this.subscriptionService.getSubscriptionByBranch(this.user.branchId);
    this.subscriptions = res.data;
    console.log(this.subscriptions);
    if (this.subscriptions.length != 0) {
      this.endDate = new Date(this.subscriptions.expiryDate);
      console.log(this.endDate);
      let today = new Date();
      var time = this.endDate.getTime() - today.getTime();
      var days = time / (1000 * 3600 * 24);
      console.log(days);

      if (days > 0 && days <= 5) {
        this.planValid = true;

      } else {
        this.planValid = false;
      }
    } else {
      this.noPlan = true;
    }
  }

}
