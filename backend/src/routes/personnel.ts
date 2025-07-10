import express from 'express';

const router = express.Router();

// GET /api/personnel - Tüm personeli getir
router.get('/', async (req: any, res: any) => {
  try {
    const mockPersonnel = [
      { id: '1', name: 'Ahmet Yılmaz', position: 'Makina Operatörü' },
      { id: '2', name: 'Mehmet Demir', position: 'Bakım Teknisyeni' },
      { id: '3', name: 'Fatma Kaya', position: 'Kalite Kontrol Uzmanı' },
      { id: '4', name: 'Ali Özkan', position: 'Vardiya Amiri' },
      { id: '5', name: 'Ayşe Çelik', position: 'Makina Operatörü' },
      { id: '6', name: 'Mustafa Avcı', position: 'Elektrik Teknisyeni' },
    ];

    res.json(mockPersonnel);
  } catch (error) {
    console.error('Error fetching personnel:', error);
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
});

export default router;
