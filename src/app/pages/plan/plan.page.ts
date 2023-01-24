import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AddClientComponent } from 'src/app/component/add-client/add-client.component';
import { AddClientPlanComponent } from 'src/app/component/add-clientPlan/add-clientPlan.component';
import { Client } from 'src/app/model/client';
import { ClientPlan } from 'src/app/model/clientPlan';
import { ClientService } from 'src/app/services/clients.service';
import { ClientPlanService } from 'src/app/services/clientsPlan.service';
// import { ClientPlanService, ITableData } from 'src/app/services/clientsPlan.service';
import { ConnectsService } from 'src/app/services/connects.service';
import { DisplayService } from 'src/app/services/display.service';
import { UserService } from 'src/app/services/user.service';
// import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  // @ViewChild('myModal') public myModal: ModalDirective;


  userProfile: any = {};
  clientPlans: any[] = [];
  clients: any[];
  public clientPlan: ClientPlan;
  searchInput: string = '';
  clientPlanForm: any;
  submitted: boolean;
  isDeleted: any;



  constructor(private connectsService: ConnectsService,
              private userService: UserService,
              private clientPlanService: ClientPlanService,
              private modalController: ModalController,
              private alertController: AlertController,
              private clientService: ClientService
  ) {
  }

  ngOnInit() {
    // this.getAllClientPlans()
    this.getAllClientPlansByIsDeleted(this.isDeleted)

  }

  ionViewDidEnter() {
    // this.getClients();
    // this.getAllClientPlans();
    this.getAllClientPlansByIsDeleted(this.isDeleted)
  }

  refresh(){
    this.getAllClientPlansByIsDeleted(this.isDeleted)
  }

  private async getAllClientPlans() {
      this.clientPlans = await this.clientPlanService.getAllClientPlans();
    //  this.updatePlans(this.clients);
      console.log(this.clientPlans);
  }

  private async getAllClientPlansByIsDeleted(isDeleted) {
    this.clientPlans = await this.clientPlanService.getAllClientPlansByIsDeleted(isDeleted);
  //  this.updatePlans(this.clients);
    console.log(this.clientPlans);
}

  // async addClientPlanModel() {
  //   const modal = await this.modalController.create({component: AddClientPlanComponent});
  //   modal.present();
  // }

  async addClientPlanModel() {
    const modal = await this.modalController.create({component: AddClientPlanComponent});
    
    
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
  
  // async editPlanModel(clientPlan){
  //   const modal = await this.modalController.create({component: AddClientPlanComponent,
  //    componentProps:{clientPlan: clientPlan}
  //   });
  //   modal.present();
  // }

  checkSearch(clientPlan: ClientPlan) {
    if (!this.searchInput || this.searchInput.length < 1) {
      return false;
    }

    if (clientPlan.planName.toLowerCase().indexOf(this.searchInput.toLowerCase()) < 0) {
      return true
    }
  }

  async showSetDataModal() {
    if (this.clientPlan.planName!='' && this.clientPlan.planId) {
      return;
    }
  }

  // 
  updatePlans(clients){
    console.log("update plan")
    this.clientPlans.forEach(function (element) {
     if(clients.some(obj => obj.planId === element.planId)){
       element.deletes = false;
       console.log("plan not delete:"+element.planId);
     }else{
       element.deletes = true;
     }
     
   });
  }

  async getClients(){
    this.clients = await this.clientService.getAllClients();
    console.log(this.clients);
  }

  get f() {
    return this.clientPlanForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.clientPlanForm.reset();
  }

}
