import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './usersidebar.component.html',
  styleUrl: './usersidebar.component.scss'
})
export class UsersidebarComponent {
  menuItems: any = [{
    id:1,
    routerLink:'admindashboard',
    item:'Orders',
    image:'bi bi-bar-chart'
  },
  {
    id:2,
    routerLink:'productlist',
    item:'Address',
    image:'bi bi-boxes'
  },
];
}
