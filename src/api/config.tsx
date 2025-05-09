// src/config/api.ts

// URL base de tu API
const API_BASE_URL = 'http://10.0.2.2:8080';

export const API_ENDPOINTS = {
  // Autenticación
  LOGIN:          `${API_BASE_URL}/api/auth/login`,
  REGISTER:       `${API_BASE_URL}/api/auth/registro`,
  REGISTER_ADMIN: `${API_BASE_URL}/api/auth/registro-admin`,
  VALIDATE_ADMIN: `${API_BASE_URL}/api/auth/validate-admin`,
  REQUEST_ADMIN:  `${API_BASE_URL}/api/auth/request-admin`,
  APPROVE_ADMIN:  `${API_BASE_URL}/api/admin/approve-user`,
  GET_USER:       (username) => `${API_BASE_URL}/api/auth/usuarios/${username}`,

  // Test
  TEST: `${API_BASE_URL}/api/test`,

  // Libros
  GET_LIBROS: `${API_BASE_URL}/api/libros`,
  GET_LIBRO: (id: number | string) => `${API_BASE_URL}/api/libros/${id}`,
  CREATE_LIBRO: `${API_BASE_URL}/api/libros`,
  UPDATE_LIBRO: (id: number | string) => `${API_BASE_URL}/api/libros/${id}`,
  DELETE_LIBRO: (id: number | string) => `${API_BASE_URL}/api/libros/${id}`,

  // Autores
  GET_AUTORES: `${API_BASE_URL}/api/autores`,
  GET_AUTOR: (id: number | string) => `${API_BASE_URL}/api/autores/${id}`,
  CREATE_AUTOR: `${API_BASE_URL}/api/autores`,
  UPDATE_AUTOR: (id: number | string) => `${API_BASE_URL}/api/autores/${id}`,
  DELETE_AUTOR: (id: number | string) => `${API_BASE_URL}/api/autores/${id}`,

  // Editoriales
  GET_EDITORIALES: `${API_BASE_URL}/api/editoriales`,
  GET_EDITORIAL: (id: number | string) => `${API_BASE_URL}/api/editoriales/${id}`,
  CREATE_EDITORIAL: `${API_BASE_URL}/api/editoriales`,
  UPDATE_EDITORIAL: (id: number | string) => `${API_BASE_URL}/api/editoriales/${id}`,
  DELETE_EDITORIAL: (id: number | string) => `${API_BASE_URL}/api/editoriales/${id}`,
};

export default API_BASE_URL;
