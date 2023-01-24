import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSocialSectionPageRoutingModule } from './list-social-section-routing.module';

import { ListSocialSectionPage } from './list-social-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSocialSectionPageRoutingModule
  ],
  declarations: [ListSocialSectionPage]
})
export class ListSocialSectionPageModule {}
