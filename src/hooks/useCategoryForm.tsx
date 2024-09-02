// src/hooks/useCategoryForm.ts
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createCategory, updateCategory, deleteCategory, getCategories } from '../services/CategoryServices';
import { Category } from '../types/types';

const useCategoryForm = (categoryId?: number) => {
  const [category, setCategory] = useState<Category>({ id: 0, name: '', description: '' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

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
        setError(error.message);
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (categoryId) {
        await updateCategory(categoryId, category);
        alert('Categoría actualizada correctamente.');
      } else {
        await createCategory(category);
        alert('Categoría creada correctamente.');
      }
      setCategory({ id: 0, name: '', description: '' });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (categoryId) {
        await deleteCategory(categoryId);
        alert('Categoría eliminada correctamente.');
        setCategory({ id: 0, name: '', description: '' });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    category,
    categories,
    error,
    handleChange,
    handleSubmit,
    handleDelete
  };
};

export default useCategoryForm;
