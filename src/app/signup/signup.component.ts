import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../auth-service/authencation.service';

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
  isValid: boolean;

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){

    
    this.authenticationService.createUser(this.firstName, this.lastName, this.email, this.password).subscribe(
      data =>{
        console.log(data)
        if(data.status == 226){
          this.isValid = false
        }else{
          this.isValid = null;
          this.router.navigate(['/userprofile']);
        }
      },
      error =>{
        console.log(error)
      }
    )
  }
}
