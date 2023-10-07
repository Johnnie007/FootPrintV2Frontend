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
  user: User = null;
  userImage = null;
  vehicles = null;
  homes = null;

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

  loading = true;
  holdNewImage = null;
  defaultImage =  "../../assets/images/demoProfile.png";
  
  ngOnInit(): void {
    this.setUserData()
    .then(()=>{
      this.setUserImage()
    })
    .then(()=>{
      this.setVehicleData().then(()=>{
       // this.displayVehicle();
      })
    })
    .then(()=>{
      this.setHomeData().then(()=>{
       // this.displayHome();
      })
    });
  }

  setUserData():Promise<any>{
    return new Promise((resolve)=>{
       this.userSubscription = this.restService.getUser()
      .subscribe(
        data =>{
          this.user = data;
          
          if(!this.user.footprint){
            //default user Footprint
            this.user.footprint = 0.41;
          }
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
          console.log(data)
          this.userImage = data;
          if(this.userImage == null){
            this.userImage = this.defaultImage;
          }
          this.isLoading()
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
          if(this.vehicles.length > 0){
            this.vehicleType = this.vehicles[this.vehicleIndex].type
            this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
          }
          this.isLoading()
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
          console.log(data)
          this.isLoading()
          resolve(true);
        }
      )
    });
  }

  editUser(){
    this.userEditMode = true;
  }
  
  editVehicle(){
    console.log(this.vehicleType)
    console.log(this.vehicleMpg)
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

    this.loading = true;

   const vehicleBody = {
      type: this.vehicleType,
      mpg: this.vehicleMpg,
      userId: this.user.id,
      vehicleGHG: this.calculateVehicleGHG()
    };
    this.restService.addVehicle(this.user.id, vehicleBody)
    .subscribe( (res)=>{
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

  calculateVehicleGHG(){
    let gasUsed =  12000/ this.vehicleMpg;
    let ghgPerYear =(8.89 * (10**-3) * gasUsed);
    this.user.footprint = ghgPerYear + this.user.footprint;

    //assigns number with two decimal points 
    ghgPerYear = Math.round((ghgPerYear *100) /100);
    this.user.footprint = Math.round((this.user.footprint *100) /100);
    
    this.vehicles = null;
    return ghgPerYear;
  }

  calculateHomeGHG(){
    let totalWatts =  this.homeSize * .75;
    let ghgPerYear = (totalWatts * .855) / 2000;
    this.user.footprint = ghgPerYear + this.user.footprint;
   
    //assigns number with two decimal points 
    ghgPerYear = Math.round((ghgPerYear *100) /100);
    this.user.footprint = Math.round((this.user.footprint *100) /100);
    this.homes = null;
    return ghgPerYear;
  }

  addHome(){

    this.loading = true;
    const homeBody = {
      homeType: this.homeType,
      homeSize: this.homeSize,
      userId: this.user.id,
      homeGHG: this.calculateHomeGHG()
    };
   
    this.restService.addHome(this.user.id, homeBody).subscribe( (res)=>{
       //resets values
    this.homeType = '';
    this.homeSize = 0;
    
    this.setHomeData().then(()=>{
      this.homeEditMode = false;
    })
    }
  );
  }

  setNewUserImage(e){
    this.holdNewImage = e.target.files[0];
    console.log(this.holdNewImage)
    console.log(e.target.files.item(0))
  }

  updateUserImage(){
    if(this.holdNewImage != null){
      
      const file: File = this.holdNewImage;
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData)

      if(this.userImage?.userId){
        this.restService.deleteUserImage(this.userImage.userId);
      }

      this.restService.addUserImage(this.user.id, formData)
      .subscribe(
        (res) =>{
          console.log(res);
          this.setUserImage()
          this.holdNewImage = null;
        }
      )
    }
  }

  // displayVehicle(){
  //   if(this.currentVehicle === undefined && this.vehicles.length != 0){
  //     this.currentVehicle = this.vehicles[0];
  //   }else if(this.currentVehicle != undefined && this.vehicles.length != 0){
  //     this.currentVehicle = this.vehicles[this.vehicleIndex];
  //   } 
  // }
  // displayHome(){
  //   if(this.currentHome === undefined && this.homes.length != 0){
  //     this.currentVehicle = this.homes[0];
  //   }else if(this.currentHome != undefined && this.homes.length != 0){
  //     this.currentHome = this.homes[this.homeIndex];
  //   } 
  // }

  increaseVehicleIndex(){
    if(this.vehicleIndex === this.vehicles.length - 1){
      this.vehicleEditMode = true
    }else if(this.vehicleIndex <= this.vehicles.length -1){
        this.vehicleIndex = this.vehicleIndex + 1;
        this.vehicleType = this.vehicles[this.vehicleIndex].type
        this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
    }
  }

  decreaseVehicleIndex(){
    if(this.vehicleIndex === this.vehicles.length - 1){
      this.vehicleIndex = this.vehicleIndex -1
      this.vehicleEditMode = false;
    }else if(this.vehicleIndex <= this.vehicles.length - 1 && this.vehicleIndex != 0){
        this.vehicleIndex = this.vehicleIndex - 1;
        this.vehicleType = this.vehicles[this.vehicleIndex].vehicleType
        this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
    }
  }
  increaseHomeIndex(){
    if(this.homeIndex === this.homes.length - 1){
      this.homeEditMode = true
    }else if(this.homeIndex <= this.homes.length -1){
        this.homeIndex = this.homeIndex + 1;
        
    }
  }

  decreaseHomeIndex(){
    if(this.homeIndex === this.homes.length - 1){
      this.homeIndex = this.homeIndex -1
      this.homeEditMode = false;
    }else if(this.homeIndex <= this.homes.length - 1 && this.homeIndex != 0){
        this.homeIndex = this.homeIndex - 1;
    }
  }

  isLoading(){
    if(this.homes != null && this.vehicles != null && this.user != null){
      this.loading = false;
    }
  }

}