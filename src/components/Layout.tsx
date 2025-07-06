import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as WorkOrderIcon,
  Factory as ProductionIcon,
  VerifiedUser as QualityIcon,
  Inventory as InventoryIcon,
  Build as EquipmentIcon,
  Assessment as ReportsIcon,
  AccountCircle,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Kontrol Paneli', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'İş Emirleri', icon: <WorkOrderIcon />, path: '/work-orders' },
    { text: 'Üretim Planlama', icon: <ProductionIcon />, path: '/production' },
    { text: 'Kalite Yönetimi', icon: <QualityIcon />, path: '/quality' },
    { text: 'Stok Yönetimi', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Ekipman Yönetimi', icon: <EquipmentIcon />, path: '/equipment' },
    { text: 'Raporlar', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Fabrika Ayarları', icon: <Settings />, path: '/factory-settings' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        color: 'white' 
      }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            color: 'white', 
            fontWeight: 700,
            fontSize: '1.1rem'
          }}
        >
          🏭 MES Sistemi
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5, px: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                minHeight: 48,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  boxShadow: '0 2px 8px 0 rgba(37, 99, 235, 0.3)',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  background: location.pathname === item.path 
                    ? 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)'
                    : 'rgba(37, 99, 235, 0.08)',
                  '& .MuiListItemIcon-root': {
                    color: location.pathname === item.path ? 'white' : 'primary.main',
                  },
                },
                '& .MuiListItemIcon-root': {
                  minWidth: 40,
                  color: location.pathname === item.path ? 'white' : 'text.secondary',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: '0.95rem',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: 'text.primary'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Üretim Yürütme Sistemi
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role === 'admin' ? 'Yönetici' : 
                 user?.role === 'manager' ? 'Müdür' : 'Operatör'}
              </Typography>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.08)',
                }
              }}
            >
              <Avatar sx={{ 
                width: 40, 
                height: 40,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: 'white',
                fontWeight: 600
              }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {user ? `${user.firstName} ${user.lastName}` : 'Kullanıcı'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem 
                onClick={handleClose}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  <AccountCircle fontSize="small" sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                Profil
              </MenuItem>
              <MenuItem 
                onClick={handleClose}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" sx={{ color: 'primary.main' }} />
                </ListItemIcon>
                Ayarlar
              </MenuItem>
              <Divider />
              <MenuItem 
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: 'error.main' }} />
                </ListItemIcon>
                Çıkış Yap
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid #e2e8f0',
              boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        <Toolbar />
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
