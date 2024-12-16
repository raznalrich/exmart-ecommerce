import { Component, Input } from '@angular/core';

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
}
