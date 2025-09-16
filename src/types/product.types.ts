// types/product.types.ts
export interface Product {
  id: number;
  title: string;
  srcUrl: string;
  gallery: string[];
  price: number;
  discount: {
    amount: number;
    percentage: number;
  };
  rating: number;
  category: string; // e.g., "shoes", "clothes", "watches"
  colors: string[];
  sizes: string[];
  brand: string;
  dressStyle?: string; // e.g., "lifestyle", "performance", "outdoor", "formal"
}








// export type Discount = {
//   amount: number;
//   percentage: number;
// };

// export type Product = {
//   id: number;
//   title: string;
//   srcUrl: string;
//   gallery?: string[];
//   price: number;
//   discount: Discount;
//   rating: number;
//   brand?: string;
// };
