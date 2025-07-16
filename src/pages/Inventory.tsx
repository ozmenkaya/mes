import React from 'react';
import { Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { 
  Inventory as InventoryIcon, 
  TrendingDown as OutgoingIcon, 
  TrendingUp as IncomingIcon,
  Storage as StorageIcon
} from '@mui/icons-material';

const Inventory: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Stok Yönetimi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Hammadde, yarı mamul ve mamul stok takibi ve yönetimi
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: { xs: 2, sm: 3 }
      }}>
        {/* Stok Takibi */}
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
                <InventoryIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Stok Takibi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Gerçek zamanlı stok seviyeleri, kritik stok uyarıları ve otomatik sipariş noktaları.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Giriş İşlemleri */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                mr: 2
              }}>
                <IncomingIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Giriş İşlemleri
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Hammadde alımları, üretim giriş işlemleri ve transfer belgesi takibi.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Çıkış İşlemleri */}
        <Card sx={{
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%)',
          border: '1px solid rgba(20, 184, 166, 0.2)',
          height: '100%'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                p: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                color: 'white',
                mr: 2
              }}>
                <OutgoingIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Çıkış İşlemleri
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Ürün sevkiyatları, hammadde tüketimi ve fire kayıt işlemleri.
            </Typography>
            <Chip 
              label="Aktif" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                color: '#14b8a6',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>

        {/* Depo Yönetimi */}
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
                <StorageIcon />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Depo Yönetimi
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Depo konumları, raf sistemi yönetimi ve stok organizasyonu.
            </Typography>
            <Chip 
              label="Geliştiriliyor" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(13, 148, 136, 0.1)',
                color: '#0d9488',
                fontWeight: 600 
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Inventory;
