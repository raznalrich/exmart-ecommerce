import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  constructor(public http:HttpClient) { }

  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`)
  }

}
