import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../auth-service/authencation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  submitted= false;
  isValid: boolean;
  warningMessage: string;

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){
    this.submitted = true;
    if(this.email != '' && this.password != ''){
        this.authenticationService.authenticateUser(this.email, this.password).subscribe(
          data =>{
           
            if(data.status == 203){
              this.isValid = false;
              this.warningMessage = 'Invalid username and/or password'
              this.submitted = false;
            }else{
              this.isValid = null;
              this.router.navigate(['/userprofile']);
            }
            this.submitted = false;
          },
          error =>{
            if(error.status == 0){
              alert("Server is down. Try again later")
            }
            if(error.status == 401){
              this.isValid = false;
              this.warningMessage = 'Invalid username and/or password'
            }
            this.submitted = false;
          });
    }else{
      this.isValid = false;
      this.warningMessage = "Please enter an username or Password";
      this.submitted = false;
    } 
  }

}
