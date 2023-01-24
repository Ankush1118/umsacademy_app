import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeesPageRoutingModule } from './fees-routing.module';
import { FeesPage } from './fees.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeesPageRoutingModule
  ],
  declarations: [FeesPage]
})
export class FeesPageModule {}
