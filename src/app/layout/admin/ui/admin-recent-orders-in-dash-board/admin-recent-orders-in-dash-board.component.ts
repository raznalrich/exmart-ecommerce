import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-admin-recent-orders-in-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './admin-recent-orders-in-dash-board.component.html',
  styleUrl: './admin-recent-orders-in-dash-board.component.scss'
})
export class AdminRecentOrdersInDashBoardComponent {

  @Input() proName : string = '';
  @Input() proDate : string = '';
  @Input() proImage : string = '';
  @Input() qty : number = 0 ;
  products: any;
}
