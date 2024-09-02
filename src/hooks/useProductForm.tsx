import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getProductById, createProduct, updateProduct } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices';
import { Product, Category } from '../types/types';
import { useNavigate } from 'react-router-dom';

const useProductForm = (productId?: number) => {
  const [product, setProduct] = useState<Product>({ name: '', description: '', price: 0, category_id: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProductById(productId);
          const category = categories.find(cat => cat.id === data.category_id) || { id: 0, name: '', description: '' };
          setProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            category,
          });
        } catch (error: any) {
          setError(error.message);
        }
      }
    };

    fetchProduct();
  }, [productId, categories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<{ value: unknown }>) => {
    const selectedCategoryId = e.target.value as number;
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    setProduct(prevProduct => ({
      ...prevProduct,
      category_id: selectedCategoryId,
      category: selectedCategory || {id: 0, name: '', description: ''}, 
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const productToSend = { ...product, category: undefined };
      if (productId) {
        await updateProduct(productId, productToSend);
        alert('Producto actualizado correctamente.');
      } else {
        await createProduct(productToSend);
        alert('Producto creado correctamente.');
      }
      navigate('/Home');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    product,
    categories,
    error,
    handleChange,
    handleCategoryChange,
    handleSubmit
  };
};

export default useProductForm;
