import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  addCategory(categoryData: any) {
    throw new Error('Method not implemented.');
  }
  getCategory() {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) {}

  getCardImages() {
    return this.http.get(`Data/carouselImages.json`);
  }
  // getCardImages() {
  //   return this.http.get(`data/carouselImages.json`);
  // }

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


getUserAddress(){
return this.http.get(`Data/address.json`)
}

getUserFeedback(){
  return this.http.get(`Data/feedback.json`)
  }

  // getProductsById(id:any){
  //   return this.http.get(`Data/productTrail.json/${id}`)
  // }

  getProductsById(id:number){
    return this.http.get(`/Data/productsTrail.json`).pipe(
      map((data:any)=>{
        const filterddata = data.filter((item:any)=> item.id == id)
        return filterddata;

      })
    );
  }
}
