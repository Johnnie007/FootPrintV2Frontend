import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../auth-service/authencation.service';
import { RestService } from '../auth-service/rest-service.service';
import {months} from '../../assets/variables/variables'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  isValid: boolean;
  currentMonth = null;
  submitted= false;
  warningMessage: string;
  constructor(private router:Router, private authenticationService: AuthencationService, private restService: RestService){}
 
  ngOnInit(): void {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    this.currentMonth = `${months[month]} ${year}`;
  }


  validateLogin(){
    this.submitted = true;
  if(this.email != '' && this.password != '' && this.firstName != '' && this.lastName != ''){
  this.authenticationService.createUser(this.firstName, this.lastName, this.email, this.password, this.currentMonth).subscribe(
      data =>{
        if(data.status == 226){
          this.isValid = false
          this.warningMessage = "Email has been taken";
          this.submitted = false;
        }else{
            this.isValid = null;
            this.router.navigate(['/userprofile'], {state:{newUser: "true"}});
        }
      },
      error =>{
        if(error.status == 0){
          alert("Server is down. Try again later")
        }
        this.submitted = false;
      }
      );
    }else{
      this.isValid = false;
      this.email = '';
      this.password = '';
      this.warningMessage = "All fields are required";
      this.submitted = false;
    }  
  }
}
