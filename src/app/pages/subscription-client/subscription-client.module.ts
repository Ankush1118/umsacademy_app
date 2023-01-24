import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { FormsModule } from '@angular/forms';
import { SubscriptionClientPageRoutingModule } from './subscription-client-routing.module';
import { SubscriptionReportPage } from '../subscription-report/subscription-report.page';
import { SubscriptionClientPage } from './subscription-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionClientPageRoutingModule,
    ComponentsModule,
    // SubscriptionClientPage
  ],
  declarations: [SubscriptionClientPage]
})
export class SubscriptionClientPageModule {}
