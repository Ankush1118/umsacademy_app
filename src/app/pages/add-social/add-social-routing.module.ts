import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSocialPage } from './add-social.page';

const routes: Routes = [
  {
    path: '',
    component: AddSocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSocialPageRoutingModule {}
