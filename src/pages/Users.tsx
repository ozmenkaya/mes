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
  PersonAdd as PersonAddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import type { SystemUser } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@fabrika.com',
      firstName: 'Sistem',
      lastName: 'Yöneticisi',
      role: 'admin',
      department: 'Bilgi İşlem',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 14:30',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-15 14:30'
    },
    {
      id: '2',
      username: 'ayilmaz',
      email: 'ahmet.yilmaz@fabrika.com',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      role: 'manager',
      department: 'Ana Üretim',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 16:45',
      createdAt: '2024-01-02 09:00',
      updatedAt: '2024-01-15 16:45'
    },
    {
      id: '3',
      username: 'ademir',
      email: 'ayse.demir@fabrika.com',
      firstName: 'Ayşe',
      lastName: 'Demir',
      role: 'quality_inspector',
      department: 'Kalite Kontrol',
      shift: 'Gündüz',
      isActive: true,
      lastLogin: '2024-01-15 15:20',
      createdAt: '2024-01-03 10:00',
      updatedAt: '2024-01-15 15:20'
    },
    {
      id: '4',
      username: 'mkaya',
      email: 'mehmet.kaya@fabrika.com',
      firstName: 'Mehmet',
      lastName: 'Kaya',
      role: 'maintenance',
      department: 'Bakım Onarım',
      shift: '24 Saat',
      isActive: true,
      lastLogin: '2024-01-15 13:10',
      createdAt: '2024-01-04 11:00',
      updatedAt: '2024-01-15 13:10'
    },
    {
      id: '5',
      username: 'fcanli',
      email: 'fatma.canli@fabrika.com',
      firstName: 'Fatma',
      lastName: 'Canlı',
      role: 'operator',
      department: 'Ana Üretim',
      shift: 'Akşam',
      isActive: false,
      lastLogin: '2024-01-10 18:30',
      createdAt: '2024-01-05 12:00',
      updatedAt: '2024-01-10 18:30'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState<Partial<SystemUser>>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'operator',
    department: '',
    shift: 'Gündüz',
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
        email: '',
        firstName: '',
        lastName: '',
        role: 'operator',
        department: '',
        shift: 'Gündüz',
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
    const roleLabels = {
      admin: 'Sistem Yöneticisi',
      manager: 'Departman Müdürü',
      operator: 'Operatör',
      quality_inspector: 'Kalite Kontrol',
      maintenance: 'Bakım Teknisyeni'
    };
    return roleLabels[role as keyof typeof roleLabels] || role;
  };

  const getRoleColor = (role: string) => {
    const roleColors = {
      admin: 'error',
      manager: 'primary',
      operator: 'success',
      quality_inspector: 'warning',
      maintenance: 'info'
    };
    return roleColors[role as keyof typeof roleColors] || 'default';
  };

  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.filter(user => !user.isActive).length;
  const adminUsers = users.filter(user => user.role === 'admin').length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Kullanıcı Yönetimi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Kullanıcı
        </Button>
      </Box>

      {/* İstatistik Kartları */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {users.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Kullanıcı
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {activeUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aktif Kullanıcı
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <BlockIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" color="error.main">
                {inactiveUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pasif Kullanıcı
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PersonAddIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {adminUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yönetici
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Kullanıcı Tablosu */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kullanıcı Adı</TableCell>
                  <TableCell>Ad Soyad</TableCell>
                  <TableCell>E-posta</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Departman</TableCell>
                  <TableCell>Vardiya</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Son Giriş</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
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
                  value={formData.role || ''}
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
              <TextField
                fullWidth
                label="Departman"
                value={formData.department || ''}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Vardiya</InputLabel>
                <Select
                  value={formData.shift || ''}
                  label="Vardiya"
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                >
                  <MenuItem value="Gündüz">Gündüz (08:00-16:00)</MenuItem>
                  <MenuItem value="Akşam">Akşam (16:00-24:00)</MenuItem>
                  <MenuItem value="Gece">Gece (24:00-08:00)</MenuItem>
                  <MenuItem value="24 Saat">24 Saat</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
