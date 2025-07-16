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
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import type { Shift } from '../types';

const Shifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([
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
      name: 'Hafta Sonu',
      code: 'HSO',
      startTime: '09:00',
      endTime: '17:00',
      breakDuration: 60,
      isActive: false,
      description: 'Hafta sonu çalışma vardiyası',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-10 12:00'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState<Partial<Shift>>({
    name: '',
    code: '',
    startTime: '',
    endTime: '',
    breakDuration: 60,
    isActive: true,
    description: ''
  });

  const handleOpen = (shift?: Shift) => {
    if (shift) {
      setEditingShift(shift);
      setFormData(shift);
    } else {
      setEditingShift(null);
      setFormData({
        name: '',
        code: '',
        startTime: '',
        endTime: '',
        breakDuration: 60,
        isActive: true,
        description: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingShift(null);
  };

  const handleSave = () => {
    if (editingShift) {
      setShifts(shifts.map(shift => 
        shift.id === editingShift.id 
          ? { ...shift, ...formData, updatedAt: new Date().toISOString().slice(0, 16) }
          : shift
      ));
    } else {
      const newShift: Shift = {
        ...formData as Shift,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().slice(0, 16),
        updatedAt: new Date().toISOString().slice(0, 16)
      };
      setShifts([...shifts, newShift]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu vardiyayı silmek istediğinizden emin misiniz?')) {
      setShifts(shifts.filter(shift => shift.id !== id));
    }
  };

  const toggleShiftStatus = (id: string) => {
    setShifts(shifts.map(shift => 
      shift.id === id 
        ? { ...shift, isActive: !shift.isActive, updatedAt: new Date().toISOString().slice(0, 16) }
        : shift
    ));
  };

  const calculateWorkHours = (startTime: string, endTime: string, breakDuration: number) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    let diffMs = end.getTime() - start.getTime();
    
    // Eğer bitiş saati başlangıç saatinden küçükse, ertesi gün demektir
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }
    
    const totalMinutes = diffMs / (1000 * 60);
    const workMinutes = totalMinutes - breakDuration;
    return (workMinutes / 60).toFixed(1);
  };

  const activeShifts = shifts.filter(shift => shift.isActive).length;
  const totalBreakTime = shifts.reduce((total, shift) => total + shift.breakDuration, 0);
  const avgBreakTime = shifts.length > 0 ? (totalBreakTime / shifts.length).toFixed(0) : '0';

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Vardiya Ayarları
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Vardiya
        </Button>
      </Box>

      {/* İstatistik Kartları */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ScheduleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {shifts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Vardiya
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {activeShifts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aktif Vardiya
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TimeIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {avgBreakTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ortalama Mola (dk)
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Vardiya Tablosu */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vardiya Kodu</TableCell>
                  <TableCell>Vardiya Adı</TableCell>
                  <TableCell>Başlangıç</TableCell>
                  <TableCell>Bitiş</TableCell>
                  <TableCell>Çalışma Saati</TableCell>
                  <TableCell>Mola (dk)</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Açıklama</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>
                      <Chip 
                        label={shift.code} 
                        color="primary" 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{shift.name}</TableCell>
                    <TableCell>{shift.startTime}</TableCell>
                    <TableCell>{shift.endTime}</TableCell>
                    <TableCell>
                      {calculateWorkHours(shift.startTime, shift.endTime, shift.breakDuration)} saat
                    </TableCell>
                    <TableCell>{shift.breakDuration}</TableCell>
                    <TableCell>
                      <Chip 
                        label={shift.isActive ? 'Aktif' : 'Pasif'} 
                        color={shift.isActive ? 'success' : 'error'}
                        size="small"
                        onClick={() => toggleShiftStatus(shift.id)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                    <TableCell>{shift.description || '-'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(shift)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(shift.id)} size="small">
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

      {/* Vardiya Ekleme/Düzenleme Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingShift ? 'Vardiya Düzenle' : 'Yeni Vardiya Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Vardiya Adı"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Vardiya Kodu"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                inputProps={{ maxLength: 5 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Başlangıç Saati"
                type="time"
                value={formData.startTime || ''}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Bitiş Saati"
                type="time"
                value={formData.endTime || ''}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Mola Süresi (dakika)"
                type="number"
                value={formData.breakDuration || ''}
                onChange={(e) => setFormData({ ...formData, breakDuration: parseInt(e.target.value) || 0 })}
                inputProps={{ min: 0, max: 480 }}
              />
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
            <TextField
              fullWidth
              label="Açıklama"
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSave} variant="contained">
            {editingShift ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Shifts;
