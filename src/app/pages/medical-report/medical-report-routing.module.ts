import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalReportPage } from './medical-report.page';


const routes: Routes = [
  {
    path: '',
    component: MedicalReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalReportPageRoutingModule {}
