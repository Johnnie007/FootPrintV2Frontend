import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../service/authencation.service';

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

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){
    this.authenticationService.createUser(this.firstName, this.lastName, this.email, this.password).subscribe(
      data =>{
         this.router.navigate(['/userprofile'])
        console.log(data)
      },
      error =>{
        console.log(error)
      }
    )
  }
}
