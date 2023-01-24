import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientSubscription } from 'src/app/model/clientSubscription';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-subscription-client-view',
  templateUrl: './subscription-client-view.component.html',
  styleUrls: ['./subscription-client-view.component.scss'],
})
export class SubscriptionClientViewComponent implements OnInit {

  subscribeForm: FormGroup;
  @Input() subscription : ClientSubscription = new ClientSubscription();
  @Output() refresh: any = new EventEmitter();
  startDate: any;
  enddate: any;
  endDate: any;
  clients: any[] = [];


  constructor(private alertController: AlertController, 
              private clientSubscriptionService: ClientSubscriptionService, private modalController: ModalController,
              private displayService: DisplayService, private formBuilder: FormBuilder) { 
                // this.subscribeForm = this.formBuilder.group({
                //   subscriptionId: [''],
                //   planId: [''],
                //   clientId: [''],
                //   planName: [''],
                //   purchaseDatetime: [''],
                //   startDate: [''],
                //   amount: [''],
                //   transactionNo: [''],
                //   endDate: [''],
                //   updUserId: [''],
                //   status: [2]
                // });
              }

  ngOnInit() {
    this.getAllSubscriptionByClient();

  }

  async inActive(subscription) {
    const alert = await this.alertController.create({
      header: 'Are you sure, you want to declined payment ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "OK",
        handler: async () => {
          await this.clientSubscriptionService.inActiveSubscription(subscription)
          this.refresh.emit();
        }
      }

      ]
    })
    alert.present()
  }

  async acceptSubscription(){
    this.getAllSubscriptionByClient();
      const subscribe = {
        subscriptionId: this.subscription.subscriptionId,
        planId: this.subscription.planId,
        clientId: this.subscription.clientId,
        updUserId:this.subscription.updUserId,
        purchaseDatetime:this.subscription.purchaseDatetime,
        startDate: this.subscription.startDate,
        status: 1,
        endDate: this.subscription.endDate,
      }
      console.log(subscribe);
      const res = await this.clientSubscriptionService.addSubcription(subscribe);
      console.log(res);
      if(res){
        const purchase={
          purchaseId: this.subscription.purchaseId,
          subscriptionId : res.data,
          amount: this.subscription.price,
          payment_mode: this.subscription.payment_mode,
          transactionNo: this.subscription.transactionNo,
          updUserId: this.subscription.updUserId,
          status: 1,
        }
        const response = await this.clientSubscriptionService.addPurchase(purchase);
        if(response){
          //this.modalController.dismiss();
          this.displayService.toast("Plan subscribed successfully");
          this.closeModal();
     //     this.fun.navigate('tabs')
        }
      }

  }  

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }


async active(subscription){

  console.log(subscription);
    const alert = await this.alertController.create({
      header: 'Are you sure, you want to accept payment ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "OK",
        handler: async () => {
          subscription.startDate = this.subscription.endDate;
          subscription.enddate=new Date(this.subscription.startDate+(1000 * 60 * 60 * 24 * this.subscription.validity));
          await this.clientSubscriptionService.activeSubscription(subscription);
          this.refresh.emit();
        }
      }

      ]
    })
    alert.present()
    // console.log(subscription);
    
    //   console.log("plaln active successfully");
    //   const res = await this.clientSubscriptionService.activeSubscription(subscription);
    //   if(res){
    //    this.displayService.toast("Plan active successfully");
    //    this.refresh.emit();
    //   }
  }

  private async getAllSubscriptionByClient() {
    this.clients = await this.clientSubscriptionService.getSubscriptionByClient(this.subscription.clientId);
    console.log(this.clients);
  }

  checkDateBetweenTwoDates(startDate:any, endDate:any){

    const date = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (date > start && date < end) {
      return true;
    } else {
      return false;
    }

  }

}