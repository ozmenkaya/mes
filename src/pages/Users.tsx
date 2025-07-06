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
  Checkbox,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import type { SystemUser, Department, Shift, Permission } from '../types';

const Users: React.FC = () => {
  // Departmanlar listesi - gerçek uygulamada API'dan gelecek
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

  // Vardiyalar listesi - gerçek uygulamada API'dan gelecek
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
    },
    {
      id: '3',
      name: 'Gece Vardiyası',
      code: 'GCE',
      startTime: '00:00',
      endTime: '08:00',
      breakDuration: 45,
      isActive: true,
      description: 'Gece çalışma vardiyası',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '4',
      name: '24 Saat Vardiya',
      code: '24H',
      startTime: '00:00',
      endTime: '23:59',
      breakDuration: 120,
      isActive: true,
      description: '24 saat sürekli vardiya',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    }
  ]);

  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@fabrika.com',
      firstName: 'Sistem',
      lastName: 'Yöneticisi',
      role: 'admin',
      department: 'Bilgi İşlem',
      shift: 'Gündüz Vardiyası',
      permissions: [],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-15 14:30',
      lastPasswordChange: '2024-01-01 08:00',
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
      shift: 'Gündüz Vardiyası',
      permissions: [],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-15 16:45',
      lastPasswordChange: '2024-01-02 09:00',
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
      shift: 'Gündüz Vardiyası',
      permissions: [],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
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
      shift: '24 Saat Vardiya',
      permissions: [],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-15 13:10',
      lastPasswordChange: '2024-01-04 11:00',
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
      shift: 'Akşam Vardiyası',
      permissions: [],
      isActive: false,
      mustChangePassword: true,
      failedLoginAttempts: 2,
      lastLogin: '2024-01-10 18:30',
      lastPasswordChange: '2024-01-05 12:00',
      createdAt: '2024-01-05 12:00',
      updatedAt: '2024-01-10 18:30'
    }
  ]);

  // Yetki listesi - gerçek uygulamada API'dan gelecek
  const [permissions] = useState<Permission[]>([
    // Dashboard Yetkileri
    { id: 'dashboard_read', name: 'Kontrol Paneli Görüntüleme', description: 'Kontrol panelini görüntüleyebilir', module: 'dashboard', action: 'read' },
    { id: 'dashboard_export', name: 'Kontrol Paneli Dışa Aktarma', description: 'Kontrol paneli verilerini dışa aktarabilir', module: 'dashboard', action: 'export' },
    
    // İş Emirleri Yetkileri
    { id: 'work_orders_read', name: 'İş Emirleri Görüntüleme', description: 'İş emirlerini görüntüleyebilir', module: 'work_orders', action: 'read' },
    { id: 'work_orders_create', name: 'İş Emri Oluşturma', description: 'Yeni iş emri oluşturabilir', module: 'work_orders', action: 'create' },
    { id: 'work_orders_update', name: 'İş Emri Güncelleme', description: 'İş emirlerini güncelleyebilir', module: 'work_orders', action: 'update' },
    { id: 'work_orders_delete', name: 'İş Emri Silme', description: 'İş emirlerini silebilir', module: 'work_orders', action: 'delete' },
    { id: 'work_orders_approve', name: 'İş Emri Onaylama', description: 'İş emirlerini onaylayabilir', module: 'work_orders', action: 'approve' },
    
    // Üretim Planlama Yetkileri
    { id: 'production_read', name: 'Üretim Planlama Görüntüleme', description: 'Üretim planlarını görüntüleyebilir', module: 'production', action: 'read' },
    { id: 'production_create', name: 'Üretim Planı Oluşturma', description: 'Yeni üretim planı oluşturabilir', module: 'production', action: 'create' },
    { id: 'production_update', name: 'Üretim Planı Güncelleme', description: 'Üretim planlarını güncelleyebilir', module: 'production', action: 'update' },
    
    // Kalite Yönetimi Yetkileri
    { id: 'quality_read', name: 'Kalite Yönetimi Görüntüleme', description: 'Kalite verilerini görüntüleyebilir', module: 'quality', action: 'read' },
    { id: 'quality_create', name: 'Kalite Kontrolü Oluşturma', description: 'Yeni kalite kontrolü oluşturabilir', module: 'quality', action: 'create' },
    { id: 'quality_approve', name: 'Kalite Onaylama', description: 'Kalite kontrollerini onaylayabilir', module: 'quality', action: 'approve' },
    
    // Stok Yönetimi Yetkileri
    { id: 'inventory_read', name: 'Stok Yönetimi Görüntüleme', description: 'Stok verilerini görüntüleyebilir', module: 'inventory', action: 'read' },
    { id: 'inventory_create', name: 'Stok Hareketi Oluşturma', description: 'Yeni stok hareketi oluşturabilir', module: 'inventory', action: 'create' },
    { id: 'inventory_update', name: 'Stok Güncelleme', description: 'Stok verilerini güncelleyebilir', module: 'inventory', action: 'update' },
    
    // Ekipman Yönetimi Yetkileri
    { id: 'equipment_read', name: 'Ekipman Yönetimi Görüntüleme', description: 'Ekipman verilerini görüntüleyebilir', module: 'equipment', action: 'read' },
    { id: 'equipment_create', name: 'Ekipman Ekleme', description: 'Yeni ekipman ekleyebilir', module: 'equipment', action: 'create' },
    { id: 'equipment_update', name: 'Ekipman Güncelleme', description: 'Ekipman verilerini güncelleyebilir', module: 'equipment', action: 'update' },
    
    // Raporlar Yetkileri
    { id: 'reports_read', name: 'Raporlar Görüntüleme', description: 'Raporları görüntüleyebilir', module: 'reports', action: 'read' },
    { id: 'reports_export', name: 'Rapor Dışa Aktarma', description: 'Raporları dışa aktarabilir', module: 'reports', action: 'export' },
    
    // Fabrika Ayarları Yetkileri
    { id: 'factory_settings_read', name: 'Fabrika Ayarları Görüntüleme', description: 'Fabrika ayarlarını görüntüleyebilir', module: 'factory_settings', action: 'read' },
    { id: 'factory_settings_update', name: 'Fabrika Ayarları Güncelleme', description: 'Fabrika ayarlarını güncelleyebilir', module: 'factory_settings', action: 'update' },
  ]);

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [formData, setFormData] = useState<Partial<SystemUser>>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'operator',
    department: '',
    shift: '',
    permissions: [],
    isActive: true,
    mustChangePassword: true,
    failedLoginAttempts: 0
  });

  const handleOpen = (user?: SystemUser) => {
    if (user) {
      setEditingUser(user);
      // Düzenleme modunda şifre alanını boş bırak
      setFormData({ ...user, password: '' });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 'operator',
        department: '',
        shift: '',
        permissions: [],
        isActive: true,
        mustChangePassword: true,
        failedLoginAttempts: 0
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    // Şifre validasyonu
    if (!editingUser && (!formData.password || formData.password.length < 6)) {
      alert('Yeni kullanıcı için en az 6 karakter şifre girilmelidir.');
      return;
    }

    if (editingUser && formData.password && formData.password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email || '')) {
      alert('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (editingUser) {
      const updateData = { ...formData };
      // Şifre boşsa güncelleme
      if (!formData.password) {
        delete updateData.password;
      } else {
        updateData.lastPasswordChange = new Date().toISOString().slice(0, 16);
      }
      
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...updateData, updatedAt: new Date().toISOString().slice(0, 16) }
          : user
      ));
    } else {
      const newUser: SystemUser = {
        ...formData as SystemUser,
        id: Date.now().toString(),
        lastPasswordChange: new Date().toISOString().slice(0, 16),
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

  // Modül isimlerini Türkçe'ye çeviren fonksiyon
  const getModuleName = (module: string): string => {
    const moduleNames: Record<string, string> = {
      'dashboard': 'Kontrol Paneli',
      'work_orders': 'İş Emirleri',
      'production': 'Üretim Planlama',
      'quality': 'Kalite Yönetimi',
      'inventory': 'Stok Yönetimi',
      'equipment': 'Ekipman Yönetimi',
      'reports': 'Raporlar',
      'factory_settings': 'Fabrika Ayarları'
    };
    return moduleNames[module] || module;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Modern Header */}
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
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
          Sistem kullanıcılarını yönetin ve izleyin
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ 
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            boxShadow: '0 4px 14px 0 rgb(37 99 235 / 0.35)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
              boxShadow: '0 6px 20px 0 rgb(37 99 235 / 0.4)',
            }
          }}
        >
          Yeni Kullanıcı Ekle
        </Button>
      </Box>

      {/* İstatistik Kartları */}
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
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, opacity: 0.9, mb: 1 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {users.length}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Toplam Kullanıcı
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.9, mb: 1 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {activeUsers}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Aktif Kullanıcı
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <BlockIcon sx={{ fontSize: 40, opacity: 0.9, mb: 1 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {inactiveUsers}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Pasif Kullanıcı
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <PersonAddIcon sx={{ fontSize: 40, opacity: 0.9, mb: 1 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {adminUsers}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Yönetici
            </Typography>
          </CardContent>
        </Card>
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
                  <TableCell>Güvenlik</TableCell>
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
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {user.mustChangePassword && (
                          <Chip 
                            label="Şifre Değiştirmeli" 
                            color="warning" 
                            size="small" 
                          />
                        )}
                        {user.failedLoginAttempts > 0 && (
                          <Chip 
                            label={`${user.failedLoginAttempts} Başarısız Giriş`} 
                            color="error" 
                            size="small" 
                          />
                        )}
                        {user.accountLockedUntil && (
                          <Chip 
                            label="Hesap Kilitli" 
                            color="error" 
                            size="small" 
                          />
                        )}
                      </Box>
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
                label={editingUser ? "Yeni Şifre (boş bırakılırsa değişmez)" : "Şifre"}
                type="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                helperText={editingUser ? "Şifreyi değiştirmek için yeni şifre girin" : "En az 6 karakter olmalıdır"}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.mustChangePassword || false}
                    onChange={(e) => setFormData({ ...formData, mustChangePassword: e.target.checked })}
                  />
                }
                label="İlk girişte şifre değiştirme zorunlu"
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
                        {shift.name} ({shift.startTime}-{shift.endTime})
                      </MenuItem>
                    ))}
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

            {/* Yetkiler Ayarları */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Kullanıcı Yetkileri
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Kullanıcının erişebileceği modüller ve işlemleri seçin
              </Typography>
              
              {/* Modüllere göre gruplanmış yetkiler */}
              {Object.entries(
                permissions.reduce((acc, permission) => {
                  const moduleName = getModuleName(permission.module);
                  if (!acc[moduleName]) acc[moduleName] = [];
                  acc[moduleName].push(permission);
                  return acc;
                }, {} as Record<string, Permission[]>)
              ).map(([moduleName, modulePermissions]) => (
                <Accordion key={moduleName}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{moduleName}</Typography>
                    <Box sx={{ ml: 'auto', mr: 1 }}>
                      <Chip 
                        size="small" 
                        label={`${modulePermissions.filter(p => formData.permissions?.includes(p.id)).length}/${modulePermissions.length}`}
                        color={modulePermissions.filter(p => formData.permissions?.includes(p.id)).length > 0 ? 'primary' : 'default'}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {modulePermissions.map(permission => (
                        <FormControlLabel
                          key={permission.id}
                          control={
                            <Checkbox
                              checked={formData.permissions?.includes(permission.id) || false}
                              onChange={(e) => {
                                const currentPermissions = formData.permissions || [];
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    permissions: [...currentPermissions, permission.id]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    permissions: currentPermissions.filter(p => p !== permission.id)
                                  });
                                }
                              }}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">{permission.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {permission.description}
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              ))}
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
