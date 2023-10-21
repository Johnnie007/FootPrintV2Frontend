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
  isValid: boolean;

  constructor(private router:Router, private authenticationService: AuthencationService){}

  validateLogin(){
      this.authenticationService.authenticateUser(this.email, this.password).subscribe(
        data =>{
          console.log(data)
          if(data.status == 203){
            this.isValid = false
          }else{
            this.isValid = null;
            //this.router.navigate(['/userprofile']);
          }
        },
        error =>{
          console.log(error)
          if(error.status == 401){
            this.isValid = false
          }
        }
      )
  }

}
