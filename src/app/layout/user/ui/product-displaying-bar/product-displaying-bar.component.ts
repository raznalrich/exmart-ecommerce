import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddtoCartDeletebtnComponent } from "../addto-cart-deletebtn/addto-cart-deletebtn.component";
import { CurrencyPipe } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-product-displaying-bar',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent,CurrencyPipe],
  templateUrl: './product-displaying-bar.component.html',
  styleUrl: './product-displaying-bar.component.scss'
})
export class ProductDisplayingBarComponent {
  @Input() productImage: string = '';
  @Input() productId:number =0;
  @Input() productName: string = '';
  @Input() productColor: string = '';
  @Input() productSize: string = '';
  @Input() productPrice: number = 0;
    @Output() clear = new EventEmitter<void>();

  userId:any;
  color:any;
  size:any;
 constructor(public api: ApiServiceService, private route: ActivatedRoute,public global:GlobalService) {
this.global.getUserId();
 }
 ngOnInit(){
  this.userId = this.global.userId();




 }
 deleteCart(){
  this.clear.emit();
  
 }
 removeFromCart(productId: number, userId: number) {
  this.api.deleteFromCart(productId, userId).subscribe({
    next: (response) => {
      console.log('Item removed successfully');
      this.global.getCartCount();
      // Handle success (e.g., show notification, refresh cart)
    },
    error: (error) => {
      console.error('Error removing item:', error);
      // Handle error (e.g., show error message)
    }
  });
}
}
