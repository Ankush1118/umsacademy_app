import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { FormsModule } from '@angular/forms';
import { TransactionReportPageRoutingModule } from './transaction-report-routing.module';
import { TransactionReportPage } from './transaction-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionReportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransactionReportPage]
})
export class TransactionReportPageModule {}
