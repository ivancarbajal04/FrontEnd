// import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductForm from './components/ProductForm';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './components/EditProduct';
import Register from './pages/Register';
import Login from './pages/Login';
// import Logout from './pages/Logout';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/AgregarProducto" element={<PrivateRoute element={<ProductForm />} />} />
        <Route path="/Detalle/:id" element={<PrivateRoute element={<ProductDetail />} />} />
        <Route path="/Editar/:id" element={<PrivateRoute element={<EditProduct />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
