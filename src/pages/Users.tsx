import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import type { SystemUser, Department, Shift } from '../types';

const Users: React.FC = () => {
  // Departmanlar listesi
  const [departments] = useState<Department[]>([
    {
      id: '1',
      code: 'PRD-001',
      name: 'Ana Üretim',
      manager: 'Ahmet Yılmaz',
      location: 'Fabrika A - Kat 1',
      employeeCount: 25,
      shift: 'Gündüz',
      status: 'active',
      description: 'Ana üretim hattı departmanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '2',
      code: 'QC-001',
      name: 'Kalite Kontrol',
      manager: 'Ayşe Demir',
      location: 'Fabrika A - Kat 2',
      employeeCount: 8,
      shift: 'Gündüz',
      status: 'active',
      description: 'Kalite kontrol ve test departmanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '3',
      code: 'MNT-001',
      name: 'Bakım Onarım',
      manager: 'Mehmet Kaya',
      location: 'Fabrika A - Zemin',
      employeeCount: 12,
      shift: '24 Saat',
      status: 'active',
      description: 'Ekipman bakım ve onarım departmanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '4',
      code: 'IT-001',
      name: 'Bilgi İşlem',
      manager: 'Ali Özkan',
      location: 'Fabrika A - Kat 3',
      employeeCount: 5,
      shift: 'Gündüz',
      status: 'active',
      description: 'Bilgi işlem departmanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '5',
      code: 'LOG-001',
      name: 'Lojistik',
      manager: 'Fatma Şen',
      location: 'Fabrika A - Zemin',
      employeeCount: 15,
      shift: 'Gündüz',
      status: 'active',
      description: 'Lojistik ve depo departmanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    }
  ]);

  // Vardiyalar listesi
  const [shifts] = useState<Shift[]>([
    {
      id: '1',
      name: 'Gündüz Vardiyası',
      code: 'GUN',
      startTime: '08:00',
      endTime: '16:00',
      breakDuration: 60,
      isActive: true,
      description: 'Normal gündüz çalışma vardiyası',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '2',
      name: 'Akşam Vardiyası',
      code: 'AKS',
      startTime: '16:00',
      endTime: '24:00',
      breakDuration: 45,
      isActive: true,
      description: 'Akşam çalışma vardiyası',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    }
  ]);

  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: '1',
      username: 'admin',
      firstName: 'Sistem',
      lastName: 'Yöneticisi',
      email: 'admin@company.com',
      role: 'admin',
      department: 'Bilgi İşlem',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 09:30',
      permissions: ['all'],
      mustChangePassword: false,
      failedLoginAttempts: 0,
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-15 09:30'
    },
    {
      id: '2',
      username: 'operator1',
      firstName: 'Mehmet',
      lastName: 'Yılmaz',
      email: 'mehmet.yilmaz@company.com',
      role: 'operator',
      department: 'Ana Üretim',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 08:15',
      permissions: ['work_orders', 'production'],
      mustChangePassword: false,
      failedLoginAttempts: 0,
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-15 08:15'
    },
    {
      id: '3',
      username: 'qc_manager',
      firstName: 'Ayşe',
      lastName: 'Demir',
      email: 'ayse.demir@company.com',
      role: 'quality_inspector',
      department: 'Kalite Kontrol',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 10:45',
      permissions: ['quality', 'reports'],
      mustChangePassword: false,
      failedLoginAttempts: 0,
      createdAt: '2024-01-02 09:00',
      updatedAt: '2024-01-15 10:45'
    },
    {
      id: '4',
      username: 'maintenance',
      firstName: 'Ali',
      lastName: 'Özkan',
      email: 'ali.ozkan@company.com',
      role: 'maintenance',
      department: 'Bakım Onarım',
      shift: 'Gece',
      isActive: false,
      lastLogin: '2024-01-10 22:30',
      permissions: ['maintenance', 'equipment'],
      mustChangePassword: true,
      failedLoginAttempts: 2,
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-10 22:30'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState<Partial<SystemUser>>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'operator',
    department: '',
    shift: '',
    isActive: true
  });

  const handleOpen = (user?: SystemUser) => {
    if (user) {
      setEditingUser(user);
      setFormData(user);
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 'operator',
        department: '',
        shift: '',
        isActive: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData, updatedAt: new Date().toISOString().slice(0, 16) }
          : user
      ));
    } else {
      const newUser: SystemUser = {
        ...formData as SystemUser,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().slice(0, 16),
        updatedAt: new Date().toISOString().slice(0, 16)
      };
      setUsers([...users, newUser]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, isActive: !user.isActive, updatedAt: new Date().toISOString().slice(0, 16) }
        : user
    ));
  };

  const getRoleLabel = (role: string) => {
    const roleLabels: { [key: string]: string } = {
      admin: 'Yönetici',
      manager: 'Müdür',
      operator: 'Operatör',
      quality_inspector: 'Kalite Kontrol',
      maintenance: 'Bakım Teknisyeni'
    };
    return roleLabels[role] || role;
  };

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      admin: 'error',
      manager: 'warning',
      operator: 'primary',
      quality_inspector: 'info',
      maintenance: 'success'
    };
    return roleColors[role] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1 
          }}
        >
          Kullanıcı Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Sistem kullanıcılarını yönetin, roller atayın ve yetkilendirme yapın
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          mb: 4
        }}
      >
        <Card sx={{ 
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Toplam Kullanıcı
                </Typography>
              </Box>
              <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.filter(u => u.isActive).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Aktif Kullanıcı
                </Typography>
              </Box>
              <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.filter(u => u.role === 'admin').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Yönetici
                </Typography>
              </Box>
              <Box sx={{ fontSize: 40, opacity: 0.8 }}>👑</Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.filter(u => !u.isActive).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Pasif Kullanıcı
                </Typography>
              </Box>
              <BlockIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ ml: 'auto' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  },
                }}
              >
                Yeni Kullanıcı
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Kullanıcı Adı</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Ad Soyad</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>E-posta</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Departman</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Vardiya</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Son Giriş</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell sx={{ fontWeight: 'medium' }}>{user.username}</TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getRoleLabel(user.role)} 
                        color={getRoleColor(user.role) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.shift}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.isActive ? 'Aktif' : 'Pasif'} 
                        color={user.isActive ? 'success' : 'error'}
                        size="small"
                        onClick={() => toggleUserStatus(user.id)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                    <TableCell>{user.lastLogin || '-'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(user)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(user.id)} 
                        size="small"
                        disabled={user.role === 'admin'}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Kullanıcı Ekleme/Düzenleme Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Kullanıcı Adı"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <TextField
                fullWidth
                label="E-posta"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Ad"
                value={formData.firstName || ''}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Soyad"
                value={formData.lastName || ''}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={formData.role || 'operator'}
                  label="Rol"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                >
                  <MenuItem value="operator">Operatör</MenuItem>
                  <MenuItem value="manager">Departman Müdürü</MenuItem>
                  <MenuItem value="quality_inspector">Kalite Kontrol</MenuItem>
                  <MenuItem value="maintenance">Bakım Teknisyeni</MenuItem>
                  <MenuItem value="admin">Sistem Yöneticisi</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Departman</InputLabel>
                <Select
                  value={formData.department || ''}
                  label="Departman"
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <MenuItem value="">- Departman Seçin -</MenuItem>
                  {departments
                    .filter(dept => dept.status === 'active')
                    .map(department => (
                      <MenuItem key={department.id} value={department.name}>
                        {department.name} ({department.code})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Vardiya</InputLabel>
                <Select
                  value={formData.shift || ''}
                  label="Vardiya"
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                >
                  <MenuItem value="">- Vardiya Seçin -</MenuItem>
                  {shifts
                    .filter(shift => shift.isActive)
                    .map(shift => (
                      <MenuItem key={shift.id} value={shift.name}>
                        {shift.name} ({shift.code})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive || false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Aktif"
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSave} variant="contained">
            {editingUser ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
