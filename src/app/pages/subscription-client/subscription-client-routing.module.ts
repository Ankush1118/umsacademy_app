import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionClientPage } from '../subscription-client/subscription-client.page';


const routes: Routes = [
  {
    path: '',
    component: SubscriptionClientPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionClientPageRoutingModule {}
