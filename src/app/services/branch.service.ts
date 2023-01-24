import {Injectable} from '@angular/core';
import { DisplayService } from './display.service';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';
import {String} from 'typescript-string-operations';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  static readonly nodeBranch: string = 'branch/';
  static readonly nodeBranchId: string = BranchService.nodeBranch + 'getBranchById?branchId={0}';
  static readonly nodeBranchByPlanId: string = BranchService.nodeBranch + 'getAllBranchByPlanId?planId={0}';
  static readonly NodeAddBranch: string = 'branch/addBranch';
  static readonly NodeGetAllBranch: string = 'branch/getAllBranch';
  static readonly NodeDeleteBranch: string = 'branch/deleteBranch';
  static readonly NodeActiveBranch: string = 'branch/activeBranch';
  static readonly NodeInActiveBranch: string = 'branch/inActiveBranch';
  static readonly NodeGetSubscriptionBranch : string = BranchService.nodeBranch + 'getSubscriptionByBranch?branchId={0}';
  static readonly NodeGetAllSubscriptionBranch : string = BranchService.nodeBranch + 'getAllSubscriptionByBranch?branchId={0}';


  constructor(
              private restService: RestService,
              private displayService: DisplayService,
              private storageService: StorageService
  ) {

  }

  public async addBranch(branch: any) {
    console.log("in branch service")
    console.log(branch)
    const response = await this.restService.post(BranchService.NodeAddBranch, branch);
    return response;
  }

  public async getBranchs() {
    try {
      const res: any = await this.restService.get(BranchService.NodeGetAllBranch);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  public async getBranchById(branchId) {
    try {
      const res: any = await this.restService.get(String.Format(BranchService.nodeBranchId, branchId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  public async getBranchByPlanId(planId) {
    try {
      const res: any = await this.restService.get(String.Format(BranchService.nodeBranchByPlanId, planId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  public async deleteBranch(branch: any) {

    const response = await this.restService.post(BranchService.NodeDeleteBranch, branch);
    await this.getBranchs();
    return response;
  }

  public async activeBranch(branch: any) {
    const response = await this.restService.post(BranchService.NodeActiveBranch, branch);
    return response;
  }

  public async inActiveBranch(branch: any) {
    const response = await this.restService.post(BranchService.NodeInActiveBranch, branch);
    return response;
  }

  public async getSubscriptionByBranch(branchId){
    const res = await this.restService.get(String.Format(BranchService.NodeGetSubscriptionBranch, branchId));
    //this.subscription = res.data;
    return res;
  }

  public async getAllSubscriptionByBranch(branchId){
    const res = await this.restService.get(String.Format(BranchService.NodeGetAllSubscriptionBranch, branchId));
    //this.subscription = res.data;
    return res;
  }

}

