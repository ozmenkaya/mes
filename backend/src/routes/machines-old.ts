import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/machines - Tüm makinaları getir
router.get('/', async (req, res) => {
  try {
    const machines = await prisma.machine.findMany({
      include: {
        location: true,
        departments: {
          include: {
            department: true
          }
        },
        assignedPersonnel: {
          include: {
            personnel: true
          }
        },
        maintenanceSchedule: {
          include: {
            responsibleTechnician: true
          }
        }
      }
    });

    // Transform data to match frontend format
    const transformedMachines = machines.map((machine: any) => ({
      id: machine.id,
      code: machine.code,
      name: machine.name,
      manufacturer: machine.manufacturer,
      model: machine.model,
      location: machine.location.name,
      departments: machine.departments.map((d: any) => d.department.name),
      assignedPersonnel: machine.assignedPersonnel.map((p: any) => p.personnel.name),
      status: machine.status,
      capacity: machine.capacity,
      efficiency: machine.efficiency,
      utilization: machine.utilization,
      installationDate: machine.installationDate.toISOString().split('T')[0],
      isActive: machine.isActive,
      notes: machine.notes,
      maintenanceSchedule: {
        lastMaintenanceDate: machine.maintenanceSchedule?.lastMaintenanceDate?.toISOString().split('T')[0],
        nextMaintenanceDate: machine.maintenanceSchedule?.nextMaintenanceDate?.toISOString().split('T')[0],
        maintenanceInterval: machine.maintenanceSchedule?.maintenanceInterval || 30,
        maintenanceType: machine.maintenanceSchedule?.maintenanceType || 'monthly',
        responsibleTechnician: machine.maintenanceSchedule?.responsibleTechnician?.name,
        maintenanceNotes: machine.maintenanceSchedule?.maintenanceNotes
      },
      performanceHistory: [],
      createdAt: machine.createdAt.toISOString(),
      updatedAt: machine.updatedAt.toISOString()
    }));

    res.json(transformedMachines);
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).json({ error: 'Failed to fetch machines' });
  }
});

export default router;
