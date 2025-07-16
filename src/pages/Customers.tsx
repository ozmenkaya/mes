import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Sync as SyncIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { apiRequest, API_CONFIG } from '../config/api';

interface Customer {
  id: string;
  code?: string;
  type: 'customer' | 'supplier' | 'both';
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxNumber: string;
  paymentTerms: string;
  creditLimit?: number;
  category: string;
  status: 'active' | 'inactive' | 'suspended';
  erpId?: string;
  crmId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Partial<Customer>>({});
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  // Mock data - gerçek uygulamada API'den gelecek
  const mockCustomers: Customer[] = [
    {
      id: '1',
      type: 'customer',
      companyName: 'ABC Tekstil Ltd.',
      contactPerson: 'Mehmet Özkan',
      email: 'mehmet@abctekstil.com',
      phone: '+90 212 555 0101',
      address: 'Atatürk Cad. No:123, İstanbul, 34000, Türkiye',
      taxNumber: '1234567890',
      paymentTerms: '30 gün',
      creditLimit: 100000,
      category: 'Tekstil',
      status: 'active',
      erpId: 'ERP-001',
      notes: 'Ana müşterimiz',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'supplier',
      companyName: 'XYZ Makine Sanayi',
      contactPerson: 'Ayşe Kara',
      email: 'ayse@xyzmakine.com',
      phone: '+90 312 555 0202',
      address: 'Sanayi Sitesi 5. Blok, Ankara, 06000, Türkiye',
      taxNumber: '0987654321',
      paymentTerms: '15 gün',
      category: 'Makine',
      status: 'active',
      crmId: 'CRM-002',
      notes: 'Kaliteli tedarikçi',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    }
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // Gerçek API'den veri çek
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CUSTOMERS);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Firma verileri yüklenirken hata oluştu');
      // Hata durumunda mock data kullan
      setCustomers(mockCustomers);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      type: 'customer',
      status: 'active',
      address: ''
    });
    setDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setDialogOpen(true);
  };

  const handleDeleteCustomer = async (id: string) => {
    if (window.confirm('Bu firmayı silmek istediğinizden emin misiniz?')) {
      try {
        setLoading(true);
        
        // Backend'e DELETE request gönder
        await apiRequest(`${API_CONFIG.ENDPOINTS.CUSTOMERS}/${id}`, {
          method: 'DELETE',
        });

        // Local state'i güncelle
        setCustomers(customers.filter(c => c.id !== id));
        setSuccess('Firma başarıyla silindi');
        setTimeout(() => setSuccess(null), 3000);
      } catch (error) {
        console.error('Delete error:', error);
        setError('Firma silinirken hata oluştu');
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveCustomer = async () => {
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      setError('Zorunlu alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Backend için veri formatı düzenle
      const customerData = {
        code: formData.code || `CUST${Date.now()}`,
        name: formData.companyName,
        type: formData.type || 'customer',
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || '',
        taxNumber: formData.taxNumber,
        paymentTerms: formData.paymentTerms,
        creditLimit: formData.creditLimit,
        category: formData.category,
        status: formData.status || 'active',
        notes: formData.notes
      };

      if (editingCustomer) {
        // Update existing customer
        const response = await apiRequest(`${API_CONFIG.ENDPOINTS.CUSTOMERS}/${editingCustomer.id}`, {
          method: 'PUT',
          body: JSON.stringify(customerData),
        });

        const updatedCustomer = await response.json();
        setCustomers(customers.map(c => 
          c.id === editingCustomer.id ? updatedCustomer : c
        ));
        setSuccess('Firma başarıyla güncellendi');
      } else {
        // Create new customer
        const response = await apiRequest(API_CONFIG.ENDPOINTS.CUSTOMERS, {
          method: 'POST',
          body: JSON.stringify(customerData),
        });

        const newCustomer = await response.json();
        setCustomers([...customers, newCustomer]);
        setSuccess('Firma başarıyla eklendi');
      }

      setDialogOpen(false);
      setFormData({});
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Save error:', error);
      setError('İşlem sırasında hata oluştu');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncWithERP = () => {
    setSyncDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'primary';
      case 'supplier': return 'secondary';
      case 'both': return 'info';
      default: return 'default';
    }
  };

  // Benzersiz kategorileri al
  const uniqueCategories = Array.from(new Set(customers.map(c => c.category).filter(Boolean)));

  // Arama temizleme fonksiyonu
  const clearSearch = () => {
    setSearchTerm('');
    setSearchCategory('');
  };

  const filteredCustomers = customers.filter(customer => {
    // Tab filtreleme
    let tabFilter = true;
    if (tabValue === 1) tabFilter = customer.type === 'customer' || customer.type === 'both';
    if (tabValue === 2) tabFilter = customer.type === 'supplier' || customer.type === 'both';
    
    // Arama filtreleme
    const searchFilter = searchTerm === '' || 
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.category && customer.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Kategori filtreleme
    const categoryFilter = searchCategory === '' || customer.category === searchCategory;
    
    return tabFilter && searchFilter && categoryFilter;
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 3,
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2.125rem' }
          }}
        >
          Müşteri ve Tedarikçi Yönetimi
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Button
            variant="outlined"
            startIcon={<SyncIcon />}
            onClick={handleSyncWithERP}
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: 'auto' }
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              ERP Senkronizasyonu
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              ERP Sync
            </Box>
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCustomer}
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: 'auto' }
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Yeni Firma Ekle
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              Yeni Ekle
            </Box>
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Arama ve Filtreleme Bölümü */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-end' }
          }}>
            <TextField
              label="Firma, Kişi, E-posta veya Telefon ile Ara"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: { xs: '100%', md: 300 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 150 } }}>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                label="Kategori"
              >
                <MenuItem value="">Tümü</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {(searchTerm || searchCategory) && (
              <Button
                variant="outlined"
                onClick={clearSearch}
                startIcon={<ClearIcon />}
                size="small"
                sx={{ minWidth: { xs: '100%', md: 'auto' } }}
              >
                Temizle
              </Button>
            )}
          </Box>

          {/* Sonuç Sayısı */}
          {(searchTerm || searchCategory) && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {filteredCustomers.length} sonuç bulundu
              {searchTerm && ` "${searchTerm}" için`}
              {searchCategory && ` ${searchCategory} kategorisinde`}
            </Typography>
          )}

          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 2,
              '& .MuiTab-root': {
                minWidth: { xs: 0, sm: 'auto' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                padding: { xs: '6px 8px', sm: '12px 16px' }
              },
              '& .MuiTabs-scrollButtons': {
                display: { xs: 'flex', sm: 'none' }
              }
            }}
          >
            <Tab label="Tümü" />
            <Tab label="Müşteriler" />
            <Tab label="Tedarikçiler" />
          </Tabs>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 300, sm: 650 } }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Firma Adı</TableCell>
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Tür</TableCell>
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>İletişim Kişisi</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', lg: 'table-cell' } }}>Telefon</TableCell>
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', md: 'table-cell' } }}>Kategori</TableCell>
                    <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' } }}>Durum</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {customer.companyName}
                            </Typography>
                            {/* Mobilde tip ve durum bilgisini firma adı altında göster */}
                            <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 0.5, mt: 0.5 }}>
                              <Chip
                                label={
                                  customer.type === 'customer' ? 'Müşteri' :
                                  customer.type === 'supplier' ? 'Tedarikçi' : 'İkisi de'
                                }
                                color={getTypeColor(customer.type)}
                                size="small"
                              />
                              <Chip
                                label={
                                  customer.status === 'active' ? 'Aktif' :
                                  customer.status === 'inactive' ? 'Pasif' : 'Askıda'
                                }
                                color={getStatusColor(customer.status)}
                                size="small"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        <Chip
                          label={
                            customer.type === 'customer' ? 'Müşteri' :
                            customer.type === 'supplier' ? 'Tedarikçi' : 'İkisi de'
                          }
                          color={getTypeColor(customer.type)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{customer.contactPerson}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            wordBreak: 'break-all'
                          }}
                        >
                          {customer.email}
                        </Typography>
                        {/* Mobilde telefon numarasını email altında göster */}
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ display: { xs: 'block', lg: 'none' } }}
                        >
                          {customer.phone}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>{customer.phone}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>{customer.category}</TableCell>
                      <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                        <Chip
                          label={
                            customer.status === 'active' ? 'Aktif' :
                            customer.status === 'inactive' ? 'Pasif' : 'Askıda'
                          }
                          color={getStatusColor(customer.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditCustomer(customer)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteCustomer(customer.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell 
                        colSpan={8} 
                        sx={{ 
                          textAlign: 'center', 
                          py: { xs: 3, sm: 6 },
                          color: 'text.secondary'
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <BusinessIcon sx={{ fontSize: { xs: 40, sm: 60 }, opacity: 0.3 }} />
                          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Henüz firma eklenmemiş
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Yeni firma eklemek için "Yeni Firma Ekle" butonunu kullanın
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Firma Ekleme/Düzenleme Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="md" 
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
            width: { xs: 'calc(100% - 16px)', sm: '100%' },
            height: { xs: 'calc(100% - 64px)', sm: 'auto' },
            maxHeight: { xs: 'calc(100% - 64px)', sm: '90vh' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          py: { xs: 2, sm: 3 }
        }}>
          {editingCustomer ? 'Firma Düzenle' : 'Yeni Firma Ekle'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 }, mt: 1 }}>
            {/* Temel Bilgiler */}
            <Typography variant="h6" sx={{ 
              color: 'primary.main',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}>
              Temel Bilgiler
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Firma Türü</InputLabel>
                <Select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  label="Firma Türü"
                >
                  <MenuItem value="customer">Müşteri</MenuItem>
                  <MenuItem value="supplier">Tedarikçi</MenuItem>
                  <MenuItem value="both">İkisi de</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Firma Adı"
                value={formData.companyName || ''}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                required
              />

              <TextField
                fullWidth
                label="İletişim Kişisi"
                value={formData.contactPerson || ''}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                required
              />

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />

              <TextField
                fullWidth
                label="Telefon"
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />

              <TextField
                fullWidth
                label="Vergi Numarası"
                value={formData.taxNumber || ''}
                onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
              />
            </Box>

            {/* Adres Bilgileri */}
            <Typography variant="h6" sx={{ 
              color: 'primary.main',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}>
              Adres Bilgileri
            </Typography>

            <TextField
              fullWidth
              label="Adres"
              multiline
              rows={3}
              value={formData.address || ''}
              onChange={(e) => setFormData({
                ...formData, 
                address: e.target.value
              })}
            />

            {/* İş Bilgileri */}
            <Typography variant="h6" sx={{ 
              color: 'primary.main',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}>
              İş Bilgileri
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                fullWidth
                label="Kategori"
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />

              <TextField
                fullWidth
                label="Ödeme Vadesi"
                value={formData.paymentTerms || ''}
                onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
              />

              <TextField
                fullWidth
                label="Kredi Limiti"
                type="number"
                value={formData.creditLimit || ''}
                onChange={(e) => setFormData({...formData, creditLimit: Number(e.target.value)})}
              />

              <FormControl fullWidth>
                <InputLabel>Durum</InputLabel>
                <Select
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  label="Durum"
                >
                  <MenuItem value="active">Aktif</MenuItem>
                  <MenuItem value="inactive">Pasif</MenuItem>
                  <MenuItem value="suspended">Askıda</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              fullWidth
              label="Notlar"
              multiline
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: { xs: 2, sm: 3 }, 
          py: { xs: 2, sm: 3 },
          gap: { xs: 1, sm: 0 },
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 2, sm: 1 }
            }}
          >
            İptal
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveCustomer}
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 1, sm: 2 }
            }}
          >
            {editingCustomer ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ERP Senkronizasyon Dialog */}
      <Dialog 
        open={syncDialogOpen} 
        onClose={() => setSyncDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 1, sm: 2 },
            width: { xs: 'calc(100% - 16px)', sm: '100%' }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          py: { xs: 2, sm: 3 }
        }}>
          ERP/CRM Senkronizasyonu
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Müşteri ve tedarikçi verilerini ERP/CRM sistemlerinden senkronize edin.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              fullWidth
            >
              ERP'den Verileri İçe Aktar
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              fullWidth
            >
              CRM'e Verileri Gönder
            </Button>
            <Button
              variant="contained"
              startIcon={<SyncIcon />}
              fullWidth
            >
              Otomatik Senkronizasyon Başlat
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: { xs: 2, sm: 3 }, 
          py: { xs: 2, sm: 3 }
        }}>
          <Button 
            onClick={() => setSyncDialogOpen(false)}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers;
