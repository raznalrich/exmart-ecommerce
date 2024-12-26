import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-long-button',
  standalone: true,
  imports: [],
  templateUrl: './long-button.component.html',
  styleUrl: './long-button.component.scss'
})
export class LongButtonComponent {

  @Input() label: string = 'Click Me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() styleClass: string = '';
  @Input() icon: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = 'button image';
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() textColor: string = '#ffffff';
}
