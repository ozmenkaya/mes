import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Speed,
  People,
  Factory,
  Warning,
  Inventory,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 42,
    completedToday: 8,
    efficiency: 87.5,
    activeWorkers: 156,
    runningMachines: 23,
    alertCount: 3,
    inventory: 89.2,
    trends: {
      orders: 5.2,
      efficiency: 12.5,
      workers: -2.1,
      machines: 8.7,
      alerts: -15.3,
      inventory: 3.4,
    }
  });

  // Simüle gerçek zamanlı veri güncellemeleri
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 3),
        completedToday: prev.completedToday + (Math.random() > 0.8 ? 1 : 0),
        efficiency: Math.max(75, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
        activeWorkers: 156 + Math.floor((Math.random() - 0.5) * 10),
        runningMachines: 23 + Math.floor((Math.random() - 0.5) * 4),
        alertCount: Math.max(0, prev.alertCount + (Math.random() > 0.9 ? 1 : Math.random() > 0.7 ? -1 : 0)),
        inventory: Math.max(70, Math.min(95, prev.inventory + (Math.random() - 0.5) * 3)),
        trends: {
          orders: (Math.random() - 0.3) * 20,
          efficiency: (Math.random() - 0.2) * 25,
          workers: (Math.random() - 0.5) * 10,
          machines: (Math.random() - 0.3) * 15,
          alerts: (Math.random() - 0.7) * 30,
          inventory: (Math.random() - 0.4) * 8,
        }
      }));
    }, 5000); // Her 5 saniyede güncelle

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? <TrendingUp sx={{ fontSize: 16, ml: 0.5 }} /> : <TrendingDown sx={{ fontSize: 16, ml: 0.5 }} />;
  };

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)';
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
          Üretim Kontrol Paneli
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fabrika performansını gerçek zamanlı izleyin ve yönetin
        </Typography>
      </Box>

      {/* Key Metrics */}
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
          color: 'white',
          overflow: 'visible',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Assignment sx={{ fontSize: 40, opacity: 0.9 }} />
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
              23
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Aktif İş Emirleri
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <CheckCircle sx={{ fontSize: 40, opacity: 0.9 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label={`${dashboardData.trends.efficiency > 0 ? '+' : ''}${dashboardData.trends.efficiency.toFixed(1)}%`}
                  size="small" 
                  sx={{ 
                    backgroundColor: getTrendColor(dashboardData.trends.efficiency), 
                    color: 'white',
                    fontWeight: 600 
                  }} 
                />
                {getTrendIcon(dashboardData.trends.efficiency)}
              </Box>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {dashboardData.completedToday}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Bugün Tamamlanan
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Speed sx={{ fontSize: 40, opacity: 0.9 }} />
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
              Genel Verimlilik
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
          color: 'white',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            zIndex: 1,
          }
        }}>
          <CardContent sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <People sx={{ fontSize: 40, opacity: 0.9 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label={`${dashboardData.trends.machines > 0 ? '+' : ''}${dashboardData.trends.machines.toFixed(1)}%`}
                  size="small" 
                  sx={{ 
                    backgroundColor: getTrendColor(dashboardData.trends.machines), 
                    color: 'white',
                    fontWeight: 600 
                  }} 
                />
                {getTrendIcon(dashboardData.trends.machines)}
              </Box>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {dashboardData.activeWorkers}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Aktif Çalışan
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Secondary Metrics */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr'
          },
          gap: 3,
          mb: 4
        }}
      >
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Haftalık Üretim Özeti
            </Typography>
            <Box sx={{ 
              height: 250, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              borderRadius: 2,
              border: '2px dashed #cbd5e1'
            }}>
              <Typography variant="h6" color="text.secondary">
                📊 Üretim grafiği burada görüntülenecek
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Sistem Durumu
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={500}>Ekipman Kullanımı</Typography>
                  <Typography variant="body1" color="success.main" fontWeight="bold">78.3%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={78.3} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                      borderRadius: 4,
                    }
                  }} 
                />
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={500}>Zamanında Teslimat</Typography>
                  <Typography variant="body1" color="success.main" fontWeight="bold">91.8%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={91.8} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
                      borderRadius: 4,
                    }
                  }} 
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" fontWeight={500}>Kalite Oranı</Typography>
                  <Typography variant="body1" color="warning.main" fontWeight="bold">96.2%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={96.2} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                      borderRadius: 4,
                    }
                  }} 
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
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
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px 0 rgb(37 99 235 / 0.15)',
          }
        }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Factory sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Yeni İş Emri
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hızlı iş emri oluştur
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px 0 rgb(16 185 129 / 0.15)',
          }
        }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Kalite Kontrolü
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Yeni kontrol başlat
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px 0 rgb(245 158 11 / 0.15)',
          }
        }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Inventory sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Stok Yönetimi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stok seviyelerini kontrol et
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px 0 rgb(239 68 68 / 0.15)',
          }
        }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Warning sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Uyarılar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sistem uyarılarını gör
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;
