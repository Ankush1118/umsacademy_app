import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSocialSectionPage } from './add-social-section.page';

const routes: Routes = [
  {
    path: '',
    component: AddSocialSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSocialSectionPageRoutingModule {}
