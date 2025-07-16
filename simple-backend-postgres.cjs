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
          tax_number, payment_terms, credit_limit, status, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.contactPerson, data.email,
        data.phone, data.address, data.taxNumber, data.paymentTerms,
        data.creditLimit, data.status || 'active', data.notes
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
          credit_limit = $10, status = $11, notes = $12, updated_at = CURRENT_TIMESTAMP
        WHERE id = $13
        RETURNING *
      `;
      const values = [
        data.code, data.name, data.type, data.contactPerson, data.email,
        data.phone, data.address, data.taxNumber, data.paymentTerms,
        data.creditLimit, data.status, data.notes, id
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
    }
  } catch (error) {
    console.error('Machines error:', error);
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
