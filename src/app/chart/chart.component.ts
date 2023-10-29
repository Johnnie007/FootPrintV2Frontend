import { Component, OnInit, Input} from '@angular/core';
import { Chart, registerables} from 'chart.js';
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


  ngOnInit(): void {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    console.log(`${month} ${year}`)
    console.log(this.homeData);
    console.log(this.vehicleData);
    console.log(this.userData);
    let chart = new Chart("chart", {
      type: 'line',
      data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June'
          ],
          datasets: [
            {
              label: 'Output',
              data: [245, 250,223 , 275, 230, 220],
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

}
