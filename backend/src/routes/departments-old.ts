import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/departments - Tüm departmanları getir
router.get('/', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        personnel: true,
        machines: {
          include: {
            machine: true
          }
        }
      }
    });

    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// POST /api/departments - Yeni departman ekle
router.post('/', async (req, res) => {
  try {
    const department = await prisma.department.create({
      data: req.body
    });

    res.status(201).json(department);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
});

// PUT /api/departments/:id - Departman güncelle
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const department = await prisma.department.update({
      where: { id },
      data: req.body
    });

    res.json(department);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department' });
  }
});

// DELETE /api/departments/:id - Departman sil
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.department.delete({
      where: { id }
    });

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

export default router;
