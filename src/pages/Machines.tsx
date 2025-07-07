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
  Build as MachineIcon,
  Speed as PerformanceIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import type { Machine } from '../types';

const Machines: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: '1',
      code: 'CNC-001',
      name: 'CNC Torna Tezgahı #1',
      type: 'cnc',
      manufacturer: 'HAAS',
      model: 'ST-20',
      location: 'Üretim Alanı A',
      department: 'Torna Atölyesi',
      status: 'operational',
      capacity: 100,
      efficiency: 87.5,
      utilization: 92.3,
      lastMaintenanceDate: '2024-12-15',
      nextMaintenanceDate: '2025-02-15',
      installationDate: '2023-06-15',
      isActive: true,
      notes: 'Yüksek hassasiyet gerektiren işlemler için kullanılır',
      createdAt: '2023-06-15 10:00',
      updatedAt: '2024-12-20 14:30',
    },
    {
      id: '2',
      code: 'PRESS-001',
      name: 'Hidrolik Pres #1',
      type: 'press',
      manufacturer: 'AIDA',
      model: 'HP-500',
      location: 'Üretim Alanı B',
      department: 'Presleme Atölyesi',
      status: 'maintenance',
      capacity: 500,
      efficiency: 78.2,
      utilization: 85.7,
      lastMaintenanceDate: '2024-12-20',
      nextMaintenanceDate: '2025-03-20',
      installationDate: '2022-03-10',
      isActive: true,
      notes: 'Haftalık bakım programında',
      createdAt: '2022-03-10 09:00',
      updatedAt: '2024-12-20 16:45',
    },
    {
      id: '3',
      code: 'ROBOT-001',
      name: 'Endüstriyel Robot #1',
      type: 'robot',
      manufacturer: 'KUKA',
      model: 'KR-120',
      location: 'Montaj Hattı 1',
      department: 'Montaj Atölyesi',
      status: 'operational',
      capacity: 120,
      efficiency: 94.1,
      utilization: 88.9,
      lastMaintenanceDate: '2024-11-30',
      nextMaintenanceDate: '2025-01-30',
      installationDate: '2023-01-20',
      isActive: true,
      notes: 'Otomatik montaj işlemleri için kullanılır',
      createdAt: '2023-01-20 11:00',
      updatedAt: '2024-12-18 13:20',
    },
    {
      id: '4',
      code: 'MILL-001',
      name: 'Freze Tezgahı #1',
      type: 'mill',
      manufacturer: 'DMG MORI',
      model: 'NVX-5000',
      location: 'Üretim Alanı A',
      department: 'Freze Atölyesi',
      status: 'breakdown',
      capacity: 150,
      efficiency: 65.3,
      utilization: 45.2,
      lastMaintenanceDate: '2024-10-15',
      nextMaintenanceDate: '2025-01-15',
      installationDate: '2022-08-05',
      isActive: true,
      notes: 'Arızalı - Motor değişimi gerekiyor',
      createdAt: '2022-08-05 14:30',
      updatedAt: '2024-12-21 09:15',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

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

  const getTypeText = (type: Machine['type']) => {
    switch (type) {
      case 'cnc': return 'CNC';
      case 'press': return 'Pres';
      case 'lathe': return 'Torna';
      case 'mill': return 'Freze';
      case 'robot': return 'Robot';
      case 'conveyor': return 'Konveyör';
      case 'other': return 'Diğer';
      default: return type;
    }
  };

  const handleAddMachine = () => {
    setEditingMachine(null);
    setOpen(true);
  };

  const handleEditMachine = (machine: Machine) => {
    setEditingMachine(machine);
    setOpen(true);
  };

  const handleDeleteMachine = (id: string) => {
    setMachines(machines.filter(machine => machine.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMachine(null);
  };

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         machine.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || machine.status === statusFilter;
    const matchesType = typeFilter === 'all' || machine.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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
          Fabrika makinalarını yönetin, durumlarını izleyin ve bakım planlaması yapın
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

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Tip</InputLabel>
              <Select
                value={typeFilter}
                label="Tip"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="cnc">CNC</MenuItem>
                <MenuItem value="press">Pres</MenuItem>
                <MenuItem value="lathe">Torna</MenuItem>
                <MenuItem value="mill">Freze</MenuItem>
                <MenuItem value="robot">Robot</MenuItem>
                <MenuItem value="conveyor">Konveyör</MenuItem>
                <MenuItem value="other">Diğer</MenuItem>
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
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Kod</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Makina Adı</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tip</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lokasyon</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Verimlilik</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Kullanım</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Son Bakım</TableCell>
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
                      <Chip 
                        label={getTypeText(machine.type)} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{machine.location}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {machine.department}
                      </Typography>
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {machine.utilization}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {machine.lastMaintenanceDate || 'Belirtilmemiş'}
                      </Typography>
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
                defaultValue={editingMachine?.code || ''}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Makina Adı"
                defaultValue={editingMachine?.name || ''}
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel>Makina Tipi</InputLabel>
                <Select
                  defaultValue={editingMachine?.type || 'other'}
                  label="Makina Tipi"
                >
                  <MenuItem value="cnc">CNC</MenuItem>
                  <MenuItem value="press">Pres</MenuItem>
                  <MenuItem value="lathe">Torna</MenuItem>
                  <MenuItem value="mill">Freze</MenuItem>
                  <MenuItem value="robot">Robot</MenuItem>
                  <MenuItem value="conveyor">Konveyör</MenuItem>
                  <MenuItem value="other">Diğer</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Üretici"
                defaultValue={editingMachine?.manufacturer || ''}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Model"
                defaultValue={editingMachine?.model || ''}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Lokasyon"
                defaultValue={editingMachine?.location || ''}
                variant="outlined"
              />
            </Box>
            <TextField
              fullWidth
              label="Notlar"
              defaultValue={editingMachine?.notes || ''}
              variant="outlined"
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch 
                  defaultChecked={editingMachine?.isActive ?? true}
                />
              }
              label="Aktif"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>İptal</Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
              },
            }}
          >
            {editingMachine ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Machines;
