import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionReportPage } from './subscription-report.page';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionReportPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionReportPageRoutingModule {}
