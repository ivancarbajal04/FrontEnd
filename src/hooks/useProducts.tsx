import { useState, useEffect, ChangeEvent } from 'react';
import { getProducts, deleteProduct as deleteProductService } from '../services/ProductServices';
import { Product } from '../types/types';

interface UseProductsReturn {
  products: Product[];
  page: number;
  rowsPerPage: number;
  totalProducts: number;
  error: string | null; // Cambiar a string | null para manejar la ausencia de errores
  handleDelete: (id: number) => Promise<void>;
  handleChangePage: (newPage: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSortChange: (newSortBy: string, newOrder: 'asc' | 'desc') => void;
  sortBy: string;
  order: 'asc' | 'desc';
}

const useProducts = (initialRowsPerPage: number = 10): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0); // Página inicial (0 para el índice basado en 0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // Cambiar a string | null
  const [sortBy, setSortBy] = useState<string>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const fetchProducts = async (page: number, rowsPerPage: number) => {
    try {
      const response = await getProducts(page + 1, rowsPerPage, sortBy, order);
      setProducts(response.data);
      setTotalProducts(response.total);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts(page, rowsPerPage);
  }, [page, rowsPerPage, sortBy, order]);

  const handleSortChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setOrder(newOrder);
    setPage(0);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProductService(id);
      setProducts(products.filter(product => product.id !== id));
      setError(null);
      alert('Producto eliminado correctamente.');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
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
    sortBy,
    order
  };
};

export default useProducts;
