import express from 'express';

const router = express.Router();

// GET /api/departments - Tüm departmanları getir
router.get('/', async (req: any, res: any) => {
  try {
    const mockDepartments = [
      { id: '1', name: 'Üretim Atölyesi', code: 'URETIM' },
      { id: '2', name: 'Montaj Atölyesi', code: 'MONTAJ' },
      { id: '3', name: 'Kalite Kontrol', code: 'KALITE' },
      { id: '4', name: 'Bakım Atölyesi', code: 'BAKIM' },
      { id: '5', name: 'Depo', code: 'DEPO' },
    ];

    res.json(mockDepartments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

export default router;
