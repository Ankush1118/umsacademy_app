import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { HealthReportPage } from './health-report.page';
import { HealthReportPageRoutingModule } from './health-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthReportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HealthReportPage]
})
export class HealthReportPageModule {}
