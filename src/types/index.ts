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
  type?: string;
  manufacturer: string;
  model: string;
  serialNumber?: string;
  location: string;
  departments: string[]; // Multiple departments
  assignedPersonnel: string[]; // Multiple personnel
  status: 'operational' | 'maintenance' | 'breakdown' | 'idle' | 'running';
  capacity: number;
  efficiency: number;
  utilization?: number;
  operatingHours?: number;
  maintenanceHours?: number;
  installationDate: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  isActive?: boolean;
  notes?: string;
  // Maintenance properties (optional for backward compatibility)
  maintenanceSchedule?: {
    lastMaintenanceDate?: string;
    nextMaintenanceDate?: string;
    maintenanceInterval: number; // days
    maintenanceType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    responsibleTechnician?: string;
    maintenanceNotes?: string;
  };
  // Performance tracking (optional)
  performanceHistory?: {
    date: string;
    efficiency: number;
    utilization: number;
    downtimeMinutes: number;
    maintenanceMinutes: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

// Working Hours interfaces
export interface WorkShift {
  start: string; // HH:MM format
  end: string; // HH:MM format
  name: string;
}

export interface DaySchedule {
  isWorkingDay: boolean;
  shifts: WorkShift[];
}

export interface WeeklySchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface Holiday {
  date?: string; // YYYY-MM-DD format (single date for backwards compatibility)
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  startTime?: string; // HH:MM format (optional for partial day holidays)
  endTime?: string; // HH:MM format (optional for partial day holidays)
  name: string;
  type: 'national' | 'religious' | 'company';
  isFullDay?: boolean; // true for all-day holidays, false for partial day
}

export interface MaintenanceWindow {
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  name: string;
  description?: string;
  type: 'annual' | 'seasonal' | 'emergency' | 'planned';
}

export interface EffectiveHours {
  dailyHours: number;
  weeklyHours: number;
  monthlyHours: number;
  yearlyHours: number;
}

export interface WorkingHours {
  id: string;
  factoryName: string;
  timezone: string;
  weeklySchedule: WeeklySchedule;
  holidays: Holiday[];
  maintenanceWindows: MaintenanceWindow[];
  effectiveHours: EffectiveHours;
  createdAt: string;
  updatedAt: string;
}
