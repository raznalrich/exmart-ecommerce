// api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map, Observable } from 'rxjs';
import { Product } from './layout/user/interfaces/productInterface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7267/api';

  constructor(private http: HttpClient) {}

  // Add Category (Method not implemented)
  addCategory(categoryData: any): Observable<any> {
    // Implement this method as needed
    throw new Error('Method not implemented.');
  }

  // Fetch all categories
  getAllCategories(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/Categories`)
      .pipe(catchError(this.handleError));
  }

  // Fetch all sizes (Corrected Endpoint)
  getAllSizes(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/Config/GetAllSizes`)
      .pipe(catchError(this.handleError));
  }

  // Fetch all colors (Corrected Endpoint)
  getAllColors(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/Config/GetAllColors`)
      .pipe(catchError(this.handleError));
  }

  // Fetch card images from local JSON
  // getCardImages(): Observable<any> {
  //   return this.http
  //     .get(`Data/carouselImages.json`)
  //     .pipe(catchError(this.handleError));
  // }

  //Fetch product details from local JSON
  getProductDetails(): Observable<any> {
    return this.http
      .get(`Data/details.json`)
      .pipe(catchError(this.handleError));
  }

  // Fetch carousel images from local JSON
  // getCarouselImages(): Observable<any> {
  //   return this.http
  //     .get(`Data/carouselImages.json`)
  //     .pipe(catchError(this.handleError));
  // }

  // Fetch products from local JSON
  getProducts() {
    return this.http.get('https://localhost:7267/api/Product');
  }

  // Add a new product
  addProduct(payload: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/Product/add-product`, payload)
      .pipe(catchError(this.handleError));
  }

  addBanner(payload: any): Observable<any> {
     return this.http.post(`${this.baseUrl}/Banner`, payload)
  }

uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

    return this.http
      .post<{ imageUrl: string }>(
        `${this.baseUrl}/ImageUpload/upload-image`,
        formData
      )
      .pipe(catchError(this.handleError));
  }

  updateProduct(productId: number, productData: any): Observable<any> {
    return this.http.put(
      `https://localhost:7267/api/Product/Update/${productId}`,
      productData
    );
  }



  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://localhost:7267/api/Product/search?name=${encodeURIComponent(
        query
      )}`
    );
  }

  // Fetch user address from local JSON
  // getUserAddress(): Observable<any> {
  //   return this.http
  //     .get(`Data/address.json`)
  //     .pipe(catchError(this.handleError));
  // }

  // Fetch user feedback
  getUserFeedback(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/FeedBack`)
      .pipe(catchError(this.handleError));
  }

  // Save user feedback
  saveUserFeedback(item: any): Observable<any> {
    const data = {
      feedback: item.feedback, // Mapping 'feedback' from input
      userId: item.userId, // Mapping 'userId' from input
      productName: item.productName, // Mapping 'productName' from input
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(`${this.baseUrl}/FeedBack`, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error saving user feedback:', error);
        return throwError(error);
      })
    );
  }

  // Uncomment and implement as needed
  // getProductsById(id: any): Observable<any> {
  //   return this.http.get(`Data/productTrail.json/${id}`).pipe(
  //     catchError(this.handleError)
  //   );

  getAllFeedback(){
    return this.http.get(`https://localhost:7267/api/FeedBack/all`);
  }

  // getProductsById(id:any){
  //   return this.http.get(`Data/productTrail.json/${id}`)
  // }

  // getProductsById(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/Product/GetProductById?id=${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // getImagesByProductId(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/ProductImage/ByProduct/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Private method to handle errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(error);
  }
}
