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

interface Department {
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

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([
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
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState<Partial<Department>>({
    code: '',
    name: '',
    manager: '',
    location: '',
    employeeCount: 0,
    shift: 'Gündüz',
    status: 'active',
    description: ''
  });

  const handleOpen = (department?: Department) => {
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
        dept.id === editingDepartment.id ? { ...formData, id: editingDepartment.id } as Department : dept
      ));
    } else {
      // Yeni ekle
      const newDepartment: Department = {
        ...formData,
        id: Date.now().toString(),
      } as Department;
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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Departman Yönetimi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Yeni Departman
        </Button>
      </Box>

      {/* İstatistikler */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <DepartmentIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h6">Toplam Departman</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {departments.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Toplam Çalışan</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              {departments.reduce((total, dept) => total + dept.employeeCount, 0)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>Aktif Departman</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
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
            <TextField
              label="Departman Sorumlusu"
              value={formData.manager || ''}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              fullWidth
              placeholder="Ahmet Yılmaz"
            />
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
