import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSocialSectionPage } from './list-social-section.page';

const routes: Routes = [
  {
    path: '',
    component: ListSocialSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSocialSectionPageRoutingModule {}
