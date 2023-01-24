import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientPlan } from 'src/app/model/clientPlan';
import { ClientPlanService } from 'src/app/services/clientsPlan.service';
import { DisplayService } from 'src/app/services/display.service';
import { AddClientPlanComponent } from '../add-clientPlan/add-clientPlan.component';

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.scss'],
})
export class PlanViewComponent implements OnInit {

  // @Input() connect : Connect;
  @Input() clientPlan : ClientPlan;
  @Output() refresh: any = new EventEmitter();

  plan: ClientPlan;
  id: any;

  constructor(private modalController: ModalController, private displayService: DisplayService, private alertController: AlertController, private clientPlanService : ClientPlanService) { }

  ngOnInit() {
  }

  async closeModal() {
    const close:string = 'close';
    await this.modalController.dismiss(close);
    console.log("close button");
  }
  
  async editClientPlantModel(clientPlan){
    console.log(clientPlan)
    const modal = await this.modalController.create({component: AddClientPlanComponent,
      componentProps: {clientPlan: clientPlan}
    });
    modal.onDidDismiss().then((modelData) => {
      console.log(modelData);
        if(modelData.data=='close'){
          this.refresh.emit();
        }
      });
      return await modal.present();
  }

  async activate(clientPlan){
    console.log(clientPlan);
    
      console.log("plan plan deleted successfully");
      clientPlan.isDeleted = 1;
      const res = await this.clientPlanService.addClientPlan(clientPlan);
      if(res){
       this.displayService.toast("Client plan deleted successfully");
       this.refresh.emit();
      }
  }

  async deactivate(plan){
    try{
      console.log(plan);
          console.log("Client user deleted successfully");
          plan.isDeleted = 1;
          const res = await this.clientPlanService.addClientPlan(plan);
          if(res){
            this.displayService.toast("Client user deactivated successfully");
            this.refresh.emit();
           // this.fun.navigate('tab3');
      }
    }catch(error){
      this.displayService.toast(error);
    }

}

  async delete(id) {
    const alert = await this.alertController.create({
      header: 'Delete Connect ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: "Delete",
        handler: async () => {
          await this.clientPlanService.delete(id)
          this.refresh.emit();
        }
      }

      ]
    })
    alert.present()
  }
}


