import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import {
  Business as DepartmentIcon,
  People as UsersIcon,
  Settings as GeneralIcon,
  LocationOn as LocationIcon,
  Schedule as ShiftIcon,
  Security as SecurityIcon,
  AccessTime as WorkingHoursIcon,
  CalendarMonth as CalendarIcon,
  Build as MaintenanceIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { workingHoursApi } from '../services/api';
import type { WorkingHours } from '../types';

const FactorySettings: React.FC = () => {
  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<string>('working-hours');

  useEffect(() => {
    fetchWorkingHoursData();
  }, []);

  const fetchWorkingHoursData = async () => {
    try {
      setLoading(true);
      const data = await workingHoursApi.get();
      setWorkingHours(data);
    } catch (error) {
      console.error('Çalışma saatleri verisi alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const settingsMenuItems = [
    {
      id: 'working-hours',
      text: 'Çalışma Saatleri',
      icon: <WorkingHoursIcon />,
      description: 'Fabrika çalışma saatleri ve tatil günleri',
      path: '/factory-settings/working-hours'
    },
    {
      id: 'departments',
      text: 'Departmanlar',
      icon: <DepartmentIcon />,
      description: 'Fabrika departmanlarını yönetin',
      path: '/factory-settings/departments'
    },
    {
      id: 'users',
      text: 'Kullanıcı Yönetimi',
      icon: <UsersIcon />,
      description: 'Sistem kullanıcılarını yönetin',
      path: '/factory-settings/users'
    },
    {
      id: 'shifts',
      text: 'Vardiya Ayarları',
      icon: <ShiftIcon />,
      description: 'Çalışma vardiyalarını tanımlayın',
      path: '/factory-settings/shifts'
    },
    {
      id: 'locations',
      text: 'Lokasyon Yönetimi',
      icon: <LocationIcon />,
      description: 'Fabrika lokasyonlarını tanımlayın',
      path: '/factory-settings/locations'
    },
    {
      id: 'general',
      text: 'Genel Ayarlar',
      icon: <GeneralIcon />,
      description: 'Sistem genel ayarları',
      path: '/factory-settings/general'
    },
    {
      id: 'security',
      text: 'Güvenlik Ayarları',
      icon: <SecurityIcon />,
      description: 'Sistem güvenlik ayarları',
      path: '/factory-settings/security'
    },
  ];

  const handleSettingClick = (settingId: string, path: string) => {
    setSelectedSetting(settingId);
    navigate(path);
  };

  const renderWorkingHoursContent = () => (
    <Box>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Fabrika çalışma saatleri, tatil günleri ve bakım zamanlarını yönetin.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : workingHours ? (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Mevcut Çalışma Durumu
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <Chip 
              icon={<CalendarIcon />}
              label={`${(workingHours.holidays || []).length} Tatil Günü`}
              color="primary"
              variant="outlined"
            />
            <Chip 
              icon={<MaintenanceIcon />}
              label={`${(workingHours.maintenanceWindows || []).length} Bakım Zamanı`}
              color="warning"
              variant="outlined"
            />
          </Box>

          <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Haftalık Çalışma:</strong> {workingHours.effectiveHours?.weeklyHours || 0} saat
            </Typography>
            <Typography variant="body2">
              <strong>Günlük Çalışma:</strong> {workingHours.effectiveHours?.dailyHours || 0} saat
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 2, backgroundColor: 'error.light', borderRadius: 1, mb: 3 }}>
          <Typography variant="body2" color="error.contrastText">
            Çalışma saatleri verisi yüklenemedi
          </Typography>
        </Box>
      )}

      <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1, mb: 3 }}>
        <Typography variant="body2" color="primary.contrastText" sx={{ mb: 2 }}>
          💡 Çalışma zamanları özellikleri:
        </Typography>
        <Typography variant="body2" color="primary.contrastText">
          • Haftalık çalışma saatleri ve vardiya tanımları<br/>
          • Tatil günleri ve özel günler (tarih aralığı desteği)<br/>
          • Yarım gün tatil ve saat bazlı tatil tanımları<br/>
          • Bakım zamanları ve planlı duruşlar<br/>
          • Kapasite planlama desteği
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        onClick={() => navigate('/factory-settings/working-hours')}
        startIcon={<WorkingHoursIcon />}
        size="large"
        sx={{ px: 4 }}
      >
        Çalışma Saatlerini Yönet
      </Button>
    </Box>
  );

  const renderDefaultContent = (setting: any) => (
    <Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {setting?.description}
      </Typography>
      <Button 
        variant="outlined" 
        onClick={() => navigate(setting?.path)}
        startIcon={setting?.icon}
      >
        {setting?.text} Ayarlarına Git
      </Button>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Fabrika Ayarları
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Sistem yapılandırmasını ve fabrika ayarlarını yönetin
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        flexDirection: { xs: 'column', lg: 'row' }
      }}>
        {/* Ayarlar Menüsü */}
        <Box sx={{ 
          minWidth: { lg: 300 }, 
          flex: { lg: 1 },
          order: { xs: 2, lg: 1 }
        }}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Ayar Kategorileri
            </Typography>
            <List>
              {settingsMenuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedSetting === item.id}
                      onClick={() => handleSettingClick(item.id, item.path)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                          '& .MuiListItemIcon-root': {
                            color: 'white',
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          opacity: 0.8,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        secondary={item.description}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          sx: { color: 'text.secondary' }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < settingsMenuItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Seçili Ayar İçeriği */}
        <Box sx={{ 
          minWidth: { lg: 400 }, 
          flex: { lg: 2 },
          order: { xs: 1, lg: 2 }
        }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                {settingsMenuItems.find(item => item.id === selectedSetting)?.text}
              </Typography>
              
              {selectedSetting === 'working-hours' && renderWorkingHoursContent()}
              {selectedSetting !== 'working-hours' && renderDefaultContent(
                settingsMenuItems.find(item => item.id === selectedSetting)
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default FactorySettings;
