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

  offsetters;
  
  recommendations = [
    {
      id: 1,
      type: "plant",
      product: "Succulent",
      productLocation: "https://succulentsbox.com/",
      CCS: -30,
      userId: 5
  },
    {
      id: 2,
      type: "home",
      product: "Solar",
      productLocation: "https://www.sunrun.com/",
      CCS: -30,
      userId: 5
  },
    {
      id: 3,
      type: "plant",
      product: "Succulent",
      productLocation: "https://succulentsbox.com/",
      CCS: -30,
      userId: 5
  },
]
  user: User = null;
  userImage = null;
  vehicles = null;
  homes = null;

  vehicleEditMode = false;
  homeEditMode = false;
  userEditMode = false;

  //vehicle stuff
  vehicleType = null;
  vehicleMpg = null

  //home stuff
  homeType = null;
  homeSize = null;

  //display stuff
  vehicleIndex = 0;
  homeIndex = 0;

  loading = true;
  holdNewImage = null;
  previewImage = null;
  defaultImage =  "../../assets/images/demoProfile.png";
  
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
    .then(()=>{
      this.setOffsettersData()
    })
    .then(()=>{
      this.setRecommendationData()
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
        });
    });
  }

  setUserImage(): Promise<any>{
    return new Promise((resolve)=>{
      this.restService.getUserImage(this.user.id)
      .subscribe(
        data =>{
          this.userImage = data;
          if(this.userImage == null){
            this.userImage = this.defaultImage;
          }
          this.isLoading()
          this.previewImage = this.userImage;
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
          this.vehicleIndex = 0;
          this.vehicleType = this.vehicles[this.vehicleIndex]?.type;
          this.vehicleMpg = this.vehicles[this.vehicleIndex]?.mpg;
          
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
          this.homeIndex = 0;
          this.homeSize = this.homes[this.homeIndex]?.homeSize;
          this.homeType = this.homes[this.homeIndex]?.homeType;
          this.isLoading()
          resolve(true);
        }
      )
    });
  }

  setRecommendationData():Promise<any>{
    return new  Promise((resolve)=>{
      this.restService.getRecommendations()
      .subscribe(
        data => {
          console.log(data);
        
          resolve(true);
        }
      )
    });
  }

  setOffsettersData():Promise<any>{
    return new  Promise((resolve)=>{
      this.restService.getOffsetters(this.user.id)
      .subscribe(
        data => {
          console.log(data);
          this.offsetters = data
          resolve(true);
        }
      )
    });
  }

  editUser(){
    this.userEditMode = true;
  }
  
  editVehicle(){
    if(this.vehicles.length > 0){
      this.vehicleType = this.vehicles[this.vehicleIndex].type;
      this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
    }
    this.vehicleEditMode = true;

  }
  
  editHome(){
    if(this.homes.length > 0){
      this.homeType = this.homes[this.homeIndex].homeType;
      this.homeSize = this.homes[this.homeIndex].homeSize;
    }
    this.homeEditMode = true;
  }

  cancelEditUser(){
    this.previewImage = this.userImage
    this.holdNewImage = null;
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
      this.vehicles = null;
      
      this.setVehicleData().then(()=>{
        this.vehicleEditMode = false;
    });
    
    });
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
      });
    });
  }

  addOffsetter(id){
    console.log(id)
    let offsetter = {
     type: this.recommendations[id].type,
     product: this.recommendations[id].product,
     CCS: this.recommendations[id].CCS,
     userId: this.user.id
    };
    this.restService.addOffsetters(this.user.id, offsetter).subscribe((res)=>{
      
      this.setOffsettersData()
    });
  }

  deleteVehicle(){
    if(this.vehicleType != null || this.vehicleType != undefined){
     this.restService.deleteVehicle(this.user.id, this.vehicles[this.vehicleIndex]).subscribe(
      ()=>{
        this.vehicleEditMode = false;
        this.setVehicleData();
      }
     )
    }
  }

  deleteHome(){
    if(this.homeType != null || this.homeType != undefined){
     this.restService.deleteHome(this.user.id, this.homes[this.homeIndex]).subscribe(
      ()=>{
        this.homeEditMode = false;
        this.setHomeData();
      });
    }
  }

  deleteOffsetter(id){
    let offsetter = this.offsetters[id]
    this.restService.deleteOffsetters(this.user.id, offsetter).subscribe(
      ()=>{
        this.setOffsettersData();
      }
    );
  }

  calculateVehicleGHG(){
    let gasUsed =  12000/ this.vehicleMpg;
    let ghgPerYear =(8.89 * (10**-3) * gasUsed);
    this.user.footprint = ghgPerYear + this.user.footprint;

    //assigns number with two decimal points 
    ghgPerYear = Math.round(ghgPerYear *100) /100;
    this.user.footprint = Math.round((this.user.footprint *100) /100);
    return ghgPerYear;
  }

  calculateHomeGHG(){
    let totalWatts =  this.homeSize * .75;
    let ghgPerYear = (totalWatts * .855) / 2000;
    this.user.footprint = ghgPerYear + this.user.footprint;
   
    //assigns number with two decimal points 
    ghgPerYear = Math.round(ghgPerYear *100) /100;
    this.user.footprint = Math.round((this.user.footprint *100) /100);
    this.homes = null;
    return ghgPerYear;
  }

  setNewUserImage(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    this.holdNewImage = e.target.files[0]
    reader.readAsDataURL(file);

    reader.onload = () =>{
      this.previewImage = reader.result
    }
    
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
          this.setUserImage().then(()=>{
            this.holdNewImage = null;
            this.userEditMode = false;
          })
         
        }
      )
    }
  }

  increaseVehicleIndex(){
    if(this.vehicleEditMode == false){
      if(this.vehicleIndex === this.vehicles.length - 1){
        this.vehicleIndex = 0;
        this.vehicleType = this.vehicles[this.vehicleIndex].type;
        this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
      }else if(this.vehicleIndex < this.vehicles.length - 1){
          this.vehicleIndex = this.vehicleIndex + 1;
          this.vehicleType = this.vehicles[this.vehicleIndex].type;
          this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
      } 
    }
      else{
        if(this.vehicleIndex === this.vehicles.length){
          this.vehicleIndex = 0;
          this.vehicleType = this.vehicles[this.vehicleIndex].type;
            this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
        }else if(this.vehicleIndex < this.vehicles.length -1){
            this.vehicleIndex = this.vehicleIndex + 1;
            this.vehicleType = this.vehicles[this.vehicleIndex].type;
            this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
        }
        else if(this.vehicleIndex === this.vehicles.length -1){
            this.vehicleIndex = this.vehicleIndex + 1;
            this.vehicleType = '';
            this.vehicleMpg = '';
        }
      }
  }

  decreaseVehicleIndex(){
    if(this.vehicleEditMode == false){
      if(this.vehicleIndex === 0){
        this.vehicleIndex = this.vehicles.length - 1;
        this.vehicleType = this.vehicles[this.vehicleIndex].type;
        this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
      }else if(this.vehicleIndex > 0){
          this.vehicleIndex = this.vehicleIndex - 1;
          this.vehicleType = this.vehicles[this.vehicleIndex].type
          this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
      }
    }else{
      if(this.vehicleIndex === 0){
        this.vehicleIndex = this.vehicles.length
        this.vehicleType = ''
        this.vehicleMpg = ''
      }else if(this.vehicleIndex > 0){
          this.vehicleIndex = this.vehicleIndex - 1;
          this.vehicleType = this.vehicles[this.vehicleIndex].type
          this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
      }
    }
  }
  increaseHomeIndex(){
    if(this.homeEditMode === false){
      if(this.homeIndex === this.homes.length - 1){
       this.homeIndex = 0;
       this.homeSize = this.homes[this.homeIndex].homeSize;
       this.homeType = this.homes[this.homeIndex].homeType;
      }else if(this.homeIndex <= this.homes.length -1){
          this.homeIndex = this.homeIndex + 1;
          this.homeSize = this.homes[this.homeIndex].homeSize;
          this.homeType = this.homes[this.homeIndex].homeType;
          
      }
    } else{
      if(this.homeIndex === this.homes.length){
        this.homeIndex = 0;
        this.homeType = this.homes[this.homeIndex].homeType;
        this.homeSize = this.homes[this.homeIndex].homeSize;
      }else if(this.homeIndex < this.homes.length -1){
          this.homeIndex = this.homeIndex + 1;
          this.homeType = this.homes[this.homeIndex].homeType;
          this.homeSize = this.homes[this.homeIndex].homeSize;
      }
      else if(this.homeIndex === this.homes.length -1){
          this.homeIndex = this.homeIndex + 1;
          this.homeType = '';
          this.homeSize = '';
      }
    }
  }

  decreaseHomeIndex(){
    if(this.homeEditMode === false){
      if(this.homeIndex === 0){
        this.homeIndex = this.homes.length - 1;
        this.homeSize = this.homes[this.homeIndex].homeSize;
        this.homeType = this.homes[this.homeIndex].homeType;
      }else if(this.homeIndex > 0){
          this.homeIndex = this.homeIndex - 1;
          this.homeSize = this.homes[this.homeIndex].homeSize;
          this.homeType = this.homes[this.homeIndex].homeType;
      }
    } else{
      if(this.homeIndex === 0){
        this.homeIndex = this.homes.length
        this.homeType = ''
        this.homeSize = ''
      }else if(this.homeIndex > 0){
          this.homeIndex = this.homeIndex - 1;
          this.homeType = this.homes[this.homeIndex].homeType;
          this.homeSize = this.homes[this.homeIndex].homeSize;
      }
    }
  }

  isLoading(){
    if(this.homes != null && this.vehicles != null && this.user != null){
      this.loading = false;
    }
  }

}
