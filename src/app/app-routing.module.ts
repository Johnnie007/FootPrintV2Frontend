import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { ApiComponent } from './api/api.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouteGuardService } from './auth-service/route-guard.service';

const routes: Routes = [
  {path: '', component:HomeComponent, canActivate: [()=> inject(RouteGuardService).routeGuard()]},
  {path:'signin', component:LoginComponent, canActivate: [()=> inject(RouteGuardService).routeGuard()]},
  {path:'signup', component:SignupComponent, canActivate: [()=> inject(RouteGuardService).routeGuard()]},
  {path: 'demo', component: DemoComponent, canActivate: [()=> inject(RouteGuardService).routeGuard()]},
  {path: 'api', component: ApiComponent, canActivate: [()=> inject(RouteGuardService).routeGuard()]},
  {path: 'userprofile', component: UserProfileComponent, canActivate: [()=> inject(RouteGuardService).routeGuardUserProfile()]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
