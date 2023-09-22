import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthencationService } from './authencation.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService{

  constructor(private authService: AuthencationService,private router: Router) { }

  routeGuard(){
    if(this.authService.authenticate.value === true){
      this.router.navigate(['/userprofile']);
      return false;
    }
    else{
      return true;
    }
  }
  routeGuardUserProfile(){
    if(this.authService.authenticate.value === false){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }
}
