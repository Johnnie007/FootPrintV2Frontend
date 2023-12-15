import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { months } from 'src/assets/variables/variables';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  monthlyStorage;

  @Input()
  totalFootprint;
  
  @Input()
  userJoinedDate;

  @Input()
  month;

  @Input()
  year;

  homeOutput = [];
  vehicleOutput = [];
  totalOutput = [];
  labels = []

  signupMonth;
  signupYear;
  chart: Chart;

  ngOnInit(): void {
    this.signupMonth = this.userJoinedDate.split(" ")[0];
    this.signupYear = this.userJoinedDate.split(" ")[1];

    this.setData();

    this.generateChart();
  }

  ngOnChanges(changes: SimpleChanges): void { 
   if(changes['monthlyStorage']?.isFirstChange() === false || changes['totalFootprint']?.isFirstChange() === false){
    this.totalOutput = [];
    this.homeOutput = [];
    this.vehicleOutput = [];
    this.setData();
    this.chart.destroy();
    this.generateChart();
   }
  }

  generateChart = ()=>{
   this.chart = new Chart("chart", {
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

  setData(){
    let indicator = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentStorageMonth = this.monthlyStorage.find((x) =>  x.storageMonth == months[indicator]);
    let total = currentStorageMonth.vehicleTotal + currentStorageMonth.homeTotal + 0.41;
    
    if(this.signupMonth == currentStorageMonth.storageMonth && this.signupYear == currentYear){
        let holdHomeOutput = [];
        let holdVehicleOutput = [];
        let holdOutput = [];
        let holdLabels = [];
      for(let i = 0; i < this.monthlyStorage.length; i++){
        let storage = this.monthlyStorage.find((x) =>  x.storageMonth == months[indicator]);

        if(i == 0){
          holdVehicleOutput.unshift(storage.vehicleTotal);
          holdHomeOutput.unshift(storage.homeTotal);
  
          holdLabels.unshift(storage.storageMonth);
          holdOutput.unshift(storage.homeTotal + storage.vehicleTotal + 0.41);
        }
        else if(i == 1){
          holdVehicleOutput.unshift(0);
          holdHomeOutput.unshift(0);
  
          holdLabels.unshift(storage.storageMonth);
          holdOutput.unshift(0);
        }
        else{
  
          this.labels.unshift(storage.storageMonth);
        }
        if(i === this.monthlyStorage.length -1){
         this.labels = holdLabels.concat(this.labels);
         this.homeOutput = this.checkOutputValue(holdHomeOutput) ?  [] : holdHomeOutput.concat(this.homeOutput) ;
        
         this.vehicleOutput =  this.checkOutputValue(holdVehicleOutput) ? [] : holdVehicleOutput.concat(this.vehicleOutput);
         this.totalOutput = holdOutput.concat(this.totalOutput);

         //checks the value of the array
        this.checkOutputValue(this.homeOutput);
        }

        if(indicator == 0){
          indicator = this.monthlyStorage.length - 1
        }else{
          indicator--
        }
      }
    }
    else{
    if(this.totalFootprint != total){
      let correctTotal = this.monthlyStorage.find((x) =>  (x.vehicleTotal + x.homeTotal + 0.41) == this.totalFootprint);
      let index = this.monthlyStorage.findIndex((x) =>  (x.vehicleTotal + x.homeTotal + 0.41) == this.totalFootprint);
      let vTotal = correctTotal.vehicleTotal;
      let hTotal = correctTotal.homeTotal;
      let proceed = 'false'
      for(let i = 0; i < this.monthlyStorage.length; i++){
        let storage = this.monthlyStorage.find((x) =>  x.storageMonth == months[indicator]);

        if(indicator == index || proceed === "true"){
          this.vehicleOutput.unshift(storage.vehicleTotal);
          this.homeOutput.unshift(storage.homeTotal);
   
          this.labels.unshift(storage.storageMonth);
          this.totalOutput.unshift(storage.homeTotal + storage.vehicleTotal + 0.41);

                proceed = "true";
              }
        else{
          storage.vehicleTotal = vTotal;
          storage.homeTotal = hTotal;
          this.vehicleOutput.unshift(storage.vehicleTotal);
          this.homeOutput.unshift(storage.homeTotal);
  
          this.labels.unshift(storage.storageMonth);
          this.totalOutput.unshift(storage.homeTotal + storage.vehicleTotal + 0.41);
        }

        if(indicator == 0){
          indicator = this.monthlyStorage.length - 1
        }else{
          indicator--
        }
      }
    }
    else{
      for(let i = 0; i < this.monthlyStorage.length; i++){
        let storage = this.monthlyStorage.find((x) =>  x.storageMonth == months[indicator]);
          this.vehicleOutput.unshift(storage.vehicleTotal);
          this.homeOutput.unshift(storage.homeTotal);
  
          this.labels.unshift(storage.storageMonth);
          this.totalOutput.unshift(storage.homeTotal + storage.vehicleTotal + 0.41);
        

        if(indicator == 0){
          indicator = this.monthlyStorage.length - 1
        }else{
          indicator--
        }
      }
    }
  }

  }

  checkOutputValue(arr1: number[]){
    let total = 0;

    let checkNumber = arr1.reduce((acc, value)=>
    acc + value,
    total
    );

    if(checkNumber === 0){
      return true;
    }
      return false;
  }


}
