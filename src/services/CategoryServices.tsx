import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { Category } from '../types/types';

const API_URL = '/categories';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>(API_URL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener categorías');
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await axiosInstance.get<Category>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error al obtener categoría');
  }
};

export const createCategory = async (categoryData: Category): Promise<Category> => {
  try {
    const response = await axiosInstance.post<Category>(API_URL, categoryData);
    return response.data;
  } catch (error: any) {
    if (error.errors) {
      console.log( {message: error.message, errors: error.errors} )
      throw { message: error.message, errors: error.errors };
    }
    throw new Error(error.message || 'Error al crear la categoría');
  }
};

export const updateCategory = async (id: number, categoryData: Category): Promise<Category> => {
  try {
    const response = await axiosInstance.put<Category>(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error: any) {
    if (error.errors) {
      console.log({ message: error.message, errors: error.errors })
      throw { message: error.message, errors: error.errors };
      
    }
    throw new Error(error.message || 'Error al actualizar la categoría');
  }
};

export const deleteCategory = async (id: number, forceDelete: boolean = false): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:8000/categories/${id}`, {
      data: { force_delete: forceDelete }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || 'Error desconocido al eliminar la categoría',
        relatedProductsCount: error.response.data.relatedProductsCount || 0
      };
    } else {
      throw new Error('Error desconocido al eliminar la categoría');
    }
  }
};

