import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SharePageRoutingModule} from './share-routing.module';

import {SharePage} from './share.page';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharePageRoutingModule,
        NgxQRCodeModule
    ],
  declarations: [SharePage]
})
export class SharePageModule {
}
