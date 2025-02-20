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

export interface OrderItemsList {
orderItems : Array<{
  colorName: string
  quantity: number
  shippingCharge:number
  sizeName:string
}>

}
