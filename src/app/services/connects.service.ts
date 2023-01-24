import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import { SendConnect } from '../model/sendConnect';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectsService {

  public static readonly NodeConnects = 'connect/getAllConnectByUserId?userId={0}';
  public static readonly NodeAddConnect = 'connect/addConnect';

  constructor(private restService: RestService,
              private displayService: DisplayService,
              private userService: UserService
  ) {
  }

  async read(userId: number) {
    try {
      const url = String.Format(ConnectsService.NodeConnects, userId);
      const res: any = await this.restService.get(url);
      return res.data;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async addConnect(sendConnect: SendConnect) {

    const body = {
      userId: this.userService.getUser().userId,
      displayName: sendConnect.displayName,
      email: sendConnect.email,
      mobileNo : sendConnect.mobileNo

    }

    const response = await this.restService.post(ConnectsService.NodeAddConnect, body);
    return response;
  }


}
