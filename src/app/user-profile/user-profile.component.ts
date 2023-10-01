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
  vehicles;
  homes;

  vehicleEditMode = false;
  homeEditMode = false;
  userEditMode = false;

  //vehicle stuff
  vehicleType;
  vehicleMpg;

  //home stuff
  homeType;
  homeSize;

  //display stuff
  vehicleIndex = 0;
  currentVehicle;
  
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
          this.vehicles = data;
          console.log(this.vehicles);
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
          this.homes = data;
          console.log(this.homes)
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
  
  addVehicle(){
    console.log(this.vehicleType);
    console.log(this.vehicleMpg);
    
   const vehicleBody = {
      type: this.vehicleType,
      mpg: this.vehicleMpg,
      userId: this.user.id
    };
    this.restService.addVehicle(this.user.id, vehicleBody).subscribe( (res)=>{
      console.log(res)
      //resets values
    this.vehicleType = '';
    this.vehicleMpg = 0;
    
    this.setVehicleData().then(()=>{
      this.vehicleEditMode = false;
    });
    
    }
  );
  }

  addHome(){
    console.log(this.homeType);
    console.log(this.homeSize);
    const homeBody = {
      homeType: this.homeType,
      homeSize: this.homeSize,
      userId: this.user.id
    };
   
    this.restService.addHome(this.user.id, homeBody).subscribe( (res)=>{
      console.log(res)
       //resets values
    this.homeType = '';
    this.homeSize = 0;
    
    this.setHomeData().then(()=>{
      this.homeEditMode = false;
    })
    }
  );
  }

  displayVehicle(){
    if(this.currentVehicle === undefined && this.vehicles.length != 0){
      this.currentVehicle = this.vehicles[0];
    }else if(this.currentVehicle != undefined && this.vehicles.length != 0){
      this.currentVehicle = this.vehicles[this.vehicleIndex];
    } 
  }

}
