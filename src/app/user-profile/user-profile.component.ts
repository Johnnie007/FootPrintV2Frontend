import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  constructor(private restService: RestService){
  }
  offsetters = ['Succulent', 'Succulent', 'Succulent', 'Succulent','Succulent'];
  user: User;
  userImage;
  vehicle;
  home;

  vehicleEditMode = false;
  homeEditMode = false;
  userEditMode = false;
  
  ngOnInit(): void {
    this.setUserData()
    .then(()=>{
      this.setUserImage()
    })
    .then(()=>{
      this.setVehicleData()
    })
    .then(()=>{
      this.setHomeData()
    })
  }

  setUserData():Promise<any>{
    return new Promise((resolve)=>{
      this.restService.getUser()
      .subscribe(
        data =>{
          this.user = data;
          this.user.footprint = 0
          console.log(this.user);
          resolve(true)
        }
    )
    })
  }

  setUserImage(): Promise<any>{
    return new Promise((resolve)=>{
      this.restService.getUserImage(this.user.id)
      .subscribe(
        data =>{
          this.userImage = data;
          console.log(this.userImage)
          resolve(true)
        }
      )
    })
  }

  setVehicleData():Promise<any>{
    return new Promise((resolve)=>{
      this.restService.getVehicle(this.user.id)
      .subscribe(
        data =>{
          this.vehicle = data;
          console.log(this.vehicle);
          resolve(true);
        }
      )
      })
  }

  setHomeData():Promise<any>{
    return new  Promise((resolve)=>{
      this.restService.getHome(this.user.id)
      .subscribe(
        data => {
          this.home = data;
          console.log(this.home)
          resolve(true);
        }
      )
    });
  }

  editUser(){
    this.userEditMode = true;
  }
  
  editVehicle(){
    this.vehicleEditMode = true;
  }
  
  editHome(){
    this.homeEditMode = true;
  }

  cancelEditUser(){
    this.userEditMode = false;
  }
  cancelEditVehicle(){
    this.vehicleEditMode = false;
  }
  cancelEditHome(){
    this.homeEditMode = false;
  }

}
