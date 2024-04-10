import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {

    const currentUser = this.authenticationService.currentUserValue;
    const newLocal: string = '_routerState';
    const redirectUrl: any = route.params['url'];

      if(currentUser){
        return true
      }

    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/login'], {
        queryParams: {
          redirectUrl
        }
      }
      )
    );
    return false;
  }
}
