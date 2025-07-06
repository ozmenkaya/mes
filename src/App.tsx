import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Assignment, CheckCircle, Speed, People } from '@mui/icons-material';
import { mesTheme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Departments from './pages/Departments';
import Users from './pages/Users';

// Dashboard component inline
const Dashboard = () => (
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

const FactorySettings = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>Fabrika Ayarları</Typography>
    <Typography>Fabrika ayarları ana sayfası geliştirilme aşamasında...</Typography>
  </Box>
);

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
          <Route path="/factory-settings" element={<FactorySettings />} />
          <Route path="/factory-settings/departments" element={<Departments />} />
          <Route path="/factory-settings/users" element={<Users />} />
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
