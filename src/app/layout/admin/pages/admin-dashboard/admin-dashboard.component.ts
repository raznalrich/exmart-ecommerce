import { Component } from '@angular/core';
import { SidebarComponent } from "../../ui/sidebar/sidebar.component";
import { AdminValuesDisplayingButtonComponent } from "../../ui/admin-values-displaying-button/admin-values-displaying-button.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminWeeklyChartDispComponent } from "../../ui/admin-weekly-chart-disp/admin-weekly-chart-disp.component";
import { AdminRecentOrdersInDashBoardComponent } from "../../ui/admin-recent-orders-in-dash-board/admin-recent-orders-in-dash-board.component";
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, AdminValuesDisplayingButtonComponent, MatSlideToggleModule, AdminWeeklyChartDispComponent, AdminRecentOrdersInDashBoardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
