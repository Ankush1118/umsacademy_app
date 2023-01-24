import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canLoad() {
    if (this.userService.user && this.userService.user.userId) {
      return true;
    }
    this.router.navigateByUrl('/starter', {replaceUrl: true});
    return false;
  }
}
