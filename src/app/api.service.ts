import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

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

  getProductDetails() {
    return this.http.get(`Data/details.json`);
  }

  getCarouselImages() {
    return this.http.get(`Data/carouselImages.json`);
  }

  getProducts() {
    return this.http.get(`product-sample.json`);
  }

getUserAddress(){
return this.http.get(`Data/address.json`)
}

getUserFeedback(){
  return this.http.get(`https://localhost:7267/api/FeedBack`)
  }

  saveUserFeedback(item: any) {
    let data = {
      feedback: item.feedback ,// Mapping 'text' from the input to 'feedbackText' for the API
      userId: item.userId, // Mapping 'userId' from the input
      productName: item.productName


    };

    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post('https://localhost:7267/api/FeedBack', data, { headers })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw error;
        })
      );
  }
  getAllFeedback(){
    return this.http.get(`https://localhost:7267/api/FeedBack/all`);
  }

  // getProductsById(id:any){
  //   return this.http.get(`Data/productTrail.json/${id}`)
  // }

  // getProductsById(id:number){
    // return this.http.get(`/Data/productsTrail.json`).pipe(
    //   map((data:any)=>{
    //     const filterddata = data.filter((item:any)=> item.id == id)
    //     return filterddata;

    //   })
    // );
    // return this.http.get(`https://localhost:7267/api/Product/GetProductById?id=${id}`);
  // }

//   getImagesByProductId(id:number){
//   return this.http.get(`https://localhost:7267/api/ProductImage/ByProduct/${id}`);
// }
}
