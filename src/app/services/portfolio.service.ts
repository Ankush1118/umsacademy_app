import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {String} from "typescript-string-operations";
import {DisplayService} from "./display.service";
import {UserService} from "./user.service";
import {Item} from "../model/Item";
import {Section} from "../model/Section";
import {Icon} from "../model/Icon";
import {ServerResponse} from "../model/ServerResponse";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public static readonly NodeSection = 'section/';
  public static readonly NodeGetUserPortfolio = PortfolioService.NodeSection + 'getAllItemByUserAndMode?userId={0}&mode={1}';
  public static readonly NodeGetAllIcon = PortfolioService.NodeSection + 'getAllIconBySection';
  public static readonly NodeAllItem = PortfolioService.NodeSection + 'getAllItemByUser?userId={0}';
  public static readonly NodeAllSection = PortfolioService.NodeSection + 'getAllSectionMst';
  public static readonly NodeAddSection = PortfolioService.NodeSection + 'addUserSection';
  public static readonly NodeDeleteSection = PortfolioService.NodeSection + 'deleteUserSection';
  public static readonly NodeAddItem = PortfolioService.NodeSection + 'addItem';
  public static readonly NodeDeleteItem = PortfolioService.NodeSection + 'deleteItem';
  public static readonly NodeItemByIcon = PortfolioService.NodeSection + 'getItemByIcon?iconId={0}';

  constructor(private restService: RestService,
              private displayService: DisplayService,
              private userService: UserService
  ) {
  }


  async getUserPortfolio(userId?: string, mode?: number) {
    try {
      //userId = userId ? userId : this.userService.getUser().userId;
//mode = mode ? mode : this.userService.getUser().mode;
      const response: ServerResponse = await this.restService.get(PortfolioService.NodeGetAllIcon)
      return response.data;
    } catch (e) {
      this.displayService.toast(e);
      return null;
    }
  }

  public async addItem(icon: Icon, sectionId: number) {
    try {
      const body = {
        iconId: icon.iconId,
        sectionId: sectionId,
        userId: this.userService.getUser().userId,
        updUserId: this.userService.getUser().userId,
        value: icon.item.value
      }
      const response = await this.restService.post(PortfolioService.NodeAddItem, body);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      console.log(JSON.stringify(e));
      this.displayService.toast(e);
      return null;
    }


  }

  public async getAllItems(userId: any = null) {
    try {
      userId = userId ? userId : this.userService.getUser().userId;
      const response: any = await this.restService.get(String.Format(PortfolioService.NodeAllItem, userId))
      return response.data;
    } catch (e) {
      await this.displayService.toast(e);
      return null;
    }
  }

  public async getAllSections(userId: any = null) {
    try {
     // userId = userId ? userId : this.userService.getUser().userId;
      const response: any = await this.restService.get(PortfolioService.NodeAllSection)
      return response.data;
    } catch (e) {
      return null;
    }
  }


  public async addSection(sectionName: string) {
    try {
      const section = {
        sectionId: "",
        sectionName: sectionName,
        userId: this.userService.getUser().userId,
        mode: this.userService.getUser().mode
      }
      const response = await this.restService.post(PortfolioService.NodeAddSection, section);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      console.log(JSON.stringify(e));
      this.displayService.toast(e)
      return null
    }

  }

  public async updateSection(sectionId: number, sectionName: string) {
    try {
      const body = {
        sectionId: sectionId,
        sectionName: sectionName,
        userId: this.userService.getUser().userId,
        mode: this.userService.getUser().mode
      }
      const response = await this.restService.post(PortfolioService.NodeAddSection, body);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      this.displayService.toast(e)
      return null
    }

  }

  public async deleteSection(sectionId: number) {
    try {
      const body = {
        sectionId: sectionId,
      }
      const response = await this.restService.post(PortfolioService.NodeDeleteSection, body);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      this.displayService.toast(e)
      return null
    }

  }


  public async updateItem(item: Item) {
    try {
      const body = {
        itemId: item.itemId,
        iconId: item.iconId,
        sectionId: item.sectionId,
        userId: this.userService.getUser().userId,
        updUserId: this.userService.getUser().userId,
        value: item.value
      }
      const response: ServerResponse = await this.restService.post(PortfolioService.NodeAddItem, body);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      this.displayService.toast(e);
      return null;
    }


  }


  async deleteItem(itemId: number) {
    try {
      const body = {
        itemId: itemId,
      }
      console.log(body);
      const response: ServerResponse = await this.restService.post(PortfolioService.NodeDeleteItem, body);
      this.displayService.toast(response.message);
      return response.data;
    } catch (e) {
      this.displayService.toast(e);
      return null;
    }
  }

  async getItemByIcon(iconId: number) {
    if (iconId == null) {
      return null
    }
    try {
      const response: any = await this.restService.get(String.Format(PortfolioService.NodeItemByIcon, iconId))
      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
