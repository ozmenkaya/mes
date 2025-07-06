// ÜYS sistemi için API servis fonksiyonları
import axios from 'axios';
import type { 
  WorkOrder, 
  Product, 
  QualityCheck, 
  InventoryItem, 
  ProductionMetrics,
  Equipment,
  DashboardMetrics,
  User
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ı - yetkilendirme token'ını ekler
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// İş Emirleri API
export const workOrderService = {
  getAll: () => api.get<WorkOrder[]>('/work-orders'),
  getById: (id: string) => api.get<WorkOrder>(`/work-orders/${id}`),
  create: (workOrder: Omit<WorkOrder, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<WorkOrder>('/work-orders', workOrder),
  update: (id: string, workOrder: Partial<WorkOrder>) => 
    api.put<WorkOrder>(`/work-orders/${id}`, workOrder),
  delete: (id: string) => api.delete(`/work-orders/${id}`),
  updateStatus: (id: string, status: WorkOrder['status']) =>
    api.patch<WorkOrder>(`/work-orders/${id}/status`, { status }),
};

// Products API
export const productService = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Product>('/products', product),
  update: (id: string, product: Partial<Product>) => 
    api.put<Product>(`/products/${id}`, product),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Quality API
export const qualityService = {
  getAll: () => api.get<QualityCheck[]>('/quality-checks'),
  getByWorkOrder: (workOrderId: string) => 
    api.get<QualityCheck[]>(`/quality-checks/work-order/${workOrderId}`),
  create: (qualityCheck: Omit<QualityCheck, 'id'>) => 
    api.post<QualityCheck>('/quality-checks', qualityCheck),
  update: (id: string, qualityCheck: Partial<QualityCheck>) => 
    api.put<QualityCheck>(`/quality-checks/${id}`, qualityCheck),
};

// Inventory API
export const inventoryService = {
  getAll: () => api.get<InventoryItem[]>('/inventory'),
  getById: (id: string) => api.get<InventoryItem>(`/inventory/${id}`),
  updateStock: (id: string, quantity: number, type: 'in' | 'out') =>
    api.patch<InventoryItem>(`/inventory/${id}/stock`, { quantity, type }),
  getLowStock: () => api.get<InventoryItem[]>('/inventory/low-stock'),
};

// Production Metrics API
export const metricsService = {
  getProduction: (dateRange?: { start: string; end: string }) => 
    api.get<ProductionMetrics[]>('/metrics/production', { params: dateRange }),
  getDashboard: () => api.get<DashboardMetrics>('/metrics/dashboard'),
  getEfficiency: (workstation?: string, dateRange?: { start: string; end: string }) =>
    api.get('/metrics/efficiency', { params: { workstation, ...dateRange } }),
};

// Equipment API
export const equipmentService = {
  getAll: () => api.get<Equipment[]>('/equipment'),
  getById: (id: string) => api.get<Equipment>(`/equipment/${id}`),
  updateStatus: (id: string, status: Equipment['status']) =>
    api.patch<Equipment>(`/equipment/${id}/status`, { status }),
  scheduleMaintenancwe: (id: string, date: string) =>
    api.patch<Equipment>(`/equipment/${id}/maintenance`, { date }),
};

// Auth API
export const authService = {
  login: (credentials: { username: string; password: string }) =>
    api.post<{ token: string; user: User }>('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get<User>('/auth/me'),
  refreshToken: () => api.post<{ token: string }>('/auth/refresh'),
};

export default api;
