import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
// import { Personal } from '../modal/customer';
import { BehaviorSubject } from 'rxjs';
// import {Student} from "../model/student";


@Injectable({
  providedIn: 'root'
})
export class WalletService {

    public static readonly NodeGetAllWalletTransaction = 'wallet/getAllWalletTransaction';
    public static readonly NodeGetTop5WalletTransaction = 'wallet/getTop5WalletTransaction';
    public static readonly NodeGetWalletAmountByUser = 'wallet/getWalletAmountByUser?userId={0}';
    public static readonly NodeAddWalletTransaction = 'wallet/addWalletTransaction';
    public static readonly NodeGetLastWalletTransaction = 'wallet/getLastWalletTransaction';


  constructor(private restService: RestService,
              private displayService: DisplayService,
            //   private userService: UserService
  ) {
  }

  async getAllWalletTransaction() {
    try {
      const res: any = await this.restService.get(String.Format(WalletService.NodeGetAllWalletTransaction));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getTop5WalletTransaction() {
    try {
      const res: any = await this.restService.get(String.Format(WalletService.NodeGetTop5WalletTransaction));
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  public async getWalletAmountByUser(userId) {
    try {
      const res: any = await this.restService.get(String.Format(WalletService.NodeGetWalletAmountByUser, userId));
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e)
    //  this.displayService.toast(e);
    }
  }

  async addWalletTransaction(walletTransaction: any) {
    try{
      const response = await this.restService.post(WalletService.NodeAddWalletTransaction, walletTransaction);
      console.log(response.data)
      return response;
    } catch (e) {
      this.displayService.toast(e);
    }
  }

  async getLastWalletTransaction() {
    try {
      const res: any = await this.restService.get(WalletService.NodeGetLastWalletTransaction);
      return res;
    } catch (e) {
      this.displayService.toast(e);
    }
  }


}

