import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';


import { HomePage } from './home.page';
import { AddSocialSectionPageModule } from '../add-social-section/add-social-section.module';
import { ComponentsModule } from 'src/app/component/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    AddSocialSectionPageModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
