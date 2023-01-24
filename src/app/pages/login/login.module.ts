import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ShareComponentModule } from 'src/app/shared/share-component/share-component.module';
import { ComponentsModule } from 'src/app/component/components.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';




// import { AngularFireModule } from '@angular/fire';
// import { environment } from 'src/environments/environment';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ShareComponentModule,
    ComponentsModule,
    NgOtpInputModule,
    CountdownModule
    // AngularFireAuthModule,    
    // AngularFirestoreModule,

  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
