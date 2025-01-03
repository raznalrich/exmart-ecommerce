import { Injectable, signal } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(public api:ApiServiceService) {}
  cartCount = signal(0);
  signalCartList = signal<any[]>([])
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
