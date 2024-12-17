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
    { name: 'Exp Mug', price: 199 , image: 'https://th.bing.com/th/id/OIP.k7oO6Gjb8V-LtjTwj-ZcPAHaHa?rs=1&pid=ImgDetMain'},
    { name: 'Notebook', price: 99 , image: 'https://m.media-amazon.com/images/I/61eYApdaTDL._SL1100_.jpg'},
    { name: 'Exp Mug', price: 199 , image: 'https://th.bing.com/th/id/OIP.X8a41K6QEBWvz6xwAg7_hQHaGo?rs=1&pid=ImgDetMain'},
    { name: 'Notebook', price: 99 , image: 'https://m.media-amazon.com/images/I/61eYApdaTDL._SL1100_.jpg'},
  ];
}
