import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarterPageRoutingModule } from './starter-routing.module';
import { CountdownModule } from 'ngx-countdown';

import { StarterPage } from './starter.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    StarterPageRoutingModule,
    CountdownModule

  ],
  declarations: [StarterPage]
})
export class StarterPageModule {}
