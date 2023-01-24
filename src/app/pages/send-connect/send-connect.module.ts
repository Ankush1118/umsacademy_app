import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendConnectPageRoutingModule } from './send-connect-routing.module';

import { SendConnectPage } from './send-connect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SendConnectPageRoutingModule
  ],
  declarations: [SendConnectPage]
})
export class SendConnectPageModule {}
