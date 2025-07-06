import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SystemUser } from '../types';

interface AuthContextType {
  user: SystemUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SystemUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo kullanıcıları - gerçek uygulamada API'dan gelecek
  const demoUsers: SystemUser[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@fabrika.com',
      firstName: 'Sistem',
      lastName: 'Yöneticisi',
      role: 'admin',
      department: 'Bilgi İşlem',
      shift: 'Gündüz Vardiyası',
      permissions: [
        'dashboard_read', 'dashboard_export',
        'work_orders_read', 'work_orders_create', 'work_orders_update', 'work_orders_delete', 'work_orders_approve',
        'production_read', 'production_create', 'production_update',
        'quality_read', 'quality_create', 'quality_approve',
        'inventory_read', 'inventory_create', 'inventory_update',
        'equipment_read', 'equipment_create', 'equipment_update',
        'reports_read', 'reports_export',
        'factory_settings_read', 'factory_settings_update'
      ],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-15 14:30',
      lastPasswordChange: '2024-01-01 08:00',
      createdAt: '2024-01-01 08:00',
      updatedAt: '2024-01-15 14:30'
    },
    {
      id: '2',
      username: 'ayilmaz',
      email: 'ahmet.yilmaz@fabrika.com',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      role: 'manager',
      department: 'Ana Üretim',
      shift: 'Gündüz Vardiyası',
      permissions: [
        'dashboard_read',
        'work_orders_read', 'work_orders_create', 'work_orders_update', 'work_orders_approve',
        'production_read', 'production_create', 'production_update',
        'quality_read',
        'inventory_read',
        'equipment_read',
        'reports_read', 'reports_export'
      ],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-15 16:45',
      lastPasswordChange: '2024-01-02 09:00',
      createdAt: '2024-01-02 09:00',
      updatedAt: '2024-01-15 16:45'
    },
    {
      id: '5',
      username: 'fcanli',
      email: 'fatma.canli@fabrika.com',
      firstName: 'Fatma',
      lastName: 'Canlı',
      role: 'operator',
      department: 'Ana Üretim',
      shift: 'Akşam Vardiyası',
      permissions: [
        'dashboard_read',
        'work_orders_read', 'work_orders_update',
        'production_read',
        'quality_read', 'quality_create',
        'inventory_read',
        'equipment_read'
      ],
      isActive: true,
      mustChangePassword: false,
      failedLoginAttempts: 0,
      lastLogin: '2024-01-10 18:30',
      lastPasswordChange: '2024-01-05 12:00',
      createdAt: '2024-01-05 12:00',
      updatedAt: '2024-01-10 18:30'
    }
  ];

  // Demo şifre (gerçek uygulamada hash'lenmiş olacak)
  const demoPassword = '123456';

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Demo giriş kontrolü
    await new Promise(resolve => setTimeout(resolve, 1000)); // API çağrısı simülasyonu

    const foundUser = demoUsers.find(user => user.email === email);
    
    if (!foundUser) {
      setError('E-posta adresi bulunamadı.');
      setIsLoading(false);
      return false;
    }

    if (!foundUser.isActive) {
      setError('Hesabınız pasif durumda. Lütfen sistem yöneticisi ile iletişime geçin.');
      setIsLoading(false);
      return false;
    }

    if (foundUser.accountLockedUntil && new Date(foundUser.accountLockedUntil) > new Date()) {
      setError('Hesabınız geçici olarak kilitlenmiştir. Lütfen daha sonra tekrar deneyin.');
      setIsLoading(false);
      return false;
    }

    if (password !== demoPassword) {
      setError('Şifre hatalı.');
      setIsLoading(false);
      return false;
    }

    // Başarılı giriş
    const updatedUser = {
      ...foundUser,
      lastLogin: new Date().toISOString().slice(0, 16),
      failedLoginAttempts: 0
    };
    
    setUser(updatedUser);
    localStorage.setItem('mes_user', JSON.stringify(updatedUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mes_user');
  };

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
  useEffect(() => {
    const savedUser = localStorage.getItem('mes_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('mes_user');
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
