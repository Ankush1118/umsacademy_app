import { formatDate } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/services/clients.service';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
// import {Connect} from "../../model/connect";

@Component({
  selector: 'app-deleted-client-view',
  templateUrl: './deleted-client-view.component.html',
  styleUrls: ['./deleted-client-view.component.scss'],
})
export class DeletedClientViewComponent implements OnInit {

  // @Input() connect : Connect;
  @Input() client : Client;
  @Output() refresh: any = new EventEmitter();

  loginUser: User;
  today= new Date();

  user: User;

  constructor(private userService: UserService, private clientService: ClientService,private modalController: ModalController,
    private alertController: AlertController, private fun: FunctionsService, private displayService: DisplayService) { }

  ngOnInit() {
    this.calculateAge();
    this.calculateBMI();

  }

  calculateBMI() {
    if (this.client.weight > 0 && this.client.height > 0) {
      let finalBmi = this.client.weight / (this.client.height / 100 * this.client.height / 100);
      this.client.bmi = parseFloat(finalBmi.toFixed(2));
    }
  }

  calculateAge(){
    var now = new Date();
    var dob = new Date(this.client.dob);
    this.client.age = now.getFullYear() - dob.getFullYear();
  }

  async restore(client){
    
    const alert = await this.alertController.create({
      header: 'Are you sure you want restore client ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "Restore",
        handler: async () => {
          client.isDeleted = 0;
          client.activeUser = 1;
          const res = await this.clientService.addClient(client);
          if(res){
            const resUser = await this.userService.updateUserCustomerBySpecIdAndBranch(client,1);
            this.displayService.toast("Client deleted successfully");
            this.refresh.emit();
          }
        }
      }

      ]
    })
    alert.present()
      
  }

  compareTwoDates(firstDate, secondDate){
    if(formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(secondDate, 'yyyy-MM-dd', 'en-US', '+0530') || formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(this.today.setDate(this.today.getDate()-1), 'yyyy-MM-dd', 'en-US', '+0530') || formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(this.today.setDate(this.today.getDate()-2), 'yyyy-MM-dd', 'en-US', '+0530')){
      return true;
    } else {
      return false;
    }
  }

}


