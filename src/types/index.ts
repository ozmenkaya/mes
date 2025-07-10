// ÜYS sistemi için TypeScript arayüzleri

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator' | 'manager' | 'quality';
  firstName: string;
  lastName: string;
  department?: string;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  productCode: string;
  productName: string;
  quantity: number;
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedOperator?: string;
  workstation?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  unitOfMeasure: string;
  standardTime: number; // in minutes
  revision: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QualityCheck {
  id: string;
  workOrderId: string;
  checkType: 'incoming' | 'in_process' | 'final' | 'audit';
  parameter: string;
  targetValue: number;
  actualValue?: number;
  tolerance: number;
  status: 'pass' | 'fail' | 'pending';
  inspector: string;
  checkDate: string;
  notes?: string;
}

export interface InventoryItem {
  id: string;
  materialCode: string;
  materialName: string;
  category: 'raw_material' | 'wip' | 'finished_goods' | 'consumables';
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitOfMeasure: string;
  location: string;
  cost: number;
  lastUpdated: string;
}

export interface ProductionMetrics {
  id: string;
  workOrderId: string;
  workstation: string;
  plannedQuantity: number;
  actualQuantity: number;
  goodQuantity: number;
  scrapQuantity: number;
  reworkQuantity: number;
  efficiency: number;
  oee: number; // Overall Equipment Effectiveness
  downtime: number; // in minutes
  date: string;
}

export interface Equipment {
  id: string;
  code: string;
  name: string;
  type: 'machine' | 'tool' | 'fixture' | 'gauge';
  location: string;
  status: 'available' | 'in_use' | 'maintenance' | 'breakdown';
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  efficiency: number;
  utilization: number;
}

export interface DashboardMetrics {
  totalWorkOrders: number;
  activeWorkOrders: number;
  completedToday: number;
  overallEfficiency: number;
  qualityRate: number;
  onTimeDelivery: number;
  equipmentUtilization: number;
  inventoryTurnover: number;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  manager: string;
  location: string;
  employeeCount: number;
  shift: string;
  status: 'active' | 'inactive';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Kullanıcı yetkileri arayüzü
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'dashboard' | 'work_orders' | 'production' | 'quality' | 'inventory' | 'equipment' | 'reports' | 'factory_settings';
  action: 'read' | 'create' | 'update' | 'delete' | 'approve' | 'export';
}

// Kullanıcı rolü ve yetkileri
export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Permission ID'leri
  isSystemRole: boolean; // Sistem rolleri silinemez
}

export interface SystemUser {
  id: string;
  username: string;
  email: string;
  password?: string; // Şifre ekleme/güncelleme için
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'operator' | 'quality_inspector' | 'maintenance';
  customRole?: string; // Özel rol ID'si
  department: string;
  shift: string;
  permissions: string[]; // Kullanıcıya özel ek yetkiler
  isActive: boolean;
  mustChangePassword: boolean; // İlk girişte şifre değiştirme zorunluluğu
  lastLogin?: string;
  lastPasswordChange?: string;
  failedLoginAttempts: number;
  accountLockedUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shift {
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  breakDuration: number; // in minutes
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  code: string;
  name: string;
  type: 'building' | 'floor' | 'area' | 'workstation';
  parentLocation?: string;
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeneralSettings {
  companyName: string;
  language: 'tr' | 'en';
  timezone: string;
  dateFormat: string;
  currency: string;
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  maintenanceAlertDays: number;
  qualityCheckRequired: boolean;
  autoCompleteWorkOrders: boolean;
}

export interface Machine {
  id: string;
  code: string;
  name: string;
  manufacturer: string;
  model: string;
  location: string;
  departments: string[]; // Multiple departments
  assignedPersonnel: string[]; // Multiple personnel
  status: 'operational' | 'maintenance' | 'breakdown' | 'idle';
  capacity: number;
  efficiency: number;
  utilization: number;
  installationDate: string;
  isActive: boolean;
  notes?: string;
  // Maintenance properties
  maintenanceSchedule: {
    lastMaintenanceDate?: string;
    nextMaintenanceDate?: string;
    maintenanceInterval: number; // days
    maintenanceType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    responsibleTechnician?: string;
    maintenanceNotes?: string;
  };
  // Performance tracking
  performanceHistory: {
    date: string;
    efficiency: number;
    utilization: number;
    downtimeMinutes: number;
    maintenanceMinutes: number;
  }[];
  createdAt: string;
  updatedAt: string;
}
