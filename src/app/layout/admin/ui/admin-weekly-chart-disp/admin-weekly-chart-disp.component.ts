import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
import{Chart, ChartConfiguration, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-admin-weekly-chart-disp',
  standalone: true,
  imports: [],
  templateUrl: './admin-weekly-chart-disp.component.html',
  styleUrl: './admin-weekly-chart-disp.component.scss'
})
export class AdminWeeklyChartDispComponent {

  @Input() data: any[] = [];
  changedData:any=[]
  barChart: any;



  constructor() {
    Chart.register(...registerables);
  }




  ngOnChanges(changes: SimpleChanges): void {
    if (this.barChart) {
      this.barChart.destroy();
    }

    setTimeout(() => {
      console.log("View On It: ", this.data);

      const barChartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Orders',
              data: this.data,
              backgroundColor: ['#F09951', '#EA5853', '#64A2F5', '#43BF73'],
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

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      if (ctx) {
        this.barChart = new Chart(ctx.getContext('2d')!, barChartConfig);
      } else {
        console.error('Failed to get canvas element');
      }
    }, 100);
  }



}


