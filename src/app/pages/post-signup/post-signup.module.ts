import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostSignupPageRoutingModule } from './post-signup-routing.module';

import { PostSignupPage } from './post-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostSignupPageRoutingModule
  ],
  declarations: [PostSignupPage]
})
export class PostSignupPageModule {}
