import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSocialSectionPageRoutingModule } from './add-social-section-routing.module';

import { AddSocialSectionPage } from './add-social-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSocialSectionPageRoutingModule
  ],
  declarations: [AddSocialSectionPage]
})
export class AddSocialSectionPageModule {}
