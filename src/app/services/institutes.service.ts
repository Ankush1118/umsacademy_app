import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InstitutesService {
  
  public static readonly nodeInstituteById: string = 'institute/getInstituteById?instituteId={0}';
  public static readonly NodeInstitutes: string = 'institute/getAllInstitute';
  public static readonly NodeAddInstitute: string = 'institute/addInstitute';

  constructor(private restService: RestService,
              private displayService: DisplayService,
              private userService: UserService
  ) {
  }

  async read(userId: number) {
    try {
      const url = String.Format(InstitutesService.NodeInstitutes, userId);
      const res: any = await this.restService.get(url);
      return res.data;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getInstituteDb() {
    throw new Error('Method not implemented.');
  }

  async getAll() {
    try {
      const res: any = await this.restService.get(InstitutesService.NodeInstitutes);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      this.displayService.toast(e);
    }
  }

  async getInstituteById(value: number): Promise<any> {
    try {
      const url = String.Format(InstitutesService.nodeInstituteById, value);
      const res: any = await this.restService.get(url);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }




}
