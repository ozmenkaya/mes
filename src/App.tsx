import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { mesTheme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import Production from './pages/Production';
import Quality from './pages/Quality';
import Inventory from './pages/Inventory';
import Equipment from './pages/Equipment';
import Reports from './pages/Reports';
import FactorySettings from './pages/FactorySettings';
import Departments from './pages/Departments';
import Users from './pages/Users';
import Shifts from './pages/Shifts';
import Locations from './pages/Locations';
import GeneralSettings from './pages/GeneralSettings';
import SecuritySettings from './pages/SecuritySettings';

const AppContent = () => {
  const { user, login, error } = useAuth();

  if (!user) {
    return <Login onLogin={login} error={error || undefined} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/production" element={<Production />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/factory-settings" element={<FactorySettings />} />
          <Route path="/factory-settings/departments" element={<Departments />} />
          <Route path="/factory-settings/users" element={<Users />} />
          <Route path="/factory-settings/shifts" element={<Shifts />} />
          <Route path="/factory-settings/locations" element={<Locations />} />
          <Route path="/factory-settings/general" element={<GeneralSettings />} />
          <Route path="/factory-settings/security" element={<SecuritySettings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={mesTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
