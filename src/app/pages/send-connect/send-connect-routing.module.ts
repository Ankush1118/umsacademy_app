import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendConnectPage } from './send-connect.page';

const routes: Routes = [
  {
    path: '',
    component: SendConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendConnectPageRoutingModule {}
