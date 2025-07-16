// API Configuration
export const API_CONFIG = {
  // Production'da window.location.origin kullan, development'te localhost:3001
  BASE_URL: import.meta.env.MODE === 'production' 
    ? `${window.location.protocol}//${window.location.hostname}:3001`
    : 'http://localhost:3001',
  
  // API endpoints
  ENDPOINTS: {
    CUSTOMERS: '/api/customers',
    WORK_ORDERS: '/api/work-orders',
    INVENTORY: '/api/inventory',
    REPORTS: '/api/reports'
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common fetch wrapper with error handling
export const apiRequest = async (
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response;
};
