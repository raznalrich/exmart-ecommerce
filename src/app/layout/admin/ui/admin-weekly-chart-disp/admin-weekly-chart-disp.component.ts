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
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    const barChartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep' , 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Daily Data',
            data: [10, 12, 14, 20, 10, 18, 16, 12, 16, 18, 20, 30],
            backgroundColor: [
              '#F09951','#EA5853','#64A2F5','#43BF73'
            ],
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
            max: 40,
          },
        },
      },
    };

    // Create Chart
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, barChartConfig);
  }
}
