import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientSubscription } from 'src/app/model/clientSubscription';
import { ClientService } from 'src/app/services/clients.service';
import { ClientSubscriptionService } from 'src/app/services/clientSubscription.service';

@Component({
  selector: 'app-subscription-client',
  templateUrl: './subscription-client.page.html',
  styleUrls: ['./subscription-client.page.scss'],
})
export class SubscriptionClientPage implements OnInit {

  clients: any[] = [];
  clientId:any;
  client: any;
  public clientSubscription: ClientSubscription ;



  constructor(private router: Router, private clientSubscriptionService: ClientSubscriptionService, private clientService: ClientService) {
    this.fetchRouterData();
   }

  async fetchRouterData() {
    if (this.router.getCurrentNavigation()) {
      const data = this.router.getCurrentNavigation().extras.state;
      if (data && data.clientSubscription) {
        this.clientSubscription = data.clientSubscription;
        this.getClientById(this.clientSubscription.clientId);
        this.getAllSubscriptionByClient();
        console.log(this.clientSubscription);
        return;
      }
    }
  }


  ngOnInit() {
    // this.fetchRouterData();
    // this.getAllSubscriptionByClient();
  }

  ionViewDidEnter() {
    // this.getAllSubscriptionByClient();
  }

  refresh(){
    this.getAllSubscriptionByClient();
  }


  private async getAllSubscriptionByClient() {
    const res = await this.clientSubscriptionService.getSubscriptionByClient(this.clientSubscription.clientId);
    this.clients = res.data;
    console.log(this.clients);
  }

  async getClientById(clientId){
    this.client = await this.clientService.getClientById(clientId);
    console.log(this.client);
  }


}
