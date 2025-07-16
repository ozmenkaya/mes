import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  BarChart as BarChartIcon, 
  TrendingUp as TrendingIcon, 
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon
} from '@mui/icons-material';

const Reports: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Raporlar ve Analitik
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Performans verilerini analiz edin ve detaylı raporlar oluşturun
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Üretim Raporları */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                color: 'white',
                mr: 2
              }}>
                <BarChartIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Üretim Raporları
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Günlük, haftalık ve aylık üretim performans raporları oluşturun.
            </Typography>
            <Chip 
              label="Geliştiriliyor" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                color: '#7c3aed',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Verimlilik Analizi */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                color: 'white',
                mr: 2
              }}>
                <TrendingIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Verimlilik Analizi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Makine ve işgücü verimliliğini analiz edin ve optimize edin.
            </Typography>
            <Chip 
              label="Beta" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                color: '#a855f7',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Kalite Metrikleri */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
          border: '1px solid rgba(147, 51, 234, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                color: 'white',
                mr: 2
              }}>
                <AssessmentIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Kalite Metrikleri
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Kalite performansını ölçün ve iyileştirme alanlarını belirleyin.
            </Typography>
            <Chip 
              label="Planlanan" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                color: '#9333ea',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Dashboard ve KPI */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(126, 34, 206, 0.1) 0%, rgba(126, 34, 206, 0.05) 100%)',
          border: '1px solid rgba(126, 34, 206, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)',
                color: 'white',
                mr: 2
              }}>
                <PieChartIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Dashboard ve KPI
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Anahtar performans göstergelerini görselleştirin ve takip edin.
            </Typography>
            <Chip 
              label="Yakında" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(126, 34, 206, 0.1)',
                color: '#7e22ce',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Reports;
