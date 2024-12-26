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


  getOrderList() {
    return this.http.get(`Data/OrderList.json`)
  }




  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`)
  }


  getproduct(){
    return this.http.get('/Data/productsTrail.json');
  }

}
