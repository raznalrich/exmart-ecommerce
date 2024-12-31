import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  toggelProductStatus(id: number) {
    const url = `https://localhost:7267/api/Product/toggle-status/${id}`;
    return this.http.put<boolean>(url, {});
  }
  getProducts() {
    return this.http.get('https://localhost:7267/api/Product');
    // return this.http.get('Data/productsTrail.json');
  }

  getOrderList() {
    return this.http.get(`Data/OrderList.json`);
  }

  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`);
  }

  getproduct() {
    return this.http.get('/Data/productsTrail.json');
  }
}
