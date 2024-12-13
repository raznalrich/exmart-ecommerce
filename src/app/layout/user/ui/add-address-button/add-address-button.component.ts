import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-address-button',
  standalone: true,
  imports: [],
  templateUrl: './add-address-button.component.html',
  styleUrl: './add-address-button.component.scss'
})
export class AddAddressButtonComponent {
  @Input() buttonLabel: string = '+ Add new address';
  @Output() add = new EventEmitter<void>();

  onAdd() {
    this.add.emit(); 
  }
}
