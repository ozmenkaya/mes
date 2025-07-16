import express from 'express';

const router = express.Router();

// Mock data store (in memory)
let mockWorkingHours = {
  id: '1',
  factoryName: 'Ana Üretim Tesisi',
  timezone: 'Europe/Istanbul',
  weeklySchedule: {
    monday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }, { start: '16:00', end: '00:00', name: 'Akşam Vardiyası' }] },
    tuesday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }, { start: '16:00', end: '00:00', name: 'Akşam Vardiyası' }] },
    wednesday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }, { start: '16:00', end: '00:00', name: 'Akşam Vardiyası' }] },
    thursday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }, { start: '16:00', end: '00:00', name: 'Akşam Vardiyası' }] },
    friday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }, { start: '16:00', end: '00:00', name: 'Akşam Vardiyası' }] },
    saturday: { isWorkingDay: true, shifts: [{ start: '08:00', end: '16:00', name: 'Gündüz Vardiyası' }] },
    sunday: { isWorkingDay: false, shifts: [] }
  },
  holidays: [
    { date: '2025-01-01', name: 'Yılbaşı', type: 'national' },
    { date: '2025-04-23', name: 'Ulusal Egemenlik ve Çocuk Bayramı', type: 'national' },
    { date: '2025-05-01', name: 'İşçi Bayramı', type: 'national' },
    { date: '2025-05-19', name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', type: 'national' },
    { date: '2025-07-15', name: 'Demokrasi ve Milli Birlik Günü', type: 'national' },
    { date: '2025-08-30', name: 'Zafer Bayramı', type: 'national' },
    { date: '2025-10-29', name: 'Cumhuriyet Bayramı', type: 'national' },
    { date: '2025-03-31', name: 'Ramazan Bayramı', type: 'religious' },
    { date: '2025-04-01', name: 'Ramazan Bayramı', type: 'religious' },
    { date: '2025-04-02', name: 'Ramazan Bayramı', type: 'religious' },
    { date: '2025-06-07', name: 'Kurban Bayramı', type: 'religious' },
    { date: '2025-06-08', name: 'Kurban Bayramı', type: 'religious' },
    { date: '2025-06-09', name: 'Kurban Bayramı', type: 'religious' },
    { date: '2025-06-10', name: 'Kurban Bayramı', type: 'religious' }
  ],
  maintenanceWindows: [
    { 
      startDate: '2025-08-01', 
      endDate: '2025-08-15', 
      name: 'Yıllık Bakım Dönemi',
      description: 'Fabrika geneli makina bakımı ve kalibrasyonu',
      type: 'annual'
    },
    { 
      startDate: '2025-12-25', 
      endDate: '2025-12-31', 
      name: 'Yıl Sonu Bakım',
      description: 'Elektrik sistemi bakımı ve güvenlik kontrolleri',
      type: 'seasonal'
    }
  ],
  effectiveHours: {
    dailyHours: 16, // Toplam günlük çalışma saati
    weeklyHours: 96, // Haftalık toplam saat
    monthlyHours: 416, // Aylık ortalama saat
    yearlyHours: 4992 // Yıllık toplam saat (tatiller çıkarılmış)
  },
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-07-15T00:00:00Z'
};

// GET /api/working-hours - Çalışma zamanlarını getir
router.get('/', async (req: any, res: any) => {
  try {
    res.json(mockWorkingHours);
  } catch (error) {
    console.error('Error fetching working hours:', error);
    res.status(500).json({ error: 'Failed to fetch working hours' });
  }
});

// PUT /api/working-hours - Çalışma zamanlarını güncelle
router.put('/', async (req: any, res: any) => {
  try {
    const updatedData = req.body;
    mockWorkingHours = {
      ...mockWorkingHours,
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    res.json({ message: 'Working hours updated successfully', data: mockWorkingHours });
  } catch (error) {
    console.error('Error updating working hours:', error);
    res.status(500).json({ error: 'Failed to update working hours' });
  }
});

// POST /api/working-hours/holidays - Yeni tatil ekle
router.post('/holidays', async (req: any, res: any) => {
  try {
    const newHoliday = {
      ...req.body,
      id: (mockWorkingHours.holidays.length + 1).toString()
    };
    mockWorkingHours.holidays.push(newHoliday);
    mockWorkingHours.updatedAt = new Date().toISOString();
    res.json({ message: 'Holiday added successfully', holiday: newHoliday });
  } catch (error) {
    console.error('Error adding holiday:', error);
    res.status(500).json({ error: 'Failed to add holiday' });
  }
});

// DELETE /api/working-hours/holidays/:date - Tatil sil
router.delete('/holidays/:date', async (req: any, res: any) => {
  try {
    const { date } = req.params;
    mockWorkingHours.holidays = mockWorkingHours.holidays.filter(h => h.date !== date);
    mockWorkingHours.updatedAt = new Date().toISOString();
    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ error: 'Failed to delete holiday' });
  }
});

// POST /api/working-hours/maintenance - Yeni bakım penceresi ekle
router.post('/maintenance', async (req: any, res: any) => {
  try {
    const newMaintenance = {
      ...req.body,
      id: (mockWorkingHours.maintenanceWindows.length + 1).toString()
    };
    mockWorkingHours.maintenanceWindows.push(newMaintenance);
    mockWorkingHours.updatedAt = new Date().toISOString();
    res.json({ message: 'Maintenance window added successfully', maintenance: newMaintenance });
  } catch (error) {
    console.error('Error adding maintenance window:', error);
    res.status(500).json({ error: 'Failed to add maintenance window' });
  }
});

// DELETE /api/working-hours/maintenance/:startDate - Bakım penceresi sil
router.delete('/maintenance/:startDate', async (req: any, res: any) => {
  try {
    const { startDate } = req.params;
    mockWorkingHours.maintenanceWindows = mockWorkingHours.maintenanceWindows.filter(m => m.startDate !== startDate);
    mockWorkingHours.updatedAt = new Date().toISOString();
    res.json({ message: 'Maintenance window deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance window:', error);
    res.status(500).json({ error: 'Failed to delete maintenance window' });
  }
});

export default router;
