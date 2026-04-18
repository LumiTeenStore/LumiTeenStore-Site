export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: ProductCategory;
  sizes: Size[];
  colors: Color[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  stock: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export type ProductCategory =
  | "camisetas"
  | "calcas"
  | "vestidos"
  | "shorts"
  | "saias"
  | "blusas"
  | "conjuntos"
  | "acessorios";

export type Size = "PP" | "P" | "M" | "G" | "GG" | "XG";

export interface Color {
  name: string;
  hex: string;
}

export interface FilterState {
  category: ProductCategory | "";
  sizes: Size[];
  minPrice: number;
  maxPrice: number;
  search: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
}

export interface CartItem {
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
}

export interface StoreInfo {
  whatsapp: string;
  instagram: string;
  address?: string;
  email?: string;
}
