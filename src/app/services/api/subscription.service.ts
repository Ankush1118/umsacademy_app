import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { String } from "typescript-string-operations";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DisplayService } from '../display.service';
import { RestService } from '../rest.service';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  static readonly nodeSubscribe: string = 'subscription/';
  static readonly nodePurchase: string = 'purchase/';
  static readonly NodeAddSubscription: string = 'subscription/addSubscription';
  static readonly NodeAddBranchClientSubscription: string = 'subscription/addBranchClientSubscription';
  static readonly NodeAddBranchClientSubscriptions: string = 'subscription/addBranchClientSubscriptions';
  static readonly NodeAddPurchase: string = 'purchase/addPurchase';
  static readonly NodeGetPurchase: string = 'purchase/getAllPurchase';
  static readonly NodeActiveSubcription: string = 'subscription/activeSubscription';
  static readonly NodeInActiveSubcription: string = 'subscription/inActiveSubscription';
  static readonly NodeGetSubscription: string = SubscriptionService.nodeSubscribe + 'getSubscriptionForExpiryByBranch?branchId={0}';
  static readonly NodeGetActiveSubscription: string = SubscriptionService.nodeSubscribe + 'getActiveSubscriptionByBranch?branchId={0}';
  static readonly NodeGetSubscriptionBranch: string = SubscriptionService.nodeSubscribe + 'getSubscriptionByBranch?branchId={0}';
  static readonly NodeGetAllSubscriptionBranch: string = SubscriptionService.nodeSubscribe + 'getAllSubscriptionByBranch?branchId={0}';

  subscription: any;

  // subscribe: any;
  // amount: any
  // payment_mode: any
  // transactionNo: any;
  //  static readonly NodeInActivePlan: string = 'subscription/inActivePlan';

  constructor(
    private restService: RestService,
    private displayService: DisplayService,
    private storageService: StorageService,
    private http: HttpClient

  ) {

  }

  async getAllPurchase() {
    try {
      const res: any = await this.restService.get(SubscriptionService.NodeGetPurchase);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  async addSubcription(subscription: any) {


    try {
      const response = await this.restService.post(SubscriptionService.NodeAddSubscription, subscription);
      console.log(response)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addBranchClientSubcription(subscription: any) {


    try {
      const response = await this.restService.post(SubscriptionService.NodeAddBranchClientSubscription, subscription);
      console.log(response)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addBranchClientSubcriptions(subscriptions: any[]) {


    try {
      const response = await this.restService.post(SubscriptionService.NodeAddBranchClientSubscriptions, subscriptions);
      console.log(response)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async addPurchase(purchase: any) {
    const response = await this.restService.post(SubscriptionService.NodeAddPurchase, purchase);
    return response;
  }

  public async activeSubscription(subscription: any) {
    const response = await this.restService.post(SubscriptionService.NodeActiveSubcription, subscription);
    return response;
  }

  public async inActiveSubscription(subscription: any) {
    const response = await this.restService.post(SubscriptionService.NodeInActiveSubcription, subscription);
    return response;
  }

  public async getSubscriptionByBranch(branchId) {
    const res = await this.restService.get(String.Format(SubscriptionService.NodeGetSubscriptionBranch, branchId));
    //this.subscription = res.data;
    return res;
  }

  public async getActiveSubscriptionByBranch(branchId) {
    const res = await this.restService.get(String.Format(SubscriptionService.NodeGetSubscription, branchId));
    //this.subscription = res.data;
    return res;
  }

  public async getAllSubscriptionByBranch(branchId) {
    const res = await this.restService.get(String.Format(SubscriptionService.NodeGetAllSubscriptionBranch, branchId));
    //this.subscription = res.data;
    return res;
  }


}

