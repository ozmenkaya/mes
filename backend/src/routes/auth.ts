import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/login - Kullanıcı girişi
router.post('/login', async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Demo user check
    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign(
        { userId: '1', username: 'admin', role: 'admin' },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        user: {
          id: '1',
          username: 'admin',
          role: 'admin',
          firstName: 'Admin',
          lastName: 'User'
        }
      });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me - Kullanıcı bilgilerini getir
router.get('/me', async (req: any, res: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    res.json({
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role,
      firstName: 'Admin',
      lastName: 'User'
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
