import { useState, useEffect, ChangeEvent } from 'react';
import { getProducts, deleteProduct as deleteProductService } from '../services/ProductServices';
import { Product } from '../types/types';

interface UseProductsReturn {
  products: Product[];
  page: number;
  rowsPerPage: number;
  totalProducts: number;
  error: string;
  handleDelete: (id: number) => Promise<void>;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSortChange: (newSortBy: string, newOrder: 'asc' | 'desc') => void;
  sortBy: string;  // Agrega esto
  order: 'asc' | 'desc';  // Agrega esto
}

const useProducts = (initialRowsPerPage: number = 10): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0); // Página inicial (0 para el índice basado en 0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  // Función para obtener productos desde la API
  const fetchProducts = async (page: number, rowsPerPage: number) => {
    try {
      const response = await getProducts(page + 1, rowsPerPage, sortBy, order); // +1 para ajustar la página a la API
      setProducts(response.data); // Ajusta esto si tu respuesta tiene una estructura diferente
      setTotalProducts(response.total); // Asegúrate de que el total se devuelva correctamente desde la API
    } catch (error: any) {
      setError('Error al cargar productos');
    }
  };

  useEffect(() => {
    fetchProducts(page, rowsPerPage);
  }, [page, rowsPerPage, sortBy, order]); // Llama a fetchProducts cada vez que cambie la página o las filas por página

  const handleSortChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(0);
  }

  // Función para manejar la eliminación de productos
  const handleDelete = async (id: number) => {
    try {
      await deleteProductService(id);
      // Actualizar la lista de productos después de la eliminación
      setProducts(products.filter(product => product.id !== id));
      alert('Producto eliminado correctamente.');
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Función para manejar el cambio de página
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Función para manejar el cambio en el número de filas por página
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reiniciar la página a 0 cuando cambie el número de filas por página
  };

  return {
    products,
    page,
    rowsPerPage,
    totalProducts,
    error,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortChange,
    sortBy,  // Agrega esto
    order    // Agrega esto
  };
};

export default useProducts;
