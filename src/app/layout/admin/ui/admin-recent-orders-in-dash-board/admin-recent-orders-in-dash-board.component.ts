import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-recent-orders-in-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './admin-recent-orders-in-dash-board.component.html',
  styleUrl: './admin-recent-orders-in-dash-board.component.scss'
})
export class AdminRecentOrdersInDashBoardComponent {

  products = [
    { name: 'T-Shirt', price: 499 , image: 'images/trialtshirt.png' },
    { name: 'Exp Mug', price: 199 , image: 'images/trialtshirt.png'},
    { name: 'Notebook', price: 99 , image: 'images/trialtshirt.png'},
    { name: 'Exp Mug', price: 199 , image: 'images/trialtshirt.png'},
    { name: 'Notebook', price: 99 , image: 'images/trialtshirt.png'},
  ];
}
