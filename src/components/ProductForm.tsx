import React from 'react';
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
    error,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useProductForm(numericId);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Editar Producto' : 'Crear Producto'}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={product.name || ''}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="description"
          value={product.description || ''}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          value={product.price || ''}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoría"
          name="category_id"
          select
          value={product.category_id || ''}
          onChange={handleCategoryChange}
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
