import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get('Data/product-sample.json');
  }




  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`)
  }


  getproduct(){
    return this.http.get('/Data/productsTrail.json');
  }

}
