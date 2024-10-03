import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Container, Alert, CircularProgress } from '@mui/material';
import { getProductById, deleteProduct } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices';
import { Product, Category } from '../types/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (id) {
          const productData = await getProductById(Number(id));
          setProduct(productData);
          setEditedProduct(productData);
        }

        setLoading(false);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteProduct(Number(id));
        alert("Producto eliminado correctamente.");
        navigate('/Home');
      } catch (error: any) {
        setError(error.response?.data?.message || 'Error al eliminar el producto');
      }
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        {product && !editMode && (
          <>
            <Typography variant="h4" gutterBottom>
              Detalles del Producto
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Nombre:
              </Typography>
              <Typography variant="body1">{product.name}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Descripción:
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Precio:
              </Typography>
              <Typography variant="body1">${product.price}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Categoría:
              </Typography>
              <Typography variant="body1">{product.category?.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={() => navigate('/Home')}>
                Inicio
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate(`/Editar/${product?.id}`)}>
                Editar
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Eliminar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetail;
