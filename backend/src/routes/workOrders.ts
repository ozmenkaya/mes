import express from 'express';

const router = express.Router();

// Mock data store (in memory)
let mockWorkOrders = [
  {
    id: '1',
    orderNumber: 'WO-2025-001',
    productCode: 'PRD-001',
    productName: 'Makina Parçası A',
    quantity: 100,
    plannedStartDate: '2025-01-20',
    plannedEndDate: '2025-01-25',
    actualStartDate: '2025-01-20',
    status: 'in_progress',
    priority: 'high',
    assignedOperator: 'Ahmet Yılmaz',
    workstation: 'CNC-001',
    progress: 65,
    notes: 'Öncelikli iş emri',
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-20T10:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'WO-2025-002',
    productCode: 'PRD-002',
    productName: 'Motor Gövdesi',
    quantity: 50,
    plannedStartDate: '2025-01-22',
    plannedEndDate: '2025-01-28',
    status: 'planned',
    priority: 'medium',
    assignedOperator: 'Mehmet Kaya',
    workstation: 'FRZ-002',
    progress: 0,
    notes: 'Standart üretim',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-16T09:00:00Z'
  },
  {
    id: '3',
    orderNumber: 'WO-2025-003',
    productCode: 'PRD-003',
    productName: 'Bağlantı Elemanı',
    quantity: 200,
    plannedStartDate: '2025-01-18',
    plannedEndDate: '2025-01-22',
    actualStartDate: '2025-01-18',
    actualEndDate: '2025-01-21',
    status: 'completed',
    priority: 'low',
    assignedOperator: 'Ali Özkan',
    workstation: 'TRN-001',
    progress: 100,
    notes: 'Zamanında tamamlandı',
    createdAt: '2025-01-14T07:30:00Z',
    updatedAt: '2025-01-21T16:00:00Z'
  }
];

// GET /api/work-orders - Tüm iş emirlerini getir
router.get('/', async (req: any, res: any) => {
  try {
    res.json(mockWorkOrders);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    res.status(500).json({ error: 'Failed to fetch work orders' });
  }
});

// GET /api/work-orders/:id - Belirli bir iş emrini getir
router.get('/:id', async (req: any, res: any) => {
  try {
    const workOrder = mockWorkOrders.find(wo => wo.id === req.params.id);
    if (!workOrder) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.json(workOrder);
  } catch (error) {
    console.error('Error fetching work order:', error);
    res.status(500).json({ error: 'Failed to fetch work order' });
  }
});

// POST /api/work-orders - Yeni iş emri oluştur
router.post('/', async (req: any, res: any) => {
  try {
    const newWorkOrder = {
      id: (mockWorkOrders.length + 1).toString(),
      orderNumber: `WO-2025-${String(mockWorkOrders.length + 1).padStart(3, '0')}`,
      ...req.body,
      status: req.body.status || 'planned',
      priority: req.body.priority || 'medium',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockWorkOrders.push(newWorkOrder);
    res.status(201).json(newWorkOrder);
  } catch (error) {
    console.error('Error creating work order:', error);
    res.status(500).json({ error: 'Failed to create work order' });
  }
});

// PUT /api/work-orders/:id - İş emrini güncelle
router.put('/:id', async (req: any, res: any) => {
  try {
    const index = mockWorkOrders.findIndex(wo => wo.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    mockWorkOrders[index] = {
      ...mockWorkOrders[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json(mockWorkOrders[index]);
  } catch (error) {
    console.error('Error updating work order:', error);
    res.status(500).json({ error: 'Failed to update work order' });
  }
});

// DELETE /api/work-orders/:id - İş emrini sil
router.delete('/:id', async (req: any, res: any) => {
  try {
    const index = mockWorkOrders.findIndex(wo => wo.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    const deletedWorkOrder = mockWorkOrders.splice(index, 1)[0];
    res.json({ message: 'Work order deleted successfully', workOrder: deletedWorkOrder });
  } catch (error) {
    console.error('Error deleting work order:', error);
    res.status(500).json({ error: 'Failed to delete work order' });
  }
});

// PATCH /api/work-orders/:id/status - İş emri durumunu güncelle
router.patch('/:id/status', async (req: any, res: any) => {
  try {
    const { status } = req.body;
    const index = mockWorkOrders.findIndex(wo => wo.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Work order not found' });
    }

    // Status değişikliklerine göre tarih güncellemeleri
    const updates: any = { status, updatedAt: new Date().toISOString() };
    
    if (status === 'in_progress' && !mockWorkOrders[index].actualStartDate) {
      updates.actualStartDate = new Date().toISOString().split('T')[0];
    }
    
    if (status === 'completed' && !mockWorkOrders[index].actualEndDate) {
      updates.actualEndDate = new Date().toISOString().split('T')[0];
      updates.progress = 100;
    }

    mockWorkOrders[index] = { ...mockWorkOrders[index], ...updates };
    res.json(mockWorkOrders[index]);
  } catch (error) {
    console.error('Error updating work order status:', error);
    res.status(500).json({ error: 'Failed to update work order status' });
  }
});

export default router;
