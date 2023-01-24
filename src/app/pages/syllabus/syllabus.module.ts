import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SyllabusPageRoutingModule } from './syllabus-routing.module';
import { SyllabusPage } from './syllabus.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SyllabusPageRoutingModule
  ],
  declarations: [SyllabusPage]
})
export class SyllabusPageModule {}
