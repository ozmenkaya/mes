import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const WorkOrders: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        İş Emri Yönetimi
      </Typography>
      
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          İş Emri Yönetimi Modülü
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Bu modül iş emirlerinin oluşturulması, takibi ve yönetimi işlemlerini gerçekleştirir.
        </Typography>
      </Paper>
    </Box>
  );
};

export default WorkOrders;
