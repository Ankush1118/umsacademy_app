import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletTransactionPage } from './wallet-transaction-page/wallet-transaction-page.component';
import { WalletPage } from './wallet.component';


const routes: Routes = [
  {
    path: '',
    component: WalletPage
  },
  {
    path: 'transaction',
    component: WalletTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
