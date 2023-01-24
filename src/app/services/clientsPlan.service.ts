import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { SendConnect } from '../model/sendConnect';
import { UserService } from './user.service';
import { Client } from '../model/client';
import { BehaviorSubject } from 'rxjs';
// import {Student} from "../model/student";

// export interface IPlanData {
//   clientplanId: number;
//   deletes: boolean;
//   planName: string;
//   memberLimit: number;
//   userLimit: number;
//   validity: number;
//   price: number;
// }


@Injectable({
  providedIn: 'root'
})

export class ClientPlanService {
  deletePlan(plan: any) {
    throw new Error('Method not implemented.');
  }

  public static readonly NodeAddPlan = 'clientPlan/addClientPlan';
  public static readonly NodeAllPlans = 'clientPlan/getAllClientPlan';
  public static readonly NodeAllPlansByIsDeleted = 'clientPlan/getAllClientPlanByIsDeleted?isDeleted={0}';
  public static readonly NodeDeleteClientPlan = 'clientPlan/deleteClientPlan';
  public static readonly NodeDeletePlan = 'clientPlan/deletePlan';

  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }


  async getAllClientPlans( ) {
    try {
      const res: any = await this.restService.get(ClientPlanService.NodeAllPlans);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getAllClientPlansByIsDeleted(isDeleted: any ) {
    try {
      const res: any = await this.restService.get(ClientPlanService.NodeAllPlansByIsDeleted, isDeleted);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addClientPlan(body) {
    try {
      const res: any = await this.restService.post(ClientPlanService.NodeAddPlan, body);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async delete(id: any) {
    try {
      const response = await this.restService.post(ClientPlanService.NodeDeletePlan, {planId: id})
      return response.message;
    } catch (e) {
      this.displayService.toast(e);
    }

  }





//   public async addConnect(sendConnect: SendConnect) {

//     const body = {
//       studentId: this.userService.getStudent().studentId,
//       displayName: sendConnect.displayName,
//       email: sendConnect.email,
//       mobileNo : sendConnect.mobileNo

//     }

//     const response = await this.restService.post(StudentsService.NodeAddConnect, body);
//     return response;
//   }


}
