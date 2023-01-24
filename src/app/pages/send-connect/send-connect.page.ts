import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalController} from "@ionic/angular";
import { GenericService } from 'src/app/services/api/generic.service';
import { ConnectsService } from 'src/app/services/connects.service';
import { FunctionsService } from 'src/app/utilities/functions.service';

@Component({
  selector: 'app-send-connect',
  templateUrl: './send-connect.page.html',
  styleUrls: ['./send-connect.page.scss'],
})
export class SendConnectPage implements OnInit {

  connectForm : FormGroup;
  
  constructor(private modalController : ModalController, private formBuilder: FormBuilder,
    private genericService: GenericService, private fun: FunctionsService, private connectsService: ConnectsService) { 
    this.connectForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['']
    });
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async saveConnect() {
    const connect = await this.connectsService.addConnect(this.connectForm.value);
  }

}
