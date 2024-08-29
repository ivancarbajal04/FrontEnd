import axios from 'axios';

// URL base de la API
const API_URL = '/api/categories';

// Definición de los tipos para los datos de categoría
interface CategoryData {
  id?: number;
  name: string;
}

// Obtener todas las categorías
export const getCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await axios.get<CategoryData[]>(API_URL);
    return response.data;
  } catch (error) {
    // throw error.response ? error.response.data : new Error('Error al obtener categorías');
  }
};

// Crear una nueva categoría
export const createCategory = async (categoryData: CategoryData): Promise<CategoryData> => {
  try {
    const response = await axios.post<CategoryData>(API_URL, categoryData);
    return response.data;
  } catch (error) {
    // throw error.response ? error.response.data : new Error('Error al crear la categoría');
  }
};

// Editar una categoría existente
export const updateCategory = async (id: number, categoryData: CategoryData): Promise<CategoryData> => {
  try {
    const response = await axios.put<CategoryData>(`${API_URL}/${id}`, categoryData);
    return response.data;
  } catch (error) {
    // throw error.response ? error.response.data : new Error('Error al actualizar la categoría');
  }
};

// Eliminar una categoría
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    // throw error.response ? error.response.data : new Error('Error al eliminar la categoría');
  }
};
