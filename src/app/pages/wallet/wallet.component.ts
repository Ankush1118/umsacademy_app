import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { AddWalletTransactionComponent } from './add-wallet-transaction/add-wallet-transaction.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletPage implements OnInit {

  amount: number= 1000;
  walletTransactions: any;
  walletBalance: number = 0;

  constructor(private modalController: ModalController, private walletService: WalletService, private fun: FunctionsService) { }

  async ngOnInit() {
    await this.getLastWalletTransaction()
    this.getAllWalletTransactions();
  }

  async refresh(){
    await this.getLastWalletTransaction()
    this.getAllWalletTransactions();
  } 

  async addWalletTransactionModel() {
    const modal = await this.modalController.create({component: AddWalletTransactionComponent,componentProps: { 
      amount: this.amount
    }});
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
      if(modelData.data=='close'){
        this.getAllWalletTransactions();
      }
    });
    return await modal.present();
  }

  async getAllWalletTransactions(){
    this.walletTransactions = await this.walletService.getTop5WalletTransaction();
    console.log(this.walletTransactions);
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

}
