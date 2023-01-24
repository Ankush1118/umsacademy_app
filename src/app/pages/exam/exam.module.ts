import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamPage } from './exam.component';
import { ExamPageRoutingModule } from './exam-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExamPageRoutingModule
  ],
  declarations: [ExamPage]
})
export class ExamPageModule {}
