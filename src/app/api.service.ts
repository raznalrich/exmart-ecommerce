import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getCardImages() {
    return this.http.get(`Data/carouselImages.json`);
  }

  // getCarouselImages() {
  //   return this.http.get(`Data/carouselImages.json`);
  // }

  getProductDetails() {
    return this.http.get(`Data/details.json`);
  }

  getCarouselImages() {
    return this.http.get(`Data/carouselImages.json`);
  }

  // getProductDetails() {
  //   return this.http.get(`data/details.json`);
  // }

  getProducts() {
    return this.http.get(`product-sample.json`);
  }

  getUserAddress() {
    return this.http.get(`Data/address.json`);
  }
}