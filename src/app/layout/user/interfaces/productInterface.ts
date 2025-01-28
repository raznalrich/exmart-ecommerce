
export interface Product{
    id: any;
    name: string;
    categoryName: string;
    description: string;
    price: number;
    categoryId: number;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface TopProduct {
  imageUrl: string;
  productName: string;
  amount: number;
  productId: number;
  totalSold: number;
}

