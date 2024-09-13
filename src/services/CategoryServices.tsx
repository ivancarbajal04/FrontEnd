import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { Category } from '../types/types';

const API_URL = '/categories';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<Category[]>(API_URL);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Error al obtener categorías';
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido al obtener categorías');
    }
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await axiosInstance.get<Category>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Error al obtener la categoría';
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido al obtener la categoría');
    }
  }
};

export const createCategory = async (categoryData: Category): Promise<Category> => {
  try {
    const response = await axiosInstance.post<Category>(API_URL, categoryData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Error al crear la categoría';
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido al crear la categoría');
    }
  }
};

export const updateCategory = async (id: number, categoryData: Category): Promise<Category> => {
  try {
    const response = await axiosInstance.put<Category>(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar la categoría';
      throw new Error(errorMessage);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Error desconocido al actualizar la categoría');
    }
  }
};

export const deleteCategory = async (id: number, forceDelete: boolean = false): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:8000/categories/${id}`, {
      data: { forceDelete } 
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
