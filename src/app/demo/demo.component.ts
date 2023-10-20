import { Component } from '@angular/core';
import { RestService } from '../auth-service/rest-service.service';
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

  offsetters = [
    {
      id: 1,
      type: "plant",
      product: "Succulent",
      CCS: -30,
      userId: 5
  },
    {
      id: 2,
      type: "home",
      product: "Solar",
      CCS: -30,
      userId: 5
  },
    {
      id: 3,
      type: "plant",
      product: "Succulent",
      CCS: -30,
      userId: 5
  }
  ]
  
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
  }
]
  user = {
    id: 100000,
    first_name: "John",
    last_name: "Doe",
    lifeStyle: "null",
    footprint: .41
  }
  userImage = null;
  vehicles = [
    {
    type: "car",
    mpg: 4,
    userId: 10000,
    vehicleGHG: 65
  },
    {
    type: "truck",
    mpg: 10,
    userId: 10000,
    vehicleGHG: 66
  },
];
  homes = [
    {
    homeType: 'house',
    homeSize: 1312,
    homeGHG: 233,
    userId: 10000
    },
    {
    homeType: 'apartment',
    homeSize: 112,
    homeGHG: 123,
    userId: 10000
    },
    {
    homeType: 'house',
    homeSize: 1232,
    homeGHG: 1233,
    userId: 10000
    }

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
  defaultImage =  "../../assets/images/demoProfile.png";
  
  ngOnInit(): void {
    this.loading = false;
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
    this.holdNewImage = e.target.files[0];
  }

  updateUserImage(){
    if(this.holdNewImage != null){
      const file: File = this.holdNewImage;
      const formData = new FormData();
      formData.append('file', file);

      //exits edit mode
      this.userEditMode = false;
    }
  }

  cancelEditUser(){
    this.userEditMode = false;
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
        this.vehicleIndex = this.vehicles.length -1
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
        this.homeIndex = this.homes.length - 1
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
    const vehicleBody = {
      type: this.vehicleType,
      mpg: this.vehicleMpg,
      userId: this.user.id,
      vehicleGHG: this.calculateVehicleGHG()
    };
    this.vehicles.push(vehicleBody)
        //resets values
      this.vehicleType = '';
      this.vehicleMpg = 0;
      this.vehicleEditMode = false;
      this.vehicleIndex = 0;
   
  }

  addHome(){
    const homeBody = {
      homeType: this.homeType,
      homeSize: this.homeSize,
      userId: this.user.id,
      homeGHG: this.calculateHomeGHG()
    };

    this.homes.push(homeBody)
    
    //resets values
    this.homeType = '';
    this.homeSize = 0;
    this.homeEditMode = false;
  }

  deleteVehicle(){
    if(this.vehicleType != null || this.vehicleType != undefined){
      this.vehicles.splice(this.vehicleIndex, 1)
      this.vehicleIndex = 0
      if(this.vehicles.length === 0){
        this.vehicleType = '';
        this.vehicleMpg = 0;

      }
      this.vehicleEditMode = false; 
    }
    
  }

  deleteHome(){
    if(this.homeType != null || this.homeType != undefined){
      this.homes.splice(this.homeIndex, 1)
        this.homeIndex = 0;

        if(this.homes.length === 0){
          this.homeType = '';
          this.homeSize = 0;
        }
        this.homeEditMode = false;
    }
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
    ghgPerYear = Math.round(ghgPerYear * 100)/100;

    this.user.footprint = Math.round((this.user.footprint *100) /100);

    return ghgPerYear;
  }

  deleteOffsetter(id){
    let offsetter = this.offsetters[id]
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

    this.offsetters.push(offsetter)
  }

}
