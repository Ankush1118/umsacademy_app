import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultPageRoutingModule } from './result-routing.module';
import { ResultPage } from './result.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ResultPageRoutingModule
  ],
  declarations: [ResultPage]
})
export class ResultPageModule {}
