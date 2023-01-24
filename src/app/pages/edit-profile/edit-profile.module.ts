import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { AddSocialSectionPageModule } from '../add-social-section/add-social-section.module';
import { ComponentsModule } from 'src/app/component/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    IonicModule,
    EditProfilePageRoutingModule,
    ComponentsModule,
    AddSocialSectionPageModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
