import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/model/user';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-add-wallet-transaction',
  templateUrl: './add-wallet-transaction.component.html',
  styleUrls: ['./add-wallet-transaction.component.scss'],
})
export class AddWalletTransactionComponent implements OnInit {

  loginUser: User;
  walletTransactionForm: FormGroup;
  isOnline: boolean = false;
  submitted: boolean= false;
  today = new Date();
  date = new Date().toISOString();
  amount:any;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private modalController: ModalController,
    private walletService: WalletService, private displayService: DisplayService, private fun: FunctionsService) {
    this.walletTransactionForm = this.formBuilder.group({
      transactionId: [''],
      transactionType: [''],
      transactionNo: [''],
      paymentMode: [''],
      amount: [''],
      description: [''],
      transactionAddedDatetime: [''],
      userId: [''],
      updUserId: [''],
      status: [2]
    });

   }

  ngOnInit() {
    this.loginUser = this.userService.getUser();
    this.walletTransactionForm.patchValue({
      amount: this.amount,
    });

  }

  get fWalletTransaction() {
    return this.walletTransactionForm.controls;
  }

  async saveWalletTransaction(){
    this.submitted=true;
    if(this.walletTransactionForm.invalid){
      return;
    }
    try{
      const walletTransaction = {
        transactionId: '',
        transactionType: 'CREDIT',
        transactionAddedDatetime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530'),
        //startDate: formatDate(this.startDate, 'yyyy-MM-dd', 'en-US', '+0530'),
        description: 'Wallet Amount add',
        userId: this.loginUser.userId,
        amount: this.walletTransactionForm.controls['amount'].value,
        paymentMode: this.walletTransactionForm.controls['paymentMode'].value ,
        transactionNo: this.walletTransactionForm.controls['transactionNo'].value,
        updUserId: this.loginUser.userId,
        status: 2,
      //  endDate: this.subscribeForm.controls['endDate'].value 

      }
      console.log(walletTransaction);
        const res = await this.walletService.addWalletTransaction(walletTransaction);
        console.log(res);
          if(res){
            this.displayService.toast("Transaction Added successfully");
            this.closeModal();

          }
          
    }catch(e){
      console.log(e);
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
