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
  warningMessage: string

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){

    if(this.email != '' && this.password != '' && this.firstName != '' && this.lastName != ''){

    this.authenticationService.createUser(this.firstName, this.lastName, this.email, this.password).subscribe(
      data =>{
        if(data.status == 226){
          this.isValid = false
          this.warningMessage = "Email has been taken"
        }else{
          this.isValid = null;
          this.router.navigate(['/userprofile']);
        }
      },
      error =>{
        console.log(error)
      });
    }else{
      this.isValid = false;
      this.warningMessage = "All fields are required"
    }  
  }

}
