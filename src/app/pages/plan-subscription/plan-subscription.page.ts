import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Plan } from 'src/app/model/Plan';
import { User } from 'src/app/model/user';
import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';
import { FunctionsService } from 'src/app/utilities/functions.service';

@Component({
  selector: 'app-plan-subscription',
  templateUrl: './plan-subscription.page.html',
  styleUrls: ['./plan-subscription.page.scss'],
})
export class PlanSubscriptionPage implements OnInit {

  plan: Plan = new Plan();
  loginUser: User;
  subscribeForm: FormGroup;
  isOnline: boolean = false;
  submitted: boolean= false;
  startDate: any;
  enddate: any;
  endDate: any;
  today = new Date();
  date = new Date().toISOString();
  walletBalance: number = 0;
  walletBalanceLess : boolean = false;
  existingSubscription : any;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private modalController: ModalController,
    private subscriptionService: SubscriptionService, private displayService: DisplayService, private fun: FunctionsService, private walletService: WalletService) {
    this.subscribeForm = this.formBuilder.group({
      subscriptionId: [''],
      planId: [''],
      branchId: [''],
      planName: ['',Validators.required],
      purchaseDatetime: [''],
      startDate: [''],
      amount: ['',Validators.required],
      endDate: [''],
      updUserId: [''],
      status: [2]
    });

   }

  async ngOnInit() {
    this.loginUser = this.userService.getUser();
    console.log(this.plan);
    await this.getLastWalletTransaction();
    // this.startDate = this.endDate;
    // this.enddate=new Date(this.startDate.getTime()+(1000 * 60 * 60 * 24 * this.plan.validity));

  //  this.enddate= this.startDate.getDate() + this.plan.validity;
    this.subscribeForm.patchValue({
      planName: this.plan.planName,
      amount: this.plan.price,
      // endDate: formatDate(this.enddate, 'yyyy-MM-dd', 'en-US', '+0530'), 
    });
    if(parseInt(this.plan.price) > this.walletBalance){
      this.walletBalanceLess = true;
    }
    await this.getSubscription();
    

  }

  get fSubscribe() {
    return this.subscribeForm.controls;
  }

  async getSubscription(){
    const res = await this.subscriptionService.getSubscriptionByBranch(this.loginUser.branchId);
    console.log(res);
    this.existingSubscription = res.data;
    if(this.existingSubscription.subscriptionStatus=='active'){
      this.startDate = new Date(this.existingSubscription.expiryDate.getTime()+(1000 * 60 * 60 * 24 * 1));
      this.endDate=new Date(this.startDate.getTime()+(1000 * 60 * 60 * 24 * this.plan.validity));
      console.log("start Date:"+this.startDate+" End Date:"+this.endDate);
    }else{
      this.startDate = new Date();
      this.endDate=new Date(this.startDate.getTime()+(1000 * 60 * 60 * 24 * this.plan.validity));
      console.log("new start Date:"+this.startDate+" End Date:"+this.endDate);
    }

  }

  async saveSubscription(){
    this.submitted=true;
    if(this.subscribeForm.invalid){
      return;
    }
    console.log(this.subscribeForm.value)
    const subscribe = {
      subscriptionId: '',
      planId: this.plan.planId,
      amount: this.plan.price,
      purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530'),
      startDate: formatDate(this.startDate, 'yyyy-MM-dd', 'en-US', '+0530'),
      branchId: this.loginUser.branchId,
      updUserId: this.loginUser.userId,
      status: 1,
      endDate: formatDate(this.endDate, 'yyyy-MM-dd', 'en-US', '+0530'),
    }
    console.log(subscribe);
    const resSubscription = await this.subscriptionService.addSubcription(subscribe);
    console.log(resSubscription);
    if(resSubscription.status){
      try{
        const walletTransaction = {
          transactionId: '',
          transactionType: 'DEBIT',
          transactionAddedDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
          transactionConfirmDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
          description: 'Amount Debit Plan-'+this.plan.planName+' For Subscription-'+resSubscription.data,
          userId: this.loginUser.userId,
          amount: parseInt(this.plan.price),
          balance: this.walletBalance - parseInt(this.plan.price),
          paymentMode: 'wallet',
          transactionNo: formatDate(new Date(), 'yyyyMMddhhmmss', 'en-US', '+0530')+this.loginUser.userId,
          updUserId: this.loginUser.userId,
          status: 1,
  
        }
        console.log(walletTransaction);
          const res = await this.walletService.addWalletTransaction(walletTransaction);
          console.log(res);
            if(res){
              this.displayService.toast("Plan subscribed successfully");
              this.closeModal();
  
            }
            
      }catch(e){
        console.log(e);
      }
      
    }

  }

  async getLastWalletTransaction(){
    const res = await this.walletService.getLastWalletTransaction();
    console.log(res);
    if(res.length==0){
      this.walletBalance = 0;
    }else{
      this.walletBalance = res[0].balance;
    } 
  }

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }

  checkMode(mode) {
    console.log(mode);
    if(mode== "online"){
      this.isOnline = true;
    }else{
      this.isOnline = false;
    }
 }

}
