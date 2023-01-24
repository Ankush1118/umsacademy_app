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
export class HealthService {

  // public static readonly NodeConnects = 'healthStatus/getAllHealthStatus';
  public static readonly NodeAddHealthStatus = 'healthStatus/addHealthStatus';
  public static readonly NodeAllHealthStatus = 'healthStatus/getAllHealthStatus';
  public static readonly NodeAllHealthStatussByClient = 'healthStatus/getHealthStatusByClientId?clientId={0}';
  public static readonly NodeHealthStatusById = 'healthStatus/getHealthStatusById?healthstatusId={0}';
  public static readonly NodeHealthStatusByDate = 'healthStatus/getHealthStatusByDate?updateDt={0}';
  public static readonly NodeDeleteHealthStatus = 'healthStatus/deleteHealthStatus';

  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }


  async getAllHealthStatus( ) {
    try {
      const res: any = await this.restService.get(HealthService.NodeAllHealthStatus);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addHealthStatus(body) {
    try {
      console.log(body);
      const res: any = await this.restService.post(HealthService.NodeAddHealthStatus, body);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async getClientHealthStatus(clientId: any) {
    const response = await this.restService.get(String.Format(HealthService.NodeAllHealthStatussByClient, clientId));
    return response;
  }

  async getHealthStatusByDate(updateDt:any) {
    try {
      const res: any = await this.restService.get(String.Format(HealthService.NodeHealthStatusByDate, updateDt));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async delete(id: any) {
    try {
      console.log("delete status:"+ id);
      const response = await this.restService.post(HealthService.NodeDeleteHealthStatus, {healthstatusId: id})
      console.log(response.message);
      return response.message;
    } catch (e) {
      this.displayService.toast(e);
    }

  }

  public async getHealthStatusById(healthStatusId) {
    try {
      const res: any = await this.restService.get(String.Format(HealthService.NodeDeleteHealthStatus, healthStatusId));
      console.log(res);
      return res;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }


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
