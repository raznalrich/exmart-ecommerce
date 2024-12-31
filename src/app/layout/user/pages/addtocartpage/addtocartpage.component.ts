import { Component } from '@angular/core';
import { CheckoutbuttonComponent } from "../../ui/checkoutbutton/checkoutbutton.component";
import { AddtoCartDeletebtnComponent } from "../../ui/addto-cart-deletebtn/addto-cart-deletebtn.component";
import { AddtoCartLikebtnComponent } from "../../ui/addto-cart-likebtn/addto-cart-likebtn.component";
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LongButtonComponent } from "../../ui/long-button/long-button.component";
import { ProductDisplayingBarComponent } from "../../ui/product-displaying-bar/product-displaying-bar.component";
import { ApiService } from '../../../../api.service';
import { forkJoin } from 'rxjs';
import { GlobalService } from '../../../../global.service';
import { ApiServiceService } from '../../../../services/api-service.service';
interface ProductDetails {
  id: number;
  name: string;
  primaryImageUrl: string;
  price: number;
  colorId: number;
  sizeId: number;
  color?: string;
  size?: string;
}
@Component({
  selector: 'app-addtocartpage',
  standalone: true,
  imports: [AddtoCartDeletebtnComponent, CurrencyPipe, RouterLink, LongButtonComponent, ProductDisplayingBarComponent],
  templateUrl: './addtocartpage.component.html',
  styleUrl: './addtocartpage.component.scss'
})
export class AddtocartpageComponent {
  productDetails:any
id:any
data:any
totalPrice: number = 0;
  constructor(public api: ApiServiceService, private route: ActivatedRoute,public global:GlobalService) {}

  CartItems: ProductDetails[] = []; // Array to store fetched product details
productIds: number[] = []; // Collection of product IDs
  ngOnInit(){
    // this.api.getProductsById(this.id).subscribe((res: any) => {
    //   this.productDetails = res;
    //   // console.log("data",this.data);

    // });
    const cartItems = this.global.signalCartList();
    this.productIds = cartItems.map(item => item.productId);

    console.log('Cart list:', cartItems);
    console.log('Product IDs:', this.productIds);

    this.fetchCartItems(cartItems);
    // console.log(this.CartItems);
  }

  fetchCartItems(cartItems: any[]) {
    const requests = this.productIds.map((id) => this.api.getProductsById(id));

    forkJoin(requests).subscribe(
      (responses: any[]) => {
        // Map responses with cart item details including color and size
        this.CartItems = responses.map((res, index) => {
          const cartItem = cartItems.find(item => item.productId === this.productIds[index]);
          return {
            id: this.productIds[index],
            ...res,
            colorId: cartItem?.colorId,
            sizeId: cartItem?.sizeId
          };
        });

        this.calculateTotalPrice();
        console.log('Updated Cart Items:', this.CartItems);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // ... rest of the code remains the same ...

  calculateTotalPrice() {
    this.totalPrice = this.CartItems.reduce((total, product) => total + (product.price || 0), 0);
    console.log(this.totalPrice);

  }
}
