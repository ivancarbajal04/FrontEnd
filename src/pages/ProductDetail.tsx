// src/components/ProductDetail.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { getProductById, updateProduct, deleteProduct } from '../services/ProductServices';

// Definición de los tipos para los productos y categorías
interface Category {
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // El id puede ser undefined si no está presente
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const data = await getProductById(id); // Llama al servicio
          setProduct(data);
          setLoading(false);
        } catch (error) {
          setError((error as Error).message);
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteProduct(id); // Llama al servicio
        alert("Producto eliminado correctamente.");
        navigate('/'); 
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {product && (
        <>
          <Typography variant="h4">Detalles del Producto</Typography>
          <Typography variant="h6">Nombre: {product.name}</Typography>
          <Typography variant="body1">Descripción: {product.description}</Typography>
          <Typography variant="body1">Precio: ${product.price}</Typography>
          <Typography variant="body1">Categoría: {product.category.name}</Typography>

          {/* <Button variant="contained" color="primary" onClick={handleEdit}>Editar</Button> */}
          <Button variant="contained" color="secondary" onClick={handleDelete}>Eliminar</Button>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
