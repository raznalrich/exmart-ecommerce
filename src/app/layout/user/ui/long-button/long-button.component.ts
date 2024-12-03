import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-long-button',
  standalone: true,
  imports: [],
  templateUrl: './long-button.component.html',
  styleUrl: './long-button.component.scss'
})
export class LongButtonComponent {

  @Input() label: string = 'Click Me'; // Button label
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
  @Input() disabled: boolean = false; // Disabled state
  @Input() styleClass: string = ''; // Custom CSS classes
  @Input() icon: string = ''; // Optional icon class (e.g., FontAwesome or Material Icons)
  @Input() imgSrc: string = ''; // Image source URL
  @Input() imgAlt: string = 'button image'; // Image alternative text
  @Input() imgPosition: 'left' | 'right' = 'left'; // Image position (left/right)
  @Input() bgColor: string = '#ffffff';
  @Input() color: string = '#ffffff'

}
