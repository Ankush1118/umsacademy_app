import {Injectable} from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  constructor(private alertController: AlertController,
              private toastController : ToastController
              ) {
  }

  async alert(header: string, subHeader: string = null) {
    const alert = await this.alertController.create(
      {
        header: header,
        subHeader: subHeader,
      }
    )
    return alert.present();
  }

  async toast(message : string, duration : number = 2000, position: 'top' | 'bottom' | 'middle' = 'bottom', color  = 'warning'){
    const toast = await this.toastController.create({
      message : message,
      duration : duration,
      position : position,
      color : color
    })
    return toast.present();
  }
}
