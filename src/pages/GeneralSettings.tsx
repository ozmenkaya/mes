import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Slider,
  Alert,
} from '@mui/material';
import {
  Save as SaveIcon,
  Restore as RestoreIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import type { GeneralSettings } from '../types';

const GeneralSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettings>({
    companyName: 'Örnek Üretim A.Ş.',
    language: 'tr',
    timezone: 'Europe/Istanbul',
    dateFormat: 'DD/MM/YYYY',
    currency: 'TRY',
    workingDaysPerWeek: 5,
    workingHoursPerDay: 8,
    maintenanceAlertDays: 7,
    qualityCheckRequired: true,
    autoCompleteWorkOrders: false
  });

  const [isModified, setIsModified] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingChange = (key: keyof GeneralSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsModified(true);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    // Burada API çağrısı yapılacak
    console.log('Ayarlar kaydediliyor:', settings);
    setIsModified(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tüm ayarları varsayılan değerlere döndürmek istediğinizden emin misiniz?')) {
      setSettings({
        companyName: 'Örnek Üretim A.Ş.',
        language: 'tr',
        timezone: 'Europe/Istanbul',
        dateFormat: 'DD/MM/YYYY',
        currency: 'TRY',
        workingDaysPerWeek: 5,
        workingHoursPerDay: 8,
        maintenanceAlertDays: 7,
        qualityCheckRequired: true,
        autoCompleteWorkOrders: false
      });
      setIsModified(false);
    }
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
          Genel Ayarlar
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Sistem genelinde kullanılacak temel ayarları yapılandırın
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RestoreIcon />}
                onClick={handleReset}
                disabled={!isModified}
              >
                Sıfırla
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!isModified}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  },
                }}
              >
                Kaydet
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Ayarlar başarıyla kaydedildi!
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Şirket Bilgileri */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <BusinessIcon color="primary" />
              <Typography variant="h6">
                Şirket Bilgileri
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Şirket Adı"
              value={settings.companyName}
              onChange={(e) => handleSettingChange('companyName', e.target.value)}
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>

        {/* Lokalizasyon Ayarları */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LanguageIcon color="primary" />
              <Typography variant="h6">
                Lokalizasyon Ayarları
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Dil</InputLabel>
                <Select
                  value={settings.language}
                  label="Dil"
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <MenuItem value="tr">Türkçe</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Saat Dilimi</InputLabel>
                <Select
                  value={settings.timezone}
                  label="Saat Dilimi"
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                >
                  <MenuItem value="Europe/Istanbul">İstanbul (UTC+3)</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="Europe/London">Londra (UTC+0)</MenuItem>
                  <MenuItem value="America/New_York">New York (UTC-5)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Tarih Formatı</InputLabel>
                <Select
                  value={settings.dateFormat}
                  label="Tarih Formatı"
                  onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                >
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Para Birimi</InputLabel>
                <Select
                  value={settings.currency}
                  label="Para Birimi"
                  onChange={(e) => handleSettingChange('currency', e.target.value)}
                >
                  <MenuItem value="TRY">Türk Lirası (₺)</MenuItem>
                  <MenuItem value="USD">ABD Doları ($)</MenuItem>
                  <MenuItem value="EUR">Euro (€)</MenuItem>
                  <MenuItem value="GBP">İngiliz Sterlini (£)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Çalışma Zamanları */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ScheduleIcon color="primary" />
              <Typography variant="h6">
                Çalışma Zamanları
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Haftalık Çalışma Günü: {settings.workingDaysPerWeek} gün
              </Typography>
              <Slider
                value={settings.workingDaysPerWeek}
                onChange={(_, value) => handleSettingChange('workingDaysPerWeek', value)}
                min={1}
                max={7}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Günlük Çalışma Saati: {settings.workingHoursPerDay} saat
              </Typography>
              <Slider
                value={settings.workingHoursPerDay}
                onChange={(_, value) => handleSettingChange('workingHoursPerDay', value)}
                min={1}
                max={24}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Sistem Ayarları */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SecurityIcon color="primary" />
              <Typography variant="h6">
                Sistem Ayarları
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Bakım Uyarı Süresi: {settings.maintenanceAlertDays} gün önceden
              </Typography>
              <Slider
                value={settings.maintenanceAlertDays}
                onChange={(_, value) => handleSettingChange('maintenanceAlertDays', value)}
                min={1}
                max={30}
                marks={[
                  { value: 1, label: '1' },
                  { value: 7, label: '7' },
                  { value: 14, label: '14' },
                  { value: 30, label: '30' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.qualityCheckRequired}
                    onChange={(e) => handleSettingChange('qualityCheckRequired', e.target.checked)}
                  />
                }
                label="Kalite kontrol zorunluluğu"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoCompleteWorkOrders}
                    onChange={(e) => handleSettingChange('autoCompleteWorkOrders', e.target.checked)}
                  />
                }
                label="İş emirlerini otomatik tamamla"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Sistem Bilgileri */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sistem Bilgileri
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Sistem Versiyonu:</strong> v1.0.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Son Güncelleme:</strong> 15 Ocak 2024
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Veritabanı Versiyonu:</strong> PostgreSQL 14.2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Aktif Kullanıcı Sayısı:</strong> 25
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Toplam İş Emri:</strong> 1,247
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default GeneralSettingsPage;
