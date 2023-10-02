import { Component, OnInit } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';
import { User } from '../models/User.model';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  
  constructor(private restService: RestService){
  }
  
  //subscription Stuff
  userSubscription: Subscription

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
  homeIndex = 0;
  currentHome;
  
  ngOnInit(): void {
    this.setUserData()
    .then(()=>{
      this.setUserImage()
    })
    .then(()=>{
      this.setVehicleData().then(()=>{
        this.displayVehicle();
      })
    })
    .then(()=>{
      this.setHomeData().then(()=>{
        this.displayHome();
      })
    });
  }

  setUserData():Promise<any>{
    return new Promise((resolve)=>{
       this.userSubscription = this.restService.getUser()
      .subscribe(
        data =>{
          this.user = data;
          this.user.footprint = 0
          console.log(data);
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

   const vehicleBody = {
      type: this.vehicleType,
      mpg: this.vehicleMpg,
      userId: this.user.id,
      vehicleGHG: this.calculateVehicleGHG()
    };
    this.restService.addVehicle(this.user.id, vehicleBody)
    .pipe(map(
      res =>{
              //resets values
            this.vehicleType = '';
            this.vehicleMpg = 0;
            
            this.setVehicleData().then(()=>{
            this.vehicleEditMode = false;
            });
            
            }
    ))
  //   .subscribe( (res)=>{
  //     console.log(res)
  //     //resets values
  //   this.vehicleType = '';
  //   this.vehicleMpg = 0;
    
  //   this.setVehicleData().then(()=>{
  //     this.vehicleEditMode = false;
  //   });
    
  //   }
  // );
  }

  calculateVehicleGHG(){
    let gasUsed =  12000/ this.vehicleMpg;
    let ghgPerYear = 8.89 * (10**-3) * gasUsed;
    return ghgPerYear;
  }

  addHome(){
    const homeBody = {
      homeType: this.homeType,
      homeSize: this.homeSize,
      userId: this.user.id
    };
   
    this.restService.addHome(this.user.id, homeBody).pipe( map(
      res=>{
            console.log(res)
             //resets values
          this.homeType = '';
          this.homeSize = 0;
          
          this.setHomeData().then(()=>{
            this.homeEditMode = false;
          })
          }
    ))
    
    
    
  //   .subscribe( (res)=>{
  //     console.log(res)
  //      //resets values
  //   this.homeType = '';
  //   this.homeSize = 0;
    
  //   this.setHomeData().then(()=>{
  //     this.homeEditMode = false;
  //   })
  //   }
  // );
  }

  displayVehicle(){
    if(this.currentVehicle === undefined && this.vehicles.length != 0){
      this.currentVehicle = this.vehicles[0];
    }else if(this.currentVehicle != undefined && this.vehicles.length != 0){
      this.currentVehicle = this.vehicles[this.vehicleIndex];
    } 
  }
  displayHome(){
    if(this.currentHome === undefined && this.homes.length != 0){
      this.currentVehicle = this.homes[0];
    }else if(this.currentHome != undefined && this.homes.length != 0){
      this.currentHome = this.homes[this.homeIndex];
    } 
  }

}
