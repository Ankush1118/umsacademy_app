import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSocialPageRoutingModule } from './search-social-routing.module';

import { SearchSocialPage } from './search-social.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSocialPageRoutingModule
  ],
  declarations: [SearchSocialPage]
})
export class SearchSocialPageModule {}
