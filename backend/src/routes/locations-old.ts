import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/locations - Tüm lokasyonları getir
router.get('/', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        parent: true,
        children: true,
        machines: true
      }
    });

    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// POST /api/locations - Yeni lokasyon ekle
router.post('/', async (req, res) => {
  try {
    const location = await prisma.location.create({
      data: req.body
    });

    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// PUT /api/locations/:id - Lokasyon güncelle
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const location = await prisma.location.update({
      where: { id },
      data: req.body
    });

    res.json(location);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// DELETE /api/locations/:id - Lokasyon sil
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.location.delete({
      where: { id }
    });

    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

export default router;
