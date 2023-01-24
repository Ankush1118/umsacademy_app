import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { MealReportPage } from './meal-report.page';
import { MealReportPageRoutingModule } from './meal-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealReportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MealReportPage]
})
export class MealReportPageModule {}
