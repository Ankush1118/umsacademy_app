import { formatDate } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/services/clients.service';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
import { FunctionsService } from 'src/app/utilities/functions.service';
import { AddClientComponent } from '../add-client/add-client.component';
// import {Connect} from "../../model/connect";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {

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

  async delete(id) {
    const alert = await this.alertController.create({
      header: 'Delete Client ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "Delete",
        handler: async () => {
          await this.clientService.delete(id)
          this.refresh.emit();
        }
      }

      ]
    })
    alert.present()
  }

  async isDelete(client){
    
    const alert = await this.alertController.create({
      header: 'Are you sure you want delete client ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "Delete",
        handler: async () => {
          client.isDeleted = 1;
          const res = await this.clientService.addClient(client);
          if(res){
          this.displayService.toast("Client deleted successfully");
          this.refresh.emit();
          }
        }
      }

      ]
    })
    alert.present()
      
  }

  async activate(client){
    console.log(client);
    const res = await this.userService.getCustomerUserByUserTypeSpeId(client.clientId);
    if(!res.status){
      this.loginUser = await this.userService.getUser();
      const user= {
      userId: '',
      displayName : client.clientName,
      mobileNo : client.mobileNumber,
      roleId : 3,
      userTypeId : 3,
      userTypeSpeId : client.clientId,
      branchId : this.loginUser.branchId ,
      branchDb : this.loginUser.branchDb,
      active : '1'
      }
      const response = await this.userService.addUser(user);
      if(response && response.message){
        console.log("Client user activated successfully");
        client.activeUser = 1;
        const res = await this.clientService.addClient(client);
        if(res){
          this.refresh.emit();
          this.displayService.toast("Client user activated successfully");
        }
      }
    }else{
      const response = await this.userService.updateUserCustomerBySpecIdAndBranch(client,1);
          if(response && response.message){
            client.activeUser = 1;
            const res = await this.clientService.addClient(client);
            if(res){
              this.displayService.toast("Client user deactivated successfully");
              this.refresh.emit();
             // this.fun.navigate('tab3');
            }
          }
    }
  }

  async deactivate(client){
      try{
         const res = await this.userService.getCustomerUserByUserTypeSpeId(client.clientId);

        if(res.status){
          const response = await this.userService.updateUserCustomerBySpecIdAndBranch(client,0);
          if(response && response.message){
            client.activeUser = 0;
            const res = await this.clientService.addClient(client);
            if(res){
              this.displayService.toast("Client user deactivated successfully");
              this.refresh.emit();
             // this.fun.navigate('tab3');
            }
          }
        }else{
          this.displayService.toast("Client User Not Found");
        }
      }catch(error){
        this.displayService.toast(error);
      }

  }

  async editClientModel(client){
    console.log(client)
    const modal = await this.modalController.create({component: AddClientComponent,
      componentProps: {client: client}
    });
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
      if(modelData.data=='close'){
        this.refresh.emit();
      }
    });
    return await modal.present();
  }

  async openProfile(client){
    console.log(client)
    const modal = await this.modalController.create({component: AddClientComponent,
      componentProps: {client: client}
    });
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
      if(modelData.data=='close'){
        this.refresh.emit();
      }
    });
    return await modal.present();
  }

  compareTwoDates(firstDate, secondDate){
    if(formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(secondDate, 'yyyy-MM-dd', 'en-US', '+0530') || formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(this.today.setDate(this.today.getDate()-1), 'yyyy-MM-dd', 'en-US', '+0530') || formatDate(firstDate, 'yyyy-MM-dd', 'en-US', '+0530')==formatDate(this.today.setDate(this.today.getDate()-2), 'yyyy-MM-dd', 'en-US', '+0530')){
      return true;
    } else {
      return false;
    }
  }

}


