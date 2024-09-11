import axiosInstance from '../api/axiosInstance';

// URL base de la API
const API_URL = '/products';

import { Product } from '../types/types';

// Estructura de la respuesta de la API
interface ApiResponse<T> {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Obtener productos con paginación y ordenamiento
export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'name',
  order: 'asc' | 'desc' = 'asc'
): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Product[]>>(`${API_URL}?page=${page}&per_page=${limit}&sortBy=${sortBy}&order=${order}`);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message || 'Error al obtener productos');
  }
};

// Obtener producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get<Product>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener producto');
  }
};

// Crear un nuevo producto
export const createProduct = async (productData: Product): Promise<Product> => {
  try {
    productData.price = Number(productData.price);
    const response = await axiosInstance.post<Product>(API_URL, productData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error al crear el producto');
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: number, productData: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.put<Product>(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error al actualizar el producto');
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error: any) {
    throw new Error(error.message || 'Error al eliminar el producto');
  }
};
