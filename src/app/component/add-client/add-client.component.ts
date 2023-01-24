import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/services/clients.service';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { ValidationUtil } from 'src/app/utilities/ValidationUtil';
import {  formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';
import { SubscriptionService } from 'src/app/services/api/subscription.service';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {

  clientForm : FormGroup;
  submitted = false;
  invalidEmail = false;
  loginRes= {
    status: false,
    message:'mobile number already exist!',
    data: []
  };  
  client: Client = new Client();
  mobileNumber: boolean = false;

  loginUser: User;
  isEdit: boolean=false;
  clients: Client[] = [];
  date: String = new Date().toISOString();
  isDeleted: any;
  walletBalance: number = 0;
  walletBalanceLess : boolean = false;
  existingSubscription : any;

  startDate: any;
  enddate: any;
  endDate: any;
  today = new Date();
  plan : any;
  expiredOrNoSupscription : boolean= false;
  subscription: any;


  constructor(private modalController : ModalController, private formBuilder: FormBuilder,
    private fun: FunctionsService, private clientsService: ClientService, private displayService: DisplayService,
     private userService: UserService, private walletService: WalletService, private subscriptionService: SubscriptionService,
     private alertController: AlertController, private clientSubscriptionService: ClientSubscriptionService) { 
    this.createForm();
  }

  get fClient() {
    return this.clientForm.controls;
  }

  createForm(){
    this.clientForm = this.formBuilder.group({
      clientId: [''],
      clientName: ['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      dob: ['', Validators.required],
      createdTime: [''],
      leadClientId: [''],
      activeUser: [0],
      isDeleted: [0],
     // isUser: [''],
      active: [1]
    });
  }

  async ngOnInit() {
    // this.getAllClients();
    await this.getLastWalletTransaction();
    this.getAllClientByIsDeleted(this.isDeleted);
    console.log(this.client)
    this.loginUser = await this.userService.getUser();
    if(this.client){
      console.log("In Edit Mode");
      this.isEdit= false;
      this.clientForm.patchValue({
        clientId: this.client.clientId,
        clientName: this.client.clientName,
        mobileNumber: this.client.mobileNumber,
        emailId: this.client.emailId,
        weight: this.client.weight,
        height: this.client.height,
        dob: this.client.dob,
        leadClientId: this.client.leadClientId,
        active: this.client.active,
        activeUser: this.client.activeUser,
        isDeleted: this.client.isDeleted
      });
    }else{
      console.log("In Add Mode");
      this.isEdit=true;
      this.clientForm.patchValue({activeUser : 0, clientId: "", leadClientId: "", isDeleted : 0})
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

  async saveClient() {
    console.log("submit")
    this.submitted=true;
    if(this.clientForm.invalid){
      return;
    }
    console.log(this.clientForm.value)
    if(this.clientForm.value['clientId']==''){
      const resSubscription = await this.subscriptionService.getSubscriptionByBranch(this.loginUser.branchId);
      if(resSubscription.data.length > 0){
        this.subscription = resSubscription.data[0];
        const resWallet = await this.walletService.getLastWalletTransaction();
        if(resWallet.length==0){
          this.walletBalance = 0;
        }else{
          this.walletBalance = resWallet[0].balance;
        }
        
        if(this.walletBalance >= parseInt(this.subscription.perMemberPrice)){
          try{
            this.clientForm.patchValue({
              createdTime: formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '+0530')

            });
            const resClient = await this.clientsService.addClient(this.clientForm.value);
            console.log(resClient);
            if(resClient.status){
              try{
                const walletTransaction = {
                  transactionId: '',
                  transactionType: 'DEBIT',
                  transactionAddedDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                  transactionConfirmDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                  description: 'Amount Debit For Client-'+resClient.data,
                  userId: this.loginUser.userId,
                  amount: parseInt(this.subscription.perMemberPrice),
                  balance: this.walletBalance - parseInt(this.subscription.perMemberPrice),
                  paymentMode: 'wallet',
                  transactionNo: formatDate(new Date(), 'yyyyMMddhhmmss', 'en-US', '+0530')+this.loginUser.userId,
                  updUserId: this.loginUser.userId,
                  status: 1,
          
                }
                  const res = await this.walletService.addWalletTransaction(walletTransaction);
                    if(res.status){
                      this.startDate = new Date();
                      this.endDate = new Date(this.startDate.getTime()+(1000 * 60 * 60 * 24 * this.subscription.validity));
                      const branchClientSubscription = {
                        subscriptionId : '',
                        planId: this.subscription.planId,
                        clientId: resClient.data,
                        purchaseDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                        startDate: formatDate(this.startDate, 'yyyy-MM-dd', 'en-US', '+0530'),
                        endDate: formatDate(this.endDate, 'yyyy-MM-dd', 'en-US', '+0530'),
                        amount: parseInt(this.subscription.perMemberPrice),
                        updDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
                        updUserId: this.loginUser.userId,
                        status: 1,
                      }
                      const resClientSubscription = await this.subscriptionService.addBranchClientSubcription(branchClientSubscription);
                      if(resClientSubscription.status){
                        this.displayService.toast("Plan subscribed successfully");
                        this.closeModal();
                      }else{
                        this.displayService.toast("Client Subscrioption not Added");
                      }
          
                    }else{
                      this.displayService.toast("Wallet Don't Have enough Amount");
                    }
                    
              }catch(e){
                console.log(e);
              }
              await this.closeModal();
              this.displayService.toast("Client added/edited successfully");
              this.modalController.dismiss();
            }

          }catch(e){
            console.log(e)
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
      }else{
        const alert = await this.alertController.create({
          header: 'You need to Select Plan First !',
          buttons: [{
            text: 'Cancel'
          }, {
            text: "OK",
            handler: async () => {
              this.fun.navigate('tab4')
            }
          }
    
          ]
        })
        await alert.present();
      }
    }else{
      const resClient = await this.clientsService.addClient(this.clientForm.value);
      if(resClient.status){
        await this.closeModal();
        this.displayService.toast("Client added/edited successfully");
        this.modalController.dismiss();
      }
    }
  }

  private async getAllClients() {
    this.clients = await this.clientsService.getAllClients();
    console.log(this.clients);
  }

  private async getAllClientByIsDeleted(isDeleted) {
    this.clients = await this.clientsService.getAllClientByIsDeleted(isDeleted);
  //  this.updatePlans(this.clients);
    console.log(this.clients);
  }

  // duplicateMoValidator(control: FormControl){
  //   let email = control.value;
  //   if (email && this.emailIds.includes(email)) {
  //     return {
  //       duplicateEmailId: {
  //         email: email
  //       }
  //     }
  //   }
  //   return null;
  // }

  async checkMobileNo(mobileNo){
    try {
     const res = await this.userService.checkMobileNo(mobileNo);
     this.loginRes = res;
     console.log(this.loginRes);
    } catch (e) {
      this.displayService.toast(JSON.stringify(e));
     // this.displayService.toast('Login failed');
    }
  }

  // private mobileExistsValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return of(control.value).pipe(
  //       delay(500),
  //       switchMap((mobileNo) => this.userService.checkMobileNo(mobileNo).pipe(
  //         map(mobileNoExists => mobileNoExists ? { mobileNoExists: true } : null)
  //       ))
  //     );
  //   };
  // }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.clientForm.get('dob').setValue(date, {
       onlyself: true
    })
 }

 keyPressNumbers(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  alphaNumberOnly (e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e) {
    e.preventDefault();
    return false;
  }
}


