import {Injectable} from '@angular/core';
import {ValidationUtil} from '../utilities/ValidationUtil';
import {FireauthService} from './api/fireauth.service';
import {RestService} from './rest.service';
import {String} from 'typescript-string-operations';
import {User} from "../model/user";
import {StorageService} from "./storage.service";
import {LoaderComponent} from "../component/loader/loader.component";
import {BehaviorSubject, Subject} from "rxjs";
import {DisplayService} from "./display.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly nodeUser: string = 'user/';
  static readonly nodeUserId: string = UserService.nodeUser + 'getUserByUid?uid={0}';
  static readonly nodeClientId: string = UserService.nodeUser + 'getUserByUserTypeSpeId?userTypeSpeId={0}';
  static readonly nodeCustomerUserByUserTypeSpeId: string = UserService.nodeUser + 'getCustomerUserByUserTypeSpeId';
  static readonly NodeUpdateUser: string = UserService.nodeUser + 'updateUser';
  static readonly NodeAddUser: string = UserService.nodeUser + 'addUser';
  static readonly NodeUpdateUid: string = UserService.nodeUser + 'updateUid';
  static readonly NodeDeleteUser: string = UserService.nodeUser + 'deleteUser';
  static readonly NodeUpdateUsername: string = UserService.nodeUser + 'updateUsername';
  static readonly NodeModeUpdate: string = UserService.nodeUser + 'updateMode';
  static readonly NodeDirectIconUpdate: string = UserService.nodeUser + 'updateDirectIcon';
  static readonly nodeUsername: string = UserService.nodeUser + 'getUserByUsername?username={0}';
  static readonly nodeCheckMobileNo: string = UserService.nodeUser + 'checkMobileNo?mobileNo={0}';
  static readonly nodeCheckMobileNoInAddClient: string = UserService.nodeUser + 'checkMobileNoInAddClient?mobileNo={0}';
  static readonly nodeCheckMobileNoForBranch: string = UserService.nodeUser + 'checkMobileNoForBranch?mobileNo={0}';
  static readonly NodeUpdateUserForActivate: string = UserService.nodeUser + 'updateUserForActivate';

  public user: User
  public userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private fireauthService: FireauthService,
              private restService: RestService,
              private storageService: StorageService,
              private displayService: DisplayService
  ) {

  }


  public async autoLogin() {
    LoaderComponent.showLoader();
    const fireLogin = await this.fireauthService.getSavedLogin();
    LoaderComponent.hideLoader();
    if (fireLogin && fireLogin.uid != null) {
      const user = await this.readUser(fireLogin.uid);
      return this.user;
    }
    throw new Error('No User Found');
  }

  public async firebaseLogin(email: string, password: string): Promise<any> {
    try {
      ValidationUtil.verifyEmail(email);
      ValidationUtil.verifyPassword(password);
      const fireLoginResponse: any = await this.fireauthService.SignIn(email, password);
      const user = await this.readUser(fireLoginResponse.uid);
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async fireOtpVerification(PhoneNo: any,otp: any): Promise<any> {
    try {
      // ValidationUtil.verifyEmail(email);
      // ValidationUtil.verifyPassword(password);
      console.log(PhoneNo+"    "+otp);

      const fireLoginResponse: any = await this.fireauthService.enterVerificationCode(otp);
      const user = await this.readUser(fireLoginResponse.uid);
      if(!user.status){
        const res = await this.checkMobileNo(PhoneNo);
        console.log(res);
        const saveUser = await this.saveUserWithUid(res.data,fireLoginResponse.uid);
        setTimeout(() => {
          const user = this.readUser(fireLoginResponse.uid);
          return Promise.resolve(user);
        }, 1000);
      }
      return Promise.resolve(user);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }


  public async readUser(uid: any): Promise<any> {
    try {
      const user = await this.restService.get(String.Format(UserService.nodeUserId, uid));
      await this.saveUser(user);
      console.log(user)
      this.publishUser();
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }

  }

  public async readUserImage(uid: string = this.user.uid): Promise<any> {
    try {
      const user = await this.restService.get(String.Format(UserService.nodeUserId, uid));
      console.log(user);
      await this.saveUser(user);
      this.publishUser();
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }

  }

  public async getUserByUsername(username: any): Promise<any> {
    try {
      const res = await this.restService.get(String.Format(UserService.nodeUsername, username));
      return Promise.resolve(res.data);
    } catch (e) {
      return Promise.reject(e);
    }

  }

  public async saveUser(user: any) {
    if (user.status) {
      this.user = user.data;
      await this.storageService.saveUser(this.user)
    } else {
      await this.storageService.deleteUser()
    }
    return;
  }

  public async logout() {

  }

  getUser() {
    console.log(this.user);
    return this.user;
  }

  public async updateUser(user: User) {
    const response = await this.restService.post(UserService.NodeUpdateUser, user);
    await this.readUser(this.user.uid);
    return response;
  }

  public async updateProfileMode(mode: number) {
    const body = {
      userId: this.user.userId,
      mode: mode,
      displayName: this.user.displayName
    }
    const response = await this.restService.post(UserService.NodeModeUpdate, body);
    await this.readUser(this.user.uid);
    return response;
  }

  public async saveUserWithUid(user: any, uid: string) {
    console.log(user);
    user.uid = uid;
    const response = await this.restService.post(UserService.NodeUpdateUid, user);
    await this.readUser(uid);
    return response;
  }

  public async updateDirectIcon(iconId: number) {
    try {
      const body = {
        userId: this.user.userId,
        directIconId: iconId,
      }
      const response = await this.restService.post(UserService.NodeDirectIconUpdate, body);
      await this.readUser(this.user.uid);
      this.displayService.toast(response.message);
      return response;
    } catch (e) {
      this.displayService.toast(e)
    }

  }

  public async updateUsername(username: string) {
    try {
      const body = {
        userId: this.user.userId,
        username: username,
      }
      const response = await this.restService.post(UserService.NodeUpdateUsername, body);
      await this.readUser(this.user.uid);
      this.displayService.toast(response.message);
      return response;
    } catch (e) {
      this.displayService.toast(e)
    }

  }

  public async updateUserType(userTypeId: number, instituteId: number) {
    try {
      const body = {
        userId: this.user.userId,
        userTypeId: userTypeId,
        instituteId: instituteId
      }
      const response = await this.restService.post(UserService.NodeUpdateUsername, body);
      await this.readUser(this.user.uid);
      this.displayService.toast(response.message);
      return response;
    } catch (e) {
      this.displayService.toast(e)
    }

  }

  public publishUser() {
    this.userObservable.next(this.user);
  }

  public async checkMobileNo(PhoneNo: any) {
    const response = await this.restService.get(String.Format(UserService.nodeCheckMobileNo, PhoneNo));
    return response;
  }

  public async checkMobileNoInAddClient(PhoneNo: any) {
    const response = await this.restService.get(String.Format(UserService.nodeCheckMobileNoInAddClient, PhoneNo));
    return response;
  }

  public async checkMobileNoForBranch(PhoneNo: any) {
    const response = await this.restService.get(String.Format(UserService.nodeCheckMobileNoForBranch, PhoneNo));
    return response;
  }

  public async addUser(user: any){
    console.log(user);
    const res = await this.restService.post(UserService.NodeAddUser, user)
    return res;
  }

  public async updateUserCustomerBySpecIdAndBranch(client: any, activeBit: number){
    const body = {
      userTypeId: 3,
      userTypeSpeId: client.clientId,
      roleId: 3,
      active: activeBit,
      branchId: this.user.branchId
    }
    const res = await this.restService.post(UserService.NodeUpdateUserForActivate, body)
    return res;
  }

  public async deleteUser(user: any) {
    console.log(user);
    const response = await this.restService.post(UserService.NodeDeleteUser, user);
    return response;
  }

  public async getCustomerUserByUserTypeSpeId(userTypeSpeId){
    const body = {
      userTypeId: 3,
      userTypeSpeId: userTypeSpeId,
      roleId: 3,
      branchId: this.user.branchId
    }
    const res = await this.restService.post(UserService.nodeCustomerUserByUserTypeSpeId, body);
    return res;
  }
}
