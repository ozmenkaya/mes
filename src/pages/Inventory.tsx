import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Inventory: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Stok Yönetimi
      </Typography>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Stok Takip ve Yönetimi Modülü
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Bu modül hammadde, yarı mamul ve mamul stok takibi işlemlerini gerçekleştirir.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Inventory;
