import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';
import useProductForm from '../hooks/useProductForm';
import { Category } from '../types/types';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const numericId = id ? parseInt(id, 10) : undefined;

  const {
    product,
    categories,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    error
  } = useProductForm(numericId);

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (error?.errors) {
      setFieldErrors(error.errors); 
    } else {
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    await handleSubmit(e);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Producto' : 'Crear Producto'}
      </Typography>
      {error?.message && <Typography color="error">{error.message}</Typography>}

      <form onSubmit={handleSubmitForm}>
        <TextField
          label="Nombre"
          name="name"
          value={product.name || ''}
          onChange={handleChange}
          error={!!fieldErrors.name}
          helperText={fieldErrors.name || ''}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Descripción"
          name="description"
          value={product.description || ''}
          onChange={handleChange}
          error={!!fieldErrors.description}
          helperText={fieldErrors.description || ''}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Precio"
          name="price"
          type="number"
          value={product.price || ''}
          onChange={handleChange}
          error={!!fieldErrors.price}
          helperText={fieldErrors.price || ''}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Categoría"
          name="category_id"
          select
          value={product.category_id || ''}
          onChange={handleCategoryChange}
          error={!!fieldErrors.category_id}
          helperText={fieldErrors.category_id || ''}
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
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/Home')}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProductForm;
