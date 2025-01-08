export interface OrderEmailContext {
  orderId: number;
  customerName: string;
  items: Array<{
    orderItemId:number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}
