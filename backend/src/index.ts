import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import machineRoutes from './routes/machines';
import departmentRoutes from './routes/departments';
import personnelRoutes from './routes/personnel';
import locationRoutes from './routes/locations';
import authRoutes from './routes/auth';
import workingHoursRoutes from './routes/workingHours';
import workOrderRoutes from './routes/workOrders';

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/working-hours', workingHoursRoutes);
app.use('/api/work-orders', workOrderRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'MES Backend API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/health',
      api: {
        auth: '/api/auth',
        machines: '/api/machines',
        departments: '/api/departments',
        personnel: '/api/personnel',
        locations: '/api/locations',
        workingHours: '/api/working-hours',
        workOrders: '/api/work-orders'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'MES Backend API' 
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

app.listen(PORT, () => {
  console.log(`🚀 MES Backend API server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
