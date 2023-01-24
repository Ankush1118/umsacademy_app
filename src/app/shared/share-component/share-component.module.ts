import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';



@NgModule({
  declarations: [ShowHidePasswordComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ShowHidePasswordComponent
  ]
})
export class ShareComponentModule { }
