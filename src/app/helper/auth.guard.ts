import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireauthService } from '../services/api/fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private fireauthService: FireauthService
  ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log("Router Snapshot:"+state);
  //     const currentUser = this.authenticationService.currentUserValue;
  //     if (currentUser) {
  //         // authorised so return true
  //         return true;
  //     }

  //     // not logged in so redirect to login page with the return url
  //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
  //     return false;
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.fireauthService.isLoggedIn !== true) {
      this.router.navigate(['login'])
    }
    return true;
  }
  
}
