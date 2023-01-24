import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostSignupPage } from './post-signup.page';

const routes: Routes = [
  {
    path: '',
    component: PostSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostSignupPageRoutingModule {}
