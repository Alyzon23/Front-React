// src/api/axiosConfig.ts

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from './config';

// Función para decodificar el JWT usando Buffer
const decodeToken = (token: string): { exp: number } | null => {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.exp ? payload : null;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 segundos
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ——— Interceptor de petición: añade Bearer token si AsyncStorage funciona ———
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {}; // Asegurar que headers existe
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No se encontró un token en AsyncStorage');
      }

      console.log(`→ [Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
    } catch (err) {
      console.error('Error en interceptor de request:', err);
      return config!;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// ——— Interceptor de respuesta: logging y gestión de 401 (token expirado/inválido) ———
apiClient.interceptors.response.use(
  (response) => {
    console.log(`← [Response] ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const { response, config } = error;

    if (response) {
      console.error(`← [Error ${response.status}] ${config.url}`);

      if (response.status === 401) {
        // Detectar expiración de JWT y limpiar token
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            const now = Date.now() / 1000;
            if (decodedToken.exp < now) {
              console.warn('JWT expirado, eliminando token.');
              await AsyncStorage.removeItem('token');
            }
          }
        }
      }
    } else if (error.request) {
      console.error(`No se recibió respuesta de ${config.url}`);
    } else {
      console.error('Error en configuración de la solicitud:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;