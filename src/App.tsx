import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { mesTheme } from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import Production from './pages/Production';
import Quality from './pages/Quality';
import Inventory from './pages/Inventory';
import Equipment from './pages/Equipment';
import Reports from './pages/Reports';

function App() {
  return (
    <ThemeProvider theme={mesTheme}>
      <CssBaseline />
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
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
