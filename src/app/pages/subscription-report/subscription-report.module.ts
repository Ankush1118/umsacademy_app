import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { SubscriptionReportPage } from './subscription-report.page';
import { SubscriptionReportPageRoutingModule } from './subscription-report-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionReportPageRoutingModule,
    ComponentsModule,
    // SubscriptionClientPage
  ],
  declarations: [SubscriptionReportPage]
})
export class SubscriptionReportPageModule {}
