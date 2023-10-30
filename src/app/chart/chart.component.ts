import { Component, OnInit, Input} from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { months } from 'src/assets/variables/variables';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input()
  homeData;

  @Input()
  vehicleData;

  @Input()
  userData;

  @Input()
  currentMonth

  homeOutput = [];
  vehicleOutput = [];
  totalOutput = [];


  ngOnInit(): void {
    console.log(this.homeData);
    console.log(this.vehicleData);
    console.log(this.userData);
    console.log(this.currentMonth)
    this.calculateHomeData();
    this.calculateVehicleData();
    this.generateChart();
  }

  generateChart(){
   let chart = new Chart("chart", {
      type: 'line',
      data: {
          labels: months,
          datasets: [
            {
              label: 'Output',
              data: [245, 250, 223 , 275, 230, 220],
              borderColor: [
                  'rgba(3, 130, 0, 1)'
              ]
          },
            {
              label: 'Home',
              data: [505, 550, 550, 555, 520, 500],
              borderColor: [
                  'rgba(24, 160, 251, 1)'
              ]
          },
            {
              label: 'Vehicle',
              data: [0, 0, 0],
              borderColor: [
                  'rgba(177, 25, 25, 1)'
              ]
          }
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'FootPrint'
          }
        }
      },
    });
  }

  calculateHomeData(){
    
    if(this.homeData.length > 0){
     let iterator = new Date().getMonth();
     let year = new Date().getFullYear()
     for(let i = iterator; i >= 0; i--){
      let total = 0;
      let dateCompare = `${months[i]} ${year}`;
      console.log(dateCompare)
      console.log(months[i])
      console.log(i)
      this.homeData.map((data)=>{
        if(data.month_added == dateCompare){
          console.log(data.ghg);
          total = data.homeGHG + total;
        }
      })
      this.homeOutput.push(total)
      console.log(this.homeOutput)
     }
  
    }
  }
  calculateVehicleData(){
    
    if(this.vehicleData.length > 0){
     let iterator = new Date().getMonth();
     let year = new Date().getFullYear()
     for(let i = iterator; i >= 0; i--){
      let total = 0;
      let dateCompare = `${months[i]} ${year}`;
      console.log(dateCompare)
      console.log(months[i])
      console.log(i)
      this.vehicleData.map((data)=>{
        if(data.month_added == dateCompare){
          console.log(data.ghg);
          total = data.vehicleGHG + total;
        }
      })
      this.vehicleOutput.push(total)
      console.log(this.vehicleOutput)
     }
  
    }
  }


}
