import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  Assignment as WorkOrderIcon, 
  PlayArrow as StartIcon, 
  CheckCircle as CompleteIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const WorkOrders: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          İş Emri Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          İş emirlerini oluşturun, planlayın ve takip edin
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* İş Emri Oluşturma */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
          border: '1px solid rgba(5, 150, 105, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: 'white',
                mr: 2
              }}>
                <WorkOrderIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                İş Emri Oluşturma
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Yeni iş emirleri oluşturun ve gerekli bilgileri tanımlayın.
            </Typography>
            <Chip 
              label="Geliştiriliyor" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* İş Emri Çizelgeleme */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.1) 0%, rgba(13, 148, 136, 0.05) 100%)',
          border: '1px solid rgba(13, 148, 136, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                color: 'white',
                mr: 2
              }}>
                <ScheduleIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                İş Emri Çizelgeleme
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              İş emirlerini kaynaklara ve zaman dilimlerine atayın.
            </Typography>
            <Chip 
              label="Planlanan" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                color: '#0d9488',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* İş Emri Başlatma */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white',
                mr: 2
              }}>
                <StartIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                İş Emri Başlatma
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Hazır iş emirlerini başlatın ve ilerleme takibi yapın.
            </Typography>
            <Chip 
              label="Beta" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                color: '#2563eb',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* İş Emri Tamamlama */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: 'white',
                mr: 2
              }}>
                <CompleteIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                İş Emri Tamamlama
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Tamamlanan işleri kaydedin ve kalite kontrolünü gerçekleştirin.
            </Typography>
            <Chip 
              label="Yakında" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default WorkOrders;
