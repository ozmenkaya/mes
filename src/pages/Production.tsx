import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  Factory as ProductionIcon, 
  Assignment as OrderIcon, 
  Schedule as PlanningIcon,
  Timeline as AnalyticsIcon
} from '@mui/icons-material';

const Production: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #1565c0 0%, #2196f3 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Üretim Planlama
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Üretim süreçlerini planlayın ve optimize edin
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Üretim Çizelgesi */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(21, 101, 192, 0.1) 0%, rgba(21, 101, 192, 0.05) 100%)',
          border: '1px solid rgba(21, 101, 192, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                color: 'white',
                mr: 2
              }}>
                <ProductionIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Üretim Çizelgesi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Haftalık ve aylık üretim çizelgelerini oluşturun ve yönetin.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(21, 101, 192, 0.1)',
                color: '#1565c0',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* İş Emirleri */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
          border: '1px solid rgba(33, 150, 243, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                color: 'white',
                mr: 2
              }}>
                <OrderIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                İş Emirleri
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Üretim iş emirlerini oluşturun, takip edin ve yönetin.
            </Typography>
            <Chip 
              label="12 Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                color: '#2196f3',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Kaynak Planlama */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
          border: '1px solid rgba(25, 118, 210, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                color: 'white',
                mr: 2
              }}>
                <PlanningIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Kaynak Planlama
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Makine, işgücü ve malzeme kaynaklarını planlayın.
            </Typography>
            <Chip 
              label="Optimizing" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Performans Analizi */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.1) 0%, rgba(13, 71, 161, 0.05) 100%)',
          border: '1px solid rgba(13, 71, 161, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0d47a1 0%, #01579b 100%)',
                color: 'white',
                mr: 2
              }}>
                <AnalyticsIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Performans Analizi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Üretim verimliliği ve performans metriklerini analiz edin.
            </Typography>
            <Chip 
              label="87% Verimlilik" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(13, 71, 161, 0.1)',
                color: '#0d47a1',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Production;
