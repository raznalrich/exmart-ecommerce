export interface OrderItem {
  productId: number;
  orderItemId: number;
  orderDate: string;
  productName: string;
  primaryImageUrl: string;
  status: number;
  amount: number;
  quantity: number;
  orderId: number;
  product_amount : number
}

export interface TopProduct {
  productId: number;
  productName: string;
  primaryImageUrl: string;
  totalQuantity: number;
}
