import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [],
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.scss'
})
export class CancelButtonComponent {

  @Input() label: string = 'Cancel';
  @Input() backgroundColor: string = '#f2f2f2';
  @Input() textColor: string = '#333';
  @Input() border: string = '1px solid #ccc';
  @Input() borderRadius: number = 5;
  @Input() fontWeight: string = 'bold';

  @Output() clickEvent = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.clickEvent.emit(event);
  }

}
