import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  public user: User = null
  public preUrl : string = 'https://manxpro0.web.app/visit/'
  constructor(private userService: UserService,
              private qr: BarcodeScanner,
              private socialSharing: SocialSharing) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadUser()
  }

  loadUser() {
    this.user = this.userService.getUser();
  }

  generateQr() {
    this.qr.encode(this.qr.Encode.TEXT_TYPE, 'hello')
      .then(res => {
        alert(res);
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }

  sendShare(message, subject, url) {
    this.socialSharing.share(message, subject, null, url);
  }

}
