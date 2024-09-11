// src/api/axiosInstance.ts
import axios from 'axios';
// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // URL base de la API
});

// Configurar interceptores para manejar errores globalmente
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
        // El backend respondió con un error
        return Promise.reject(error.response.data.message || 'Error desconocido');
      } else if (error.request) {
        // No se recibió respuesta del backend
        return Promise.reject('No se recibió respuesta del servidor');
      } else {
        // Error al configurar la solicitud
        return Promise.reject('Error al configurar la solicitud');
      }
  }
);

export default axiosInstance;
