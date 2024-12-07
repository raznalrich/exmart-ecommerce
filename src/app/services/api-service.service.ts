import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get('data/product-sample.json');
  }


  getOrderList() {
    return this.http.get(`Data/OrderList.json`)
  }


}
