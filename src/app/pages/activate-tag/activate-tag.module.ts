import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivateTagPageRoutingModule } from './activate-tag-routing.module';

import { ActivateTagPage } from './activate-tag.page';
import { ComponentsModule } from 'src/app/component/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivateTagPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ActivateTagPage]
})
export class ActivateTagPageModule {}
