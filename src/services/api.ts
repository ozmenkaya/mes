import axios from 'axios';
import type { Machine, WorkingHours, Holiday, MaintenanceWindow } from '../types';

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
  
  create: async (department: any) => {
    const response = await api.post('/departments', department);
    return response.data;
  },
  
  update: async (id: string, department: any) => {
    const response = await api.put(`/departments/${id}`, department);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  },
};

// Personnel API calls
export const personnelApi = {
  getAll: async () => {
    const response = await api.get('/personnel');
    return response.data;
  },
  
  create: async (personnel: any) => {
    const response = await api.post('/personnel', personnel);
    return response.data;
  },
  
  update: async (id: string, personnel: any) => {
    const response = await api.put(`/personnel/${id}`, personnel);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/personnel/${id}`);
    return response.data;
  },
};

// Location API calls
export const locationApi = {
  getAll: async () => {
    const response = await api.get('/locations');
    return response.data;
  },
  
  create: async (location: any) => {
    const response = await api.post('/locations', location);
    return response.data;
  },
  
  update: async (id: string, location: any) => {
    const response = await api.put(`/locations/${id}`, location);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/locations/${id}`);
    return response.data;
  },
};

// Work Orders API calls
export const workOrderApi = {
  getAll: async () => {
    const response = await api.get('/work-orders');
    return response.data;
  },
  
  create: async (workOrder: any) => {
    const response = await api.post('/work-orders', workOrder);
    return response.data;
  },
  
  update: async (id: string, workOrder: any) => {
    const response = await api.put(`/work-orders/${id}`, workOrder);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/work-orders/${id}`);
    return response.data;
  },
};

// Inventory API calls
export const inventoryApi = {
  getAll: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },
  
  create: async (item: any) => {
    const response = await api.post('/inventory', item);
    return response.data;
  },
  
  update: async (id: string, item: any) => {
    const response = await api.put(`/inventory/${id}`, item);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  },
};

// Shifts API calls
export const shiftsApi = {
  getAll: async () => {
    const response = await api.get('/shifts');
    return response.data;
  },
  
  create: async (shift: any) => {
    const response = await api.post('/shifts', shift);
    return response.data;
  },
  
  update: async (id: string, shift: any) => {
    const response = await api.put(`/shifts/${id}`, shift);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/shifts/${id}`);
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

// Working Hours API calls
export const workingHoursApi = {
  // Get working hours
  get: async (): Promise<WorkingHours> => {
    const response = await api.get('/working-hours');
    return response.data;
  },

  // Update working hours
  update: async (data: Partial<WorkingHours>): Promise<{ message: string; data: WorkingHours }> => {
    const response = await api.put('/working-hours', data);
    return response.data;
  },

  // Get holidays
  getHolidays: async (): Promise<Holiday[]> => {
    const response = await api.get('/working-hours/holidays');
    return response.data;
  },

  // Add holiday
  addHoliday: async (holiday: Omit<Holiday, 'id'>): Promise<{ message: string; holiday: Holiday }> => {
    const response = await api.post('/working-hours/holidays', holiday);
    return response.data;
  },

  // Delete holiday
  deleteHoliday: async (date: string): Promise<{ message: string }> => {
    const response = await api.delete(`/working-hours/holidays/${date}`);
    return response.data;
  },

  // Get maintenance windows
  getMaintenanceWindows: async (): Promise<MaintenanceWindow[]> => {
    const response = await api.get('/working-hours/maintenance');
    return response.data;
  },

  // Add maintenance window
  addMaintenance: async (maintenance: Omit<MaintenanceWindow, 'id'>): Promise<{ message: string; maintenance: MaintenanceWindow }> => {
    const response = await api.post('/working-hours/maintenance', maintenance);
    return response.data;
  },

  // Delete maintenance window
  deleteMaintenance: async (startDate: string): Promise<{ message: string }> => {
    const response = await api.delete(`/working-hours/maintenance/${startDate}`);
    return response.data;
  },
};

export default api;
