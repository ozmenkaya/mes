import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Assignment, CheckCircle, Speed, People, AccessTime } from '@mui/icons-material';
import { mesTheme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Departments from './pages/Departments';
import Users from './pages/Users';
import Shifts from './pages/Shifts';
import Locations from './pages/Locations';
import GeneralSettingsPage from './pages/GeneralSettings';
import SecuritySettings from './pages/SecuritySettings';
import Machines from './pages/Machines';
import WorkingHours from './pages/WorkingHours';
import Customers from './pages/Customers';
import FormGenerator from './pages/FormGenerator';

// Dashboard component inline
const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
  <Box sx={{ p: 3 }}>
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
        Üretim Kontrol Paneli
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Fabrika performansını gerçek zamanlı izleyin
      </Typography>
    </Box>

    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: 3
      }}
    >
      <Card sx={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
        color: 'white',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Assignment sx={{ fontSize: 40 }} />
            <Chip 
              label="+5.2%" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600 
              }} 
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            42
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Toplam İş Emri
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: 'white',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <CheckCircle sx={{ fontSize: 40 }} />
            <Chip 
              label="+12.5%" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600 
              }} 
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            8
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Bugün Tamamlanan
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
        }
      }}
      onClick={() => navigate('/customers')}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <People sx={{ fontSize: 40 }} />
            <Chip 
              label="Yönet" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600 
              }} 
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            124
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Müşteri & Tedarikçi
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: 'white',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Speed sx={{ fontSize: 40 }} />
            <Chip 
              label="+2.1%" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600 
              }} 
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            87.5%
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Verimlilik
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        color: 'white',
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <People sx={{ fontSize: 40 }} />
            <Chip 
              label="48 Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600 
              }} 
            />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            156
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Aktif Çalışan
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Box>
  );
};

// Diğer sayfa component'leri - placeholder'lar
const WorkOrders = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>İş Emirleri</Typography>
    <Typography>İş emirleri sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const Production = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Üretim</Typography>
    <Typography>Üretim sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const Quality = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Kalite Kontrol</Typography>
    <Typography>Kalite kontrol sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const Inventory = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Envanter</Typography>
    <Typography>Envanter sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const Equipment = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Ekipman</Typography>
    <Typography>Ekipman sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const Reports = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Raporlar</Typography>
    <Typography>Raporlar sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

const FactorySettings = () => {
  const navigate = useNavigate();

  return (
  <Box sx={{ p: 3 }}>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" sx={{ 
        fontWeight: 700, 
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 1 
      }}>
        Fabrika Ayarları
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Fabrika yapılandırma ve yönetim ayarları
      </Typography>
    </Box>

    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        },
        gap: 3
      }}
    >
      {/* Departmanlar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(37, 99, 235, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/departments')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>🏢</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Departmanlar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Fabrika departmanlarını yönetin, yeni departmanlar ekleyin ve mevcut olanları düzenleyin.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              color: '#2563eb',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Kullanıcılar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(16, 185, 129, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/users')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>👥</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Kullanıcılar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sistem kullanıcılarını yönetin, roller atayın ve izinleri düzenleyin.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Vardiyalar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(245, 158, 11, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/shifts')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>⏰</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Vardiyalar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Çalışma vardiyalarını tanımlayın ve yönetin.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Lokasyonlar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(139, 92, 246, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/locations')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>📍</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Lokasyonlar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Fabrika içi lokasyonları ve alan tanımlarını yönetin.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              color: '#8b5cf6',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Genel Ayarlar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(107, 114, 128, 0.05) 100%)',
        border: '1px solid rgba(107, 114, 128, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(107, 114, 128, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/general')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>⚙️</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Genel Ayarlar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sistem geneli yapılandırma ve tercih ayarları.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(107, 114, 128, 0.1)',
              color: '#6b7280',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Güvenlik Ayarları */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(239, 68, 68, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/security')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>🔒</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Güvenlik Ayarları
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sistem güvenliği ve erişim kontrol ayarları.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Makinalar */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(75, 85, 99, 0.1) 0%, rgba(75, 85, 99, 0.05) 100%)',
        border: '1px solid rgba(75, 85, 99, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(75, 85, 99, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/machines')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>🏭</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Makinalar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Fabrika makinalarını yönetin, durum izleme ve bakım planlaması yapın.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(75, 85, 99, 0.1)',
              color: '#4b5563',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Çalışma Saatleri */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(34, 197, 94, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/working-hours')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              mr: 2
            }}>
              <AccessTime />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Çalışma Saatleri
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Fabrika çalışma saatleri, tatil günleri ve bakım zamanlarını yönetin.
          </Typography>
          <Chip 
            label="Aktif Modül" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#22c55e',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>

      {/* Form Generator */}
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(168, 85, 247, 0.15)',
        }
      }}
      onClick={() => navigate('/factory-settings/form-generator')}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
              color: 'white',
              mr: 2
            }}>
              <Typography sx={{ fontSize: 24 }}>📝</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Form Generator
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Müşteri ve tedarikçi kayıt formları oluşturun ve yönetin.
          </Typography>
          <Chip 
            label="Yeni Özellik" 
            size="small" 
            sx={{ 
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              color: '#a855f7',
              fontWeight: 600 
            }}
          />
        </CardContent>
      </Card>
    </Box>
  </Box>
  );
};

const AppContent = () => {
  const { user, login, error } = useAuth();
  
  if (!user) {
    return <Login onLogin={login} error={error || undefined} />;
  }
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/production" element={<Production />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/factory-settings" element={<FactorySettings />} />
          <Route path="/factory-settings/departments" element={<Departments />} />
          <Route path="/factory-settings/users" element={<Users />} />
          <Route path="/factory-settings/shifts" element={<Shifts />} />
          <Route path="/factory-settings/locations" element={<Locations />} />
          <Route path="/factory-settings/general" element={<GeneralSettingsPage />} />
          <Route path="/factory-settings/security" element={<SecuritySettings />} />
          <Route path="/factory-settings/machines" element={<Machines />} />
          <Route path="/factory-settings/working-hours" element={<WorkingHours />} />
          <Route path="/factory-settings/form-generator" element={<FormGenerator />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={mesTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
