import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet.service';
import { FunctionsService } from 'src/app/utilities/functions.service';

@Component({
  selector: 'app-wallet-transaction-page',
  templateUrl: './wallet-transaction-page.component.html',
  styleUrls: ['./wallet-transaction-page.component.scss'],
})
export class WalletTransactionPage implements OnInit {

  amount: number= 1000;
  walletTransactions: any;
  walletBalance: number = 0;

  constructor(private modalController: ModalController, private walletService: WalletService) { }

  async ngOnInit() {
    await this.getLastWalletTransaction()
    this.getAllWalletTransactions();
  }

  async refresh(){
    await this.getLastWalletTransaction()
    this.getAllWalletTransactions();
  } 

  async getAllWalletTransactions(){
    this.walletTransactions = await this.walletService.getAllWalletTransaction();
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
