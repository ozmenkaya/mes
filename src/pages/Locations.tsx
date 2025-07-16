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
  LocationOn as LocationIcon,
  Business as BuildingIcon,
  Layers as FloorIcon,
  CropFree as AreaIcon,
  Workspaces as WorkstationIcon,
} from '@mui/icons-material';
import type { Location } from '../types';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      code: 'FAB-A',
      name: 'Fabrika A',
      type: 'building',
      isActive: true,
      description: 'Ana üretim binası',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '2',
      code: 'FAB-A-K1',
      name: 'Fabrika A - Kat 1',
      type: 'floor',
      isActive: true,
      description: 'Birinci kat üretim alanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '3',
      code: 'FAB-A-K2',
      name: 'Fabrika A - Kat 2',
      type: 'floor',
      isActive: true,
      description: 'İkinci kat kalite kontrol',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '4',
      code: 'URT-001',
      name: 'Üretim Alanı 1',
      type: 'area',
      isActive: true,
      description: 'Ana üretim hattı alanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '5',
      code: 'MNT-001',
      name: 'Montaj İstasyonu 1',
      type: 'workstation',
      isActive: true,
      description: 'Birinci montaj istasyonu',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '6',
      code: 'DEPO-001',
      name: 'Malzeme Deposu',
      type: 'area',
      isActive: true,
      description: 'Hammadde ve malzeme deposu',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    code: '',
    name: '',
    type: 'area',
    isActive: true,
    description: ''
  });

  const handleOpen = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
      setFormData(location);
    } else {
      setEditingLocation(null);
      setFormData({
        code: '',
        name: '',
        type: 'area',
        isActive: true,
        description: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLocation(null);
  };

  const handleSave = () => {
    if (editingLocation) {
      setLocations(locations.map(location => 
        location.id === editingLocation.id 
          ? { ...location, ...formData, updatedAt: new Date().toISOString().slice(0, 16) }
          : location
      ));
    } else {
      const newLocation: Location = {
        ...formData as Location,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().slice(0, 16),
        updatedAt: new Date().toISOString().slice(0, 16)
      };
      setLocations([...locations, newLocation]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu lokasyonu silmek istediğinizden emin misiniz?')) {
      setLocations(locations.filter(location => location.id !== id));
    }
  };

  const toggleLocationStatus = (id: string) => {
    setLocations(locations.map(location => 
      location.id === id 
        ? { ...location, isActive: !location.isActive, updatedAt: new Date().toISOString().slice(0, 16) }
        : location
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'building':
        return <BuildingIcon />;
      case 'floor':
        return <FloorIcon />;
      case 'area':
        return <AreaIcon />;
      case 'workstation':
        return <WorkstationIcon />;
      default:
        return <LocationIcon />;
    }
  };

  const getTypeLabel = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      building: 'Bina',
      floor: 'Kat',
      area: 'Alan',
      workstation: 'İş İstasyonu'
    };
    return typeLabels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      building: 'primary',
      floor: 'secondary',
      area: 'info',
      workstation: 'success'
    };
    return typeColors[type] || 'default';
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
          Lokasyon Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fabrika içi lokasyonları, çalışma alanlarını ve bölümleri tanımlayın ve yönetin
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
                  {locations.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Toplam Lokasyon
                </Typography>
              </Box>
              <LocationIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                  {locations.filter(l => l.isActive).length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Aktif Lokasyon
                </Typography>
              </Box>
              <Box sx={{ fontSize: 40, opacity: 0.8 }}>✅</Box>
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
                  {locations.filter(l => l.type === 'workstation').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  İş İstasyonu
                </Typography>
              </Box>
              <WorkstationIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                  {locations.filter(l => l.type === 'area').length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Çalışma Alanı
                </Typography>
              </Box>
              <AreaIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                Yeni Lokasyon
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Locations Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Lokasyon Kodu</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Lokasyon Adı</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tür</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Açıklama</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id} hover>
                    <TableCell>
                      <Chip 
                        label={location.code} 
                        color="primary" 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>{location.name}</TableCell>
                    <TableCell>
                      <Chip 
                        icon={getTypeIcon(location.type)}
                        label={getTypeLabel(location.type)} 
                        color={getTypeColor(location.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={location.isActive ? 'Aktif' : 'Pasif'} 
                        color={location.isActive ? 'success' : 'error'}
                        size="small"
                        onClick={() => toggleLocationStatus(location.id)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                    <TableCell>{location.description || '-'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(location)} size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(location.id)} size="small">
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

      {/* Lokasyon Ekleme/Düzenleme Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingLocation ? 'Lokasyon Düzenle' : 'Yeni Lokasyon Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Lokasyon Kodu"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="URT-001"
              />
              <TextField
                fullWidth
                label="Lokasyon Adı"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Üretim Alanı 1"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Lokasyon Türü</InputLabel>
                <Select
                  value={formData.type || 'area'}
                  label="Lokasyon Türü"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <MenuItem value="building">Bina</MenuItem>
                  <MenuItem value="floor">Kat</MenuItem>
                  <MenuItem value="area">Alan</MenuItem>
                  <MenuItem value="workstation">İş İstasyonu</MenuItem>
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
            <TextField
              fullWidth
              label="Açıklama"
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Lokasyon hakkında kısa açıklama..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSave} variant="contained">
            {editingLocation ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Locations;
