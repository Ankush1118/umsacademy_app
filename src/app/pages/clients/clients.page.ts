import {Component, OnInit} from '@angular/core';
import {GenericService} from 'src/app/services/api/generic.service';
import {FireauthService} from 'src/app/services/api/fireauth.service';
import {FunctionsService} from 'src/app/utilities/functions.service';
import {ConnectsService} from "../../services/connects.service";
import {UserService} from "../../services/user.service";
import {ClientService} from "../../services/clients.service";
import { Client} from 'src/app/model/client';
import { AlertController, ModalController } from '@ionic/angular';
import { AddClientComponent } from 'src/app/component/add-client/add-client.component';
import { DisplayService } from 'src/app/services/display.service';
import { User } from 'src/app/model/user';



@Component({
  selector: 'app-students',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  userProfile: any = {};
  clients: Client[] = [];
  public client: Client;
  searchInput: string = '';
  loginUser: User;
  user: User;
  isDeleted: any=0;



  constructor(private userService: UserService,
              private clientService: ClientService,
              private modalController: ModalController,
              private alertController: AlertController, 
              private fun: FunctionsService,
              private displayService: DisplayService
  ) {
  }

  ngOnInit() {
    // this.getAllClients()
    this.getAllClientPlansByIsDeleted(this.isDeleted)

  }

  ionViewDidEnter() {
    // this.loadConnects();
    // this.getAllClients();
    this.getAllClientPlansByIsDeleted(this.isDeleted)
  }

  private async getAllClients() {
      this.clients = await this.clientService.getAllClients();
      console.log(this.clients);
  }

  refresh(){
    // this.getAllClients();
    this.getAllClientPlansByIsDeleted(this.isDeleted)

  }

  checkSearch(client: Client) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (client.clientName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }

  async showSetDataModal() {
    if (this.client.clientName!='' && this.client.clientId) {
      return;
    }
  }

  private async getAllClientPlansByIsDeleted(isDeleted) {
    this.clients = await this.clientService.getAllClientByIsDeleted(isDeleted);
  //  this.updatePlans(this.clients);
    console.log(this.clients);
}

  async addClientModel() {
    const modal = await this.modalController.create({component: AddClientComponent,
      componentProps: {client: null}
    });
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
      if(modelData.data=='close'){
        this.getAllClientPlansByIsDeleted(this.isDeleted);
      }
    });
    return await modal.present();
    // console.log(modal);
    // modal.dismiss().then(() => {
    //   this.getAllClients();
    // });
   
  }

  
  
 
  // async getUsers() {
  //   //this.connects = await this.connectsService.read(this.studentService.student.studentId);
  // }

 

}
