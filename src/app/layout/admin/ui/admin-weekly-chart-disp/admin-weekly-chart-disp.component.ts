import { AfterViewInit, Component } from '@angular/core';
import{Chart, ChartConfiguration, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-admin-weekly-chart-disp',
  standalone: true,
  imports: [],
  templateUrl: './admin-weekly-chart-disp.component.html',
  styleUrl: './admin-weekly-chart-disp.component.scss'
})
export class AdminWeeklyChartDispComponent implements AfterViewInit {

  constructor() {
    // Register Chart.js modules
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    // Bar Chart Configuration
    const barChartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Daily Data',
            data: [50, 120, 150, 200, 100, 180, 160],
            backgroundColor: [
              '#4CAF50', '#2196F3', '#FF5722', '#CDDC39', '#FFC107', '#3F51B5', '#F44336',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 250,
          },
        },
      },
    };

    // Create Chart
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, barChartConfig);
  }



}
// chart: any;
//  ngOnInit(): void {
//   this.chart = new Chart('MyChart',this.config);
//  }

//  const data: {
//   datasets: [{
//       barPercentage: 0.5,
//       barThickness: 6,
//       maxBarThickness: 8,
//       minBarLength: 2,
//       data: [10, 20, 30, 40, 50, 60, 70]
//   }]
// };
  // public config : any ={
  //   type: 'bar',
  //   data:{
  //     labels: ['Jan','Feb','Mar','Apr'],
  // datasets: [
  //   {
  //   label: 'sales',
  //   data: [65, 59, 80, 81, 56, 55, 40],
  //   backgroundColor: 'blue',
  // },
  // {
  //   label: 'chuma eri da',
  //   data: [10, 23, 27, 81, 16, 90, 40],
  //   backgroundColor: 'red',
  // },],
  // },
  // options: {
  //   aspectRatio:1,
  // },};

