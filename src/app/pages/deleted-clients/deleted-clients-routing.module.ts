import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletedClientsPage } from './deleted-clients.page';

const routes: Routes = [
  {
    path: '',
    component: DeletedClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletedClientsPageRoutingModule {}
