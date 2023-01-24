import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchPlanPageRoutingModule } from './branch-plan-routing.module';

import { BranchPlanPage } from './branch-plan.page';
import { ShareComponentModule } from 'src/app/shared/share-component/share-component.module';
import { ComponentsModule } from 'src/app/component/components.module';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BranchPlanPageRoutingModule,
    ShareComponentModule,
    ComponentsModule,
    NgOtpInputModule

  ],
  declarations: [BranchPlanPage]
})
export class BranchPlanPageModule {}
