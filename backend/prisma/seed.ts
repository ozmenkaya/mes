import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        code: 'URETIM',
        name: 'Üretim Atölyesi',
        manager: 'Ali Özkan',
        location: 'Üretim Alanı',
        description: 'Ana üretim departmanı'
      }
    }),
    prisma.department.create({
      data: {
        code: 'MONTAJ',
        name: 'Montaj Atölyesi',
        manager: 'Mehmet Demir',
        location: 'Montaj Alanı',
        description: 'Montaj işlemleri departmanı'
      }
    }),
    prisma.department.create({
      data: {
        code: 'KALITE',
        name: 'Kalite Kontrol',
        manager: 'Fatma Kaya',
        location: 'Kalite Kontrol Alanı',
        description: 'Kalite kontrol ve test departmanı'
      }
    }),
    prisma.department.create({
      data: {
        code: 'BAKIM',
        name: 'Bakım Atölyesi',
        manager: 'Mustafa Avcı',
        location: 'Bakım Atölyesi',
        description: 'Makina bakım ve onarım departmanı'
      }
    }),
    prisma.department.create({
      data: {
        code: 'DEPO',
        name: 'Depo',
        manager: 'Ayşe Çelik',
        location: 'Depo Alanı',
        description: 'Malzeme deposu'
      }
    })
  ]);

  // Create locations
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        code: 'URT-A',
        name: 'Üretim Alanı A',
        type: 'area',
        description: 'Ana üretim alanı'
      }
    }),
    prisma.location.create({
      data: {
        code: 'URT-B',
        name: 'Üretim Alanı B',
        type: 'area',
        description: 'İkinci üretim alanı'
      }
    }),
    prisma.location.create({
      data: {
        code: 'MNT-1',
        name: 'Montaj Hattı 1',
        type: 'workstation',
        description: 'Birinci montaj hattı'
      }
    }),
    prisma.location.create({
      data: {
        code: 'MNT-2',
        name: 'Montaj Hattı 2',
        type: 'workstation',
        description: 'İkinci montaj hattı'
      }
    }),
    prisma.location.create({
      data: {
        code: 'KLT-A',
        name: 'Kalite Kontrol Alanı',
        type: 'area',
        description: 'Kalite kontrol test alanı'
      }
    }),
    prisma.location.create({
      data: {
        code: 'BKM-A',
        name: 'Bakım Atölyesi',
        type: 'area',
        description: 'Bakım ve onarım atölyesi'
      }
    })
  ]);

  // Create personnel
  const personnel = await Promise.all([
    prisma.personnel.create({
      data: {
        name: 'Ahmet Yılmaz',
        position: 'Makina Operatörü',
        email: 'ahmet.yilmaz@mes.com',
        phone: '555-0001',
        departmentId: departments[0].id
      }
    }),
    prisma.personnel.create({
      data: {
        name: 'Mehmet Demir',
        position: 'Bakım Teknisyeni',
        email: 'mehmet.demir@mes.com',
        phone: '555-0002',
        departmentId: departments[3].id
      }
    }),
    prisma.personnel.create({
      data: {
        name: 'Fatma Kaya',
        position: 'Kalite Kontrol Uzmanı',
        email: 'fatma.kaya@mes.com',
        phone: '555-0003',
        departmentId: departments[2].id
      }
    }),
    prisma.personnel.create({
      data: {
        name: 'Ali Özkan',
        position: 'Vardiya Amiri',
        email: 'ali.ozkan@mes.com',
        phone: '555-0004',
        departmentId: departments[0].id
      }
    }),
    prisma.personnel.create({
      data: {
        name: 'Ayşe Çelik',
        position: 'Makina Operatörü',
        email: 'ayse.celik@mes.com',
        phone: '555-0005',
        departmentId: departments[0].id
      }
    }),
    prisma.personnel.create({
      data: {
        name: 'Mustafa Avcı',
        position: 'Elektrik Teknisyeni',
        email: 'mustafa.avci@mes.com',
        phone: '555-0006',
        departmentId: departments[3].id
      }
    })
  ]);

  // Create machines
  const machine1 = await prisma.machine.create({
    data: {
      code: 'CNC-001',
      name: 'CNC Torna Tezgahı #1',
      manufacturer: 'HAAS',
      model: 'ST-20',
      locationId: locations[0].id,
      status: 'operational',
      capacity: 100,
      efficiency: 87.5,
      utilization: 92.3,
      installationDate: new Date('2023-06-15'),
      isActive: true,
      notes: 'Yüksek hassasiyet gerektiren işlemler için kullanılır'
    }
  });

  const machine2 = await prisma.machine.create({
    data: {
      code: 'PRESS-001',
      name: 'Hidrolik Pres #1',
      manufacturer: 'AIDA',
      model: 'HP-500',
      locationId: locations[1].id,
      status: 'maintenance',
      capacity: 500,
      efficiency: 78.2,
      utilization: 85.7,
      installationDate: new Date('2022-03-10'),
      isActive: true,
      notes: 'Haftalık bakım programında'
    }
  });

  const machine3 = await prisma.machine.create({
    data: {
      code: 'ROBOT-001',
      name: 'Endüstriyel Robot #1',
      manufacturer: 'KUKA',
      model: 'KR-120',
      locationId: locations[2].id,
      status: 'operational',
      capacity: 120,
      efficiency: 94.1,
      utilization: 88.9,
      installationDate: new Date('2023-01-20'),
      isActive: true,
      notes: 'Otomatik montaj işlemleri için kullanılır'
    }
  });

  // Create machine-department relationships
  await prisma.machineOnDepartment.createMany({
    data: [
      { machineId: machine1.id, departmentId: departments[0].id },
      { machineId: machine2.id, departmentId: departments[0].id },
      { machineId: machine2.id, departmentId: departments[2].id },
      { machineId: machine3.id, departmentId: departments[1].id }
    ]
  });

  // Create machine-personnel relationships
  await prisma.machineOnPersonnel.createMany({
    data: [
      { machineId: machine1.id, personnelId: personnel[0].id },
      { machineId: machine1.id, personnelId: personnel[3].id },
      { machineId: machine2.id, personnelId: personnel[4].id },
      { machineId: machine2.id, personnelId: personnel[2].id },
      { machineId: machine3.id, personnelId: personnel[3].id }
    ]
  });

  // Create maintenance schedules
  await Promise.all([
    prisma.maintenanceSchedule.create({
      data: {
        machineId: machine1.id,
        lastMaintenanceDate: new Date('2024-12-15'),
        nextMaintenanceDate: new Date('2025-02-15'),
        maintenanceInterval: 60,
        maintenanceType: 'monthly',
        responsibleTechnicianId: personnel[1].id,
        maintenanceNotes: 'Yağlama ve kalibrasyon gerekli'
      }
    }),
    prisma.maintenanceSchedule.create({
      data: {
        machineId: machine2.id,
        lastMaintenanceDate: new Date('2024-12-20'),
        nextMaintenanceDate: new Date('2025-03-20'),
        maintenanceInterval: 90,
        maintenanceType: 'quarterly',
        responsibleTechnicianId: personnel[5].id,
        maintenanceNotes: 'Hidrolik sistem kontrolü'
      }
    }),
    prisma.maintenanceSchedule.create({
      data: {
        machineId: machine3.id,
        lastMaintenanceDate: new Date('2024-11-30'),
        nextMaintenanceDate: new Date('2025-01-30'),
        maintenanceInterval: 30,
        maintenanceType: 'monthly',
        responsibleTechnicianId: personnel[1].id,
        maintenanceNotes: 'Yazılım güncellemesi ve sensor kalibrasyonu'
      }
    })
  ]);

  // Create default users
  const hashedPassword = await bcrypt.hash('123456', 12);
  
  await Promise.all([
    prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@mes.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      }
    }),
    prisma.user.create({
      data: {
        username: 'operator',
        email: 'operator@mes.com',
        password: hashedPassword,
        firstName: 'Operator',
        lastName: 'User',
        role: 'operator'
      }
    }),
    prisma.user.create({
      data: {
        username: 'manager',
        email: 'manager@mes.com',
        password: hashedPassword,
        firstName: 'Manager',
        lastName: 'User',
        role: 'manager'
      }
    })
  ]);

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
