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
  homes = [];

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
    console.log(0)
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


  increaseVehicleIndex(){
    console.log(this.vehicleIndex)
    if(this.vehicleEditMode == false){
      if(this.vehicleIndex === this.vehicles.length - 1){
      
        this.vehicleIndex = 0;
      }else if(this.vehicleIndex < this.vehicles.length - 1){
        console.log(this.vehicles[this.vehicleIndex])
          this.vehicleIndex = this.vehicleIndex + 1;
          this.vehicleType = this.vehicles[this.vehicleIndex].type;
          this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
      } 
    }
      else{
        console.log(this.vehicles[this.vehicleIndex])
        if(this.vehicleIndex === this.vehicles.length){
          this.vehicleIndex = 0;
          this.vehicleType = this.vehicles[this.vehicleIndex].type;
            this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
        }else if(this.vehicleIndex < this.vehicles.length -1){
          console.log(this.vehicles[this.vehicleIndex])
            this.vehicleIndex = this.vehicleIndex + 1;
            this.vehicleType = this.vehicles[this.vehicleIndex].type;
            this.vehicleMpg = this.vehicles[this.vehicleIndex].mpg;
        }
        else if(this.vehicleIndex === this.vehicles.length -1){
          console.log(this.vehicles[this.vehicleIndex])
            this.vehicleIndex = this.vehicleIndex + 1;
            this.vehicleType = '';
            this.vehicleMpg = '';
        }
      }
  }

  decreaseVehicleIndex(){
    console.log(this.vehicleIndex)
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

  deleteVehicle(){
    if(this.vehicleType != null || this.vehicleType != undefined){
        this.vehicleEditMode = false; 
    }
  }

  calculateVehicleGHG(){
    let gasUsed =  12000/ this.vehicleMpg;
    let ghgPerYear =(8.89 * (10**-3) * gasUsed);
    this.user.footprint = ghgPerYear + this.user.footprint;

    //assigns number with two decimal points 
    ghgPerYear = Math.round((ghgPerYear *100) /100);
    this.user.footprint = Math.round((this.user.footprint *100) /100);
    
    return ghgPerYear;
  }

}
