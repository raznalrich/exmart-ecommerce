import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../../../user/ui/logout-button/logout-button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, LogoutButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: any = [
    {
      id: 1,
      routerLink: 'admindashboard',
      item: 'Dashboard',
      image: 'bi bi-bar-chart',
    },
    {
      id: 2,
      routerLink: 'productlist',
      item: 'Products',
      image: 'bi bi-boxes',
    },
    {
      id: 3,
      routerLink: 'orderlist',
      item: 'Orders',
      image: 'bi bi-cart-fill',
    },
    {
      id: 4,
      routerLink: 'reportpage',
      item: 'Report',
      image: 'bi bi-graph-up-arrow',
    },
    {
      id: 5,
      routerLink: 'viewfeedback',
      item: 'Feedback',
      image: 'bi bi-chat-right-dots',
    },
    {
      id: 6,
      routerLink: 'settings',
      item: 'Settings',
      image: 'bi bi-gear',
    },
  ];
  button: any = {
    label: 'Log Out',
    route: '',
    icon: 'bi bi-box-arrow-left',
  };
}
