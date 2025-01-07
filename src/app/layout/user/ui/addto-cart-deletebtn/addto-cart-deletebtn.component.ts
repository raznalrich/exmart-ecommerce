import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../../services/api-service.service';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-addto-cart-deletebtn',
  standalone: true,
  imports: [],
  templateUrl: './addto-cart-deletebtn.component.html',
  styleUrl: './addto-cart-deletebtn.component.scss',
})
export class AddtoCartDeletebtnComponent {
  constructor(
    public api: ApiServiceService,
    private route: ActivatedRoute,
    public global: GlobalService
  ) {}
  @Input() productId: number = 0;
  @Input() userId: number = 0;
  @Output() itemDeleted = new EventEmitter<number>(); // Emit productId when item is deleted

  removeFromCart() {
    this.api.deleteFromCart(this.productId, this.userId).subscribe({
      next: (response) => {
        console.log('Item removed successfully');
        this.global.getCartCount();
        // Emit the productId to inform the parent component
        this.itemDeleted.emit(this.productId);
      },
      error: (error) => {
        console.error('Error removing item:', error);
        // Handle error (e.g., show error message)
      }
    });
  }
}
