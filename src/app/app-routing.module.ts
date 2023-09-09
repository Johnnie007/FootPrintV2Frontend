import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'signin', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: 'demo', component: DemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
