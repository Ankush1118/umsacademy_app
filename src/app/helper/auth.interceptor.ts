import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FireauthService } from '../services/api/fireauth.service';
import { InstitutesService } from '../services/institutes.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
  //  console.log(this.userService.getUser().branchDb);
      const user = this.userService.getUser();
   
        if(user){
          console.log(user.branchDb)
          if(user.branchDb){
            request = request.clone({
              setHeaders: { 
                  Authorization: `Basic `+window.btoa("admin" + ':' + "1234"),
                  BRANCHDB: this.userService.getUser().branchDb,
              }
            });
          }else{
            
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic `+window.btoa("admin" + ':' + "1234")
                }
            });
          }
        }else{
          request = request.clone({
            setHeaders: { 
                Authorization: `Basic `+window.btoa("admin" + ':' + "1234")
            }
          });
        }
          // request = request.clone({
          //     setHeaders: {
          //       Authorization: `Basic `+window.btoa("admin" + ':' + "1234"),
          //     }
          // });
  
  //  }

    return next.handle(request);
  }
}
