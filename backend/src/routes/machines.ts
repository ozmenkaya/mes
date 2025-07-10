import express from 'express';

const router = express.Router();

// Mock data store (in memory)
let mockMachines = [
  {
    id: '1',
    code: 'CNC-001',
    name: 'CNC Torna Tezgahı #1',
    manufacturer: 'HAAS',
    model: 'ST-20',
    location: 'Üretim Alanı A',
    departments: ['Üretim Atölyesi'],
    assignedPersonnel: ['Ahmet Yılmaz', 'Ali Özkan'],
    status: 'operational',
    capacity: 100,
    efficiency: 87.5,
    utilization: 92.3,
    installationDate: '2023-06-15',
    isActive: true,
    notes: 'Yüksek hassasiyet gerektiren işlemler için kullanılır',
    maintenanceSchedule: {
      lastMaintenanceDate: '2024-12-15',
      nextMaintenanceDate: '2025-02-15',
      maintenanceInterval: 60,
      maintenanceType: 'monthly',
      responsibleTechnician: 'Mehmet Demir',
      maintenanceNotes: 'Yağlama ve kalibrasyon gerekli',
    },
    performanceHistory: [],
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
  },
  {
    id: '2',
    code: 'PRESS-001',
    name: 'Hidrolik Pres #1',
    manufacturer: 'AIDA',
    model: 'HP-500',
    location: 'Üretim Alanı B',
    departments: ['Üretim Atölyesi', 'Kalite Kontrol'],
    assignedPersonnel: ['Ayşe Çelik', 'Fatma Kaya'],
    status: 'maintenance',
    capacity: 500,
    efficiency: 78.2,
    utilization: 85.7,
    installationDate: '2022-03-10',
    isActive: true,
    notes: 'Haftalık bakım programında',
    maintenanceSchedule: {
      lastMaintenanceDate: '2024-12-20',
      nextMaintenanceDate: '2025-03-20',
      maintenanceInterval: 90,
      maintenanceType: 'quarterly',
      responsibleTechnician: 'Mustafa Avcı',
      maintenanceNotes: 'Hidrolik sistem kontrolü',
    },
    performanceHistory: [],
    createdAt: '2022-03-10T09:00:00Z',
    updatedAt: '2024-12-20T16:45:00Z',
  }
];

// GET /api/machines - Tüm makinaları getir
router.get('/', async (req: any, res: any) => {
  try {
    res.json(mockMachines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
});

// POST /api/machines - Yeni makina ekle
router.post('/', async (req: any, res: any) => {
  try {
    const newMachine = {
      id: (mockMachines.length + 1).toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      efficiency: req.body.efficiency || 85.0,
      utilization: req.body.utilization || 75.0,
      status: req.body.status || 'operational',
      isActive: req.body.isActive !== false,
      maintenanceSchedule: {
        maintenanceInterval: 30,
        maintenanceType: 'monthly',
        lastMaintenanceDate: '',
        nextMaintenanceDate: '',
        responsibleTechnician: '',
        maintenanceNotes: '',
        ...req.body.maintenanceSchedule
      }
    };
    
    mockMachines.push(newMachine);
    res.status(201).json({ message: 'Machine created successfully', machineId: newMachine.id });
  } catch (error) {
    console.error('Error creating machine:', error);
    res.status(500).json({ error: 'Failed to create machine' });
  }
});

// PUT /api/machines/:id - Makina güncelle
router.put('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const machineIndex = mockMachines.findIndex(m => m.id === id);
    
    if (machineIndex === -1) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    
    mockMachines[machineIndex] = {
      ...mockMachines[machineIndex],
      ...req.body,
      id, // Keep original ID
      updatedAt: new Date().toISOString(),
    };
    
    res.json({ message: 'Machine updated successfully' });
  } catch (error) {
    console.error('Error updating machine:', error);
    res.status(500).json({ error: 'Failed to update machine' });
  }
});

// DELETE /api/machines/:id - Makina sil
router.delete('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const machineIndex = mockMachines.findIndex(m => m.id === id);
    
    if (machineIndex === -1) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    
    mockMachines.splice(machineIndex, 1);
    res.json({ message: 'Machine deleted successfully' });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ error: 'Failed to delete machine' });
  }
});

export default router;
