import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanSubscriptionPage } from './plan-subscription.page';

const routes: Routes = [
  {
    path: '',
    component: PlanSubscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanSubscriptionPageRoutingModule {}
