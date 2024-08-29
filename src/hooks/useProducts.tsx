import { useState, useEffect, ChangeEvent } from 'react';
import { getProducts, deleteProduct } from '../services/ProductServices';

// Define the types for product and product response
interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
}

const useProducts = (initialRowsPerPage: number = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(initialRowsPerPage);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: ProductResponse = await getProducts(page + 1, rowsPerPage);
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
      alert('Producto eliminado correctamente.');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return {
    products,
    totalProducts,
    page,
    rowsPerPage,
    error,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage
  };
};

export default useProducts;