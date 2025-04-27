// Configuración de API
const API_BASE_URL = 'http://10.0.2.2:8080';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth1/registro`,
  GET_USER: (username) => `${API_BASE_URL}/api/auth1/usuario/${username}`,
  TEST: `${API_BASE_URL}/api/test`,
  // Otros endpoints...
};

export default API_BASE_URL;