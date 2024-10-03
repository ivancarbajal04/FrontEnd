import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Paper,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import useProducts from '../hooks/useProducts';
import { getCategories } from '../services/CategoryServices';
import { Category } from '../types/types';
import CategoryModal from '../components/CategoryModal';
import ChartComponent from '../components/ChartComponent';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chartOpen, setChartOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([])


  const {
    products,
    page,
    rowsPerPage,
    totalProducts,
    error,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortChange,
    sortBy,
    order,
  } = useProducts();


    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    useEffect(() => {
    fetchCategories();
  }, []);

  const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    handleChangePage(newPage);
  };

  const handleSortChangeLocal = (event: SelectChangeEvent<string>) => {
    const [newSortBy, newOrder] = event.target.value.split('|');
    handleSortChange(newSortBy, newOrder as 'asc' | 'desc');
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await handleDelete(id);
      alert('Producto eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    fetchCategories();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/AgregarProducto')}>
          Crear Producto
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>
          Gestionar Categorías
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setChartOpen(true)}
          disabled={categories.length === 0}
        >
          Ver Gráfico
        </Button>
        <FormControl>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={`${sortBy}|${order}`}
            onChange={handleSortChangeLocal}
            label="Ordenar por"
          >
            <MenuItem value="name|asc">Nombre Ascendente</MenuItem>
            <MenuItem value="name|desc">Nombre Descendente</MenuItem>
            <MenuItem value="price|asc">Precio Ascendente</MenuItem>
            <MenuItem value="price|desc">Precio Descendente</MenuItem>
            <MenuItem value="created_at|asc">Fecha Ascendente</MenuItem>
            <MenuItem value="created_at|desc">Fecha Descendente</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Nombre</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Precio</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Categoría</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={() => navigate(`/Detalle/${product.id}`)}>Ver Detalles</Button>
                    <Button variant="outlined" onClick={() => navigate(`/Editar/${product.id}`)}>Editar</Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        if (product.id !== undefined) {
                          handleDeleteClick(product.id);
                        } else {
                          console.error('El ID del producto es indefinido.');
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ChartComponent open={chartOpen} onClose={() => setChartOpen(false)} />
      <CategoryModal open={modalOpen} onClose={handleModalClose} />
    </Box>
  );
};

export default Home;
