import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RestService } from '../auth-service/rest-service.service';
import { User } from '../models/User.model';
import { of } from 'rxjs';
import * as helper from '../../assets/variables/variables';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let restService: RestService;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [RestService,{ provide: Router, useClass: mockRouter}],
      teardown: {destroyAfterEach: false}
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    restService = TestBed.inject(RestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set user's data", () => {
    let user: User;
    user = {
      id: 100000,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    }

    spyOn(restService, "getUser").and.returnValue(of(user));
    component.setUserData();

    expect(component.user).toEqual(user);
  });

  it("should set user's image data", () => {
     component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    }

    spyOn(restService, "getUserImage").and.returnValue(of('test'));
    component.defaultImage = "test";
    
    component.setUserImage();

    expect(component.userImage).toEqual("test");
  });

  it("should set vehicle data", () => {

    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    }

    spyOn(restService, "getVehicle").and.returnValue(of([1,2,3,4,5,6]));
    
    component.setVehicleData();

    expect(component.vehicles).toEqual([1,2,3,4,5,6]);
    expect(component.vehicleIndex).toEqual(0);
  });

  it("should set home data", () => {

    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    }

    spyOn(restService, "getHome").and.returnValue(of([1,2,3,4,5,6]));
    
    component.setHomeData();

    expect(component.homes).toEqual([1,2,3,4,5,6]);
    expect(component.homeIndex).toEqual(0);
  });
  it("should set storage data", () => {

    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    }

    spyOn(restService, "getStorage").and.returnValue(of([1,2,3,4,5,6]));
    spyOn(component, "verifyStorage");
    spyOn(component, "isLoading");
    
    component.setStorage();

    expect(component.GHGStorage).toEqual([1,2,3,4,5,6]);
  });

  it('should add a vehicle', ()=>{
   
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.GHGStorage = [{
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Jan',
      userId: 10000
    }];
    
   

    component.vehicleType = 'suv';
    component.vehicleMpg = 23;

    spyOn(component, "calculateVehicleGHG").and.returnValue(10);
    spyOn(component, "findStorageMonth").and.returnValue(0);
    spyOn(component, "updateUserTotal").and.returnValue(Promise.resolve())
    spyOn(component, "setVehicleData");
    spyOn(restService, 'addVehicle').and.returnValue(of([1,2,3,4,5,6,7]));

    component.addVehicle();

    expect(component.vehicleType).toBe('');
    expect(component.vehicleMpg).toBe(0);
    expect(component.vehicles).toBe(null);

     
    
  });

  it('should add a home', ()=>{
   
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.GHGStorage = [{
      vehicleTotal: 0,
      homeTotal: 0,
      storageMonth: 'Jan',
      userId: 10000
    }];
    
   

    component.homeType = 'apartment';
    component.homeSize = 23023;

    spyOn(component, "calculateHomeGHG").and.returnValue(10);
    spyOn(component, "findStorageMonth").and.returnValue(0);
    spyOn(component, "updateUserTotal").and.returnValue(Promise.resolve())
    spyOn(component, "setHomeData");
    spyOn(restService, 'addHome').and.returnValue(of([1,2,3,4,5,6,7]));

    component.addHome();

    expect(component.homeType).toBe('');
    expect(component.homeSize).toBe(0);
    expect(component.homes).toBe(null);

     
    
  });
  // it('should add a Storage', ()=>{
   
  //   component.user = {
  //     id: 1,
  //     first_name: "Testing",
  //     last_name: "tester",
  //     lifeStyle: "N/a",
  //     footprint: 1000.41,
  //     month_joined: "Jan 2023"
  //   };
  //   const arr : string[] = ["Jan", "Feb"]
  

  //  spyOn(restService, 'addStorageData').and.returnValue(of());
   
  // // spyOnProperty(helper, "months").and.returnValue(arr)
  //   component.addStorageData();

  //     expect(component.GHGStorage.length()).toBe(2)

     
    
  // });
  it("should delete vehicle from list", ()=>{
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.GHGStorage = [{
      vehicleTotal: 100,
      homeTotal: 0,
      storageMonth: 'Jan',
      userId: 10000
    }];
    component.vehicleIndex = 0
    component.vehicles = [{ 
      type: "car",
      mpg: 4,
      userId: 10000,
      vehicleGHG: 65
    }]
    component.vehicleType = 'suv';
    component.vehicleMpg = 23;

    spyOn(component, "findStorageMonth").and.returnValue(0);
    spyOn(restService, 'deleteVehicle').and.returnValue(of([1,2,3,4,5,6,7]));
    spyOn(component, "updateUserTotal").and.returnValue(Promise.resolve());
    spyOn(component, "setVehicleData");
    
    component.deleteVehicle()

    expect(component.GHGStorage[0].vehicleTotal).toBe(35)

  })
  it("should delete home from list", ()=>{
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.GHGStorage = [{
      vehicleTotal: 100,
      homeTotal: 100,
      storageMonth: 'Jan',
      userId: 10000
    }];
    component.vehicleIndex = 0
    component.homes = [{ 
      homeType: 'house',
      homeSize: 1232,
      homeGHG: 50,
      userId: 10000
    }]
    component.homeType = 'condo';
    component.homeSize = 2303;

    spyOn(component, "findStorageMonth").and.returnValue(0);
    spyOn(restService, 'deleteHome').and.returnValue(of([1,2,3,4,5,6,7]));
    spyOn(component, "updateUserTotal").and.returnValue(Promise.resolve());
    spyOn(component, "setHomeData");

    component.deleteHome()

    expect(component.GHGStorage[0].homeTotal).toBe(50)
    expect(component.GHGStorage[0].vehicleTotal).toBe(100)
  });

  it("should calculate vehicle ghg", ()=>{
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.vehicleMpg = 23;
    let GHGTotal = component.calculateVehicleGHG()

    expect(GHGTotal).toEqual(4.64)

  });
  it("should calculate home ghg", ()=>{
    component.user = {
      id: 1,
      first_name: "Testing",
      last_name: "tester",
      lifeStyle: "N/a",
      footprint: 1000.41,
      month_joined: "Jan 2023"
    };

    component.homeSize = 23134;
    let GHGTotal = component.calculateHomeGHG()

    expect(GHGTotal).toEqual(7.42)

  });

});


class mockRouter{
  getCurrentNavigation(){
    return {
      extras: {
        state: {
          newUser: false
        }
      }
    }
  }
}