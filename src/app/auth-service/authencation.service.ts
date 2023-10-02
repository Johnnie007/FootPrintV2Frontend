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
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    //clears headers Saved in Browser
    window.location.reload();
    this.authenticate.next(false);
  }

  authenticateUser(username, password){
    let user = {
      email: username,
      password: password
    }

    return this.httpClient.post<void>('http://localhost:8080/api/signin',user, {responseType: 'text' as 'json'})
    .pipe(
     map(
       userData => {
        this.logInUser()
         sessionStorage.setItem('username', username)
         sessionStorage.setItem('password', password)
         console.log(userData)
         return userData;
       }
     )
    )
  }

  createUser(first, last, username, password){
    let user = {
      firstName: first,
      lastName: last,
      email: username,
      password: password
    }

    return this.httpClient.post<void>('http://localhost:8080/api/signup',user, {responseType: 'text' as 'json'})
    .pipe(
     map(
       userData => {
        this.logInUser()
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
         return userData;
       }
     )
    )
  }
}
