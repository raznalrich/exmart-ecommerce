import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';

import { Product } from '../layout/user/interfaces/productInterface';

interface AddressResponse {
  id: number;
  addressLine: string;
  city: string;
  district: string;
  state: string;
  zipCode: string;
  // ... other fields
}
import { OrderItem } from '../layout/admin/interface/order.interface';

export interface OrderEmailContext {
  orderId: string;
  customerName: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;

  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}
export interface CartItem {
  productId: number;
  quantity: number;
  sizeId: number;
  colorId: number;
  userId: number;
}

interface PolicyUpdate {
  id: number;
  tndCheading: string;
  tndCcontent: string;
}

export interface AddAddressDTO {
  userId: number;
  addressTypeId: number;
  isPrimary: boolean;
  addressLine: string;
  city: string;
  district: string;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  map(
    arg0: (order: any) => {
      CustomerID: any;
      OrderID: any;
      TotalItems: any;
      TotalAmount: any;
      Status: any;
    }
  ) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  cartcount = signal(0);
  cartid = signal<any[]>([]);
  totalcartprice = signal(0);

  addToCart(
    id: number,
    userId: number,
    colorId: number,
    sizeId: number,
    quantity: number
  ) {
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
  deleteFromCart(productId: number, userId: number): Observable<any> {
    return this.http.delete(`https://localhost:7267/api/addtocart/DeleteCart`, {
      params: {
        productId: productId.toString(),
        userId: userId.toString(),
      },
    });
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
    return this.http.get('https://localhost:7267/api/Order/orders/List');
    // return this.http.get('https://localhost:7267/api/Order/orderItem/List');
  }

  getOrderDetailsById(id:number){
    return this.http.get(`
    https://localhost:7267/api/Order/orders/detailsbyid/${id}`);
  }
  updateOrderStatusbyid(orderId: number): Observable<any> {
    const baseUrl = 'https://localhost:7267/api';
    return this.http.put(
      `${baseUrl}/Order/updatestatusbyidonly/${orderId}`,
      null  // No body needed for this request
    );
  }
    return this.http.get('https://localhost:7267/api/Order/orderItem/List');
  }
  getOrderDetail(): Observable<OrderItem[]>  {
    return this.http.get<OrderItem[]>('https://localhost:7267/api/Order/orderItem/List');
  }

  placeOrder(userId: number, addressId: number, cartItems: CartItem[]) {
    const orderPayload = {
      userId: userId,
      addressId: addressId,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        productName:'',
        quantity: item.quantity,
        sizeId: item.sizeId,
        sizeName:'',
        colorId: item.colorId,
        colorName:''
      })),
    };
    console.log(orderPayload);

    return this.http.post(
      'https://localhost:7267/api/Order/placeorder',
      orderPayload
    );
  }

  getAddressById(id: number): Observable<string> {
    return this.http.get<AddressResponse>(`https://localhost:7267/api/Users/getAddressById/${id}`)
      .pipe(
        map(response => {
          return `${response.addressLine} , ${response.city} , ${response.district} , ${response.state} , ${response.zipCode}`;
        })
      );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://localhost:7267/api/Product/search?name=${encodeURIComponent(
        query
      )}`
    );
  }
  // sendMail(email:any,subject:string,body:string){
  //   return this.http.post(
  //     `https://localhost:7267/api/email?receptor=${email}&subject=${subject}&body=${body}`,
  //     null
  //   );  }
  sendMail(email: string, subject: string, body: string) {
    const params = new HttpParams()
      .set('receptor', email)
      .set('subject', subject)
      .set('body', body)
      .set('isBodyHtml', 'true'); // Adding HTML flag as parameter

    return this.http.post('https://localhost:7267/api/email', null, { params });
  }
  getAllCategories() {
    return this.http.get('https://localhost:7267/api/Categories');
  }
  getColorById(id: number) {
    return this.http.get(
      `https://localhost:7267/api/Config/GetColorById?id=${id}`
    );
  }
  checkUserIdIsExisted(id: number) {
    return this.http.get(
      `https://localhost:7267/api/Users/CheckUserExisted/${id}`
    );
  }
  IsAdmin(id: number) {
    return this.http.get(`https://localhost:7267/api/Admin/Check/${id}`);
  }
  returnIdFromEmail(email: string) {
    return this.http.get(
      `https://localhost:7267/api/Users/ReturnIdfromemail/${email}`
    );
  }
  addNewUser(email: string, name: string, phone: string) {
    let data = {
      email: email, // Changed from 'name' to 'categoryName'
      name: name, // Changed from 'icon' to 'iconPath'
      phone: phone,
      orders: [], // Provide empty array
      feedbacks: [], // Provide empty array
    };

    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post('https://localhost:7267/api/Users', data, { headers })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw error;
        })
      );
  }
  getSizeById(id: number) {
    return this.http.get(
      `https://localhost:7267/api/Config/GetSizeById?id=${id}`
    );
  }

  // addAddress(address: AddAddressDTO){
  //   return this.http.post(`https://localhost:7267/api/Users/addAddress`,address);
  // }

  addAddress(userId:number, item: any) {
    let data = {
      userId: userId,
      // isPrimary: true,
      addressTypeId: 1, // Address type (e.g., Home, Work)
      addressLine: item.addressLine, // Building number
      zipCode: item.zipCode, // Pincode
      city: item.city, // City
      district: item.district, // District
      state: item.state, // State
      createdBy:userId
    };
console.log('address data',data);


    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .post('https://localhost:7267/api/Users/addAddress', data, { headers })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw (error);
        })
      );
  }

  getAddressByUserId(id:number){
    return this.http.get(`https://localhost:7267/api/Users/getAddress/${id}`)
  }

  // getAddressById(id:number){
  //   return this.http.get(`https://localhost:7267/api/Users/getAddressById/${id}`)
  // }

  editAddressById(addressId: number, item: any) {
    let data = {
      id: addressId,
      userId: item.userId,
      addressTypeId: 1,
      addressLine: item.addressLine,
      zipCode: item.zipCode,
      city: item.city,
      district: item.district,
      state: item.state,
      updatedBy: item.userId
    };

    console.log('updating address data', data);

    const headers = { 'Content-Type': 'application/json' };

    return this.http
      .put(`https://localhost:7267/api/Users/editAddress/${addressId}`, data, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.log('Error details:', error.error);
          throw error;
        })
      );
  }

  deleteAddressById(id:number){
    return this.http.delete(`https://localhost:7267/api/Users/DeleteAddress/${id}`)
  }

  getOrderList() {
    return this.http.get(`https://localhost:7267/api/Order/orderItem/List`);
    // return this.http.get('https://localhost:7267/api/Order/orders/List');
  }

  getAllOrderList() {
    return this.http.get(`https://localhost:7267/api/Order/getallorders`);
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

  getAllBanners(){
    return this.http.get('https://localhost:7267/api/Banner')
  }

  categoryDeletion(id: any) {
    this.http
      .delete(`https://localhost:7267/api/Categories/${id}`)
      .subscribe((res) => {
        console.log(res);
      });
  }

  bannerDelete(id:any) {
    this.http.delete(`https://localhost:7267/api/Banner/${id}`)
    .subscribe((res) => {
      console.log(res);
    })
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

  getImagesByProductId(id: number) {
    return this.http.get(
      `https://localhost:7267/api/ProductImage/ByProduct/${id}`
    );
  }

  updateOrderStatus(OrderListDTO: any) {
    return this.http.put(
      `https://localhost:7267/api/Order/updatestatus`,
      OrderListDTO
    );
  }

  GetOrderDetailById(orderid: any) {
    return this.http.get(
      `https://localhost:7267/api/Order/orders/detailsbyid/${orderid}`
    );
  }

  GetPolicy(){
    return this.http.get(`https://localhost:7267/api/Policy`)
  }
  GetPolicyById(id:number){
    return this.http.get(`https://localhost:7267/api/Policy/${id}`);
  }
  UpdatePolicy(id:number,policyContent:string){

    return this.GetPolicyById(id).pipe(
      switchMap((existingPolicy: any) => {
        const updatePayload: PolicyUpdate = {
          id: id,
          tndCheading: existingPolicy.tndCheading, // Preserve the existing heading
          tndCcontent: policyContent
        };
        return this.http.put(`https://localhost:7267/api/Policy/${id}`, updatePayload);
      })
    );



    // const payload = {
    //   tndCcontent: policyContent
    // };
    // return this.http.put(`https://localhost:7267/api/Policy/${id}`, payload);

    // return this.http.put(`https://localhost:7267/api/Policy/${id}`,policyContent);
  }
}
