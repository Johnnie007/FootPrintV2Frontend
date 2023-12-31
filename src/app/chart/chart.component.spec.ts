import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent]
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.userJoinedDate = "Jan 2023";
    component.totalFootprint = 1000.41;
    component.month = 9;
    component.year = 2023;
    component.monthlyStorage = storage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should run the checkOutputValue function", () => {
    const arr = [1,2,3,3,4,5,5,6,7,7,6,5]
    const arr2 = []

    const bool = component.checkOutputValue(arr);
    const bool2 = component.checkOutputValue(arr2);

    expect(bool).toBeFalsy();
    expect(bool2).toBeTruthy();
  });

  it("should set chart data", ()=>{
    component.setData();
    expect(component.homeOutput[11]).toBe(500)
    expect(component.vehicleOutput[11]).toBe(500)
    expect(component.totalOutput[11]).toBe(1000.41)
  });
});

let storage = [
  {
  vehicleTotal: 100,
  homeTotal: 230,
  storageMonth: 'Jan',
  userId: 10000
},
  {
  vehicleTotal: 230,
  homeTotal: 230,
  storageMonth: 'Feb',
  userId: 10000
},
{
  vehicleTotal: 250,
  homeTotal: 210,
  storageMonth: 'Jun',
  userId: 10000
},
  {
  vehicleTotal: 250,
  homeTotal: 500,
  storageMonth: 'Jul',
  userId: 10000
},
  {
  vehicleTotal: 225,
  homeTotal: 500,
  storageMonth: "Mar",
  userId: 10000
},
  {
  vehicleTotal: 220,
  homeTotal: 450,
  storageMonth: 'Apr',
  userId: 10000
},
  {
  vehicleTotal: 300,
  homeTotal: 500,
  storageMonth: 'May',
  userId: 10000
},
  {
  vehicleTotal: 300,
  homeTotal: 500,
  storageMonth: 'Aug',
  userId: 10000
},
  {
  vehicleTotal: 275,
  homeTotal: 540,
  storageMonth: 'Sep',
  userId: 10000
},
  {
  vehicleTotal: 304,
  homeTotal: 550,
  storageMonth: 'Oct',
  userId: 10000
},
  {
  vehicleTotal: 500,
  homeTotal: 500,
  storageMonth: 'Nov',
  userId: 10000
},
  {
  vehicleTotal: 500,
  homeTotal: 500,
  storageMonth: 'Dec',
  userId: 10000
},
];
