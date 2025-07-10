import express from 'express';

const router = express.Router();

// GET /api/locations - Tüm lokasyonları getir
router.get('/', async (req: any, res: any) => {
  try {
    const mockLocations = [
      { id: '1', name: 'Üretim Alanı A', code: 'URT-A' },
      { id: '2', name: 'Üretim Alanı B', code: 'URT-B' },
      { id: '3', name: 'Montaj Hattı 1', code: 'MNT-1' },
      { id: '4', name: 'Montaj Hattı 2', code: 'MNT-2' },
      { id: '5', name: 'Kalite Kontrol Alanı', code: 'KLT-A' },
      { id: '6', name: 'Bakım Atölyesi', code: 'BKM-A' },
    ];

    res.json(mockLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

export default router;
