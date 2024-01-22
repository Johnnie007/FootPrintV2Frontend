import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoComponent } from './demo.component';
import { ChartComponent } from '../chart/chart.component';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoComponent, ChartComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
    it("should add to vehicles list",()=>{
      spyOn(component, "calculateVehicleGHG").and.returnValue(10);
      component.vehicleType = "suv";
      component.vehicleMpg = 12;
      component.user.id = 2;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
    
      component.GHGStorage[index].homeTotal = 0;
      component.GHGStorage[index].vehicleTotal = 0;
      component.GHGStorage[index].userId = 2;
      component.GHGStorage[index].storageMonth = "Jan";

      component.addVehicle();

      expect(component.GHGStorage[index].homeTotal).toBe(0);
      expect(component.GHGStorage[index].vehicleTotal).toBe(10);
  });

    it("should add home to homes list",()=>{
      spyOn(component, "calculateHomeGHG").and.returnValue(10);
      component.homeType = "house";
      component.homeSize = 1223;
      component.user.id = 2;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
    
      component.GHGStorage[index].homeTotal = 0;
      component.GHGStorage[index].vehicleTotal = 0;
      component.GHGStorage[index].userId = 2;
      component.GHGStorage[index].storageMonth = "Jan";

      component.addHome();

      expect(component.GHGStorage[index].homeTotal).toBe(10);
      expect(component.GHGStorage[index].vehicleTotal).toBe(0);
  });

    it("should add offsetters to offsetters list",()=>{
      //spyOn(component, "calculateHomeGHG").and.returnValue(10);
      component.homeType = "house";
      component.homeSize = 1223;
      component.user.id = 5;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
    
      component.GHGStorage[index].homeTotal = 100;
      component.GHGStorage[index].vehicleTotal = 0;
      component.GHGStorage[index].userId = 5;
      component.GHGStorage[index].storageMonth = "Jan";

      component.addOffsetter(1);

      expect(component.GHGStorage[index].homeTotal).toBe(99.8);
      expect(component.GHGStorage[index].vehicleTotal).toBe(0);
  });

    it("should remove a home from the homes list",()=>{
      component.homes = homes;
      component.homeIndex = 0;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
    
      component.GHGStorage[index].homeTotal = 300;
      component.GHGStorage[index].vehicleTotal = 200;
      component.GHGStorage[index].userId = 2;
      component.GHGStorage[index].storageMonth = "Jan";

      component.deleteHome();

      expect(component.GHGStorage[index].homeTotal).toBe(67);
      expect(component.GHGStorage[index].vehicleTotal).toBe(200);
  });

    it("should remove a vehicle from the vehicles list",()=>{
  
      component.vehicles = vehicles;
      component.vehicleIndex = 0;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
    
      component.GHGStorage[index].homeTotal = 0;
      component.GHGStorage[index].vehicleTotal = 200;
      component.GHGStorage[index].userId = 2;
      component.GHGStorage[index].storageMonth = "Jan";

      component.deleteVehicle();

      expect(component.GHGStorage[index].homeTotal).toBe(0);
      expect(component.GHGStorage[index].vehicleTotal).toBe(135);
  });

    it("should remove a offsetter from the offsetters list",()=>{
  
      component.vehicles = vehicles;
      component.vehicleIndex = 0;
      
      let index = new Date().getMonth();

      component.GHGStorage = storage;
   
      component.GHGStorage[index].homeTotal = 200;
      component.GHGStorage[index].vehicleTotal = 200;
      component.GHGStorage[index].userId = 2;
      component.GHGStorage[index].storageMonth = "Jan";

      component.deleteOffsetter(1);

      expect(component.GHGStorage[index].homeTotal).toBe(200.2);
      expect(component.GHGStorage[index].vehicleTotal).toBe(200);
  });

  it("should calculate vehicle GHG", ()=>{
    component.vehicleMpg = 23;
    const vehicleGHG = component.calculateVehicleGHG();

    expect(vehicleGHG).toBe(4.64);
  });
  it("should calculate home GHG", ()=>{
    component.homeSize = 23000;
    const homeGHG = component.calculateHomeGHG();

    expect(homeGHG).toBe(7.37);
  });


  });
 


const storage = [
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
  vehicleTotal: 0,
  homeTotal: 0,
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
  vehicleTotal: 0,
  homeTotal: 0,
  storageMonth: 'Oct',
  userId: 10000
},
  {
  vehicleTotal: 0,
  homeTotal: 0,
  storageMonth: 'Nov',
  userId: 10000
},
  {
  vehicleTotal: 0,
  homeTotal: 0,
  storageMonth: 'Dec',
  userId: 10000
},
];

const recommendations = [
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
];

const vehicles = [
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
}];

const homes = [
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
  }];