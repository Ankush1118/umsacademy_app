import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SyllabusPage } from './syllabus.component';


const routes: Routes = [
  {
    path: '',
    component: SyllabusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyllabusPageRoutingModule {}
