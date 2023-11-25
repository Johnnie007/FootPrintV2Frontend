import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { concat, concatMap, from, map } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  username;
  password;
  userCredentials(){
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
  }


  constructor(private httpClient:HttpClient) {
    this.username = sessionStorage.getItem("username");
    this.password = sessionStorage.getItem("password");
   }

  getUser(){
   this.userCredentials();
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username+ ':' + this.password)});
    console.log(this.username);
    console.log(this.password);
    return this.httpClient.get<User>('http://localhost:8080/api/user', {headers})
    .pipe(
      map(
        userData => {
          console.log(userData)
          return userData;
        }
      )
    )
  }

  updateUser(user){
    user.email = this.username
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/update/${user.id}`,user, {headers})
    
  };

  getUserImage(id){
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)}),
      responseType: 'arraybuffer'
    }
    return this.httpClient.get<ArrayBuffer>(`http://localhost:8080/api/${id}/image`, requestOptions)
    .pipe(
      map(
        userImage => {
          if(userImage.byteLength > 10){
            const getImageArray = new Uint8Array(userImage)
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

  getRecommendations(){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get(`http://localhost:8080/api/recommendations`, {headers})
    .pipe(
      map(
        recommendationData =>{
          return recommendationData;
        }));
  }

  getOffsetters(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get(`http://localhost:8080/api/${id}/offsetters`, {headers})
    .pipe(
      map(
        offsettersData =>{
          return offsettersData;
        }));
  }

  getStorage(id){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.get(`http://localhost:8080/api/${id}/storage`, {headers})
    .pipe(
      map(
        data =>{
          return data;
        }));
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

  addOffsetters(id, offsetters){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/offsetters`,offsetters, {headers});
  }
  
  addStorageData(id, storage){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/storage`,storage, {headers, observe: 'response'});
   }

  updateStorageData(id, data){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)});
    return this.httpClient.post(`http://localhost:8080/api/${id}/storage`,data, {headers});
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

  deleteOffsetters(id, offsetters){
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)}),
      body: offsetters
    }
    return this.httpClient.delete(`http://localhost:8080/api/${id}/offsetters`, requestOptions);
  }
 
  deleteStorage(id){
    
    const requestOptions: Object = {
      headers: new HttpHeaders({Authorization: 'Basic ' + btoa(this.username + ':' + this.password)})
    }
    
    return this.httpClient.delete(`http://localhost:8080/api/storage/${id}`, requestOptions);
  }
}
