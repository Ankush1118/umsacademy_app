import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClientSubscription } from 'src/app/model/clientSubscription';
import { User } from 'src/app/model/user';
import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { BranchService } from 'src/app/services/branch.service';
// import { UserService } from 'src/app/src/app/services/clientSubscription.service
// import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.page.html',
  styleUrls: ['./transaction-report.page.scss'],
})
export class TransactionReportPage implements OnInit {
  public clientSubscription: ClientSubscription;
  user: User;
  searchInput: string = '';
  purchaseDatetime: any;
  subscriptions: any[] = [];
  date: any;


  constructor(private userService: UserService,
    private subscriptionService: SubscriptionService,
    private modalController: ModalController,
    private branchService: BranchService
    ) { }

    async ngOnInit() {
      this.user = await this.userService.getUser();
      // this.getAllSubscription();
      this.purchaseDatetime =formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
    }
  
  
    ionViewDidEnter() {
      // this.getAllHealthStatus();
    }
  
    refresh(){
      // this. getAllSubscription();
    }
  
    
  
    async showSetDataModal() {
      if (this.clientSubscription.startDate != '' && this.clientSubscription.subscriptionId) {
        return;
      }
    }
  
    // private async getAllSubscription() {
    //   this.subscriptions = await this.subscriptionService.getClientSubscriptionByDate(this.purchaseDatetime);
    //   console.log(this.subscriptions);
    // }

    private async getAllTransaction(branchId) {
      const res = await this.branchService.getAllSubscriptionByBranch(branchId);
      this.clientSubscription = res.data;
      console.log(this.clientSubscription);
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
