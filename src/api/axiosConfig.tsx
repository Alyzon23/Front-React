import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from './config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Aumentamos el timeout a 15 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir token a las solicitudes
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`Enviando solicitud a: ${config.baseURL}${config.url}`);
      return config;
    } catch (error) {
      console.error('Error en interceptor de solicitud:', error);
      return config;
    }
  },
  (error) => {
    console.error('Error en interceptor de solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Respuesta exitosa de: ${response.config.url}`);
    return response;
  },
  async (error) => {
    if (error.response) {
      console.error(`Error ${error.response.status} en: ${error.config.url}`);
      
      // Token expirado o inválido
      if (error.response.status === 401) {
        try {
          await AsyncStorage.removeItem('token');
          // Aquí podrías redirigir al login si tienes acceso a la navegación
        } catch (storageError) {
          console.error('Error al eliminar token:', storageError);
        }
      }
    } else if (error.request) {
      console.error(`No se recibió respuesta de: ${error.config.url}`);
    } else {
      console.error('Error en la configuración de la solicitud:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Función de utilidad para probar la conexión
apiClient.testConnection = async () => {
  try {
    const response = await apiClient.get('/api/test');
    console.log('Test de conexión exitoso:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Test de conexión fallido:', error);
    return { 
      success: false, 
      error: error.message,
      details: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : (error.request ? 'No se recibió respuesta' : 'Error de configuración')
    };
  }
};

export default apiClient;