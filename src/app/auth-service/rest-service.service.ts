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
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)}),
      responseType: 'arraybuffer'
    }
    console.log("0")
    return this.httpClient.get<ArrayBuffer>(`http://localhost:8080/api/${id}/image`, requestOptions)
    .pipe(
      map(
        userImage => {
          console.log(userImage.byteLength)
          if(userImage.byteLength > 10){
            const getImageArray = new Uint16Array(userImage)
            const convertToBlob= new Blob([getImageArray], {type: "image/jpeg"})
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(convertToBlob);
            return  imageUrl;
          }{
            return null;
          }
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

  addVehicle(id, vehicle){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/add/vehicle`,vehicle,{headers});
  }
  
  addHome(id, home){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/home`,home,{headers});
  }

  addUserImage(id, userImage){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/upload`,userImage,{headers});
  }
  
  deleteUserImage(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.delete(`http://localhost:8080/api/${id}/upload`,{headers});
  }

  deleteVehicle(id, vehicle){
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)}),
      body:vehicle
    }
    return this.httpClient.delete(`http://localhost:8080/api/${id}/delete/vehicle`,requestOptions);
  
  }
  
  deleteHome(id, home){
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)}),
      body:home
    }
    return this.httpClient.delete(`http://localhost:8080/api/${id}/delete/home`,requestOptions);
  }
}
