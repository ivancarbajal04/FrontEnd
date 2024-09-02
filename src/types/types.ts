// src/types/types.ts

export interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    category?: Category;
  }