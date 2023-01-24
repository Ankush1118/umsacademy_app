import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { SendConnect } from '../model/sendConnect';
import { UserService } from './user.service';
import { Client } from '../model/client';
import { BehaviorSubject } from 'rxjs';
// import {Student} from "../model/student";


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public static readonly NodeClientById = 'client/getClientById?clientId={0}';
  public static readonly NodeClientByIsDeleted = 'client/getAllClientByIsDeleted?isDeleted={0}';
  public static readonly NodeAddClient = 'client/addClient';
  public static readonly NodeAllClients = 'client/getAllClient';
  public static readonly NodeDeleteClient = 'client/deleteClient';

  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }


  async getAllClients( ) {
    try {
      const res: any = await this.restService.get(ClientService.NodeAllClients);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getClientById( clientId) {
    try {
      const res: any = await this.restService.get(String.Format(ClientService.NodeAllClients,clientId));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addClient(body) {
    try {
      const res: any = await this.restService.post(ClientService.NodeAddClient, body);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getAllClientByIsDeleted(isDeleted: any ) {
    try {
      const res: any = await this.restService.get(String.Format(ClientService.NodeClientByIsDeleted, isDeleted));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async delete(id: any) {
    try {
      const response = await this.restService.post(ClientService.NodeDeleteClient, {clientId: id})
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
