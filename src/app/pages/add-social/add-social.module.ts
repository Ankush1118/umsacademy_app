import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSocialPageRoutingModule } from './add-social-routing.module';

import { AddSocialPage } from './add-social.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSocialPageRoutingModule
  ],
  exports: [
    
  ],
  declarations: [AddSocialPage]
})
export class AddSocialPageModule {}
