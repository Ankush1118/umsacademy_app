import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSocialPage } from './search-social.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSocialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSocialPageRoutingModule {}
