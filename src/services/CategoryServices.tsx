import axios from 'axios';

// URL base de la API
const API_URL = 'http://www.localhost:8000/categories';
import { Category } from '../types/types';

// Obtener todas las categorías
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(API_URL);
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      throw error.response ? error.response.data : new Error('Error al obtener categorías');
    }
  }
  throw new Error('Error desconocido al obtener las categorías')
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await axios.get<Category>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response ? error.response.data : new Error('Error al obtener la categoría');
    }
  }
  throw new Error('Error desconocido al obtener la categoría');
};

// Crear una nueva categoría
export const createCategory = async (categoryData: Category): Promise<Category> => {
  try {
    const response = await axios.post<Category>(API_URL, categoryData);
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      throw error.response ? error.response.data : new Error('Error al crear las categorias')
    }
    throw new Error('Error desconocido al crear la categoría');
  }
};

// Editar una categoría existente
export const updateCategory = async (id: number, categoryData: Category): Promise<Category> => {
  try {
    const response = await axios.put<Category>(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error) {
    if(axios.isAxiosError(error)){
      throw error.response ? error.response.data : new Error('error al actualizar las categorías')
    }
    throw new Error('Error desconocido al actualizar la categoría');
  }
};

// Eliminar una categoría
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    if(axios.isAxiosError(error)){
      throw error.response ? error.response.data : new Error('Error al eliminar la categoria')
    }
    throw new Error('Error desconocido al eliminar la categoría');
  }
};
