import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthencationService {

  constructor(private httpClient: HttpClient) { }
  authenticate = new BehaviorSubject<boolean>(false);

  logInUser(){
    this.authenticate.next(true);
  }

  logOutUser(){
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
         sessionStorage.setItem('username', username);
         return userData;
       }
     )
    )
  }
}
