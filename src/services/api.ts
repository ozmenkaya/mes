import axios from 'axios';
import type { Machine } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Machine API calls
export const machineApi = {
  // Get all machines
  getAll: async (): Promise<Machine[]> => {
    const response = await api.get('/machines');
    return response.data;
  },

  // Create new machine
  create: async (machine: Partial<Machine>): Promise<{ message: string; machineId: string }> => {
    const response = await api.post('/machines', machine);
    return response.data;
  },

  // Update machine
  update: async (id: string, machine: Partial<Machine>): Promise<{ message: string }> => {
    const response = await api.put(`/machines/${id}`, machine);
    return response.data;
  },

  // Delete machine
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/machines/${id}`);
    return response.data;
  },
};

// Department API calls
export const departmentApi = {
  getAll: async () => {
    const response = await api.get('/departments');
    return response.data;
  },
};

// Personnel API calls
export const personnelApi = {
  getAll: async () => {
    const response = await api.get('/personnel');
    return response.data;
  },
};

// Location API calls
export const locationApi = {
  getAll: async () => {
    const response = await api.get('/locations');
    return response.data;
  },
};

// Auth API calls
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  me: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default api;
