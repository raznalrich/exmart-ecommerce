import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable } from 'rxjs';


import { Product } from '../layout/user/interfaces/productInterface';
export interface CartItem {
  productId: number;
  quantity: number;
  sizeId: number;
  colorId: number;
  userId:number;
}



@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  cartcount = signal(0);
  cartid = signal<any[]>([]);
  totalcartprice = signal(0);

  addToCart(id: number, userId: number,colorId:number,sizeId:number,quantity:number) {
    // this.cartcount.update(value => value + 1);

    // this.cartid.update(items => [...items, id]);
    // this.cartid.update(value => [...value,id]);
    // console.log(this.cartid());
    // this.gettotalprice();
    let data = {
      // cartId: 1,
      productId: id,
      sizeId: sizeId,
      colorId: colorId,
      quantity: quantity,
      userId: userId, // Changed from 'icon' to 'iconPath'
    };
    console.log(data);

    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post('https://localhost:7267/api/addtocart', data, { headers })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw error;
        })
      );
  }

  removecartcount(id: number) {
    this.cartcount.update((value) => value - 1);
    this.cartid.update((value) => value.filter((item) => item !== id));
    // this.gettotalprice();
  }
  gettotalprice() {
    const cartIds = this.cartid();
    this.getProducts().subscribe((res: any) => {
      if (!Array.isArray(res)) {
        console.error('Invalid products data', res);
        return;
      }

      const cartProducts = res.filter((product) =>
        cartIds.includes(product.id)
      );

      const totalPrice = cartProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );

      this.totalcartprice.set(totalPrice);

      console.log('Total Price:', this.totalcartprice());
    });
  }
  getCartList() {
    return this.http.get('https://localhost:7267/api/addtocart/GetCart');
  }

  toggelProductStatus(id: number) {
    const url = `https://localhost:7267/api/Product/toggle-status/${id}`;
    return this.http.put<boolean>(url, {});
  }

  getProducts() {
    return this.http.get('https://localhost:7267/api/Product');
  }
  getOrderDetails() {
    return this.http.get('https://localhost:7267/api/Order/orders/details');
  }


  placeOrder(userId: number, addressId: number, cartItems: CartItem[]) {
    const orderPayload = {
        userId: userId,
        addressId: addressId,
        orderItems: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            sizeId: item.sizeId,
            colorId: item.colorId,
        })),
    };
    console.log(orderPayload);


    return this.http.post('https://localhost:7267/api/Order/placeorder', orderPayload);
}
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://localhost:7267/api/Product/search?name=${encodeURIComponent(
        query
      )}`
    );
  }
  sendMail(email:any,subject:string,body:string){
    return this.http.post(
      `https://localhost:7267/api/email?receptor=${email}&subject=${subject}&body=${body}`,
      null
    );  }
  getAllCategories() {
    return this.http.get('https://localhost:7267/api/Categories');
  }
  getColorById(id: number) {
    return this.http.get(
      `https://localhost:7267/api/Config/GetColorById?id=${id}`
    );
  }
  getSizeById(id: number) {
    return this.http.get(
      `https://localhost:7267/api/Config/GetSizeById?id=${id}`
    );
  }
  getAddressByUserId(id:number){
    return this.http.get(`https://localhost:7267/api/Users/${id}`)
  }
  getOrderList() {
    return this.http.get(`https://localhost:7267/api/Order/orders/details`);
    // return this.http.get(`Data/OrderList.json`);
  }
  getAllOrderList() {
    return this.http.get(`https://localhost:7267/api/Order/getallorders`);
    // return this.http.get(`Data/OrderList.json`);
  }

  getItemsInOrder() {
    return this.http.get(`Data/OrderDetails.json`);
  }

  getproduct() {
    return this.http.get('/Data/productsTrail.json');
  }

  getCategory() {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get('https://localhost:7267/api/Categories');
  }

  categoryDeletion(id: any) {
    this.http
      .delete(`https://localhost:7267/api/Categories/${id}`)
      .subscribe((res) => {
        console.log(res);
      });
  }

  addCategory(item: any) {
    let data = {
      categoryName: item.name, // Changed from 'name' to 'categoryName'
      iconPath: item.icon, // Changed from 'icon' to 'iconPath'
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post('https://localhost:7267/api/Categories', data, { headers })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw error;
        })
      );
  }

  getProductsById(id: number) {
    // return this.http.get(`/Data/productsTrail.json`).pipe(
    //   map((data:any)=>{
    //     const filterddata = data.filter((item:any)=> item.id == id)
    //     return filterddata;

    //   })
    // );
    return this.http.get(
      `https://localhost:7267/api/Product/GetProductById?id=${id}`
    );
  }

  getImagesByProductId(id:number){
  return this.http.get(`https://localhost:7267/api/ProductImage/ByProduct/${id}`);
}

  updateOrderStatus(OrderListDTO:any){
    return this.http.put(`https://localhost:7267/api/Order/updatestatus`,OrderListDTO);
  }

  GetOrderDetailById(orderid:any){
    return this.http.get(`https://localhost:7267/api/Order/orders/detailsbyid/${orderid}`)
  }
}
