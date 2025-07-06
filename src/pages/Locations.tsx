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
      name: 'Kat 1',
      type: 'floor',
      parentLocation: '1',
      isActive: true,
      description: 'Birinci kat',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '3',
      code: 'FAB-A-K1-URETIM',
      name: 'Üretim Alanı',
      type: 'area',
      parentLocation: '2',
      isActive: true,
      description: 'Ana üretim alanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '4',
      code: 'FAB-A-K1-QC',
      name: 'Kalite Kontrol Alanı',
      type: 'area',
      parentLocation: '2',
      isActive: true,
      description: 'Kalite kontrol test alanı',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '5',
      code: 'WS-001',
      name: 'İş İstasyonu 1',
      type: 'workstation',
      parentLocation: '3',
      isActive: true,
      description: 'Montaj istasyonu',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '6',
      code: 'WS-002',
      name: 'İş İstasyonu 2',
      type: 'workstation',
      parentLocation: '3',
      isActive: true,
      description: 'Test istasyonu',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '7',
      code: 'FAB-A-ZMN',
      name: 'Zemin Kat',
      type: 'floor',
      parentLocation: '1',
      isActive: true,
      description: 'Zemin kat',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-01 08:00'
    },
    {
      id: '8',
      code: 'FAB-A-ZMN-DEPO',
      name: 'Depo Alanı',
      type: 'area',
      parentLocation: '7',
      isActive: true,
      description: 'Ana depo alanı',
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
    parentLocation: '',
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
        parentLocation: '',
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
    // Alt lokasyonları kontrol et
    const hasChildren = locations.some(loc => loc.parentLocation === id);
    if (hasChildren) {
      alert('Bu lokasyonun alt lokasyonları bulunmaktadır. Önce alt lokasyonları siliniz.');
      return;
    }
    
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

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      building: 'Bina',
      floor: 'Kat',
      area: 'Alan',
      workstation: 'İş İstasyonu'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      building: <BuildingIcon />,
      floor: <FloorIcon />,
      area: <AreaIcon />,
      workstation: <WorkstationIcon />
    };
    return typeIcons[type as keyof typeof typeIcons] || <LocationIcon />;
  };

  const getTypeColor = (type: string) => {
    const typeColors = {
      building: 'error',
      floor: 'warning',
      area: 'info',
      workstation: 'success'
    };
    return typeColors[type as keyof typeof typeColors] || 'default';
  };

  const getParentLocationName = (parentId?: string) => {
    if (!parentId) return '-';
    const parent = locations.find(loc => loc.id === parentId);
    return parent ? parent.name : '-';
  };

  const buildingCount = locations.filter(loc => loc.type === 'building').length;
  const workstationCount = locations.filter(loc => loc.type === 'workstation').length;
  const activeCount = locations.filter(loc => loc.isActive).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Lokasyon Yönetimi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Yeni Lokasyon
        </Button>
      </Box>

      {/* İstatistik Kartları */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocationIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" color="primary">
                {locations.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Lokasyon
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <BuildingIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" color="error.main">
                {buildingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bina Sayısı
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <WorkstationIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" color="success.main">
                {workstationCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                İş İstasyonu
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Chip 
                label="AKTİF"
                color="success"
                sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}
              />
              <Typography variant="h4" color="success.main">
                {activeCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aktif Lokasyon
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Lokasyon Tablosu */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Lokasyon Listesi
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Kod</TableCell>
                    <TableCell>Ad</TableCell>
                    <TableCell>Tip</TableCell>
                    <TableCell>Üst Lokasyon</TableCell>
                    <TableCell>Durum</TableCell>
                    <TableCell>Açıklama</TableCell>
                    <TableCell>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell>
                        <Chip 
                          label={location.code} 
                          color="primary" 
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTypeIcon(location.type)}
                          {location.name}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getTypeLabel(location.type)} 
                          color={getTypeColor(location.type) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{getParentLocationName(location.parentLocation)}</TableCell>
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
      </Box>

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
              />
              <TextField
                fullWidth
                label="Lokasyon Adı"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Lokasyon Tipi</InputLabel>
                <Select
                  value={formData.type || ''}
                  label="Lokasyon Tipi"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <MenuItem value="building">Bina</MenuItem>
                  <MenuItem value="floor">Kat</MenuItem>
                  <MenuItem value="area">Alan</MenuItem>
                  <MenuItem value="workstation">İş İstasyonu</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Üst Lokasyon</InputLabel>
                <Select
                  value={formData.parentLocation || ''}
                  label="Üst Lokasyon"
                  onChange={(e) => setFormData({ ...formData, parentLocation: e.target.value })}
                >
                  <MenuItem value="">- Yok -</MenuItem>
                  {locations
                    .filter(loc => loc.id !== editingLocation?.id) // Kendisini seçemesin
                    .map(location => (
                      <MenuItem key={location.id} value={location.id}>
                        {location.name} ({getTypeLabel(location.type)})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                label="Açıklama"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 100 }}>
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
            {editingLocation ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Locations;
