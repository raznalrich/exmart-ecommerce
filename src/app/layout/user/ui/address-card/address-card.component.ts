import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() phone: string = '';
  @Input() address: string = '';
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
