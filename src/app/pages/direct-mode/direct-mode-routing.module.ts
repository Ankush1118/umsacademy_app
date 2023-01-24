import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectModePage } from './direct-mode.page';

const routes: Routes = [
  {
    path: '',
    component: DirectModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectModePageRoutingModule {}
