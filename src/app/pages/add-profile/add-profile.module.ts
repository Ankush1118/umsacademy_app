import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfilePageRoutingModule } from './add-profile-routing.module';

import { AddProfilePage } from './add-profile.page';
import { ComponentsModule } from 'src/app/component/components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddProfilePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddProfilePage]
})
export class AddProfilePageModule {}
