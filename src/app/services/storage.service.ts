import {Injectable} from '@angular/core';
import {User} from "../model/user";
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static readonly NodeUser = 'user';
  constructor(private storage: Storage) {

  }

  saveUser(user: User): Promise<any> {
    return this.storage.set(StorageService.NodeUser, user);
  }

  deleteUser() {
    return this.storage.set(StorageService.NodeUser, null);
  }

  getUser() {
    return this.storage.get(StorageService.NodeUser);
  }
}
