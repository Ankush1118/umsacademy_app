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
export class MedicalService {

  public static readonly NodeConnects = 'medical/getAllStudentByLimit_get?studentId={0}';
  public static readonly NodeAddMedical = 'medical/addMedical';
  public static readonly NodeAllMedicals = 'medical/getAllMedical';
  public static readonly NodeMedicalByClient = 'medical/getAllMedicalByClient?clientId={0}';
  public static readonly NodeAllmedicalsByClient = 'medical/getMedicalByClientId?clientId={0}';
  public static readonly NodemedicalById = 'medical/getMedicalById?medicalId={0}';
  public static readonly NodeDeletemedical = 'medical/deleteMedical';

  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }


  async getAllMedicals( ) {
    try {
      const res: any = await this.restService.get(MedicalService.NodeAllMedicals);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getMedicalByClient(clientId: any) {
    try {
      const res: any = await this.restService.get(String.Format(MedicalService.NodeMedicalByClient, clientId));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async addMedical(body) {
    try {
      console.log(body);
      const res: any = await this.restService.post(MedicalService.NodeAddMedical, body);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async getClientMedicals(clientId: any) {
    const response = await this.restService.get(String.Format(MedicalService.NodeAllmedicalsByClient, clientId));
    return response;
  }

  async delete(id: any) {
    try {
      const response = await this.restService.post(MedicalService.NodeDeletemedical, {medicalId: id})
      return response.message;
    } catch (e) {
      this.displayService.toast(e);
    }

  }

  public async getMedicalById(medicalId) {
    try {
      const res: any = await this.restService.get(String.Format(MedicalService.NodemedicalById, medicalId));
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
