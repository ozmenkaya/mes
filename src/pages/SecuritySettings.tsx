import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  Key as KeyIcon,
  Warning as WarningIcon,
  History as HistoryIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  passwordRequireUppercase: boolean;
  passwordExpiryDays: number;
  loginAttemptLimit: number;
  lockoutDurationMinutes: number;
  sessionTimeoutMinutes: number;
  twoFactorRequired: boolean;
  auditLogEnabled: boolean;
  ipWhitelistEnabled: boolean;
}

interface LoginAttempt {
  id: string;
  username: string;
  ipAddress: string;
  timestamp: string;
  success: boolean;
  userAgent: string;
}

const SecuritySettings: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    passwordMinLength: 8,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    passwordRequireUppercase: true,
    passwordExpiryDays: 90,
    loginAttemptLimit: 5,
    lockoutDurationMinutes: 30,
    sessionTimeoutMinutes: 120,
    twoFactorRequired: false,
    auditLogEnabled: true,
    ipWhitelistEnabled: false
  });

  const [recentLogins, setRecentLogins] = useState<LoginAttempt[]>([
    {
      id: '1',
      username: 'admin',
      ipAddress: '192.168.1.100',
      timestamp: '2024-01-15 14:30:25',
      success: true,
      userAgent: 'Chrome 120.0'
    },
    {
      id: '2',
      username: 'ayilmaz',
      ipAddress: '192.168.1.105',
      timestamp: '2024-01-15 14:25:12',
      success: true,
      userAgent: 'Firefox 121.0'
    },
    {
      id: '3',
      username: 'test_user',
      ipAddress: '10.0.0.50',
      timestamp: '2024-01-15 14:20:45',
      success: false,
      userAgent: 'Chrome 119.0'
    },
    {
      id: '4',
      username: 'ademir',
      ipAddress: '192.168.1.110',
      timestamp: '2024-01-15 14:15:33',
      success: true,
      userAgent: 'Edge 120.0'
    },
    {
      id: '5',
      username: 'unknown',
      ipAddress: '203.0.113.10',
      timestamp: '2024-01-15 14:10:18',
      success: false,
      userAgent: 'Chrome 118.0'
    }
  ]);

  const [isModified, setIsModified] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingChange = (key: keyof SecuritySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsModified(true);
    setSaveSuccess(false);
  };

  const handleSave = () => {
    console.log('Güvenlik ayarları kaydediliyor:', settings);
    setIsModified(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const clearLoginAttempt = (id: string) => {
    setRecentLogins(recentLogins.filter(attempt => attempt.id !== id));
  };

  const clearAllFailedAttempts = () => {
    if (window.confirm('Tüm başarısız giriş denemelerini temizlemek istediğinizden emin misiniz?')) {
      setRecentLogins(recentLogins.filter(attempt => attempt.success));
    }
  };

  const failedAttempts = recentLogins.filter(attempt => !attempt.success);
  const successfulLogins = recentLogins.filter(attempt => attempt.success);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Güvenlik Ayarları
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!isModified}
        >
          Kaydet
        </Button>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Güvenlik ayarları başarıyla kaydedildi!
        </Alert>
      )}

      {failedAttempts.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={clearAllFailedAttempts}>
              Temizle
            </Button>
          }
        >
          {failedAttempts.length} başarısız giriş denemesi tespit edildi!
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Şifre Politikaları */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LockIcon color="primary" />
              <Typography variant="h6">
                Şifre Politikaları
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Minimum Şifre Uzunluğu: {settings.passwordMinLength} karakter
              </Typography>
              <Slider
                value={settings.passwordMinLength}
                onChange={(_, value) => handleSettingChange('passwordMinLength', value)}
                min={6}
                max={20}
                marks={[
                  { value: 6, label: '6' },
                  { value: 8, label: '8' },
                  { value: 12, label: '12' },
                  { value: 16, label: '16' },
                  { value: 20, label: '20' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Şifre Geçerlilik Süresi: {settings.passwordExpiryDays} gün
              </Typography>
              <Slider
                value={settings.passwordExpiryDays}
                onChange={(_, value) => handleSettingChange('passwordExpiryDays', value)}
                min={30}
                max={365}
                marks={[
                  { value: 30, label: '30' },
                  { value: 60, label: '60' },
                  { value: 90, label: '90' },
                  { value: 180, label: '180' },
                  { value: 365, label: '365' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordRequireNumbers}
                    onChange={(e) => handleSettingChange('passwordRequireNumbers', e.target.checked)}
                  />
                }
                label="Şifrede rakam zorunluluğu"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordRequireSymbols}
                    onChange={(e) => handleSettingChange('passwordRequireSymbols', e.target.checked)}
                  />
                }
                label="Şifrede özel karakter zorunluluğu"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordRequireUppercase}
                    onChange={(e) => handleSettingChange('passwordRequireUppercase', e.target.checked)}
                  />
                }
                label="Şifrede büyük harf zorunluluğu"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Oturum Güvenliği */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <KeyIcon color="primary" />
              <Typography variant="h6">
                Oturum Güvenliği
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Maksimum Giriş Denemesi: {settings.loginAttemptLimit}
              </Typography>
              <Slider
                value={settings.loginAttemptLimit}
                onChange={(_, value) => handleSettingChange('loginAttemptLimit', value)}
                min={3}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Kilitleme Süresi: {settings.lockoutDurationMinutes} dakika
              </Typography>
              <Slider
                value={settings.lockoutDurationMinutes}
                onChange={(_, value) => handleSettingChange('lockoutDurationMinutes', value)}
                min={5}
                max={120}
                marks={[
                  { value: 5, label: '5' },
                  { value: 15, label: '15' },
                  { value: 30, label: '30' },
                  { value: 60, label: '60' },
                  { value: 120, label: '120' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Oturum Zaman Aşımı: {settings.sessionTimeoutMinutes} dakika
              </Typography>
              <Slider
                value={settings.sessionTimeoutMinutes}
                onChange={(_, value) => handleSettingChange('sessionTimeoutMinutes', value)}
                min={30}
                max={480}
                marks={[
                  { value: 30, label: '30' },
                  { value: 60, label: '60' },
                  { value: 120, label: '120' },
                  { value: 240, label: '240' },
                  { value: 480, label: '480' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorRequired}
                    onChange={(e) => handleSettingChange('twoFactorRequired', e.target.checked)}
                  />
                }
                label="İki faktörlü kimlik doğrulama zorunluluğu"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.ipWhitelistEnabled}
                    onChange={(e) => handleSettingChange('ipWhitelistEnabled', e.target.checked)}
                  />
                }
                label="IP beyaz liste kontrolü"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Denetim ve Kayıtlar */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <HistoryIcon color="primary" />
              <Typography variant="h6">
                Denetim ve Kayıtlar
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.auditLogEnabled}
                  onChange={(e) => handleSettingChange('auditLogEnabled', e.target.checked)}
                />
              }
              label="Denetim günlüğü etkin"
            />
          </CardContent>
        </Card>

        {/* Son Giriş Denemeleri */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justify: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon color="primary" />
                <Typography variant="h6">
                  Son Giriş Denemeleri
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" color="success.main">
                  Başarılı: {successfulLogins.length}
                </Typography>
                <Typography variant="body2" color="error.main">
                  Başarısız: {failedAttempts.length}
                </Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Kullanıcı</TableCell>
                    <TableCell>IP Adresi</TableCell>
                    <TableCell>Zaman</TableCell>
                    <TableCell>Durum</TableCell>
                    <TableCell>Tarayıcı</TableCell>
                    <TableCell>İşlem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLogins.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell>{attempt.username}</TableCell>
                      <TableCell>{attempt.ipAddress}</TableCell>
                      <TableCell>{attempt.timestamp}</TableCell>
                      <TableCell>
                        <Chip 
                          label={attempt.success ? 'Başarılı' : 'Başarısız'} 
                          color={attempt.success ? 'success' : 'error'}
                          size="small"
                          icon={attempt.success ? <SecurityIcon /> : <WarningIcon />}
                        />
                      </TableCell>
                      <TableCell>{attempt.userAgent}</TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => clearLoginAttempt(attempt.id)} 
                          size="small"
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SecuritySettings;
