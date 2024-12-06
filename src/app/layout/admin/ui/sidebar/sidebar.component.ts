import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: any = [{
    id:1,
    routerLink:'',
    item:'Dashboard',
    image:'bi bi-bar-chart'
  },
  {
    id:2,
    routerLink:'cart',
    item:'Products',
    image:'bi bi-boxes'
  },
  {
    id:3,
    routerLink:'profile',
    item:'Orders',
    image:'bi bi-cart-fill'
  },
  {
    id:4,
    routerLink:'ad',
    item:'Feedback',
    image:'bi bi-chat-right-dots'
  },
];
}
