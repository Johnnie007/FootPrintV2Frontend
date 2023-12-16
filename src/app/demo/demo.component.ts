import { Component } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';
import { months } from 'src/assets/variables/variables';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

  constructor(private restService: RestService){
  }
  year = new Date().getFullYear();
  month = new Date().getMonth();
  currentMonth = `${months[this.month]} ${this.year}`;
  offsetterLoading = false;
  offsetters = [
    {
      id: 1,
      type: "plant",
      product: "Succulent",
      CCS: .04,
      userId: 10000
  },
    {
      id: 2,
      type: "home",
      product: "Solar",
      CCS: .2,
      userId: 10000
  },
    {
      id: 3,
      type: "plant",
      product: "Bonsai Plant",
      CCS: .04,
      userId: 10000
  },
    {
      id: 4,
      type: "plant",
      product: "Plants",
      CCS: .04,
      userId: 10000
  }
  ]
  
  recommendations = [
    {
      id: 1,
      type: "plant",
      product: "Succulent",
      productLocation: "https://succulentsbox.com/",
      CCS: .04,
      userId: 10000
  },
    {
      id: 2,
      type: "home",
      product: "Solar",
      productLocation: "https://www.sunrun.com/",
      CCS: .2,
      userId: 10000
  },
    {
      id: 3,
      type: "plant",
      product: "Bonsai Plant",
      productLocation: "https://www.bonsaioutlet.com/all-bonsai-trees/",
      CCS: .04,
      userId: 10000
  },
    {
      id: 4,
      type: "plant",
      product: "Plants",
      productLocation: "https://www.plants.com/",
      CCS: .04,
      userId: 10000
  }
]
  user = {
    id: 10000,
    month_joined: this.currentMonth,
    first_name: "John",
    last_name: "Doe",
    lifeStyle: "null",
    footprint: 18.16
  }
  
  userImage = null;
  
  vehicles = [
    {
    type: "car",
    mpg: 23,
    userId: 10000,
    vehicleGHG: 4.64
  },
    {
    type: "truck",
    mpg: 10,
    userId: 10000,
    vehicleGHG: 10.67
  }];

  homes = [
    {
    homeType: 'house',
    homeSize: 3500,
    homeGHG: 1.12,
    userId: 10000
    },
    {
    homeType: 'apartment',
    homeSize: 1400,
    homeGHG: .45,
    userId: 10000
    },
    {
    homeType: 'house',
    homeSize: 4000,
    homeGHG: 1.28,
    userId: 10000
    }];

    GHGStorage = [
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Jan',
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Feb',
      userId: 10000
    },
    {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Jun',
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Jul',
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: "Mar",
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Apr',
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'May',
      userId: 10000
    },
      {
      vehicleTotal: 1590,
      homeTotal: 131,
      storageMonth: 'Aug',
      userId: 10000
    },
      {
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Sep',
      userId: 10000
    },
      {
      vehicleTotal: 7.2,
      homeTotal: 1.12,
      storageMonth: 'Oct',
      userId: 10000
    },
      {
      vehicleTotal: 7.2,
      homeTotal: 1.12,
      storageMonth: 'Nov',
      userId: 10000
    },
      {
      vehicleTotal: 15.31,
      homeTotal: 2.85,
      storageMonth: 'Dec',
      userId: 10000
    },
  ];

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
  currentVehicle;
  homeIndex = 0;
  currentHome;

  loading = true;
  holdNewImage = null;
  defaultImage =  "assets/images/demoProfile.png";
  
  ngOnInit(): void {
    if(this.userImage == null){
      this.userImage = this.defaultImage
    }
    this.holdNewImage = this.userImage
    this.loading = false;
    this.vehicleType = this.vehicles[this.vehicleIndex].type;
    this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
    this.homeType = this.homes[this.homeIndex].homeType;
    this.homeSize = this.homes[this.homeIndex].homeSize;
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

  setNewUserImage(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    
    if(file.name.length <= 20){
      reader.readAsDataURL(file);
      reader.onload = () =>{
        this.holdNewImage = reader.result
      }
    }
    else{
      alert("File Name Too Long! Must be 20 characters or less.")
    }
    
  }

  updateUserImage(){
    this.userImage = this.holdNewImage;
   this.userEditMode = false;
  }

  cancelEditUser(){
    this.userEditMode = false;
    this.holdNewImage = this.userImage;
  }

  cancelEditVehicle(){
    if(this.vehicleIndex == this.vehicles.length && this.vehicles.length > 0){
      this.vehicleIndex = 0;
    }
    this.vehicleEditMode = false;
  }

  cancelEditHome(){

    if(this.homeIndex == this.homes.length && this.homes.length > 0){
      this.homeIndex = 0;
    }
    this.homeEditMode = false;
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
        this.vehicleIndex = this.vehicles.length -1;
        this.vehicleType = this.vehicles[this.vehicleIndex].type
        this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
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
        this.homeType = this.homes[this.homeIndex].homeType;
        this.homeSize = this.homes[this.homeIndex].homeSize;
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
        this.homeType = this.homes[this.homeIndex].homeType;
        this.homeSize = this.homes[this.homeIndex].homeSize;
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

  addVehicle(){

    if(this.vehicleType != null  && this.vehicleType == '' && this.vehicleMpg != null  && this.vehicleMpg == ''){
      alert("All Fields are required")
    }
    else{
      const vehicleBody = {
        type: this.vehicleType,
        mpg: this.vehicleMpg,
        userId: this.user.id,
        vehicleGHG: this.calculateVehicleGHG()
      };

      //updates GHG Totals
      let index = new Date().getMonth();

      this.GHGStorage[index].vehicleTotal = vehicleBody.vehicleGHG + this.GHGStorage[index].vehicleTotal;
      

      //adds values
      this.vehicles.push(vehicleBody);
      //resets value
      this.vehicleIndex = 0;
      this.vehicleType = this.vehicles[this.vehicleIndex].type;
      this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
      this.vehicleEditMode = false;
    }
   
  }

  addHome(){

    if(this.homeType != null  && this.homeType == '' && this.homeSize != null  && this.homeSize == ''){
      alert("All Fields are required")
    }
    else{
      const homeBody = {
        homeType: this.homeType,
        homeSize: this.homeSize,
        userId: this.user.id,
        homeGHG: this.calculateHomeGHG()
      };

      //updates Monthly GHG Totals
      let index = new Date().getMonth();
      this.GHGStorage[index].homeTotal = this.GHGStorage[index].homeTotal + homeBody.homeGHG;

      this.homes.push(homeBody)
      
      //resets values
      this.homeIndex = 0;
      this.homeType = this.homes[this.homeIndex].homeType;
      this.homeSize = this.homes[this.homeIndex].homeSize;
      this.homeEditMode = false;
    }
  }

  deleteVehicle(){
    if(this.vehicleType != null || this.vehicleType != undefined){
      
      //updates GHG Totals
    let index = new Date().getMonth();

    this.GHGStorage[index].vehicleTotal = this.GHGStorage[index].vehicleTotal - this.vehicles[this.vehicleIndex].vehicleGHG;

      this.vehicles.splice(this.vehicleIndex, 1)
      this.vehicleIndex = 0
      this.vehicleType = this.vehicles[this.vehicleIndex].type
      this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg
      if(this.vehicles.length === 0){
        this.vehicleType = '';
        this.vehicleMpg = 0;
      }
      this.vehicleEditMode = false; 
    }
    
  }

  deleteHome(){
    if(this.homeType != null || this.homeType != undefined){
      //updates Monthly GHG Totals
    let index = new Date().getMonth();
    this.GHGStorage[index].homeTotal = this.GHGStorage[index].homeTotal - this.homes[this.homeIndex].homeGHG;

      this.homes.splice(this.homeIndex, 1)
        this.homeIndex = 0;
        this.homeType = this.homes[this.homeIndex].homeType;
        this.homeSize = this.homes[this.homeIndex].homeSize;

        if(this.homes.length === 0){
          this.homeType = '';
          this.homeSize = 0;
        }
        this.homeEditMode = false;
    }
  }

  calculateVehicleGHG(){
    if(this.vehicleMpg > 0){
      let gasUsed =  12000/ this.vehicleMpg;
      let ghgPerYear =(8.89 * (10**-3) * gasUsed);
      this.user.footprint = ghgPerYear + this.user.footprint;

      //assigns number with two decimal points 
      ghgPerYear = Math.round(ghgPerYear *100) /100;
      this.user.footprint = Math.round(this.user.footprint *100) /100;
      
      return ghgPerYear;
    }else{
      return 0;
    }
  }

  calculateHomeGHG(){
    let totalWatts =  this.homeSize * .75;
    let ghgPerYear = (totalWatts * .855) / 2000;
    this.user.footprint = ghgPerYear + this.user.footprint;

   
    //assigns number with two decimal points 
    ghgPerYear = Math.round(ghgPerYear * 100)/100;
    this.user.footprint = Math.round(this.user.footprint *100) /100;

    return ghgPerYear;
  }

  deleteOffsetter(id){
    let offsetter = this.offsetters[id];
    let index = new Date().getMonth();

    this.GHGStorage[index].homeTotal = this.GHGStorage[index].homeTotal + offsetter.CCS;
    
    let total = this.user.footprint + offsetter.CCS;

    this.user.footprint = Math.round(total * 100) / 100;
    this.offsetters.splice(id, 1);
  }

  addOffsetter(id){

    let offsetter = {
    id: Math.floor(Math.random() * 100000),
    type: this.recommendations[id].type,
     product: this.recommendations[id].product,
     CCS: this.recommendations[id].CCS,
     userId: this.user.id
    };

    let index = new Date().getMonth();
    this.GHGStorage[index].homeTotal = this.GHGStorage[index].homeTotal + offsetter.CCS;
    let total = this.user.footprint - offsetter.CCS;

    this.user.footprint = Math.round(total * 100) / 100;

    this.offsetters.push(offsetter)
  }
}
