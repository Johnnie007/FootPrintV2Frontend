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
    this.setData();

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

  setData(){
    let indicator =new Date().getMonth();
    let index = (this.monthlyStorage.length - indicator) + indicator;
    let total = this.monthlyStorage[indicator].vehicleTotal + this.monthlyStorage[indicator].homeTotal + 0.41;
    
    if(this.totalFootprint != total){
     let dataIndex =this.updateData(indicator, index, this.totalFootprint);
     let proceed = "false";
     let vTotal = this.monthlyStorage[dataIndex].vehicleTotal;
     let hTotal = this.monthlyStorage[dataIndex].homeTotal;
     for(let i = 0; i < this.monthlyStorage.length; i++){
    
      if(indicator == dataIndex || proceed === "true"){
        this.vehicleOutput.unshift(this.monthlyStorage[indicator].vehicleTotal);
        this.homeOutput.unshift(this.monthlyStorage[indicator].homeTotal);
 
        this.labels.unshift(this.monthlyStorage[indicator].month);
        this.totalOutput.unshift(this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal + 0.41);
       
        proceed = "true";
      }else{
        this.monthlyStorage[indicator].vehicleTotal = vTotal
        this.monthlyStorage[indicator].homeTotal = hTotal

        this.vehicleOutput.unshift(this.monthlyStorage[indicator].vehicleTotal);
        this.homeOutput.unshift(this.monthlyStorage[indicator].homeTotal);
        this.totalOutput.unshift(this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal+ 0.41);
        this.labels.unshift(this.monthlyStorage[indicator].month);


      }

      if(indicator == 0){
        indicator = index - 1
      }else{
        indicator--
      }
     }
    }

    else{
    for(let i = 0; i < this.monthlyStorage.length; i++){
        this.vehicleOutput.unshift(this.monthlyStorage[indicator].vehicleTotal);
        this.homeOutput.unshift(this.monthlyStorage[indicator].homeTotal);
        this.totalOutput.unshift(this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal+ 0.41)
        this.labels.unshift(this.monthlyStorage[indicator].month);

        if(indicator == 0){
          indicator = index - 1
        }else{
          indicator--
        }
      }
    }
  }
  
  

  updateData(indicator, index, total){
    for(let i = 0; i < this.monthlyStorage.length; i++){
      if(total === (this.monthlyStorage[indicator].homeTotal + this.monthlyStorage[indicator].vehicleTotal) + 0.41){
        console.log(indicator)
        return indicator
      }

      if(indicator == 0){
        indicator = index - 1
      }else{
        indicator--
      }
    }
  }


}
