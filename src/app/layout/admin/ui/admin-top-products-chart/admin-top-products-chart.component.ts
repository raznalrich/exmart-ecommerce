import { Component, Input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-admin-top-products-chart',
  standalone: true,
  imports: [],
  templateUrl: './admin-top-products-chart.component.html',
  styleUrl: './admin-top-products-chart.component.scss'
})
export class AdminTopProductsChartComponent {
   @Input() data: any[] = [];
  //  @Input() data: any;
    changedData:any=[]
    barChart: any;



    constructor() {
      Chart.register(...registerables);
    }


    // ngOnChanges(changes: SimpleChanges): void {
    //   if (this.barChart) {
    //     this.barChart.destroy();
    //   }
    ngOnInit(){
      // console.log("View On It: ", this.data);

      const barChartConfig: ChartConfiguration = {
        type: 'pie',
        data: {
          labels: ["pro1","pro2","pro3","pro4","pro5"],
          datasets: [
            {
              label: 'Top Products',
              data: [5,10,30,9,7],
              backgroundColor: ['#F09951', '#EA5853', '#64A2F5', '#43BF73','#4d4d4d'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 50,
            },
          },
        },
      };

      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      if (ctx) {
        this.barChart = new Chart(ctx.getContext('2d')!, barChartConfig);
      } else {
        console.error('Failed to get canvas element');
      }
    }

}
