import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-address-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-address-card.component.html',
  styleUrl: './profile-address-card.component.scss'
})
export class ProfileAddressCardComponent {
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
