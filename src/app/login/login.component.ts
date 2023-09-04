import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  invalidLogin = false;

  constructor(private router:Router){}

  validateLogin(){
    console.log(this.email);
    console.log(this.password);
  }
}
