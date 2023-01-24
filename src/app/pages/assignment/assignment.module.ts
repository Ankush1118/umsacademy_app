import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentPage } from './assignment.component';
import { AssignmentPageRoutingModule } from './assignment-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AssignmentPageRoutingModule
  ],
  declarations: [AssignmentPage]
})
export class AssignmentPageModule {}
