// src/components/ProductForm.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';
import useProductForm from '../hooks/useProductForm';

// Definición de los tipos para los productos y categorías
interface Category {
  id: number;
  name: string;
}

interface Product {
  name: string;
  price: number;
  categoryId: number;
}

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // El id puede ser undefined si es un producto nuevo
  const {
    product,
    categories,
    error,
    handleChange,
    handleSubmit,
  } = useProductForm(id);

  return (
    <div>
      <h1>{id ? 'Editar Producto' : 'Crear Producto'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoría"
          name="categoryId"
          select
          value={product.categoryId}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        >
          {/* {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))} */}
        </TextField>
        <Button variant="contained" color="primary" type="submit">
          {id ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
