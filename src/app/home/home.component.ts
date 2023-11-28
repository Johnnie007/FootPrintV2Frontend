import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  footprint = 1000.41;
  joinDate = "Jan 2023";

  GHGStorage = [
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
}
