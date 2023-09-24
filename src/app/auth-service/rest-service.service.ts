import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  username = sessionStorage.getItem("username");
  password = sessionStorage.getItem("password");

  constructor(private httpClient:HttpClient) { }

  getUser(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get<User>('http://localhost:8080/api/user', {headers})
    .pipe(
      map(
        userData => {
          return userData;
        }
      )
    )
  }
  getUserImage(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get<User>(`http://localhost:8080/api/${id}/image`, {headers})
    .pipe(
      map(
        userImage => {
          return  userImage;
        }
      )
    )
  }

  getVehicle(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get(`http://localhost:8080/api/${id}/vehicle`, {headers})
    .pipe(
      map(
        vehicleData => {
          return vehicleData;
        }
      )
    )
  }

  getHome(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get(`http://localhost:8080/api/${id}/home`, {headers})
    .pipe(
      map(
        homeData => {
          return homeData;
        }
      )
    )
  }
}
