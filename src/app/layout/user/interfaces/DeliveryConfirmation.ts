export interface DeliveryConfirmation{
  orderitemId:number;
  customerName:string;
  productName:string;
  quantity:number;
  price: number;
  subtotal: number;
  shippingAddress: string;
  orderDate: Date;
  }
