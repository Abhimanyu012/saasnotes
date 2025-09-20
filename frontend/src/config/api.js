// API Configuration
// Handles different API base URLs for development and production

// For development, use Vite proxy (empty string)
// For production, use environment variable or fallback
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? import.meta.env.VITE_API_URL || 'https://notesbackend-psi.vercel.app'
  : '';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  SEED: '/api/auth/seed',
  
  // Notes
  NOTES: '/api/notes',
  
  // Tenants
  TENANTS: '/api/tenants',
  
  // Health
  HEALTH: '/api/health'
};

// Helper function to create full API URLs
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Export default configuration
export default {
  baseURL: API_BASE_URL,
  endpoints: API_ENDPOINTS,
  createUrl: createApiUrl
};