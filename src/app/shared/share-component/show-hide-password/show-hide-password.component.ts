import { Component, ContentChild, ElementRef, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss'],
})
export class ShowHidePasswordComponent {

  showPassword = false;
  @ContentChild('myInput') input: ElementRef;
  constructor() {}
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input['type'] = this.showPassword ? 'text' : 'password';
  }
}
