import { Component, Input, HostListener } from '@angular/core';
import { GlobalService } from '../../../../global.service';
import { UserSearchbarComponent } from '../user-searchbar/user-searchbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [UserSearchbarComponent, RouterLink, RouterModule],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.scss',
})
export class UsernavbarComponent {
  @Input() cartCount: any = 10;

  userName: string = '';
  constructor(
    public cartAdd: GlobalService,
    private router: Router,
    private api: ApiServiceService
  ) {}

  ngOnInit() {
    this.api.GetUserNameById(this.UserId).subscribe((res: any) => {
      this.userName = res.userName;
      console.log('User Name:', this.userName);
    });
  }

  UserId: number | any = this.getUserId();

  getUserId() {
    const userId = localStorage.getItem('userId');
    console.log('user ID aping', userId);

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

  logout(): void {
    // Remove specific data (e.g., userId) from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    // Optionally clear all local storage
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isUserIcon = target.closest('.user-dropdown');
    if (!isUserIcon && this.isDropdownOpen) {
      this.closeDropdown();
    }
  }
}
