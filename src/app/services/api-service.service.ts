import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getProducts(){
    return this.http.get('https://localhost:7267/api/Product')
    // return this.http.get('Data/productsTrail.json');
  }
  getAllCategories(){
    return this.http.get('https://localhost:7267/api/Categories')
  }


  getOrderList() {
    return this.http.get(`Data/OrderList.json`)
  }


  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`)
  }


  getproduct(){
    return this.http.get('/Data/productsTrail.json');
  }

  getCategory(){
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get('https://localhost:7267/api/Categories');
  }

  categoryDeletion(id:any){
    this.http.delete(`https://localhost:7267/api/Categories/${id}`).subscribe(res=>{
      console.log(res)
    })
  }

  addCategory(item: any) {
    let data = {
      categoryName: item.name,  // Changed from 'name' to 'categoryName'
      iconPath: item.icon      // Changed from 'icon' to 'iconPath'
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.http.post("https://localhost:7267/api/Categories", data, { headers }).pipe(
      catchError(error => {
        console.log('Error details:', error.error);
        throw error;
      })
    );
  }
}
