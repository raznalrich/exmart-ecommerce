import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.scss'
})
export class QuantityComponent {
  @Input() minQuantity: number = 1;
  @Input() maxQuantity: number = 99;
  @Input() showMessage: boolean = true;
  @Input() quantity: number = 1;
  @Output() quantityChange = new EventEmitter<number>();


  increase(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decrease(): void {
    if (this.quantity > this.minQuantity) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
