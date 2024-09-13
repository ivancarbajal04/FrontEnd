import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {

        return Promise.reject(error.response.data.message || 'Error desconocido');
      } else if (error.request) {

        return Promise.reject('No se recibió respuesta del servidor');
      } else {

        return Promise.reject('Error al configurar la solicitud');
      }
  }
);

export default axiosInstance;
