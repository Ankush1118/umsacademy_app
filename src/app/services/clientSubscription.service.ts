import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { SendConnect } from '../model/sendConnect';
import { UserService } from './user.service';
// import { Personal } from '../modal/customer';
import { BehaviorSubject } from 'rxjs';
// import {Student} from "../model/student";


@Injectable({
  providedIn: 'root'
})
export class ClientSubscriptionService {

    public static readonly NodeSubscriptionByDate = 'clientSubscription/getAllClientSubscription';
    public static readonly NodeAllSubscriptionByClient = 'clientSubscription/getAllSubscriptionByCustomer?clientId={0}';
    public static readonly NodeAllBranchClientSubscriptionByClient = 'clientSubscription/getAllBranchClientSubscriptionByCustomer?clientId={0}';
    public static readonly NodeAllBranchClientSubscriptionByClientAndDate = 'clientSubscription/getAllBranchClientSubscriptionByCustomerAndDate?clientId={0}&date={1}';
    public static readonly NodeActiveSubctription = 'clientSubscription/activeClientSubscription';
    public static readonly NodeInActiveSubctription = 'clientSubscription/inActiveClientSubscription';
    public static readonly NodeAcceptSubscription = 'clientSubscription/addClientSubscription';
    public static readonly NodeAcceptPayment = 'clientPurchase/addClientPurchase';
    public static readonly NodeUpdateClientBranchSubscriptionByClientsAndPlan = 'clientSubscription/updateClientBranchSubscriptionByClientsAndPlan';


  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }

  async getClientSubscriptionByDate() {
    try {
      const res: any = await this.restService.get(String.Format(ClientSubscriptionService.NodeSubscriptionByDate));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async getSubscriptionByClient(clientId) {
    try {
      const res = await this.restService.get(String.Format(ClientSubscriptionService.NodeAllSubscriptionByClient, clientId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  public async getBranchClientSubscriptionByClient(clientId) {
    try {
      const res = await this.restService.get(String.Format(ClientSubscriptionService.NodeAllBranchClientSubscriptionByClient, clientId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  public async getBranchClientSubscriptionByClientAndDate(clientId, today) {
    try {
      const res = await this.restService.get(String.Format(ClientSubscriptionService.NodeAllBranchClientSubscriptionByClientAndDate, clientId, today));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  async addSubcription(subscription: any) {
    try{
      const response = await this.restService.post(ClientSubscriptionService.NodeAcceptSubscription, subscription);
      console.log(response.data)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async updateClientBranchSubscriptionByClientsAndPlan(clients: any[], subscribePlan: any) {
    const body = {
      clients: clients,
      subscribePlan: subscribePlan,
    }
    try{
      const response = await this.restService.post(ClientSubscriptionService.NodeAcceptSubscription, body);
      console.log(response.data)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async addPurchase(purchase: any) {
    const response = await this.restService.post(ClientSubscriptionService.NodeAcceptPayment, purchase);
    return response;
  }



  public async activeSubscription(subscription: any) {
    const response = await this.restService.post(ClientSubscriptionService.NodeActiveSubctription, subscription);
    return response;
  }

  public async inActiveSubscription(subscription: any) {
    const response = await this.restService.post(ClientSubscriptionService.NodeInActiveSubctription, subscription);
    return response;
  }



}

