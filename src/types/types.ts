// src/types/types.ts

export interface Category {
    id: number;
    name: string;
  }
  
  export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    // category: Category;
    category: number;
  }
  