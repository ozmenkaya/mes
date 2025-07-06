import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Reports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Raporlar ve Analitik
      </Typography>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Raporlama ve Analitik Modülü
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Bu modül üretim raporları, verimlilik metrikleri ve veri analitiği işlemlerini gerçekleştirir.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Reports;
