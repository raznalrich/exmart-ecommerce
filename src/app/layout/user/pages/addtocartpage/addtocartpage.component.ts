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
  constructor(public api: ApiService, private route: ActivatedRoute,public global:GlobalService) {}

  // CartItems = [
  //   {
  //     id:1,
  //     itemName: 'T Shirt',
  //     itemImage: '',
  //     color: 'Black',
  //     size: 'M',
  //     rate: 299.00
  //   },
  //   {
  //     id:2,
  //     itemName: 'T Shirt',
  //     color: 'white',
  //     size: 'XXL',
  //     rate: 399.00
  //   },
  //   {
  //     id:3,
  //     itemName: 'T Shirt',
  //     color: 'Red',
  //     size: 'M',
  //     rate: 99.00
  //   }
  // ]
  CartItems: any[] = []; // Array to store fetched product details
productIds: number[] = [1, 2, 3]; // Collection of product IDs
  ngOnInit(){
    // this.api.getProductsById(this.id).subscribe((res: any) => {
    //   this.productDetails = res;
    //   // console.log("data",this.data);

    // });
    this.productIds = this.global.signalCartList().map(item => item.productId);
    console.log('product id',this.productIds);

    this.fetchCartItems();
    // console.log(this.CartItems);
  }

  fetchCartItems() {
    const requests = this.productIds.map((id) => this.api.getProductsById(id)); // Create an array of HTTP observables

    // Use forkJoin to wait for all requests to complete
    forkJoin(requests).subscribe(
      (responses: any[]) => {
        // Save all fetched product details into CartItems
        this.CartItems = responses.map((res, index) => ({
          id: this.productIds[index],
          ...res, // Spread the response data
        }));
        this.calculateTotalPrice();
        console.log('Updated Cart Items:', this.CartItems);
        // console.log('Updated Cart Items:', this.CartItems);
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  calculateTotalPrice() {
    this.totalPrice = this.CartItems.reduce((total, product) => total + (product.price || 0), 0);
    console.log(this.totalPrice);

  }
}
