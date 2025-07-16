import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  Build as MachineIcon, 
  People as PersonnelIcon, 
  DirectionsCar as VehicleIcon,
  Settings as MaintenanceIcon
} from '@mui/icons-material';

const Equipment: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Ekipman Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Ekipman, personel ve araç kaynaklarının yönetimi ve takibi
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Makine ve Ekipman */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                mr: 2
              }}>
                <MachineIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Makine ve Ekipman
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Üretim makineleri, ekipman kayıtları ve teknik özellikler yönetimi.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Personel Yönetimi */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                mr: 2
              }}>
                <PersonnelIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Personel Yönetimi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              İşçi atamaları, yetenek matrisi ve çalışma saatlerinin organizasyonu.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                color: '#f97316',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Araç Parkı */}
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
                <VehicleIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Araç Parkı
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Taşıma araçları, forkliftler ve diğer hareketli ekipman yönetimi.
            </Typography>
            <Chip 
              label="Geliştiriliyor" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(234, 88, 12, 0.1)',
                color: '#ea580c',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Bakım ve Onarım */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(194, 65, 12, 0.1) 0%, rgba(194, 65, 12, 0.05) 100%)',
          border: '1px solid rgba(194, 65, 12, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #c2410c 0%, #9a3412 100%)',
                color: 'white',
                mr: 2
              }}>
                <MaintenanceIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Bakım ve Onarım
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Preventif bakım planları, arıza kayıtları ve onarım takibi.
            </Typography>
            <Chip 
              label="Planlanan" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(194, 65, 12, 0.1)',
                color: '#c2410c',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Equipment;
