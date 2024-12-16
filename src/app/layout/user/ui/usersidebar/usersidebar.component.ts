import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterModule, LogoutButtonComponent],
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
    route:'',
    icon: 'bi bi-box-arrow-left',
  };
  backButton: any = {
    label: '',
    route:'HomeStaticComponent',
    icon: 'bi bi-arrow-left-circle',
  };
}