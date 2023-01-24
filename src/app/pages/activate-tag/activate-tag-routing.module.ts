import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivateTagPage } from './activate-tag.page';

const routes: Routes = [
  {
    path: '',
    component: ActivateTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivateTagPageRoutingModule {}
