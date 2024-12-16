import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryButtonComponent } from '../category-button/category-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterModule, CategoryButtonComponent, LogoutButtonComponent],
  templateUrl: './usersidebar.component.html',
  styleUrl: './usersidebar.component.scss',
})
export class UsersidebarComponent {
  menuItems: any = [
    {
      id: 1,
      routerLink: 'userorder',
      item: 'Orders',
      image: 'bi bi-bar-chart',
    },
    {
      id: 2,
      routerLink: 'addresspage',
      item: 'Address',
      image: 'bi bi-house',
    },
  ];

  button: any = {
    label: 'Log Out',
    icon: 'bi bi-box-arrow-left',
  };
  backButton: any = {
    label: '',
    icon: 'bi bi-arrow-left-circle',
  };
}
