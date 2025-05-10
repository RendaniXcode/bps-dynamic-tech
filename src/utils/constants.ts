// Environment detection
const isDev = import.meta.env.DEV;
const isTestEnv = import.meta.env.MODE === 'test';

// Get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  const value = import.meta.env[key];
  return value !== undefined ? String(value) : fallback;
};

// Convert string to boolean
const strToBool = (str: string): boolean => {
  return str === 'true' || str === '1';
};

// API configuration constants
export const API = {
  // Base API URL from environment variables
  BASE_URL: getEnvVar('VITE_API_BASE_URL', 'https://tz6x8dtfzf.execute-api.eu-west-1.amazonaws.com/prod'),
  
  // API endpoint paths
  ENDPOINTS: {
    CONTACT_FORM: '/BpsdynamicForm',
    BOOKING_FORM: '/BookingForm'
  },
  
  // Determine if we're in an Amplify environment
  isAmplifyEnvironment: typeof window !== 'undefined' && window.location.origin.includes('amplifyapp.com'),
  
  // Mock mode can be enabled via environment variable or forced in certain environments
  get MOCK_ENABLED() {
    // Force mock mode on Amplify until CORS is fixed
    if (this.isAmplifyEnvironment) return true;
    return strToBool(getEnvVar('VITE_API_MOCK_ENABLED', isDev ? 'true' : 'false'));
  },
  
  // Request timeout in milliseconds
  TIMEOUT: parseInt(getEnvVar('VITE_API_TIMEOUT', '15000'), 10),
  
  // Number of retry attempts for failed requests
  RETRIES: parseInt(getEnvVar('VITE_API_RETRIES', '2'), 10),
  
  // Cooldown period between form submissions in milliseconds
  COOLDOWN: parseInt(getEnvVar('VITE_API_COOLDOWN', '3000'), 10),
  
  // Origin headers for CORS
  ORIGINS: {
    PRODUCTION: 'https://bpsdynamic.com',
    STAGING: 'https://staging.bpsdynamic.com',
    DEVELOPMENT: 'http://localhost:3000',
    AMPLIFY: 'https://main.d31lum6mthi3md.amplifyapp.com'
  },
  
  // Get the appropriate origin based on environment
  getOrigin(): string {
    if (isTestEnv) return 'http://localhost:3000'; // For test environment
    
    // Check if we're running on Amplify domain
    const currentUrl = window.location.origin;
    if (currentUrl.includes('amplifyapp.com')) {
      return this.ORIGINS.AMPLIFY;
    }
    
    return import.meta.env.PROD ? this.ORIGINS.PRODUCTION : this.ORIGINS.DEVELOPMENT;
  }
};

// Form sources for analytics tracking
export const FORM_SOURCES = {
  CONTACT: 'website_contact_form',
  BOOKING: 'website_booking_form'
};

// Logging utility
export const logDebug = (message: string, data?: any): void => {
  if (isDev) {
    console.log(`[API DEBUG] ${message}`, data || '');
  }
};
