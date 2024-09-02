import React, { FC, useState, useEffect } from 'react';
import { Modal, Button, TextField, Typography, Box, MenuItem, Select, FormControl, SelectChangeEvent, Grid } from '@mui/material';
import useCategoryForm from '../hooks/useCategoryForm';
import { Category } from '../types/types';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const CategoryModal: FC<CategoryModalProps> = ({ open, onClose }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const { category, categories, error, handleChange, handleSubmit, handleDelete } = useCategoryForm(selectedCategoryId);

  const handleCategorySelect = (event: SelectChangeEvent<number>) => {
    const id = event.target.value as number;
    setSelectedCategoryId(id);
  };

  const handleCreateNew = () => {
    setSelectedCategoryId(undefined);
  };

  useEffect(() => {
    if (!open) {
      setSelectedCategoryId(undefined);
    }
  }, [open]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      onClose();
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteClick = async () => {
    try {
      await handleDelete();
      onClose();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          m: 'auto',
          mt: '10%',
          width: { xs: '90%', sm: '400px' },
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          {selectedCategoryId ? 'Editar Categoría' : 'Crear Nueva Categoría'}
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <FormControl fullWidth variant="outlined">
          <Select
            value={selectedCategoryId || ''}
            onChange={handleCategorySelect}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" onClick={handleCreateNew}>
              Crear Nueva Categoría
            </MenuItem>
            {categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="name"
                value={category.name || ''}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={category.description || ''}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} container spacing={1} justifyContent="flex-end">
              {selectedCategoryId !== undefined ? (
                <>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Actualizar Categoría
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
                      Eliminar Categoría
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Crear Categoría
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
