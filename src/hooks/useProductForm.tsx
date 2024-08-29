import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {getProductById, createProduct, updateProduct } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices';
import { Product, Category } from '../types/types';
import { useNavigate } from 'react-router-dom';

// Define the custom hook with a productId parameter that can be a string or undefined
const useProductForm = (productId?: number) => {
  // Set the state with types
  const [product, setProduct] = useState<Product>({ name: '', description: '', price: 1, category: 1 });
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
          setProduct({ name: data.name, description: data.description ,price: data.price, category: data.category.id });
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
