import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../service/authencation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  invalidLogin = false;

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){
    console.log(this.email)
    console.log(this.password)
      this.authenticationService.authenticateUser(this.email, this.password).subscribe(
        data =>{
          console.log(data)
        }
      )
  }
}
