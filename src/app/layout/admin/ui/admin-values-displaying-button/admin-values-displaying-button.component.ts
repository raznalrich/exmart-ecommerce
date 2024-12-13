import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-values-displaying-button',
  standalone: true,
  imports: [],
  templateUrl: './admin-values-displaying-button.component.html',
  styleUrl: './admin-values-displaying-button.component.scss'
})
export class AdminValuesDisplayingButtonComponent {

  @Input() count: number = 0;
  @Input() label: string = 'Label';
  @Input() iconSrc: string = '';

}
