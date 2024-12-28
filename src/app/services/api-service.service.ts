import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  cartcount = signal(0);
  cartid = signal<any[]>([]);
  totalcartprice = signal(0);

  addcartcount(id:number){
    this.cartcount.update(value => value + 1);

    // this.cartid.update(items => [...items, id]);
    this.cartid.update(value => [...value,id]);
    console.log(this.cartid());
    // this.gettotalprice();

  }

  removecartcount(id: number) {

    this.cartcount.update(value => value - 1 );
    this.cartid.update(value => value.filter(item => item !== id));
    // this.gettotalprice();
  }
  getProducts(){
    return this.http.get('https://localhost:7267/api/Product')
    // return this.http.get('Data/productsTrail.json');
  }
  getAllCategories(){
    return this.http.get('https://localhost:7267/api/Categories')
  }


  getOrderList() {
    return this.http.get(`Data/OrderList.json`)
  }


  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`)
  }


  getproduct(){
    return this.http.get('/Data/productsTrail.json');
  }

  getCategory(){
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get('https://localhost:7267/api/Categories');
  }


}
