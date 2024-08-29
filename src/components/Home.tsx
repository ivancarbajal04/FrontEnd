import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@mui/material';
import useProducts from '../hooks/useProducts';
import { Product } from '../types/types'; // Asegúrate de que la ruta sea correcta

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    totalProducts,
    page,
    rowsPerPage,
    error,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useProducts();

  return (
    <div>
      <h1>Lista de Productos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="contained" color="primary" onClick={() => navigate('/product/new')}>
        Crear Producto
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/product/${product.id}`)}>Ver Detalles</Button>
                <Button onClick={() => navigate(`/product/edit/${product.id}`)}>Editar</Button>
                <Button color="secondary" onClick={() => handleDelete(product.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalProducts}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
