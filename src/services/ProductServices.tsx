import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:8000/products';

import { Product } from '../types/types';

interface ApiResponse<T> {
  data: T;
}

// Obtener productos con paginación y ordenamiento
export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'name',
  order: 'asc' | 'desc' = 'asc'
): Promise<Product[]> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(`${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
    return response.data.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al obtener productos');
    }
    throw new Error('Error desconocido al obtener productos');
  }
};

// Obtener producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  try {

    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al obtener producto');
    }
    throw new Error('Error desconocido al obtener el producto');
  }
};

// Crear un nuevo producto
export const createProduct = async (productData: Product): Promise<Product> => {
  console.log('Datos enviados:', productData);
  try {
    productData.price = Number(productData.price)
    const response = await axios.post<Product>(API_URL, productData);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al crear el producto');
    }
    throw new Error('Error desconocido al crear el producto');
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: number, productData: Product): Promise<Product> => {
  try {
    const response = await axios.put<Product>(`${API_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al actualizar el producto');
    }
    throw new Error('Error desconocido al actualizar el producto');
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al eliminar el producto');
    }
    throw new Error('Error desconocido al eliminar el producto');
  }
};
