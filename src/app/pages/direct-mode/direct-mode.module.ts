import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectModePageRoutingModule } from './direct-mode-routing.module';

import { DirectModePage } from './direct-mode.page';
import {ComponentsModule} from "../../component/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DirectModePageRoutingModule,
        ComponentsModule
    ],
  declarations: [DirectModePage]
})
export class DirectModePageModule {}
