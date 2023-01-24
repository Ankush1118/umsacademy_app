import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import {Camera} from '@ionic-native/Camera/ngx';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {environment} from 'src/environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Crop} from '@ionic-native/crop/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {AuthInterceptor} from './helper/auth.interceptor';
import {ComponentsModule} from "./component/components.module";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {IonicStorageModule} from "@ionic/storage";
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {NgxQRCodeModule} from "ngx-qrcode2";
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot({
      mode: 'ios',
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    NgxQRCodeModule,

  ],
  providers: [
    Camera, File,
    Crop, FileTransfer,
    StorageService,
    UserService,
    StatusBar,
    BarcodeScanner,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
