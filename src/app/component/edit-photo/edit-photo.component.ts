import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { UserService } from 'src/app/services/user.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss'],
})
export class EditPhotoComponent implements OnInit {

  constructor(private restService: RestService,
    private userService: UserService) { }

  ngOnInit() {}

  async uploadPhoto(file, urlNode, nodeName) {
    console.log(file.name);
    file = await this.getCompressed(file)
    if (file == null) {
      return;
    }
    await this.restService.uploadImage(file, file.name, this.userService.user.uid, urlNode, nodeName)
    await this.userService.readUserImage();
  }

  async getCompressed(imageFile) {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    }
    try {
      imageFile = await imageCompression(imageFile, options);
    } catch (error) {
      imageFile = null;
      console.log(error);
    }
    return imageFile;
  }


}
