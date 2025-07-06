import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Factory,
} from '@mui/icons-material';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      return;
    }

    try {
      await onLogin(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        }
      }}
    >
      <Card sx={{ 
        maxWidth: 450, 
        width: '100%',
        boxShadow: '0 20px 40px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.95)',
        position: 'relative',
        zIndex: 1,
      }}>
        <CardContent sx={{ p: 5 }}>
          {/* Logo ve Başlık */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                mb: 3,
                boxShadow: '0 8px 25px 0 rgba(37, 99, 235, 0.3)',
              }}
            >
              <Factory sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MES Sistemi
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              Üretim Yönetim Sistemi
            </Typography>
          </Box>

          {/* Hata Mesajı */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: 20,
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Giriş Formu */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-posta"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ 
                py: 1.8, 
                mb: 3,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                boxShadow: '0 4px 14px 0 rgb(37 99 235 / 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  boxShadow: '0 6px 20px 0 rgb(37 99 235 / 0.4)',
                },
                '&:disabled': {
                  background: 'rgba(37, 99, 235, 0.5)',
                },
              }}
            >
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>

          {/* Demo Bilgileri */}
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
            borderRadius: 2,
            border: '1px solid #e2e8f0'
          }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary" 
              gutterBottom 
              sx={{ fontWeight: 600, mb: 2 }}
            >
              🚀 Demo Kullanıcıları:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: '#2563eb' }}>👨‍💼 Yönetici:</span> admin@fabrika.com / 123456
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: '#10b981' }}>👨‍💻 Müdür:</span> ahmet.yilmaz@fabrika.com / 123456
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                <span style={{ color: '#f59e0b' }}>👩‍🔧 Operatör:</span> fatma.canli@fabrika.com / 123456
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
