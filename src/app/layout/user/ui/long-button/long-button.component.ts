import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-long-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './long-button.component.html',
  styleUrl: './long-button.component.scss'
})
export class LongButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() label: string = 'Click Me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() styleClass: string = '';
  @Input() icon: string = '';
  @Input() imgSrc: string = '';
  @Input() imgAlt: string = 'button image';
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() textColor: string = '#ffffff';
  @Input() backgroundColor: string = '#3E68B9';
  @Input() border: string = 'none';
  isLoading:boolean = false;

    // Hover styles
    @Input() hoverTextColor: string = '#3E68B9';
    @Input() hoverBackgroundColor: string = '#ffffff';
    @Input() hoverBorder: string = '1px solid #3E68B9';
    onButtonClick() {
      this.buttonClick.emit();
      this.startLoading();
  }
  startLoading(){
    this.isLoading = true;
  }
}
