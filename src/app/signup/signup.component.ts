import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthencationService } from '../auth-service/authencation.service';
import { RestService } from '../auth-service/rest-service.service';
import {months} from '../../assets/variables/variables'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  isValid: boolean;
  currentMonth = null;
  warningMessage: string;

  subscription: Subscription

  constructor(private router:Router, private authenticationService: AuthencationService, private restService: RestService){}
 
  ngOnInit(): void {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    this.currentMonth = `${months[month]} ${year}`;
  }


  validateLogin(){

    if(this.email != '' && this.password != '' && this.firstName != '' && this.lastName != ''){

    this.subscription = this.authenticationService.createUser(this.firstName, this.lastName, this.email, this.password, this.currentMonth).subscribe(
      data =>{
        if(data.status == 226){
          this.isValid = false
          this.warningMessage = "Email has been taken"
        }else{
          setTimeout(() => {
            this.isValid = null;
            this.router.navigate(['/userprofile'], {state:{newUser: "true"}});
          }, 500);
         
        }
      },
      error =>{
        console.log(error)
      });
    }else{
      this.isValid = false;
      this.email = '';
      this.password = ''
      this.warningMessage = "All fields are required"
    }  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
