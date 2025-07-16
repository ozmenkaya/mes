const http = require('http');
const url = require('url');

const PORT = 3001;

// Mock Working Hours Data
const mockWorkingHours = {
  id: '1',
  weeklySchedule: {
    monday: {
      isWorkingDay: true,
      shifts: [
        { startTime: '08:00', endTime: '16:00', name: 'Gündüz' },
        { startTime: '16:00', endTime: '00:00', name: 'Akşam' }
      ]
    },
    tuesday: {
      isWorkingDay: true,
      shifts: [
        { startTime: '08:00', endTime: '16:00', name: 'Gündüz' },
        { startTime: '16:00', endTime: '00:00', name: 'Akşam' }
      ]
    },
    wednesday: {
      isWorkingDay: true,
      shifts: [
        { startTime: '08:00', endTime: '16:00', name: 'Gündüz' },
        { startTime: '16:00', endTime: '00:00', name: 'Akşam' }
      ]
    },
    thursday: {
      isWorkingDay: true,
      shifts: [
        { startTime: '08:00', endTime: '16:00', name: 'Gündüz' },
        { startTime: '16:00', endTime: '00:00', name: 'Akşam' }
      ]
    },
    friday: {
      isWorkingDay: true,
      shifts: [
        { startTime: '08:00', endTime: '16:00', name: 'Gündüz' },
        { startTime: '16:00', endTime: '00:00', name: 'Akşam' }
      ]
    },
    saturday: {
      isWorkingDay: false,
      shifts: []
    },
    sunday: {
      isWorkingDay: false,
      shifts: []
    }
  },
  effectiveHours: {
    dailyHours: 16,
    weeklyHours: 80,
    monthlyHours: 320
  }
};

const mockHolidays = [
  {
    id: '1',
    name: 'Yılbaşı',
    startDate: '2024-01-01',
    endDate: '2024-01-01',
    type: 'national',
    isFullDay: true,
    isRecurring: true
  },
  {
    id: '2',
    name: 'Ramazan Bayramı',
    startDate: '2024-04-10',
    endDate: '2024-04-13',
    type: 'religious',
    isFullDay: true,
    isRecurring: false
  },
  {
    id: '3',
    name: 'Yarım Gün Şirket Etkinliği',
    startDate: '2024-06-15',
    endDate: '2024-06-15',
    startTime: '14:00',
    endTime: '18:00',
    type: 'company',
    isFullDay: false,
    isRecurring: false
  }
];

const mockMaintenanceWindows = [
  {
    id: '1',
    name: 'Haftalık Bakım',
    startDate: '2024-01-07',
    endDate: '2024-01-07',
    startTime: '02:00',
    endTime: '06:00',
    description: 'Haftalık rutin bakım',
    isRecurring: true,
    recurrencePattern: 'weekly'
  }
];

// Mock Customers Data
const mockCustomers = [
  {
    id: '1',
    type: 'customer',
    companyName: 'ABC Teknoloji Ltd.',
    contactPerson: 'Ahmet Yılmaz',
    email: 'ahmet@abcteknoloji.com',
    phone: '+90 212 555 0001',
    address: {
      street: 'Teknoloji Cad. No: 15',
      city: 'İstanbul',
      state: 'İstanbul',
      postalCode: '34000',
      country: 'Türkiye'
    },
    taxNumber: '1234567890',
    category: 'Teknoloji',
    paymentTerms: '30 gün',
    creditLimit: 100000,
    status: 'active',
    notes: 'Önemli müşteri',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    type: 'supplier',
    companyName: 'XYZ Malzeme A.Ş.',
    contactPerson: 'Fatma Demir',
    email: 'fatma@xyzmalzeme.com',
    phone: '+90 232 555 0002',
    address: {
      street: 'Sanayi Mah. 45. Sok. No: 8',
      city: 'İzmir',
      state: 'İzmir',
      postalCode: '35000',
      country: 'Türkiye'
    },
    taxNumber: '0987654321',
    category: 'Hammadde',
    paymentTerms: '15 gün',
    creditLimit: 50000,
    status: 'active',
    notes: 'Güvenilir tedarikçi',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    type: 'both',
    companyName: 'DEF Endüstri A.Ş.',
    contactPerson: 'Mehmet Kaya',
    email: 'mehmet@defendustri.com',
    phone: '+90 312 555 0003',
    address: {
      street: 'Organize Sanayi Bölgesi 12. Cad.',
      city: 'Ankara',
      state: 'Ankara',
      postalCode: '06000',
      country: 'Türkiye'
    },
    taxNumber: '1122334455',
    category: 'İmalat',
    paymentTerms: '45 gün',
    creditLimit: 200000,
    status: 'active',
    notes: 'Hem müşteri hem tedarikçi',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const mockMachines = [
  {
    id: '1',
    name: 'CNC Torna Tezgahı',
    code: 'CNC-001',
    type: 'CNC',
    manufacturer: 'HAAS',
    model: 'ST-20',
    serialNumber: 'SN123456',
    status: 'running',
    department: 'Torna',
    departments: ['Torna'],
    assignedPersonnel: ['Ahmet Yılmaz'],
    location: 'Üretim Sahası A',
    capacity: 100,
    efficiency: 85,
    operatingHours: 1850,
    maintenanceHours: 150,
    installationDate: '2023-01-15',
    lastMaintenanceDate: '2024-12-01',
    nextMaintenanceDate: '2025-01-15'
  },
  {
    id: '2',
    name: 'Freze Makinası',
    code: 'FRZ-002',
    type: 'Freze',
    manufacturer: 'DMG MORI',
    model: 'DMU-50',
    serialNumber: 'SN789012',
    status: 'idle',
    department: 'Freze',
    departments: ['Freze'],
    assignedPersonnel: ['Mehmet Kaya'],
    location: 'Üretim Sahası B',
    capacity: 80,
    efficiency: 78,
    operatingHours: 1650,
    maintenanceHours: 120,
    installationDate: '2023-03-20',
    lastMaintenanceDate: '2024-11-15',
    nextMaintenanceDate: '2025-02-15'
  }
];

const mockDepartments = [
  { id: '1', name: 'Torna', code: 'TRN', description: 'Torna işleri departmanı' },
  { id: '2', name: 'Freze', code: 'FRZ', description: 'Freze işleri departmanı' },
  { id: '3', name: 'Montaj', code: 'MNT', description: 'Montaj departmanı' }
];

const mockPersonnel = [
  { id: '1', name: 'Ahmet Yılmaz', position: 'Operatör', department: 'Torna' },
  { id: '2', name: 'Mehmet Kaya', position: 'Tekniker', department: 'Freze' },
  { id: '3', name: 'Fatma Demir', position: 'Mühendis', department: 'Montaj' }
];

const mockLocations = [
  { id: '1', name: 'Üretim Sahası A', code: 'USA', type: 'production' },
  { id: '2', name: 'Üretim Sahası B', code: 'USB', type: 'production' },
  { id: '3', name: 'Depo', code: 'DEP', type: 'storage' }
];

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // Routes
  if (path === '/api/working-hours' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockWorkingHours));
  } else if (path === '/api/working-hours' && method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        Object.assign(mockWorkingHours, data);
        res.writeHead(200);
        res.end(JSON.stringify(mockWorkingHours));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path === '/api/working-hours/holidays' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockHolidays));
  } else if (path === '/api/working-hours/holidays' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newHoliday = { id: Date.now().toString(), ...data };
        mockHolidays.push(newHoliday);
        res.writeHead(201);
        res.end(JSON.stringify(newHoliday));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/working-hours/holidays/') && method === 'DELETE') {
    const dateParam = path.split('/').pop();
    const index = mockHolidays.findIndex(h => h.startDate === dateParam);
    if (index !== -1) {
      mockHolidays.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Holiday not found' }));
    }
  } else if (path === '/api/working-hours/maintenance' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockMaintenanceWindows));
  } else if (path === '/api/working-hours/maintenance' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newMaintenance = { id: Date.now().toString(), ...data };
        mockMaintenanceWindows.push(newMaintenance);
        res.writeHead(201);
        res.end(JSON.stringify(newMaintenance));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/working-hours/maintenance/') && method === 'DELETE') {
    const id = path.split('/').pop();
    const index = mockMaintenanceWindows.findIndex(m => m.id === id);
    if (index !== -1) {
      mockMaintenanceWindows.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Maintenance window not found' }));
    }
  } else if (path === '/api/machines' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockMachines));
  } else if (path === '/api/machines' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newMachine = { id: Date.now().toString(), ...data };
        mockMachines.push(newMachine);
        res.writeHead(201);
        res.end(JSON.stringify(newMachine));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/machines/') && method === 'PUT') {
    const id = path.split('/').pop();
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const index = mockMachines.findIndex(m => m.id === id);
        if (index !== -1) {
          mockMachines[index] = { ...mockMachines[index], ...data };
          res.writeHead(200);
          res.end(JSON.stringify(mockMachines[index]));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Machine not found' }));
        }
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/machines/') && method === 'DELETE') {
    const id = path.split('/').pop();
    const index = mockMachines.findIndex(m => m.id === id);
    if (index !== -1) {
      mockMachines.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Machine not found' }));
    }
  } else if (path === '/api/departments' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockDepartments));
  } else if (path === '/api/personnel' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockPersonnel));
  } else if (path === '/api/locations' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockLocations));
  } else if (path === '/api/customers' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(mockCustomers));
  } else if (path === '/api/customers' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newCustomer = { 
          id: Date.now().toString(), 
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockCustomers.push(newCustomer);
        res.writeHead(201);
        res.end(JSON.stringify(newCustomer));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/customers/') && method === 'PUT') {
    const id = path.split('/').pop();
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const index = mockCustomers.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCustomers[index] = { 
            ...mockCustomers[index], 
            ...data,
            updatedAt: new Date().toISOString()
          };
          res.writeHead(200);
          res.end(JSON.stringify(mockCustomers[index]));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Customer not found' }));
        }
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (path.startsWith('/api/customers/') && method === 'DELETE') {
    const id = path.split('/').pop();
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCustomers.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Customer not found' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Simple MES Backend API server is running on port ${PORT}`);
  console.log(`📊 Working Hours API: http://localhost:${PORT}/api/working-hours`);
  console.log(`👥 Customers API: http://localhost:${PORT}/api/customers`);
});
