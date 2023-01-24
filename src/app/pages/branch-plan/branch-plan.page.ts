import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/api/fireauth.service';
import { GenericService } from 'src/app/services/api/generic.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { UserService } from '../../services/user.service';
import { DisplayService } from '../../services/display.service';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { User } from 'src/app/model/user';
import { PlanService } from 'src/app/services/plan.service';
import { Plan } from 'src/app/model/Plan';
import { Branch } from 'src/app/model/Branch';
import { BranchService } from 'src/app/services/branch.service';
import { PlanSubscriptionPage } from '../plan-subscription/plan-subscription.page';
import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { formatDate } from '@angular/common';
import { WalletService } from 'src/app/services/wallet.service';
import { ClientService } from 'src/app/services/clients.service';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';
// import * as firebase from 'firebase';


@Component({
  selector: 'app-branch-plan',
  templateUrl: './branch-plan.page.html',
  styleUrls: ['./branch-plan.page.scss'],
})

export class BranchPlanPage {
  plan: Plan = new Plan();
  user: User;
  loginUser: User;
  branch: Branch;
  isShowPassword: boolean = false;
  // subscription : any;
  subscriptions: any;
  isKeyboardActive: boolean = false;
  plans: Plan[] = [];
  clients: any;
  subscribePlan: Plan;
  endDate = new Date();
  walletBalance: number=0;
  totalAmount: number=0;
  branchClientSubscriptions : any[]=[]

  constructor(private modalController: ModalController, private planService: PlanService, private userService: UserService, private branchService: BranchService,
    private displayService: DisplayService, private fun: FunctionsService, private subscriptionService: SubscriptionService, private alertController: AlertController,
    private walletService: WalletService, private clientService: ClientService, private clientSubscriptionService: ClientSubscriptionService) {
  }

  async ionViewDidEnter() {
    this.loginUser = this.userService.getUser();
    console.log(this.subscriptions);
    await this.getAllBranchPlans();
    await this.getBranch();
  }

  private async getAllBranchPlans() {
    this.plans = await this.planService.getAllPlans();
    console.log(this.plans);
  }

  getDefaultCheck() {
 //   this.plan = this.plans.find(i => i.planId === this.subscribePlan.planId);

    this.plans.forEach(element => {
      if(element.planId==this.subscriptions[0].planId){
        element.isChecked = true;
        this.subscribePlan = element;
      }
    });
  }

  checked(plan) {
    // this.plans.forEach(element => {
    //   element.isChecked = false;
    // });
    // if (plan.isChecked) {
    //   plan.isChecked = false;
    // } else {
    //   plan.isChecked = true;
    // }

    // this.subscribePlan = plan;
    this.plans.forEach(element => {
      element.isChecked = false;
    });
    plan.isChecked = true;
    this.subscribePlan = plan;
  
  }

  async subscribe() {
    // if (this.subscriptions.length != 0) {
    //   this.modalController.dismiss();
    //   console.log(this.subscriptions);
    //   this.endDate = new Date(this.subscriptions[0].endDate);
    //   const res = await this.subscriptionService.inActiveSubscription(this.subscriptions[0]);
    // }
    const modal = await this.modalController.create({
      component: PlanSubscriptionPage,
      componentProps: { plan: this.subscribePlan, endDate: '' }
    });

    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
      if (modelData.data == 'close') {
        this.closeModal();
      }
    });
    return await modal.present();
  }

  async applyPlan() {
    if(this.subscriptions.length > 0){
      if(this.subscribePlan.planId!=this.subscriptions[0].planId){
        const res = await this.walletService.getLastWalletTransaction();
        console.log(res);
        if(res.length==0){
          const alert = await this.alertController.create({
            header: 'Your Wallet Balance is Low, Please recharge your wallet !',
            buttons: [{
              text: 'Cancel'
            }, {
              text: "OK",
              handler: async () => {
              
              }
            }
      
            ]
          })
          await alert.present();
        }else{
          const alert = await this.alertController.create({
            header: 'Are you sure, you want apply plan ?',
            buttons: [{
              text: 'Cancel'
            }, {
              text: "Apply",
              handler: async () => {
                await this.walletTransactionForApply();
                this.closeModal();
              }
            }
      
            ]
          })
          await alert.present();
        } 
      }else{
        const alert = await this.alertController.create({
          header: 'You Select Same Plan as Already Applied !',
          buttons: [{
            text: 'Cancel'
          }, {
            text: "OK",
            handler: async () => {
            
            }
          }
    
          ]
        })
        await alert.present();
      }
    }else{
      const res = await this.walletService.getLastWalletTransaction();
        console.log(res);
        if(res.length==0){
          const alert = await this.alertController.create({
            header: 'Your Wallet Balance is Low, Please recharge your wallet !',
            buttons: [{
              text: 'Cancel'
            }, {
              text: "OK",
              handler: async () => {
              
              }
            }
      
            ]
          })
          await alert.present();
        }else{
          const alert = await this.alertController.create({
            header: 'Are you sure, you want apply plan ?',
            buttons: [{
              text: 'Cancel'
            }, {
              text: "Apply",
              handler: async () => {
                await this.walletTransactionForApply();
                this.closeModal();
              }
            }
      
            ]
          })
          await alert.present();
        }
    }
    
  }

  async getBranch() {
    console.log(this.loginUser);
    if (this.loginUser) {
      // this.branch = await this.branchService.getBranchById(this.user.branchId);
      const res = await this.subscriptionService.getSubscriptionByBranch(this.loginUser.branchId);
      this.subscriptions = res.data;
      if (res.status) {
        this.getDefaultCheck();
      }

    }
  }

  async walletTransactionForApply(){
    this.clients = await this.clientService.getAllClientByIsDeleted(0);
    console.log(this.clients);
    if(this.clients.length == 0){
      const subscribe = {
        subscriptionId: '',
        planId: this.subscribePlan.planId,
      // amount: this.subscribePlan.price,
        purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
        branchId: this.loginUser.branchId,
        updUserId: this.loginUser.userId,
        status: 1,
      }
      console.log(subscribe);
      const resSubscription = await this.subscriptionService.addSubcription(subscribe);
    }else{
      
      this.totalAmount = 0;
      this.branchClientSubscriptions = [];

      for (let index = 0; index < this.clients.length; index++) {
        const todayString = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530');
        var today : any = new Date(todayString);
        const element = this.clients[index];
        const resClientSubscriptions = await this.clientSubscriptionService.getBranchClientSubscriptionByClientAndDate(element.clientId, todayString);
        if(resClientSubscriptions.status){
          const clientSubscription =  resClientSubscriptions.data;
          
          var endDate: any = new Date(clientSubscription.endDate);

          const diffInMs = Math.abs(endDate - today);
          console.log("Today:"+today+" End Date:"+endDate+" Diff:"+diffInMs)
          const daysRemain =  diffInMs / (1000 * 60 * 60 * 24);
          console.log("Client Id:"+element.clientName+" Remain Days:"+daysRemain+" Member Per Price:"+this.subscribePlan.perMemberPrice+" Validity:"+this.subscribePlan.validity);
          if(daysRemain == this.subscribePlan.validity){
            const upgradeAmt = this.subscribePlan.perMemberPrice -parseFloat(clientSubscription.amount);
            if(upgradeAmt > 0){
              this.totalAmount = this.totalAmount + upgradeAmt;
              const branchClientSubscription = {
                subscriptionId: '',
                planId: this.subscribePlan.planId,
                clientId: clientSubscription.clientId,
                purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                startDate: clientSubscription.startDate,
                endDate: clientSubscription.endDate,
                amount: upgradeAmt,
                updDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                updUserId: this.loginUser.userId,
                status: 1,
              }
              this.branchClientSubscriptions.push(branchClientSubscription);
              console.log("Total Amount:"+this.totalAmount);
            }
          }else if(daysRemain > 0 && daysRemain < this.subscribePlan.validity){
            const previousPaidForDaysRemain = ((clientSubscription.previousMaxPlanAmt * daysRemain)/clientSubscription.validity).toFixed(2)
            const multiply = this.subscribePlan.perMemberPrice * daysRemain;
            const currentRequiredAmtForUpgrade = (multiply/this.subscribePlan.validity).toFixed(2);

            console.log("Previous Paid for Remain:"+previousPaidForDaysRemain+"  current Required:"+currentRequiredAmtForUpgrade)
            
            if(parseFloat(currentRequiredAmtForUpgrade) > parseFloat(previousPaidForDaysRemain)){
              this.totalAmount = this.totalAmount + (parseFloat(currentRequiredAmtForUpgrade)- parseFloat(previousPaidForDaysRemain));
              const branchClientSubscription = {
                subscriptionId: '',
                planId: this.subscribePlan.planId,
                clientId: clientSubscription.clientId,
                purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                startDate: clientSubscription.startDate,
                endDate: clientSubscription.endDate,
                amount: (parseFloat(currentRequiredAmtForUpgrade)- parseFloat(previousPaidForDaysRemain)),
                updDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                updUserId: this.loginUser.userId,
                status: 1,
              }
              this.branchClientSubscriptions.push(branchClientSubscription);
              console.log("Total Amount:"+this.totalAmount);
            }
          } 
        
        }
      }
      const resWallet = await this.walletService.getLastWalletTransaction();
      if(resWallet.length==0){
        this.walletBalance = 0;
      }else{
        this.walletBalance = resWallet[0].balance;
      }
      if(this.walletBalance >= this.totalAmount){
        const transactionNo = formatDate(new Date(), 'yyyyMMddhhmmss', 'en-US', '+0530')+this.loginUser.userId;
        try {
          const walletTransaction = {
            transactionId: '',
            transactionType: 'DEBIT',
            transactionAddedDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
            transactionConfirmDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
            description: 'Amount Debit For Plan Upgrade',
            userId: this.loginUser.userId,
            amount: this.totalAmount,
            balance: this.walletBalance - this.totalAmount,
            paymentMode: 'wallet',
            transactionNo: transactionNo,
            updUserId: this.loginUser.userId,
            status: 1
          }
          if(this.totalAmount > 0){
            const res = await this.walletService.addWalletTransaction(walletTransaction);
            if(res.status){
              this.branchClientSubscriptions.forEach(element => {
                element.transactionNo = transactionNo;
              });
              const resSubscriptions = await this.subscriptionService.addBranchClientSubcriptions(this.branchClientSubscriptions); 
              const subscribe = {
                subscriptionId: '',
                planId: this.subscribePlan.planId,
              // amount: this.subscribePlan.price,
                purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
                branchId: this.loginUser.branchId,
                updUserId: this.loginUser.userId,
                status: 1,
              }
              console.log(subscribe);
              const resSubscription = await this.subscriptionService.addSubcription(subscribe);
              this.displayService.toast("Plan Upgraded Successful");
              this.closeModal();
            }else{
              this.displayService.toast("Transaction Not Updated, Please Try later");
              this.closeModal();
            }
          }else{
            const subscribe = {
              subscriptionId: '',
              planId: this.subscribePlan.planId,
            // amount: this.subscribePlan.price,
              purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
              branchId: this.loginUser.branchId,
              updUserId: this.loginUser.userId,
              status: 1,
            }
            console.log(subscribe);
            const resSubscription = await this.subscriptionService.addSubcription(subscribe);
            this.displayService.toast("Plan Upgrade Successful");
            this.closeModal();
          }
        } catch (error) {
          console.log(error);
        }
      }else{
        const alert = await this.alertController.create({
          header: 'Wallet has insufficient balance, Please recharge your wallet !',
          buttons: [{
            text: 'Cancel'
          }, {
            text: "OK",
            handler: async () => {
              this.closeModal();
              this.fun.navigate('wallet');
            }
          }
    
          ]
        })
        await alert.present();
      }
    
        
    }
  }


  async closeModal() {
    const close: string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }

}
