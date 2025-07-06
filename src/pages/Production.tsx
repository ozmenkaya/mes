import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Production: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Üretim Planlama
      </Typography>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Üretim Planlama ve Çizelgeleme Modülü
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Bu modül üretim planlaması, çizelgeleme ve kaynak tahsisi işlemlerini gerçekleştirir.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Production;
