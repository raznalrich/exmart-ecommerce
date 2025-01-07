import { Injectable, signal } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(public api: ApiServiceService, private router: Router) {}

  // Using Angular signals
  userId = signal(0);
  cartCount = signal(0);
  signalCartList = signal<any[]>([]);
  signalOrderList = signal<any[]>([]);
  selectedAddressId = signal<string>('');

  // We'll keep an in-memory array as well
  cartList: any[] = [];

  editProduct(item: any) {
    console.log(item);
  }

  addToCart() {
    this.cartCount.update((value) => value + 1);
  }

  zerocart() {
    this.cartCount.set(0);
  }

  getUserId() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log('Retrieved User ID:', userId);
      this.userId.set(+userId);
    } else {
      console.error('No User ID found in localStorage');
      this.router.navigate(['/login']);
    }
  }

  /**
   * Fetch the entire cart list from the server, filter by the current user,
   * update our signals, and return the user's cart as an Observable.
   */
  getCartCount(): Observable<any[]> {
    // Reset cart count to zero first
    this.zerocart();

    // Ensure we have a valid userId
    this.getUserId();

    // Return the observable so the caller can subscribe and wait for data
    return this.api.getCartList().pipe(
      map((data: any) => {
        // Filter the full cart to just the current user's cart
        this.cartList = data.filter((item: any) => item.userId === this.userId());
        // Update the signals
        this.signalCartList.set(this.cartList);
        this.cartCount.set(this.cartList.length);
        // Return the filtered cart
        return this.cartList;
      })
    );
  }
}
