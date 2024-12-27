import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  cart = signal(0);
  editProduct(item: any) {
    console.log(item);
  }
  addToCart() {
    this.cart.update((value) => value + 1);
  }
}
