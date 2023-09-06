import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email = '';
  password = '';
  firstName = '';
  lastName = '';

  constructor(private router:Router){}

  validateLogin(){
  }
}
