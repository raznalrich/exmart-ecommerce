import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public  http:HttpClient) { }

getCardImages(){
return this.http.get(`Data/carouselImages.json`)
}

getCarouselImages(){
return this.http.get(`Data/carouselImages.json`)
}

getProductDetails(){
  return this.http.get(`Data/details.json`)
}

getUserFeedback(){
return this.http.get(`Data/feedback.json`)
}
}
