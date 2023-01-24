import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/component/components.module';
import { MedicalReportPage } from './medical-report.page';
import { MedicalReportPageRoutingModule } from './medical-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalReportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicalReportPage]
})
export class MedicalReportPageModule {}
