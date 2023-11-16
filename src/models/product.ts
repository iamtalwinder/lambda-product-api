export interface Product {
  _id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  category?: string;
  images?: string[];
  tags?: string[];
}
