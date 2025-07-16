-- MES Database Initialization Script
-- Bu script database'i ilk kez oluşturur

-- Working Hours Tables
CREATE TABLE IF NOT EXISTS working_hours (
    id SERIAL PRIMARY KEY,
    monday_start TIME,
    monday_end TIME,
    monday_enabled BOOLEAN DEFAULT true,
    tuesday_start TIME,
    tuesday_end TIME,
    tuesday_enabled BOOLEAN DEFAULT true,
    wednesday_start TIME,
    wednesday_end TIME,
    wednesday_enabled BOOLEAN DEFAULT true,
    thursday_start TIME,
    thursday_end TIME,
    thursday_enabled BOOLEAN DEFAULT true,
    friday_start TIME,
    friday_end TIME,
    friday_enabled BOOLEAN DEFAULT true,
    saturday_start TIME,
    saturday_end TIME,
    saturday_enabled BOOLEAN DEFAULT false,
    sunday_start TIME,
    sunday_end TIME,
    sunday_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Holidays Table
CREATE TABLE IF NOT EXISTS holidays (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    is_partial_day BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('customer', 'supplier')),
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    tax_number VARCHAR(50),
    payment_terms INTEGER,
    credit_limit DECIMAL(15,2),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    notes TEXT,
    erp_sync_enabled BOOLEAN DEFAULT false,
    erp_last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Machines Table
CREATE TABLE IF NOT EXISTS machines (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    serial_number VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive', 'broken')),
    capacity DECIMAL(10,2),
    efficiency_rate DECIMAL(5,2) DEFAULT 100.00,
    installation_date DATE,
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'manager', 'operator', 'viewer')),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_code ON customers(code);
CREATE INDEX IF NOT EXISTS idx_customers_type ON customers(type);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_machines_code ON machines(code);
CREATE INDEX IF NOT EXISTS idx_machines_status ON machines(status);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_holidays_date_range ON holidays(start_date, end_date);

-- Insert default working hours if not exists
INSERT INTO working_hours (
    monday_start, monday_end, monday_enabled,
    tuesday_start, tuesday_end, tuesday_enabled,
    wednesday_start, wednesday_end, wednesday_enabled,
    thursday_start, thursday_end, thursday_enabled,
    friday_start, friday_end, friday_enabled,
    saturday_start, saturday_end, saturday_enabled,
    sunday_start, sunday_end, sunday_enabled
) 
SELECT 
    '08:00', '17:00', true,
    '08:00', '17:00', true,
    '08:00', '17:00', true,
    '08:00', '17:00', true,
    '08:00', '17:00', true,
    '09:00', '13:00', false,
    null, null, false
WHERE NOT EXISTS (SELECT 1 FROM working_hours);

-- Insert sample data (only if tables are empty)
INSERT INTO customers (code, name, type, contact_person, email, phone, address)
SELECT * FROM (VALUES
    ('CUST001', 'ABC Tekstil Ltd.', 'customer', 'Ahmet Yılmaz', 'ahmet@abctekstil.com', '0212 555 0001', 'İstanbul/Türkiye'),
    ('CUST002', 'XYZ Makina San.', 'customer', 'Mehmet Demir', 'mehmet@xyzmakina.com', '0312 555 0002', 'Ankara/Türkiye'),
    ('SUPP001', 'Metal Tedarik A.Ş.', 'supplier', 'Ayşe Kaya', 'ayse@metaltedarik.com', '0232 555 0003', 'İzmir/Türkiye')
) AS sample_data(code, name, type, contact_person, email, phone, address)
WHERE NOT EXISTS (SELECT 1 FROM customers);

INSERT INTO machines (code, name, type, manufacturer, model, location, status)
SELECT * FROM (VALUES
    ('MAK001', 'CNC Torna 1', 'CNC Torna', 'HAAS', 'ST-30', 'Üretim Hattı 1', 'active'),
    ('MAK002', 'Freze Makinası 1', 'Freze', 'DMG MORI', 'DMU 50', 'Üretim Hattı 1', 'active'),
    ('MAK003', 'Kaynak Makinası 1', 'Kaynak', 'Lincoln Electric', 'Power MIG 350MP', 'Kaynak Bölümü', 'active')
) AS sample_machines(code, name, type, manufacturer, model, location, status)
WHERE NOT EXISTS (SELECT 1 FROM machines);

-- Create default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, department)
SELECT 'admin', 'admin@mes.local', '$2b$10$rGn6.9j9qR9QZjQ.0t7Kgu3E5jJ8yJ6Dx8s1kL2vC5pM6n2wR9QZu', 'System', 'Administrator', 'admin', 'IT'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

COMMIT;
