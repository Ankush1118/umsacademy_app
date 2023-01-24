import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchPlanPage } from './branch-plan.page';

const routes: Routes = [
  {
    path: '',
    component: BranchPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchPlanPageRoutingModule {}
