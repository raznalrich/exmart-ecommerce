import { Injectable, signal } from '@angular/core';
import { ApiServiceService } from './services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(public api:ApiServiceService) {}
  cartCount = signal(0);
  cartList:any[]=[];
  editProduct(item: any) {
    console.log(item);
  }
  addToCart() {
    this.cartCount.update((value) => value + 1);
  }
  getCartCount(){
      this.api.getCartList().subscribe(
        (data:any)=>{
          this.cartList = data.filter((item:any) => item.userId === 1);;
          this.cartCount.update((value)=> value + this.cartList.length);
        }
      )
  }
}
