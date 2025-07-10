import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/personnel - Tüm personeli getir
router.get('/', async (req, res) => {
  try {
    const personnel = await prisma.personnel.findMany({
      include: {
        department: true,
        machines: {
          include: {
            machine: true
          }
        }
      }
    });

    res.json(personnel);
  } catch (error) {
    console.error('Error fetching personnel:', error);
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
});

// POST /api/personnel - Yeni personel ekle
router.post('/', async (req, res) => {
  try {
    const personnel = await prisma.personnel.create({
      data: req.body
    });

    res.status(201).json(personnel);
  } catch (error) {
    console.error('Error creating personnel:', error);
    res.status(500).json({ error: 'Failed to create personnel' });
  }
});

// PUT /api/personnel/:id - Personel güncelle
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const personnel = await prisma.personnel.update({
      where: { id },
      data: req.body
    });

    res.json(personnel);
  } catch (error) {
    console.error('Error updating personnel:', error);
    res.status(500).json({ error: 'Failed to update personnel' });
  }
});

// DELETE /api/personnel/:id - Personel sil
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.personnel.delete({
      where: { id }
    });

    res.json({ message: 'Personnel deleted successfully' });
  } catch (error) {
    console.error('Error deleting personnel:', error);
    res.status(500).json({ error: 'Failed to delete personnel' });
  }
});

export default router;
