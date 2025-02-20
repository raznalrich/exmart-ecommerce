import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { ApiServiceService } from '../../../../services/api-service.service';

interface UserResponse {
  name: string;
}

@Component({
  selector: 'app-usersidebar',
  standalone: true,
  imports: [RouterModule, LogoutButtonComponent],
  templateUrl: './usersidebar.component.html',
  styleUrl: './usersidebar.component.scss',
})
export class UsersidebarComponent {

  userName: string = '';

  constructor(private router:Router,private api:ApiServiceService) {}

  ngOnInit(){
    this.api.GetUserNameById(this.UserId).subscribe((res: any) => {
      this.userName = res.userName;
      console.log('User Name:',this.userName);
    });
 }

 UserId : number | any = this.getUserId();

  getUserId() {
    const userId = localStorage.getItem('userId');
    console.log('user ID aping',userId);

    return userId;
  }

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
    route: '',
    icon: 'bi bi-box-arrow-left',
  };
  backButton: any = {
    label: '',
    route: 'HomeStaticComponent',
    icon: 'bi bi-arrow-left-circle',
  };

  logout(): void {
    // Remove specific data (e.g., userId) from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    // Optionally clear all local storage
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
