import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Build as MaintenanceIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Schedule as ScheduleIcon,
  EventBusy as HolidayIcon,
} from '@mui/icons-material';
import type { WorkingHours, Holiday, MaintenanceWindow, WorkShift } from '../types';
import { workingHoursApi } from '../services/api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`working-hours-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const WorkingHours: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [maintenanceWindows, setMaintenanceWindows] = useState<MaintenanceWindow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  // Dialog states
  const [holidayDialogOpen, setHolidayDialogOpen] = useState(false);
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({});
  const [newMaintenance, setNewMaintenance] = useState<Partial<MaintenanceWindow>>({});

  const daysOfWeek = [
    { key: 'monday', label: 'Pazartesi' },
    { key: 'tuesday', label: 'Salı' },
    { key: 'wednesday', label: 'Çarşamba' },
    { key: 'thursday', label: 'Perşembe' },
    { key: 'friday', label: 'Cuma' },
    { key: 'saturday', label: 'Cumartesi' },
    { key: 'sunday', label: 'Pazar' },
  ];

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    try {
      setLoading(true);
      setError(null);
      const [workingHoursData, holidaysData, maintenanceData] = await Promise.all([
        workingHoursApi.get(),
        workingHoursApi.getHolidays(),
        workingHoursApi.getMaintenanceWindows()
      ]);
      setWorkingHours(workingHoursData);
      setHolidays(holidaysData);
      setMaintenanceWindows(maintenanceData);
    } catch (err) {
      console.error('Error fetching working hours:', err);
      setError('Çalışma zamanları yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkingHours = async () => {
    if (!workingHours) return;
    
    try {
      setSaving(true);
      setError(null);
      await workingHoursApi.update(workingHours);
      setSuccessMessage('Çalışma zamanları başarıyla güncellendi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving working hours:', err);
      setError('Çalışma zamanları kaydedilirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDayScheduleChange = (day: string, field: string, value: any) => {
    if (!workingHours) return;
    
    setWorkingHours({
      ...workingHours,
      weeklySchedule: {
        ...workingHours.weeklySchedule,
        [day]: {
          ...workingHours.weeklySchedule[day as keyof typeof workingHours.weeklySchedule],
          [field]: value
        }
      }
    });
  };

  const handleShiftChange = (day: string, shiftIndex: number, field: string, value: string) => {
    if (!workingHours) return;
    
    const daySchedule = workingHours.weeklySchedule[day as keyof typeof workingHours.weeklySchedule];
    const updatedShifts = [...daySchedule.shifts];
    updatedShifts[shiftIndex] = { ...updatedShifts[shiftIndex], [field]: value };
    
    handleDayScheduleChange(day, 'shifts', updatedShifts);
  };

  const addShift = (day: string) => {
    if (!workingHours) return;
    
    const daySchedule = workingHours.weeklySchedule[day as keyof typeof workingHours.weeklySchedule];
    const newShift: WorkShift = { start: '08:00', end: '16:00', name: 'Yeni Vardiya' };
    
    handleDayScheduleChange(day, 'shifts', [...daySchedule.shifts, newShift]);
  };

  const removeShift = (day: string, shiftIndex: number) => {
    if (!workingHours) return;
    
    const daySchedule = workingHours.weeklySchedule[day as keyof typeof workingHours.weeklySchedule];
    const updatedShifts = daySchedule.shifts.filter((_, index) => index !== shiftIndex);
    
    handleDayScheduleChange(day, 'shifts', updatedShifts);
  };

  const handleAddHoliday = async () => {
    if (!newHoliday.startDate || !newHoliday.endDate || !newHoliday.name || !newHoliday.type) return;
    
    // Yarım gün tatili için saat kontrolü
    if (newHoliday.isFullDay === false && (!newHoliday.startTime || !newHoliday.endTime)) {
      setError('Yarım gün tatili için başlangıç ve bitiş saati gereklidir.');
      return;
    }
    
    try {
      // Eğer isFullDay belirtilmemişse true yap
      const holidayData = {
        ...newHoliday,
        isFullDay: newHoliday.isFullDay !== false
      };
      
      await workingHoursApi.addHoliday(holidayData as Holiday);
      setHolidayDialogOpen(false);
      setNewHoliday({});
      fetchWorkingHours();
      setSuccessMessage('Tatil günü başarıyla eklendi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Tatil günü eklenirken hata oluştu.');
    }
  };

  const handleDeleteHoliday = async (date: string) => {
    try {
      await workingHoursApi.deleteHoliday(date);
      fetchWorkingHours();
      setSuccessMessage('Tatil günü başarıyla silindi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Tatil günü silinirken hata oluştu.');
    }
  };

  const handleAddMaintenance = async () => {
    if (!newMaintenance.startDate || !newMaintenance.endDate || !newMaintenance.name || !newMaintenance.type) return;
    
    try {
      await workingHoursApi.addMaintenance(newMaintenance as MaintenanceWindow);
      setMaintenanceDialogOpen(false);
      setNewMaintenance({});
      fetchWorkingHours();
      setSuccessMessage('Bakım dönemi başarıyla eklendi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Bakım dönemi eklenirken hata oluştu.');
    }
  };

  const handleDeleteMaintenance = async (startDate: string) => {
    try {
      await workingHoursApi.deleteMaintenance(startDate);
      fetchWorkingHours();
      setSuccessMessage('Bakım dönemi başarıyla silindi');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Bakım dönemi silinirken hata oluştu.');
    }
  };

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'error';
      case 'religious': return 'warning';
      case 'company': return 'info';
      default: return 'default';
    }
  };

  const getMaintenanceTypeColor = (type: string) => {
    switch (type) {
      case 'annual': return 'primary';
      case 'seasonal': return 'secondary';
      case 'emergency': return 'error';
      case 'planned': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!workingHours) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Çalışma zamanları bulunamadı.</Alert>
      </Box>
    );
  }

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
          Fabrika Çalışma Zamanları
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Üretim planlaması ve kapasite yönetimi için çalışma zamanlarını düzenleyin
        </Typography>
      </Box>

      {/* Error & Success Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {/* Statistics Cards */}
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
                  {workingHours?.effectiveHours?.dailyHours || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Günlük Saat
                </Typography>
              </Box>
              <TimeIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
          color: 'white' 
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {workingHours?.effectiveHours?.weeklyHours || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Haftalık Saat
                </Typography>
              </Box>
              <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                  {holidays?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Tatil Günü
                </Typography>
              </Box>
              <HolidayIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
                  {maintenanceWindows?.length || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Bakım Dönemi
                </Typography>
              </Box>
              <MaintenanceIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Save Button */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
          onClick={handleSaveWorkingHours}
          disabled={saving}
          sx={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
            },
          }}
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab icon={<ScheduleIcon />} label="Haftalık Program" />
          <Tab icon={<HolidayIcon />} label="Tatil Günleri" />
          <Tab icon={<MaintenanceIcon />} label="Bakım Dönemleri" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* Weekly Schedule */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {daysOfWeek.map((day) => {
            const daySchedule = workingHours?.weeklySchedule?.[day.key as keyof typeof workingHours.weeklySchedule];
            return (
              <Card key={day.key}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {day.label}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={daySchedule.isWorkingDay}
                          onChange={(e) => handleDayScheduleChange(day.key, 'isWorkingDay', e.target.checked)}
                        />
                      }
                      label="Çalışma Günü"
                    />
                  </Box>

                  {daySchedule.isWorkingDay && (
                    <Box>
                      {daySchedule.shifts.map((shift, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                          <TextField
                            label="Vardiya Adı"
                            value={shift.name}
                            onChange={(e) => handleShiftChange(day.key, index, 'name', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <TextField
                            label="Başlangıç"
                            type="time"
                            value={shift.start}
                            onChange={(e) => handleShiftChange(day.key, index, 'start', e.target.value)}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            label="Bitiş"
                            type="time"
                            value={shift.end}
                            onChange={(e) => handleShiftChange(day.key, index, 'end', e.target.value)}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => removeShift(day.key, index)}
                            disabled={daySchedule.shifts.length <= 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => addShift(day.key)}
                        size="small"
                        variant="outlined"
                      >
                        Vardiya Ekle
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Holidays */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setHolidayDialogOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
              },
            }}
          >
            Tatil Günü Ekle
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Tarih Aralığı</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Saat Aralığı</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tatil Adı</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tip</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(holidays || []).map((holiday, index) => (
                <TableRow key={holiday.startDate + '_' + index} hover>
                  <TableCell>
                    {holiday.startDate === holiday.endDate 
                      ? holiday.startDate 
                      : `${holiday.startDate} - ${holiday.endDate}`
                    }
                  </TableCell>
                  <TableCell>
                    {holiday.isFullDay === false && holiday.startTime && holiday.endTime
                      ? `${holiday.startTime} - ${holiday.endTime}`
                      : 'Tam Gün'
                    }
                  </TableCell>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={holiday.type === 'national' ? 'Ulusal' : holiday.type === 'religious' ? 'Dini' : 'Şirket'}
                      color={getHolidayTypeColor(holiday.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteHoliday(holiday.startDate)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Maintenance Windows */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setMaintenanceDialogOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              },
            }}
          >
            Bakım Dönemi Ekle
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Başlangıç</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bitiş</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bakım Adı</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Açıklama</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tip</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(maintenanceWindows || []).map((maintenance) => (
                <TableRow key={maintenance.startDate} hover>
                  <TableCell>{maintenance.startDate}</TableCell>
                  <TableCell>{maintenance.endDate}</TableCell>
                  <TableCell>{maintenance.name}</TableCell>
                  <TableCell>{maintenance.description || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={maintenance.type === 'annual' ? 'Yıllık' : 
                             maintenance.type === 'seasonal' ? 'Mevsimlik' :
                             maintenance.type === 'emergency' ? 'Acil' : 'Planlı'}
                      color={getMaintenanceTypeColor(maintenance.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteMaintenance(maintenance.startDate)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Holiday Dialog */}
      <Dialog open={holidayDialogOpen} onClose={() => setHolidayDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HolidayIcon />
            <Typography variant="h6">Yeni Tatil Günü Ekle</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 3, pt: 2 }}>
            <TextField
              fullWidth
              label="Başlangıç Tarihi"
              type="date"
              value={newHoliday.startDate || ''}
              onChange={(e) => {
                const startDate = e.target.value;
                setNewHoliday({ 
                  ...newHoliday, 
                  startDate,
                  // Eğer bitiş tarihi yoksa veya başlangıç tarihinden küçükse, bitiş tarihini başlangıç tarihi yap
                  endDate: (!newHoliday.endDate || newHoliday.endDate < startDate) ? startDate : newHoliday.endDate
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Bitiş Tarihi"
              type="date"
              value={newHoliday.endDate || ''}
              onChange={(e) => setNewHoliday({ ...newHoliday, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: newHoliday.startDate || ''
              }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={newHoliday.isFullDay !== false}
                  onChange={(e) => {
                    const isFullDay = e.target.checked;
                    setNewHoliday({ 
                      ...newHoliday, 
                      isFullDay,
                      // Tam gün tatili ise saat bilgilerini temizle
                      startTime: isFullDay ? undefined : newHoliday.startTime,
                      endTime: isFullDay ? undefined : newHoliday.endTime
                    });
                  }}
                />
              }
              label="Tam Gün Tatili"
            />

            {newHoliday.isFullDay === false && (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Başlangıç Saati"
                  type="time"
                  value={newHoliday.startTime || ''}
                  onChange={(e) => setNewHoliday({ ...newHoliday, startTime: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Bitiş Saati"
                  type="time"
                  value={newHoliday.endTime || ''}
                  onChange={(e) => setNewHoliday({ ...newHoliday, endTime: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            )}

            <TextField
              fullWidth
              label="Tatil Adı"
              value={newHoliday.name || ''}
              onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Tatil Tipi</InputLabel>
              <Select
                value={newHoliday.type || ''}
                onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value as Holiday['type'] })}
                label="Tatil Tipi"
              >
                <MenuItem value="national">Ulusal Bayram</MenuItem>
                <MenuItem value="religious">Dini Bayram</MenuItem>
                <MenuItem value="company">Şirket Tatili</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHolidayDialogOpen(false)}>İptal</Button>
          <Button variant="contained" onClick={handleAddHoliday}>
            Ekle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Maintenance Dialog */}
      <Dialog open={maintenanceDialogOpen} onClose={() => setMaintenanceDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MaintenanceIcon />
            <Typography variant="h6">Yeni Bakım Dönemi Ekle</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 3, pt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                fullWidth
                label="Başlangıç Tarihi"
                type="date"
                value={newMaintenance.startDate || ''}
                onChange={(e) => setNewMaintenance({ ...newMaintenance, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Bitiş Tarihi"
                type="date"
                value={newMaintenance.endDate || ''}
                onChange={(e) => setNewMaintenance({ ...newMaintenance, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label="Bakım Adı"
              value={newMaintenance.name || ''}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Açıklama"
              multiline
              rows={3}
              value={newMaintenance.description || ''}
              onChange={(e) => setNewMaintenance({ ...newMaintenance, description: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Bakım Tipi</InputLabel>
              <Select
                value={newMaintenance.type || ''}
                onChange={(e) => setNewMaintenance({ ...newMaintenance, type: e.target.value as MaintenanceWindow['type'] })}
                label="Bakım Tipi"
              >
                <MenuItem value="annual">Yıllık Bakım</MenuItem>
                <MenuItem value="seasonal">Mevsimlik Bakım</MenuItem>
                <MenuItem value="planned">Planlı Bakım</MenuItem>
                <MenuItem value="emergency">Acil Bakım</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMaintenanceDialogOpen(false)}>İptal</Button>
          <Button variant="contained" onClick={handleAddMaintenance}>
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkingHours;
