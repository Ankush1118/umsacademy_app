import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { ClientSubscription } from 'src/app/model/clientSubscription';
// import { UserService } from 'src/app/src/app/services/clientSubscription.service
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscription-report',
  templateUrl: './subscription-report.page.html',
  styleUrls: ['./subscription-report.page.scss'],
})
export class SubscriptionReportPage implements OnInit {

  // public subscription: ClientSubscription;
  public clientSubscription: ClientSubscription;
  user: User;
  // healthes: any[] = [];

  searchInput: string = '';
  // updateDt: any;
  subscriptions: any[] = [];
  purchaseDate: any;

  date: any;


  constructor( private userService: UserService,
              private clientSubscriptionService: ClientSubscriptionService,
              private modalController: ModalController
) { }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  //  this.purchaseDate =formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
    await this.getAllSubscription();
  }


  ionViewDidEnter() {
    // this.getAllHealthStatus();
  }

  refresh(){
    this.getAllSubscription();
  }

  

  async showSetDataModal() {
    if (this.clientSubscription.startDate != '' && this.clientSubscription.subscriptionId) {
      return;
    }
  }

  private async getAllSubscription() {
    this.subscriptions = await this.clientSubscriptionService.getClientSubscriptionByDate();
    console.log(this.subscriptions);
  }

  checkSearch(clientSubscription: ClientSubscription) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (clientSubscription.clientName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }



}
