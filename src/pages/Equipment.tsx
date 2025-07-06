import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Equipment: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Ekipman Yönetimi
      </Typography>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Ekipman ve Kaynak Yönetimi Modülü
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Bu modül ekipman, personel ve araç yönetimi işlemlerini gerçekleştirir.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Equipment;
