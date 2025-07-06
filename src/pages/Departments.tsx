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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as DepartmentIcon,
} from '@mui/icons-material';

// Departman yönetimi için basitleştirilmiş arayüzler
interface DepartmentData {
  id: string;
  code: string;
  name: string;
  manager: string;
  location: string;
  employeeCount: number;
  shift: string;
  status: 'active' | 'inactive';
  description?: string;
}

interface UserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  isActive: boolean;
}

const Departments: React.FC = () => {
  // Kullanıcılar listesi - gerçek uygulamada API'dan gelecek
  const [users] = useState<UserData[]>([
    {
      id: '1',
      username: 'admin',
      firstName: 'Sistem',
      lastName: 'Yöneticisi',
      role: 'admin',
      department: 'Bilgi İşlem',
      isActive: true
    },
    {
      id: '2',
      username: 'ayilmaz',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      role: 'manager',
      department: 'Ana Üretim',
      isActive: true
    },
    {
      id: '3',
      username: 'ademir',
      firstName: 'Ayşe',
      lastName: 'Demir',
      role: 'quality_inspector',
      department: 'Kalite Kontrol',
      isActive: true
    },
    {
      id: '4',
      username: 'mkaya',
      firstName: 'Mehmet',
      lastName: 'Kaya',
      role: 'maintenance',
      department: 'Bakım Onarım',
      isActive: true
    },
    {
      id: '5',
      username: 'fcanli',
      firstName: 'Fatma',
      lastName: 'Canlı',
      role: 'operator',
      department: 'Ana Üretim',
      isActive: false
    },
    {
      id: '6',
      username: 'aozkan',
      firstName: 'Ali',
      lastName: 'Özkan',
      role: 'manager',
      department: 'Bilgi İşlem',
      isActive: true
    },
    {
      id: '7',
      username: 'fsen',
      firstName: 'Fatma',
      lastName: 'Şen',
      role: 'manager',
      department: 'Lojistik',
      isActive: true
    }
  ]);

  const [departments, setDepartments] = useState<DepartmentData[]>([
    {
      id: '1',
      code: 'PRD-001',
      name: 'Ana Üretim',
      manager: 'Ahmet Yılmaz',
      location: 'Fabrika A - Kat 1',
      employeeCount: 25,
      shift: 'Gündüz',
      status: 'active',
      description: 'Ana üretim hattı departmanı'
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
      description: 'Kalite kontrol ve test departmanı'
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
      description: 'Ekipman bakım ve onarım departmanı'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentData | null>(null);
  const [formData, setFormData] = useState<Partial<DepartmentData>>({
    code: '',
    name: '',
    manager: '',
    location: '',
    employeeCount: 0,
    shift: 'Gündüz',
    status: 'active',
    description: ''
  });

  const handleOpen = (department?: DepartmentData) => {
    if (department) {
      setEditingDepartment(department);
      setFormData(department);
    } else {
      setEditingDepartment(null);
      setFormData({
        code: '',
        name: '',
        manager: '',
        location: '',
        employeeCount: 0,
        shift: 'Gündüz',
        status: 'active',
        description: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingDepartment) {
      // Güncelle
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id ? { ...formData, id: editingDepartment.id } as DepartmentData : dept
      ));
    } else {
      // Yeni ekle
      const newDepartment: DepartmentData = {
        ...formData,
        id: Date.now().toString(),
      } as DepartmentData;
      setDepartments([...departments, newDepartment]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  const getStatusText = (status: string) => {
    return status === 'active' ? 'Aktif' : 'Pasif';
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
          Departman Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 3 }}>
          Fabrika departmanlarını yönetin ve organize edin
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
          Yeni Departman Ekle
        </Button>
      </Box>

      {/* İstatistikler */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
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
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DepartmentIcon sx={{ fontSize: 30, opacity: 0.9, mr: 1 }} />
              <Typography variant="h6">Toplam Departman</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {departments.length}
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
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Toplam Çalışan</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {departments.reduce((total, dept) => total + dept.employeeCount, 0)}
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
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Aktif Departman</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {departments.filter(dept => dept.status === 'active').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Departman Tablosu */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Departman Kodu</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Departman Adı</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sorumlu</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Lokasyon</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Çalışan Sayısı</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Vardiya</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Durum</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id} hover>
                <TableCell>{department.code}</TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{department.name}</TableCell>
                <TableCell>{department.manager}</TableCell>
                <TableCell>{department.location}</TableCell>
                <TableCell>{department.employeeCount}</TableCell>
                <TableCell>{department.shift}</TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusText(department.status)} 
                    color={getStatusColor(department.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(department)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(department.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Departman Ekleme/Düzenleme Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDepartment ? 'Departman Düzenle' : 'Yeni Departman Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Departman Kodu"
              value={formData.code || ''}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              fullWidth
              placeholder="PRD-001"
            />
            <TextField
              label="Departman Adı"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              placeholder="Ana Üretim"
            />
            <FormControl fullWidth>
              <InputLabel>Departman Sorumlusu</InputLabel>
              <Select
                value={formData.manager || ''}
                label="Departman Sorumlusu"
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              >
                <MenuItem value="">- Sorumlu Seçin -</MenuItem>
                {users
                  .filter(user => user.isActive && (user.role === 'manager' || user.role === 'admin'))
                  .map(user => (
                    <MenuItem key={user.id} value={`${user.firstName} ${user.lastName}`}>
                      {user.firstName} {user.lastName} ({user.role === 'admin' ? 'Yönetici' : 'Müdür'})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Lokasyon"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
              placeholder="Fabrika A - Kat 1"
            />
            <TextField
              label="Çalışan Sayısı"
              type="number"
              value={formData.employeeCount || 0}
              onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Vardiya</InputLabel>
              <Select
                value={formData.shift || 'Gündüz'}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                label="Vardiya"
              >
                <MenuItem value="Gündüz">Gündüz (08:00-16:00)</MenuItem>
                <MenuItem value="Akşam">Akşam (16:00-24:00)</MenuItem>
                <MenuItem value="Gece">Gece (24:00-08:00)</MenuItem>
                <MenuItem value="24 Saat">24 Saat</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Durum</InputLabel>
              <Select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                label="Durum"
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Açıklama"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
              placeholder="Departman hakkında kısa açıklama..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSave} variant="contained">
            {editingDepartment ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Departments;
