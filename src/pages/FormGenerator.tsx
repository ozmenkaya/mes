import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Paper,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Download as ExportIcon,
  Save as SaveIcon,
  Edit as EditIcon
} from '@mui/icons-material';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'checkbox' | 'textarea' | 'number' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: 'customer' | 'supplier' | 'employee' | 'custom';
  fields: FormField[];
}

const FormGenerator: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [currentTemplate, setCurrentTemplate] = useState<FormTemplate>({
    id: '',
    name: '',
    description: '',
    category: 'customer',
    fields: []
  });
  const [templates, setTemplates] = useState<FormTemplate[]>([
    {
      id: 'customer-default',
      name: 'Standart Müşteri Formu',
      description: 'Müşteri kayıt için standart form',
      category: 'customer',
      fields: [
        { id: '1', type: 'text', label: 'Firma Adı', required: true },
        { id: '2', type: 'text', label: 'İletişim Kişisi', required: true },
        { id: '3', type: 'email', label: 'E-posta', required: true },
        { id: '4', type: 'phone', label: 'Telefon', required: true },
        { id: '5', type: 'select', label: 'Kategori', required: true, options: ['Bireysel', 'Kurumsal', 'Bayi'] },
        { id: '6', type: 'textarea', label: 'Adres', required: false }
      ]
    },
    {
      id: 'supplier-default',
      name: 'Standart Tedarikçi Formu',
      description: 'Tedarikçi kayıt için standart form',
      category: 'supplier',
      fields: [
        { id: '1', type: 'text', label: 'Firma Adı', required: true },
        { id: '2', type: 'text', label: 'İletişim Kişisi', required: true },
        { id: '3', type: 'email', label: 'E-posta', required: true },
        { id: '4', type: 'phone', label: 'Telefon', required: true },
        { id: '5', type: 'select', label: 'Tedarikçi Tipi', required: true, options: ['Hammadde', 'Malzeme', 'Hizmet'] },
        { id: '6', type: 'text', label: 'Vergi Numarası', required: false },
        { id: '7', type: 'textarea', label: 'Adres', required: false }
      ]
    }
  ]);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [fieldDialog, setFieldDialog] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Metin' },
    { value: 'email', label: 'E-posta' },
    { value: 'phone', label: 'Telefon' },
    { value: 'number', label: 'Sayı' },
    { value: 'date', label: 'Tarih' },
    { value: 'select', label: 'Seçim Listesi' },
    { value: 'checkbox', label: 'Onay Kutusu' },
    { value: 'textarea', label: 'Çok Satırlı Metin' }
  ];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const addNewField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'Yeni Alan',
      required: false
    };
    setCurrentTemplate(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const removeField = (fieldId: string) => {
    setCurrentTemplate(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const editField = (field: FormField) => {
    setEditingField(field);
    setFieldDialog(true);
  };

  const saveField = () => {
    if (!editingField) return;
    
    setCurrentTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === editingField.id ? editingField : field
      )
    }));
    setFieldDialog(false);
    setEditingField(null);
  };

  const saveTemplate = () => {
    if (!currentTemplate.name) {
      alert('Lütfen form adını girin');
      return;
    }

    const newTemplate = {
      ...currentTemplate,
      id: currentTemplate.id || Date.now().toString()
    };

    if (currentTemplate.id) {
      setTemplates(prev => prev.map(t => t.id === currentTemplate.id ? newTemplate : t));
    } else {
      setTemplates(prev => [...prev, newTemplate]);
    }

    // Reset current template
    setCurrentTemplate({
      id: '',
      name: '',
      description: '',
      category: 'customer',
      fields: []
    });
    
    alert('Form şablonu kaydedildi!');
  };

  const loadTemplate = (template: FormTemplate) => {
    setCurrentTemplate({ ...template });
    setTabValue(0);
  };

  const exportTemplate = (template: FormTemplate) => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${template.name}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <TextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            type={field.type === 'number' ? 'number' : 'text'}
            disabled
          />
        );
      case 'date':
        return (
          <TextField
            fullWidth
            label={field.label}
            type="date"
            required={field.required}
            InputLabelProps={{ shrink: true }}
            disabled
          />
        );
      case 'select':
        return (
          <FormControl fullWidth disabled>
            <InputLabel>{field.label}</InputLabel>
            <Select label={field.label} required={field.required}>
              {field.options?.map((option, idx) => (
                <MenuItem key={idx} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            multiline
            rows={3}
            disabled
          />
        );
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Switch disabled />}
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 700, 
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1 
        }}>
          Form Generator
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Müşteri ve tedarikçi kayıt formları oluşturun ve yönetin
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Form Tasarla" />
            <Tab label="Şablonlar" />
            <Tab label="Önizleme" />
          </Tabs>

          {/* Form Tasarım Sekmesi */}
          {tabValue === 0 && (
            <Box>
              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                flexDirection: { xs: 'column', md: 'row' } 
              }}>
                <Box sx={{ flex: { xs: 1, md: '0 0 300px' } }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>Form Bilgileri</Typography>
                      <TextField
                        fullWidth
                        label="Form Adı"
                        value={currentTemplate.name}
                        onChange={(e) => setCurrentTemplate(prev => ({ ...prev, name: e.target.value }))}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Açıklama"
                        value={currentTemplate.description}
                        onChange={(e) => setCurrentTemplate(prev => ({ ...prev, description: e.target.value }))}
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                      />
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Kategori</InputLabel>
                        <Select
                          value={currentTemplate.category}
                          label="Kategori"
                          onChange={(e) => setCurrentTemplate(prev => ({ ...prev, category: e.target.value as any }))}
                        >
                          <MenuItem value="customer">Müşteri</MenuItem>
                          <MenuItem value="supplier">Tedarikçi</MenuItem>
                          <MenuItem value="employee">Çalışan</MenuItem>
                          <MenuItem value="custom">Özel</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={saveTemplate}
                        disabled={!currentTemplate.name || currentTemplate.fields.length === 0}
                      >
                        Formu Kaydet
                      </Button>
                    </CardContent>
                  </Card>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Form Alanları</Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={addNewField}
                        >
                          Alan Ekle
                        </Button>
                      </Box>

                      {currentTemplate.fields.length === 0 ? (
                        <Alert severity="info">
                          Henüz alan eklenmemiş. "Alan Ekle" butonunu kullanarak form alanları ekleyin.
                        </Alert>
                      ) : (
                        <Box>
                          {currentTemplate.fields.map((field) => (
                            <Paper key={field.id} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                  <DragIcon sx={{ mr: 2, color: 'text.secondary' }} />
                                  <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                      {field.label}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                      <Chip size="small" label={fieldTypes.find(t => t.value === field.type)?.label} />
                                      {field.required && <Chip size="small" label="Zorunlu" color="error" />}
                                    </Box>
                                  </Box>
                                </Box>
                                <Box>
                                  <IconButton onClick={() => editField(field)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton onClick={() => removeField(field.id)} color="error">
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                            </Paper>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          )}

          {/* Şablonlar Sekmesi */}
          {tabValue === 1 && (
            <Box>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3 
              }}>
                {templates.map((template) => (
                  <Box key={template.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {template.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {template.description}
                            </Typography>
                            <Chip 
                              size="small" 
                              label={
                                template.category === 'customer' ? 'Müşteri' :
                                template.category === 'supplier' ? 'Tedarikçi' :
                                template.category === 'employee' ? 'Çalışan' : 'Özel'
                              }
                              color="primary"
                            />
                          </Box>
                          <IconButton onClick={() => exportTemplate(template)}>
                            <ExportIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {template.fields.length} alan
                        </Typography>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => loadTemplate(template)}
                        >
                          Düzenle
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Önizleme Sekmesi */}
          {tabValue === 2 && (
            <Box>
              {currentTemplate.fields.length === 0 ? (
                <Alert severity="info">
                  Önizleme için form alanları ekleyin.
                </Alert>
              ) : (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      {currentTemplate.name || 'Form Önizlemesi'}
                    </Typography>
                    <Box sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                      gap: 3 
                    }}>
                      {currentTemplate.fields.map((field) => (
                        <Box key={field.id}>
                          {renderFieldPreview(field)}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Alan Düzenleme Dialog */}
      <Dialog open={fieldDialog} onClose={() => setFieldDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Alan Düzenle</DialogTitle>
        <DialogContent>
          {editingField && (
            <Box sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label="Alan Adı"
                value={editingField.label}
                onChange={(e) => setEditingField(prev => prev ? { ...prev, label: e.target.value } : null)}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Alan Tipi</InputLabel>
                <Select
                  value={editingField.type}
                  label="Alan Tipi"
                  onChange={(e) => setEditingField(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                >
                  {fieldTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Placeholder"
                value={editingField.placeholder || ''}
                onChange={(e) => setEditingField(prev => prev ? { ...prev, placeholder: e.target.value } : null)}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editingField.required}
                    onChange={(e) => setEditingField(prev => prev ? { ...prev, required: e.target.checked } : null)}
                  />
                }
                label="Zorunlu alan"
                sx={{ mb: 2 }}
              />
              {editingField.type === 'select' && (
                <TextField
                  fullWidth
                  label="Seçenekler (virgülle ayırın)"
                  value={editingField.options?.join(', ') || ''}
                  onChange={(e) => setEditingField(prev => prev ? { ...prev, options: e.target.value.split(',').map(s => s.trim()) } : null)}
                  helperText="Örnek: Seçenek 1, Seçenek 2, Seçenek 3"
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFieldDialog(false)}>İptal</Button>
          <Button onClick={saveField} variant="contained">Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormGenerator;
