import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_service/token-storage.service';
import { JwthelperService } from '../_service/jwthelper.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: TokenStorageService,
    private jwtHelperService: JwthelperService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const user = this.accountService.getUser();
    let url = next.data.url as String;
    console.log(url);
    //------------if
    if (user) {
      if (url) {
        return this.jwtHelperService.getCheckRole({ url: url }).pipe(
          map(data => {
            if (data)
              return true;
            else {
              this.router.navigate(['/403']);
              return false;
            }

          }),
          catchError((err) => {
            this.router.navigate(['/403']);
            return of(false);
          })
        );
      }
      else {
        return true;
      }
    }
    //--end ifffff

    this.router.navigate(['/login']);
    return false;

  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
  //   const user = this.accountService.getUser();
  //   let roles = next.data.roles as Array<string>;
  //   var userRoles: string[];
  //   var isMatch = false;
  //   //------------if
  //   if (user) {
  //     if (roles) {
  //       return this.jwtHelperService.getRole().pipe(
  //         map(data => {
  //           userRoles = JSON.parse(JSON.stringify(data));
  //           roles.forEach(element => {
  //             if (userRoles.indexOf(element) > -1) {
  //               console.log('match');
  //               isMatch = true;
  //             }
  //           });
  //           if(!isMatch)
  //           {
  //             console.log('not match');
  //             this.router.navigate(['/403']);
  //             return false;
  //           }
  //           else{
  //             return true;
  //           }           
  //         }),
  //         // catchError(err=> {
  //         //    return false;
  //         //   })
  //         );
  //     }
  //     else
  //     {
  //       return true;
  //     }
  //   }
  //   //--end ifffff

  //   this.router.navigate(['/login']);
  //   return false;

  // }


}
