import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
    @Output() close = new EventEmitter<void>();
  @Input() button: any = {
    label: '',
    route:'',
    icon: '',
  };
  clickbutton = Output();
  constructor(private router:Router){}
  back(){
    this.close.emit();
  }

  // logout(): void {
  //   // Remove specific data (e.g., userId) from local storage
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('token');
  //   // Optionally clear all local storage
  //   localStorage.clear();

  //   this.router.navigate(['/login']);
  // }
}
