import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  VerifiedUser as QualityIcon, 
  Assessment as InspectionIcon, 
  Report as ReportIcon,
  Gavel as AuditIcon
} from '@mui/icons-material';

const Quality: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Kalite Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Ürün kalitesini kontrol edin ve standartları yönetin
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Kalite Kontrol */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: 'white',
                mr: 2
              }}>
                <QualityIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Kalite Kontrol
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Üretim sürecinde kalite kontrol noktaları oluşturun ve yönetin.
            </Typography>
            <Chip 
              label="Geliştiriliyor" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#dc2626',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Muayene ve Test */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
          border: '1px solid rgba(234, 88, 12, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: 'white',
                mr: 2
              }}>
                <InspectionIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Muayene ve Test
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ürünler için detaylı muayene ve test prosedürleri tanımlayın.
            </Typography>
            <Chip 
              label="Planlanan" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(234, 88, 12, 0.1)',
                color: '#ea580c',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Kalite Raporları */}
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
                <ReportIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Kalite Raporları
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Kalite performansı raporları oluşturun ve analiz edin.
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

        {/* Kalite Denetimi */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                mr: 2
              }}>
                <AuditIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Kalite Denetimi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              İç ve dış kalite denetimleri planlayın ve sonuçları takip edin.
            </Typography>
            <Chip 
              label="Yakında" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Quality;
