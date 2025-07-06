import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FactorySettings: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSetting, setSelectedSetting] = useState<string>('departments');

  const settingsMenuItems = [
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

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Fabrika Ayarları
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Ayarlar Menüsü */}
        <Box sx={{ minWidth: 300, flex: 1 }}>
          <Paper sx={{ p: 2 }}>
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
        <Box sx={{ minWidth: 400, flex: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, color: 'primary.main' }}>
                {settingsMenuItems.find(item => item.id === selectedSetting)?.text}
              </Typography>
              
              {selectedSetting === 'departments' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Bu bölümde fabrikadaki departmanları tanımlayabilir ve yönetebilirsiniz.
                  </Typography>
                  <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      💡 Departman özelliklerini tanımlayın:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      • Departman adı ve kodu<br/>
                      • Sorumlu kişiler<br/>
                      • Lokasyon bilgileri<br/>
                      • Üretim kapasitesi<br/>
                      • Çalışma vardiyaları
                    </Typography>
                  </Box>
                </Box>
              )}

              {selectedSetting === 'users' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Sistem kullanıcılarını ve yetkilerini yönetin.
                  </Typography>
                </Box>
              )}

              {selectedSetting === 'shifts' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Fabrika çalışma vardiyalarını tanımlayın.
                  </Typography>
                </Box>
              )}

              {selectedSetting === 'locations' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Fabrika içi lokasyonları ve çalışma alanlarını yönetin.
                  </Typography>
                </Box>
              )}

              {selectedSetting === 'general' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Sistem genel ayarlarını yapılandırın.
                  </Typography>
                </Box>
              )}

              {selectedSetting === 'security' && (
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Sistem güvenlik politikalarını ayarlayın.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default FactorySettings;
