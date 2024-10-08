import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Box, MenuItem, SelectChangeEvent, CircularProgress } from '@mui/material';
import { getProductById, updateProduct } from '../services/ProductServices';
import { getCategories } from '../services/CategoryServices';
import { Product, Category } from '../types/types';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message?: string; errors?: { [key: string]: string } }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (id) {
          const productData = await getProductById(Number(id));
          setEditedProduct(productData);
        }

        setLoading(false);
      } catch (error) {
        setError({ message: (error as Error).message });
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        category_id: e.target.value as number,
      });
    }
  };

  const handleEditSubmit = async () => {
    if (id && editedProduct) {
      try {
        await updateProduct(Number(id), editedProduct);
        alert('Producto actualizado correctamente.');
        navigate('/Home');
      } catch (error: any) {
        if (error.errors) {
          setError({
            message: error.message,  
            errors: error.errors    
          });
        } else {
          setError({
            message: error.message || 'Error inesperado al actualizar el producto'
          });
        }
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Editar Producto
      </Typography>

      {error.message && <Typography color="error">{error.message}</Typography>}

      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          value={editedProduct?.name || ''}
          onChange={handleEditChange}
          error={!!error.errors?.name} 
          helperText={error.errors?.name || ''}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Descripción"
          variant="outlined"
          value={editedProduct?.description || ''}
          onChange={handleEditChange}
          error={!!error.errors?.description}
          helperText={error.errors?.description || ''}
          fullWidth
          margin="normal"
        />
        <TextField
          name="price"
          label="Precio"
          type="number"
          variant="outlined"
          value={editedProduct?.price || ''}
          onChange={handleEditChange}
          error={!!error.errors?.price}
          helperText={error.errors?.price || ''}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoría"
          name="category_id"
          select
          value={editedProduct?.category_id || ''}
          onChange={handleCategoryChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
          error={!!error.errors?.category_id} 
          helperText={error.errors?.category_id || ''} 
          required
          fullWidth
          margin="normal"
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleEditSubmit}>
            Guardar Cambios
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/Home')}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProduct;
