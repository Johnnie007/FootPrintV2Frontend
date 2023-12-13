import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  authenticate = new BehaviorSubject<boolean>(false);

  logInUser(){
    this.authenticate.next(true);
  }

  logOutUser(){
    sessionStorage.clear();
    //clears headers Saved in Browser
    window.location.reload();
    this.authenticate.next(false);
  }

  authenticateUser(username, password){
    let user = {
      email: username,
      password: password
    }

    return this.httpClient.post<void>('https://footprint-zo7p.onrender.com/api/signin',user, {responseType: 'text' as 'json', observe: 'response'})
    .pipe(
     map(
       userData => {
        if(userData.status == 203){
          console.log("User not found")
          return userData
        }
        else{
          sessionStorage.setItem('username', username)
          sessionStorage.setItem('password', password)
          this.logInUser()
          return userData;
        }
       })
    )}

  createUser(first, last, username, password, month){
    let user = {
      month_joined: month,
      firstName: first,
      lastName: last,
      email: username,
      password: password
    }

    return this.httpClient.post<void>('https://footprint-zo7p.onrender.com/api/signup',user, {responseType: 'text' as 'json', observe: 'response'})
    .pipe(
     map(
       userData => {
        if(userData.status == 401){
          console.log("User not found")
          return userData
        }
        if(userData.status == 226){
          console.log("Username taken")
          return userData
        }
        
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
        this.logInUser()
        return userData;
       }
     )
    )
  }
}
