import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanSubscriptionPageRoutingModule } from './plan-subscription-routing.module';

import { PlanSubscriptionPage } from './plan-subscription.page';
import { ComponentsModule } from 'src/app/component/components.module';
import { ShareComponentModule } from 'src/app/shared/share-component/share-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ShareComponentModule,
    ComponentsModule,
    PlanSubscriptionPageRoutingModule
  ],
  declarations: [PlanSubscriptionPage]
})
export class PlanSubscriptionPageModule {}
