import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public  http:HttpClient) { }

getCardImages(){
return this.http.get(`data/carouselImages.json`)
}

getCarouselImages(){
return this.http.get(`data/carouselImages.json`)
}

getProductDetails(){
  return this.http.get(`data/details.json`)
}

// getDropdownDetails(){
// return this.http.get(`data/details.json`)
// }
}
