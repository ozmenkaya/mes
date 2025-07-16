import React, { useState, useEffect } from 'react';
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
  Autocomplete,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Build as MachineIcon,
  Speed as PerformanceIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon,
  Engineering as MaintenanceIcon,
} from '@mui/icons-material';
import type { Machine } from '../types';
import { machineApi, departmentApi, personnelApi, locationApi } from '../services/api';

const Machines: React.FC = () => {
  // States
  const [machines, setMachines] = useState<Machine[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Machine>>({});

  // Helper function to update maintenance schedule
  const updateMaintenanceSchedule = (field: string, value: any) => {
    const currentSchedule = formData.maintenanceSchedule || {
      maintenanceInterval: 30,
      maintenanceType: 'monthly' as const,
      lastMaintenanceDate: '',
      nextMaintenanceDate: '',
      responsibleTechnician: '',
      maintenanceNotes: '',
    };
    
    setFormData({
      ...formData,
      maintenanceSchedule: {
        ...currentSchedule,
        [field]: value
      }
    });
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [machinesData, departmentsData, personnelData, locationsData] = await Promise.all([
          machineApi.getAll(),
          departmentApi.getAll(),
          personnelApi.getAll(),
          locationApi.getAll(),
        ]);

        setMachines(machinesData);
        setDepartments(departmentsData);
        setPersonnel(personnelData);
        setLocations(locationsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Veriler yüklenirken hata oluştu. Backend sunucusu çalışıyor mu?');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'operational': return 'success';
      case 'maintenance': return 'warning';
      case 'breakdown': return 'error';
      case 'idle': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status: Machine['status']) => {
    switch (status) {
      case 'operational': return 'Çalışıyor';
      case 'maintenance': return 'Bakımda';
      case 'breakdown': return 'Arızalı';
      case 'idle': return 'Boşta';
      default: return status;
    }
  };

  const handleAddMachine = () => {
    setEditingMachine(null);
    setFormData({});
    setOpen(true);
  };

  const handleEditMachine = (machine: Machine) => {
    setEditingMachine(machine);
    setFormData(machine);
    setOpen(true);
  };

  const handleDeleteMachine = async (id: string) => {
    try {
      setSubmitting(true);
      await machineApi.delete(id);
      setMachines(machines.filter(machine => machine.id !== id));
      setSuccessMessage('Makina başarıyla silindi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error deleting machine:', err);
      setError('Makina silinirken hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      if (editingMachine) {
        // Update existing machine
        await machineApi.update(editingMachine.id, formData);
        setMachines(machines.map(machine => 
          machine.id === editingMachine.id 
            ? { ...machine, ...formData } 
            : machine
        ));
        setSuccessMessage('Makina başarıyla güncellendi');
      } else {
        // Create new machine
        await machineApi.create(formData);
        // Refetch data to get the new machine with generated ID
        const updatedMachines = await machineApi.getAll();
        setMachines(updatedMachines);
        setSuccessMessage('Makina başarıyla eklendi');
      }

      handleClose();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving machine:', err);
      setError('Makina kaydedilirken hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMachine(null);
    setFormData({});
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          Makina Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fabrika makinalarını yönetin, durumlarını izleyin ve bakım planlaması yapın ({machines.length} makina)
        </Typography>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

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
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {machines.filter(m => m.status === 'operational').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Çalışan Makina
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
                  {machines.filter(m => m.status === 'maintenance').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Bakımda
                </Typography>
              </Box>
              <SettingsIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                  {machines.filter(m => m.status === 'breakdown').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Arızalı
                </Typography>
              </Box>
              <WarningIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {Math.round(machines.reduce((acc, m) => acc + m.efficiency, 0) / machines.length)}%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Ortalama Verimlilik
                </Typography>
              </Box>
              <PerformanceIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Makina ara..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Durum</InputLabel>
              <Select
                value={statusFilter}
                label="Durum"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="operational">Çalışıyor</MenuItem>
                <MenuItem value="maintenance">Bakımda</MenuItem>
                <MenuItem value="breakdown">Arızalı</MenuItem>
                <MenuItem value="idle">Boşta</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ ml: 'auto' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddMachine}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  },
                }}
              >
                Yeni Makina
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Machines Table */}
      {loading ? (
        <Card>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Kod</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Makina Adı</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lokasyon</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Departmanlar</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Atanan Personel</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Verimlilik</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Son Bakım</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sonraki Bakım</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMachines.map((machine) => (
                  <TableRow key={machine.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {machine.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {machine.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {machine.manufacturer} {machine.model}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{machine.location}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(machine.departments || []).map((dept, index) => (
                          <Chip 
                            key={index}
                            label={dept} 
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(machine.assignedPersonnel || []).slice(0, 2).map((person, index) => (
                          <Chip 
                            key={index}
                            label={person} 
                            size="small"
                            variant="outlined"
                            color="secondary"
                          />
                        ))}
                        {(machine.assignedPersonnel || []).length > 2 && (
                          <Chip 
                            label={`+${machine.assignedPersonnel.length - 2}`} 
                            size="small"
                            variant="outlined"
                            color="default"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(machine.status)}
                        color={getStatusColor(machine.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 6, 
                            backgroundColor: 'grey.200', 
                            borderRadius: 3,
                            overflow: 'hidden'
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: `${machine.efficiency}%`, 
                              height: '100%', 
                              backgroundColor: machine.efficiency > 80 ? 'success.main' : 
                                              machine.efficiency > 60 ? 'warning.main' : 'error.main',
                              borderRadius: 3
                            }} 
                          />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {machine.efficiency}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {machine.lastMaintenanceDate || 'Belirtilmemiş'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {machine.nextMaintenanceDate || 'Planlanmamış'}
                        </Typography>
                        {machine.maintenanceSchedule?.responsibleTechnician && (
                          <Typography variant="caption" color="text.secondary">
                            Sorumlu: {machine.maintenanceSchedule.responsibleTechnician}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditMachine(machine)}
                          sx={{ color: 'primary.main' }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteMachine(machine.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MachineIcon />
            <Typography variant="h6">
              {editingMachine ? 'Makina Düzenle' : 'Yeni Makina Ekle'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 3, pt: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2 
            }}>
              <TextField
                fullWidth
                label="Makina Kodu"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Makina Adı"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Üretici"
                value={formData.manufacturer || ''}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Model"
                value={formData.model || ''}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                variant="outlined"
              />
              <Autocomplete
                options={locations.map(loc => loc.name)}
                value={formData.location || ''}
                onChange={(_, newValue) => setFormData({ ...formData, location: newValue || '' })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lokasyon"
                    placeholder="Lokasyon seçin"
                  />
                )}
                sx={{ gridColumn: { sm: 'span 2' } }}
              />
              <Autocomplete
                multiple
                options={departments.map(dept => dept.name)}
                value={formData.departments || []}
                onChange={(_, newValue) => setFormData({ ...formData, departments: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Departmanlar"
                    placeholder="Departman seçin"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      variant="outlined" 
                      label={option} 
                      {...getTagProps({ index })} 
                      key={index}
                      color="primary"
                    />
                  ))
                }
              />
            </Box>
            
            <Divider />
            
            <Box>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MaintenanceIcon />
                Personel Ataması
              </Typography>
              <Autocomplete
                multiple
                options={personnel.map(p => p.name)}
                value={formData.assignedPersonnel || []}
                onChange={(_, newValue) => setFormData({ ...formData, assignedPersonnel: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Atanan Personel"
                    placeholder="Personel seçin"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      variant="outlined" 
                      label={option} 
                      {...getTagProps({ index })} 
                      key={index}
                      color="secondary"
                    />
                  ))
                }
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScheduleIcon />
                Bakım Ayarları
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2 
              }}>
                <TextField
                  fullWidth
                  label="Bakım Aralığı (Gün)"
                  type="number"
                  value={formData.maintenanceSchedule?.maintenanceInterval || 30}
                  onChange={(e) => updateMaintenanceSchedule('maintenanceInterval', Number(e.target.value))}
                  variant="outlined"
                />
                <FormControl fullWidth>
                  <InputLabel>Bakım Tipi</InputLabel>
                  <Select
                    value={formData.maintenanceSchedule?.maintenanceType || 'monthly'}
                    onChange={(e) => updateMaintenanceSchedule('maintenanceType', e.target.value)}
                    label="Bakım Tipi"
                  >
                    <MenuItem value="daily">Günlük</MenuItem>
                    <MenuItem value="weekly">Haftalık</MenuItem>
                    <MenuItem value="monthly">Aylık</MenuItem>
                    <MenuItem value="quarterly">Üç Aylık</MenuItem>
                    <MenuItem value="yearly">Yıllık</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Son Bakım Tarihi"
                  type="date"
                  value={formData.maintenanceSchedule?.lastMaintenanceDate || ''}
                  onChange={(e) => updateMaintenanceSchedule('lastMaintenanceDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Sonraki Bakım Tarihi"
                  type="date"
                  value={formData.maintenanceSchedule?.nextMaintenanceDate || ''}
                  onChange={(e) => updateMaintenanceSchedule('nextMaintenanceDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
                <Autocomplete
                  options={personnel.map(p => p.name)}
                  value={formData.maintenanceSchedule?.responsibleTechnician || ''}
                  onChange={(_, newValue) => updateMaintenanceSchedule('responsibleTechnician', newValue || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sorumlu Teknisyen"
                      placeholder="Teknisyen seçin"
                    />
                  )}
                  sx={{ gridColumn: { sm: 'span 2' } }}
                />
                <TextField
                  fullWidth
                  label="Bakım Notları"
                  value={formData.maintenanceSchedule?.maintenanceNotes || ''}
                  onChange={(e) => updateMaintenanceSchedule('maintenanceNotes', e.target.value)}
                  variant="outlined"
                  multiline
                  rows={2}
                  sx={{ gridColumn: { sm: 'span 2' } }}
                />
              </Box>
            </Box>

            <Divider />

            <Box>
              <TextField
                fullWidth
                label="Genel Notlar"
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                variant="outlined"
                multiline
                rows={3}
              />
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.isActive ?? true}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Aktif"
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} disabled={submitting}>
            İptal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} /> : null}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
              },
            }}
          >
            {submitting ? 'Kaydediliyor...' : (editingMachine ? 'Güncelle' : 'Ekle')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Machines;
