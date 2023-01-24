import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientSubscription } from 'src/app/model/clientSubscription';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-wallet-transaction-view',
  templateUrl: './wallet-transaction-view.component.html',
  styleUrls: ['./wallet-transaction-view.component.scss'],
})
export class WalletTransactionViewComponent implements OnInit {

  @Input() walletTransaction : any;
  @Output() refresh: any = new EventEmitter();


  constructor(private alertController: AlertController, 
              private clientSubscriptionService: ClientSubscriptionService, private modalController: ModalController,
              private displayService: DisplayService, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
  
  }

}