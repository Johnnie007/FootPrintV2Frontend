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
  monthlyStorage

  @Input()
  totalFootprint

  homeOutput = [];
  vehicleOutput = [];
  totalOutput = [];
  labels = []


  ngOnInit(): void {
    this.setVehicleData();
    this.setHomeData();
    this.setTotalOutput();
    this.generateChart();
  }

  generateChart(){
   let chart = new Chart("chart", {
      type: 'line',
      data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Output',
              data: this.totalOutput,
              borderColor: [
                  'rgba(3, 130, 0, 1)'
              ]
          },
            {
              label: 'Home',
              data: this.homeOutput,
              borderColor: [
                  'rgba(24, 160, 251, 1)'
              ]
          },
            {
              label: 'Vehicle',
              data: this.vehicleOutput,
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

  setVehicleData(){
    let indicator =new Date().getMonth();
    let index = (this.monthlyStorage.length - indicator) + indicator;
    let total = this.monthlyStorage[indicator].vehicleTotal + this.monthlyStorage[indicator].homeTotal + 0.41;

    if(this.totalFootprint != total){
      this.updateVehicleData(indicator, index, this.totalFootprint)
    }

    else{
    for(let i = 0; i < this.monthlyStorage.length; i++){
        this.vehicleOutput.push(this.monthlyStorage[indicator].vehicleTotal);
        this.labels.unshift(this.monthlyStorage[indicator].month);

        if(indicator == 0){
          indicator = index - 1
        }else{
          indicator--
        }
      }
    }
  }
  setHomeData(){
    let indicator =new Date().getMonth();
    let index = (this.monthlyStorage.length - indicator) + indicator;
    for(let i = 0; i < this.monthlyStorage.length; i++){
     
      this.homeOutput.unshift(this.monthlyStorage[indicator].homeTotal);

      if(indicator == 0){
        indicator = index - 1
      }else{
        indicator--
      }
    }
  }
  setTotalOutput(){
    let indicator = new Date().getMonth();
    let index = (this.monthlyStorage.length - indicator) + indicator;
    for(let i = 0; i < this.monthlyStorage.length; i++){
     
      this.totalOutput.unshift(this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal+ 0.41);

      if(indicator == 0){
        indicator = index - 1
      }else{
        indicator--
      }
    }
  }

  updateVehicleData(indicator, index, total){
    let updateOutput = [];
    for(let i = 0; i < this.monthlyStorage.length; i++){
      if(total === (this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal) + 0.41){
        console.log(indicator)
      }

      if(indicator == 0){
        indicator = index - 1
      }else{
        indicator--
      }
    }
  }


}
