import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createCategory, updateCategory, deleteCategory, getCategories } from '../services/CategoryServices';
import { Category } from '../types/types';

interface ErrorResponse {
  message?: string; 
  errors?: {
    [key: string]: string;
  };
}


const useCategoryForm = (categoryId?: number) => {
  const [category, setCategory] = useState<Category>({ id: 0, name: '', description: '' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        if (categoryId) {
          const cat = data.find(cat => cat.id === categoryId);
          if (cat) setCategory(cat);
        }
      } catch (error: any) {
        console.error(error.message);
        setError({ message: error.message || 'Error al obtener categorías' });
      }
    };

    fetchCategories();
  }, [categoryId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
  
    try {
      if (categoryId) {
        await updateCategory(categoryId, category);
        alert('Categoría actualizada correctamente.');
      } else {
        await createCategory(category);
        alert('Categoría creada correctamente.');
      }
      
      setCategory({ id: 0, name: '', description: '' });
      return true;
    } catch (error: any) {
      if (error.errors) {
        setError({
          message: error.message,
          errors: error.errors
        });
      } else {
        setError({
          message: error.message || 'Error inesperado al crear o actualizar la categoría'
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (categoryId) {
      try {
        console.log('Intentando eliminar categoría:', categoryId);
        await deleteCategory(categoryId); 
        alert('Categoría eliminada correctamente.');
        setCategory({ id: 0, name: '', description: '' });
      } catch (error: any) {
        console.log('Error al eliminar:', error);
  
        if (error.status === 400) {
          const message = error.message;
          const relatedProductsCount = error.relatedProductsCount;
  
          console.log('Mensaje de error:', message);
          console.log('Cantidad de productos relacionados:', relatedProductsCount);
  
          const confirmed = window.confirm(`${message} (Productos relacionados: ${relatedProductsCount}) ¿Desea forzar la eliminacion?`);
          if (confirmed) {
            console.log('Confirmado, intentando forzar eliminación.');
            await deleteCategory(categoryId, true);
            alert('Categoría eliminada correctamente.');
            setCategory({ id: 0, name: '', description: '' });
          }
        } else {
          console.error(error.message);
        }
      }
    }
  };
  
  

  return {
    category,
    categories,
    error,
    setError,
    handleChange,
    handleSubmit,
    handleDelete
  };
};

export default useCategoryForm;
