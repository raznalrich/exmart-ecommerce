import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss'
})
export class SaveButtonComponent {

  @Input() label: string = 'Save';
  @Input() backgroundColor: string = '#2f80ed';
  @Input() textColor: string = 'white';
  @Input() border: string = 'none';
  @Input() borderRadius: number = 5;
  @Input() fontWeight: string = 'bold';

  @Output() clickEvent = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.clickEvent.emit(event);
  }

}
