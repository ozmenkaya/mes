const http = require('http');
const url = require('url');
const { Pool } = require('pg');

// PostgreSQL bağlantı havuzu
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mes_production',
  user: process.env.DB_USER || 'mes_user',
  password: process.env.DB_PASSWORD || 'mes_secure_password_2024',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database bağlantısını test et
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Database connection error:', err.stack);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

// CORS headers ekle
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// JSON response gönder
function sendJsonResponse(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Request body'yi oku
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Working Hours API
async function handleWorkingHours(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM working_hours ORDER BY id DESC LIMIT 1');
      const workingHours = result.rows[0] || null;
      sendJsonResponse(res, 200, workingHours);
    } else if (method === 'POST' || method === 'PUT') {
      const data = await getRequestBody(req);
      
      // Mevcut kayıt var mı kontrol et
      const existingResult = await pool.query('SELECT id FROM working_hours LIMIT 1');
      
      if (existingResult.rows.length > 0) {
        // Update existing record
        const query = `
          UPDATE working_hours SET
            monday_start = $1, monday_end = $2, monday_enabled = $3,
            tuesday_start = $4, tuesday_end = $5, tuesday_enabled = $6,
            wednesday_start = $7, wednesday_end = $8, wednesday_enabled = $9,
            thursday_start = $10, thursday_end = $11, thursday_enabled = $12,
            friday_start = $13, friday_end = $14, friday_enabled = $15,
            saturday_start = $16, saturday_end = $17, saturday_enabled = $18,
            sunday_start = $19, sunday_end = $20, sunday_enabled = $21,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $22
          RETURNING *
        `;
        const values = [
          data.monday?.start, data.monday?.end, data.monday?.enabled || false,
          data.tuesday?.start, data.tuesday?.end, data.tuesday?.enabled || false,
          data.wednesday?.start, data.wednesday?.end, data.wednesday?.enabled || false,
          data.thursday?.start, data.thursday?.end, data.thursday?.enabled || false,
          data.friday?.start, data.friday?.end, data.friday?.enabled || false,
          data.saturday?.start, data.saturday?.end, data.saturday?.enabled || false,
          data.sunday?.start, data.sunday?.end, data.sunday?.enabled || false,
          existingResult.rows[0].id
        ];
        
        const result = await pool.query(query, values);
        sendJsonResponse(res, 200, result.rows[0]);
      } else {
        // Insert new record
        const query = `
          INSERT INTO working_hours (
            monday_start, monday_end, monday_enabled,
            tuesday_start, tuesday_end, tuesday_enabled,
            wednesday_start, wednesday_end, wednesday_enabled,
            thursday_start, thursday_end, thursday_enabled,
            friday_start, friday_end, friday_enabled,
            saturday_start, saturday_end, saturday_enabled,
            sunday_start, sunday_end, sunday_enabled
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
            $13, $14, $15, $16, $17, $18, $19, $20, $21
          ) RETURNING *
        `;
        const values = [
          data.monday?.start, data.monday?.end, data.monday?.enabled || false,
          data.tuesday?.start, data.tuesday?.end, data.tuesday?.enabled || false,
          data.wednesday?.start, data.wednesday?.end, data.wednesday?.enabled || false,
          data.thursday?.start, data.thursday?.end, data.thursday?.enabled || false,
          data.friday?.start, data.friday?.end, data.friday?.enabled || false,
          data.saturday?.start, data.saturday?.end, data.saturday?.enabled || false,
          data.sunday?.start, data.sunday?.end, data.sunday?.enabled || false
        ];
        
        const result = await pool.query(query, values);
        sendJsonResponse(res, 201, result.rows[0]);
      }
    }
  } catch (error) {
    console.error('Working hours error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Holidays API
async function handleHolidays(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM holidays ORDER BY start_date DESC');
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO holidays (name, start_date, end_date, start_time, end_time, is_partial_day, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        data.name,
        data.startDate,
        data.endDate,
        data.startTime,
        data.endTime,
        data.isPartialDay || false,
        data.description
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM holidays WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Holiday deleted successfully' });
    }
  } catch (error) {
    console.error('Holidays error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Customers API
async function handleCustomers(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO customers (
          code, name, type, contact_person, email, phone, address,
          tax_number, payment_terms, credit_limit, status, notes, category
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.contactPerson, data.email,
        data.phone, data.address, data.taxNumber, data.paymentTerms,
        data.creditLimit, data.status || 'active', data.notes, data.category
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE customers SET
          code = $1, name = $2, type = $3, contact_person = $4, email = $5,
          phone = $6, address = $7, tax_number = $8, payment_terms = $9,
          credit_limit = $10, status = $11, notes = $12, category = $13, updated_at = CURRENT_TIMESTAMP
        WHERE id = $14
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.contactPerson, data.email,
        data.phone, data.address, data.taxNumber, data.paymentTerms,
        data.creditLimit, data.status, data.notes, data.category, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM customers WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Customer deleted successfully' });
    }
  } catch (error) {
    console.error('Customers error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Machines API
async function handleMachines(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM machines ORDER BY created_at DESC');
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO machines (
          code, name, type, manufacturer, model, serial_number,
          location, status, capacity, efficiency_rate, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.manufacturer, data.model,
        data.serialNumber, data.location, data.status || 'active',
        data.capacity, data.efficiencyRate || 100, data.notes
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE machines SET
          code = $1, name = $2, type = $3, manufacturer = $4, model = $5,
          serial_number = $6, location = $7, status = $8, capacity = $9,
          efficiency_rate = $10, notes = $11, updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.manufacturer, data.model,
        data.serialNumber, data.location, data.status,
        data.capacity, data.efficiencyRate, data.notes, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM machines WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Machine deleted successfully' });
    }
  } catch (error) {
    console.error('Machines error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Departments API
async function handleDepartments(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM departments ORDER BY created_at DESC');
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO departments (code, name, description, manager_name, location, budget, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.description, data.managerName, 
        data.location, data.budget, data.status || 'active'
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE departments SET
          code = $1, name = $2, description = $3, manager_name = $4,
          location = $5, budget = $6, status = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.description, data.managerName,
        data.location, data.budget, data.status, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM departments WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Department deleted successfully' });
    }
  } catch (error) {
    console.error('Departments error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Personnel API
async function handlePersonnel(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query(`
        SELECT p.*, d.name as department_name 
        FROM personnel p 
        LEFT JOIN departments d ON p.department_id = d.id 
        ORDER BY p.created_at DESC
      `);
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO personnel (
          employee_id, name, position, department_id, email, phone, 
          shift, start_date, status, skills, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `;
      const values = [
        data.employeeId, data.name, data.position, data.departmentId, data.email,
        data.phone, data.shift, data.startDate, data.status || 'active', 
        data.skills, data.notes
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE personnel SET
          employee_id = $1, name = $2, position = $3, department_id = $4,
          email = $5, phone = $6, shift = $7, start_date = $8, status = $9,
          skills = $10, notes = $11, updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
      `;
      const values = [
        data.employeeId, data.name, data.position, data.departmentId, data.email,
        data.phone, data.shift, data.startDate, data.status, 
        data.skills, data.notes, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM personnel WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Personnel deleted successfully' });
    }
  } catch (error) {
    console.error('Personnel error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Locations API
async function handleLocations(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query(`
        SELECT l.*, p.name as parent_name 
        FROM locations l 
        LEFT JOIN locations p ON l.parent_id = p.id 
        ORDER BY l.created_at DESC
      `);
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO locations (
          code, name, type, parent_id, description, capacity, 
          area_size, status, coordinates
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.parentId, data.description,
        data.capacity, data.areaSize, data.status || 'active', data.coordinates
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE locations SET
          code = $1, name = $2, type = $3, parent_id = $4, description = $5,
          capacity = $6, area_size = $7, status = $8, coordinates = $9,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $10
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.parentId, data.description,
        data.capacity, data.areaSize, data.status, data.coordinates, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM locations WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Location deleted successfully' });
    }
  } catch (error) {
    console.error('Locations error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Work Orders API
async function handleWorkOrders(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query(`
        SELECT wo.*, c.name as customer_name, m.name as machine_name, 
               d.name as department_name, p.name as personnel_name
        FROM work_orders wo
        LEFT JOIN customers c ON wo.customer_id = c.id
        LEFT JOIN machines m ON wo.machine_id = m.id
        LEFT JOIN departments d ON wo.department_id = d.id
        LEFT JOIN personnel p ON wo.assigned_personnel_id = p.id
        ORDER BY wo.created_at DESC
      `);
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO work_orders (
          order_number, product_code, product_name, quantity_planned, unit_of_measure,
          priority, status, planned_start_date, planned_end_date, customer_id,
          machine_id, department_id, assigned_personnel_id, notes, instructions, quality_requirements
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *
      `;
      const values = [
        data.orderNumber, data.productCode, data.productName, data.quantityPlanned, data.unitOfMeasure,
        data.priority || 'medium', data.status || 'draft', data.plannedStartDate, data.plannedEndDate,
        data.customerId, data.machineId, data.departmentId, data.assignedPersonnelId,
        data.notes, data.instructions, data.qualityRequirements
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE work_orders SET
          order_number = $1, product_code = $2, product_name = $3, quantity_planned = $4,
          quantity_produced = $5, unit_of_measure = $6, priority = $7, status = $8,
          planned_start_date = $9, planned_end_date = $10, actual_start_date = $11,
          actual_end_date = $12, customer_id = $13, machine_id = $14, department_id = $15,
          assigned_personnel_id = $16, notes = $17, instructions = $18, quality_requirements = $19,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $20
        RETURNING *
      `;
      const values = [
        data.orderNumber, data.productCode, data.productName, data.quantityPlanned,
        data.quantityProduced, data.unitOfMeasure, data.priority, data.status,
        data.plannedStartDate, data.plannedEndDate, data.actualStartDate,
        data.actualEndDate, data.customerId, data.machineId, data.departmentId,
        data.assignedPersonnelId, data.notes, data.instructions, data.qualityRequirements, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM work_orders WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Work order deleted successfully' });
    }
  } catch (error) {
    console.error('Work orders error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Inventory API
async function handleInventory(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query(`
        SELECT i.*, l.name as location_name, s.name as supplier_name
        FROM inventory_items i
        LEFT JOIN locations l ON i.location_id = l.id
        LEFT JOIN customers s ON i.supplier_id = s.id
        ORDER BY i.created_at DESC
      `);
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO inventory_items (
          item_code, name, description, category, type, unit_of_measure,
          current_stock, minimum_stock, maximum_stock, reorder_point,
          unit_cost, location_id, supplier_id, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
      `;
      const values = [
        data.itemCode, data.name, data.description, data.category, data.type, data.unitOfMeasure,
        data.currentStock || 0, data.minimumStock || 0, data.maximumStock, data.reorderPoint,
        data.unitCost, data.locationId, data.supplierId, data.status || 'active'
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE inventory_items SET
          item_code = $1, name = $2, description = $3, category = $4, type = $5,
          unit_of_measure = $6, current_stock = $7, minimum_stock = $8, maximum_stock = $9,
          reorder_point = $10, unit_cost = $11, location_id = $12, supplier_id = $13,
          status = $14, updated_at = CURRENT_TIMESTAMP
        WHERE id = $15
        RETURNING *
      `;
      const values = [
        data.itemCode, data.name, data.description, data.category, data.type, data.unitOfMeasure,
        data.currentStock, data.minimumStock, data.maximumStock, data.reorderPoint,
        data.unitCost, data.locationId, data.supplierId, data.status, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM inventory_items WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Inventory item deleted successfully' });
    }
  } catch (error) {
    console.error('Inventory error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Shifts API
async function handleShifts(req, res, method, pathname) {
  if (method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    if (method === 'GET') {
      const result = await pool.query('SELECT * FROM shifts ORDER BY start_time');
      sendJsonResponse(res, 200, result.rows);
    } else if (method === 'POST') {
      const data = await getRequestBody(req);
      const query = `
        INSERT INTO shifts (name, start_time, end_time, break_duration, days_of_week, is_active, color, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;
      const values = [
        data.name, data.startTime, data.endTime, data.breakDuration || 0,
        data.daysOfWeek, data.isActive !== false, data.color, data.description
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 201, result.rows[0]);
    } else if (method === 'PUT') {
      const id = pathname.split('/').pop();
      const data = await getRequestBody(req);
      const query = `
        UPDATE shifts SET
          name = $1, start_time = $2, end_time = $3, break_duration = $4,
          days_of_week = $5, is_active = $6, color = $7, description = $8,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *
      `;
      const values = [
        data.name, data.startTime, data.endTime, data.breakDuration,
        data.daysOfWeek, data.isActive, data.color, data.description, id
      ];
      
      const result = await pool.query(query, values);
      sendJsonResponse(res, 200, result.rows[0]);
    } else if (method === 'DELETE') {
      const id = pathname.split('/').pop();
      await pool.query('DELETE FROM shifts WHERE id = $1', [id]);
      sendJsonResponse(res, 200, { message: 'Shift deleted successfully' });
    }
  } catch (error) {
    console.error('Shifts error:', error);
    sendJsonResponse(res, 500, { error: 'Internal server error' });
  }
}

// Ana server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;
  const method = req.method;

  // Health check
  if (pathname === '/health') {
    sendJsonResponse(res, 200, { status: 'ok', timestamp: new Date().toISOString() });
    return;
  }

  // API routes
  if (pathname.startsWith('/api/working-hours')) {
    await handleWorkingHours(req, res, method, pathname);
  } else if (pathname.startsWith('/api/holidays')) {
    await handleHolidays(req, res, method, pathname);
  } else if (pathname.startsWith('/api/customers')) {
    await handleCustomers(req, res, method, pathname);
  } else if (pathname.startsWith('/api/machines')) {
    await handleMachines(req, res, method, pathname);
  } else if (pathname.startsWith('/api/departments')) {
    await handleDepartments(req, res, method, pathname);
  } else if (pathname.startsWith('/api/personnel')) {
    await handlePersonnel(req, res, method, pathname);
  } else if (pathname.startsWith('/api/locations')) {
    await handleLocations(req, res, method, pathname);
  } else if (pathname.startsWith('/api/work-orders')) {
    await handleWorkOrders(req, res, method, pathname);
  } else if (pathname.startsWith('/api/inventory')) {
    await handleInventory(req, res, method, pathname);
  } else if (pathname.startsWith('/api/shifts')) {
    await handleShifts(req, res, method, pathname);
  } else {
    sendJsonResponse(res, 404, { error: 'Not found' });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('🚀 MES Backend API server with PostgreSQL is running on port', PORT);
  console.log('📊 Working Hours API: http://localhost:' + PORT + '/api/working-hours');
  console.log('👥 Customers API: http://localhost:' + PORT + '/api/customers');
  console.log('🏭 Machines API: http://localhost:' + PORT + '/api/machines');
  console.log('🏢 Departments API: http://localhost:' + PORT + '/api/departments');
  console.log('👷 Personnel API: http://localhost:' + PORT + '/api/personnel');
  console.log('📍 Locations API: http://localhost:' + PORT + '/api/locations');
  console.log('📋 Work Orders API: http://localhost:' + PORT + '/api/work-orders');
  console.log('📦 Inventory API: http://localhost:' + PORT + '/api/inventory');
  console.log('⏰ Shifts API: http://localhost:' + PORT + '/api/shifts');
  console.log('📅 Holidays API: http://localhost:' + PORT + '/api/holidays');
  console.log('💚 Health Check: http://localhost:' + PORT + '/health');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  pool.end(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  pool.end(() => {
    process.exit(0);
  });
});
