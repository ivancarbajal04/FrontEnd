// src/hooks/useProductForm.tsx

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getProductById, createProduct, updateProduct } from '../services/productService';
import { getCategories } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  price: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

// Define the custom hook with a productId parameter that can be a string or undefined
const useProductForm = (productId?: string) => {
  // Set the state with types
  const [product, setProduct] = useState<Product>({ name: '', price: '', categoryId: '' });
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

    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProductById(productId);
          setProduct({ name: data.name, price: data.price, categoryId: data.category.id });
        } catch (error: any) {
          setError(error.message);
        }
      }
    };

    fetchCategories();
    fetchProduct();
  }, [productId]);

  // Define the event handler types
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (productId) {
        await updateProduct(productId, product);
        alert('Producto actualizado correctamente.');
      } else {
        await createProduct(product);
        alert('Producto creado correctamente.');
      }
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    product,
    categories,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useProductForm;
