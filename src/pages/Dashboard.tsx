import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Speed,
  TrendingUp,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Üretim Kontrol Paneli
      </Typography>

      {/* Key Metrics */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#1976d220', color: '#1976d2', mr: 2 }}>
                <Assignment />
              </Box>
              <Typography variant="h6">Aktif İş Emirleri</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              23
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
              <Typography variant="body2" color="success.main">
                +%5.2 dünkü ile karşılaştırıldığında
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#4caf5020', color: '#4caf50', mr: 2 }}>
                <CheckCircle />
              </Box>
              <Typography variant="h6">Bugün Tamamlanan</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              8
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
              <Typography variant="body2" color="success.main">
                +%12.5 dünkü ile karşılaştırıldığında
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#ff980020', color: '#ff9800', mr: 2 }}>
                <Speed />
              </Box>
              <Typography variant="h6">Genel Verimlilik</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              87.5%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
              <Typography variant="body2" color="success.main">
                +%2.1 dünkü ile karşılaştırıldığında
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, flex: 1 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#4caf5020', color: '#4caf50', mr: 2 }}>
                <CheckCircle />
              </Box>
              <Typography variant="h6">Kalite Oranı</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              96.2%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Dünle aynı seviyede
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Production Overview */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 3, flex: 2, minWidth: 300 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Haftalık Üretim Özeti
          </Typography>
          <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Üretim grafiği burada görüntülenecek
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, flex: 1, minWidth: 250 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sistem Durumu
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Ekipman Kullanımı</Typography>
              <Typography color="success.main" fontWeight="bold">%78.3</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Zamanında Teslimat</Typography>
              <Typography color="success.main" fontWeight="bold">%91.8</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Stok Devir Hızı</Typography>
              <Typography color="primary.main" fontWeight="bold">4.2x</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Toplam İş Emirleri</Typography>
              <Typography color="primary.main" fontWeight="bold">156</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
