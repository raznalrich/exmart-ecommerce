import { Injectable, signal } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(public api:ApiServiceService,private router: Router) {}
  userId = signal(0);
  cartCount = signal(0);
  signalCartList = signal<any[]>([])
  signalOrderList = signal<any[]>([])
  selectedAddressId = signal<string>('');
  cartList:any[]=[];
  editProduct(item: any) {
    console.log(item);
  }
  addToCart() {
    this.cartCount.update((value) => value + 1);
  }
  zerocart(){
    this.cartCount.set(0);
  }
  getUserId(){
    const userId = localStorage.getItem('userId');
if (userId) {
  console.log('Retrieved User ID:', userId);
  this.userId.set(Number(userId))
} else {
  console.error('No User ID found in localStorage');
  this.router.navigate(['/login']);

}
  }
  getCartCount(){
    this.zerocart();
      this.api.getCartList().subscribe(
        (data:any)=>{
          this.cartList = data.filter((item:any) => item.userId === 1);
          this.signalCartList.set(this.cartList);
          this.cartCount.update((value)=> value + this.cartList.length);
        }
      )
  }
}
