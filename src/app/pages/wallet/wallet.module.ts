import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.component';
import { ComponentsModule } from 'src/app/component/components.module';
import { WalletTransactionViewComponent } from './wallet-transaction-view/wallet-transaction-view.component';
import { AddWalletTransactionComponent } from './add-wallet-transaction/add-wallet-transaction.component';
import { WalletTransactionPage } from './wallet-transaction-page/wallet-transaction-page.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WalletPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WalletPage, WalletTransactionPage, WalletTransactionViewComponent, AddWalletTransactionComponent]
})
export class WalletPageModule {}
