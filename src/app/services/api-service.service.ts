import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get('https://localhost:7267/api/Product')
    // return this.http.get('Data/productsTrail.json');
  }
  getAllCategories(){
    return this.http.get('https://localhost:7267/api/Categories')
  }


  getOrderList() {
    return this.http.get(`https://localhost:7267/api/Order/orders/details`)
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
