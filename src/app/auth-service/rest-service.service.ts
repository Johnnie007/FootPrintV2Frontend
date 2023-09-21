import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient:HttpClient) { }

  getUser(){
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.httpClient.get('http://localhost:8080/api/user', {headers})
    .pipe(
      map(
        userData => {
          console.log(userData);
        }
      )
    )
  }
}
