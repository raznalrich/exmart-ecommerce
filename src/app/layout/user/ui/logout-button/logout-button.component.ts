import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  @Input() button: any = {
    label: '',
    route:'',
    icon: '',
  };
  constructor(private router:Router){}

  logout(): void {
    // Remove specific data (e.g., userId) from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    // Optionally clear all local storage
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
