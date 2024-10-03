import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getProductById, createProduct, updateProduct } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices';
import { Product, Category } from '../types/types';
import { useNavigate } from 'react-router-dom';
interface ErrorResponse {
  message?: string;
  errors?: {
    [key: string]: string; 
  };
}

const useProductForm = (productId?: number) => {
  const [product, setProduct] = useState<Product>({ name: '', description: '', price: 0, category_id: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error: any) {
        setError(error.message || 'Error al obtener categorías');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const data = await getProductById(productId);
          setProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
          });
        } catch (error: any) {
          setError(error.message || 'Error al obtener el producto');
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<{ value: unknown }>) => {
    const selectedCategoryId = e.target.value as number;
    setProduct(prevProduct => ({
      ...prevProduct,
      category_id: selectedCategoryId,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
    try {
      if (productId) {
        await updateProduct(productId, product);
        alert('Producto actualizado correctamente.');
      } else {
        await createProduct(product);
        alert('Producto creado correctamente.');
      }
      navigate('/Home');
    } catch (error: any) {
      if (error.errors) {
        setError({
          message: error.message, 
          errors: error.errors     
        });
      } else {
        setError({
          message: error.message || 'Error inesperado al crear el producto'
        });
      }
    } finally {
      setLoading(false);
    }
  };



  return {
    product,
    categories,
    error,
    loading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  };
};

export default useProductForm;
