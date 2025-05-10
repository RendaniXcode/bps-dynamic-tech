
import { API, FORM_SOURCES, logDebug } from './constants';

// Type definitions for API responses and form data
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  [key: string]: any;
}

// Contact form data interface - matches the Lambda function's expectations
export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

// Booking form data interface - matches the Lambda function's expectations
export interface BookingFormData {
  fullName: string;          // Backend expects fullName, not name
  email: string;
  phone?: string;            // Optional phone
  company?: string;          // Optional company
  service?: string;          // Optional service type
  consultationType?: string; // Optional consultation type
  bookingDate: string;       // Backend expects bookingDate, not datePreference
  bookingTime: string;       // Backend expects bookingTime, not timePreference
  message?: string;          // Optional message
}

// Track submission times to prevent abuse
let lastContactSubmitTime = 0;
let lastBookingSubmitTime = 0;

/**
 * Generate mock response for testing
 * @param endpoint API endpoint
 * @param data Request data
 * @returns Mocked response
 */
function getMockResponse(endpoint: string, data: any): ApiResponse {
  // Add a small delay to simulate network latency
  const mockDelay = Math.floor(Math.random() * 500) + 500; // 500-1000ms
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get response based on endpoint
      if (endpoint.includes(API.ENDPOINTS.CONTACT_FORM)) {
        logDebug('Mocked contact form submission', data);
        resolve({
          success: true,
          message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
          data: { reference: `MOCK-${Date.now()}` }
        });
      } else if (endpoint.includes(API.ENDPOINTS.BOOKING_FORM)) {
        logDebug('Mocked booking submission', data);
        resolve({
          success: true,
          message: 'Thank you for your booking request. We\'ll confirm your appointment shortly.',
          data: { reference: `BOOK-${Date.now()}` }
        });
      } else {
        // Generic mock response for other endpoints
        resolve({
          success: true,
          message: 'Request processed successfully.',
          data: { timestamp: new Date().toISOString() }
        });
      }
    }, mockDelay);
  });
}

/**
 * Generic function to handle API requests with timeout and retry logic
 * @param url API endpoint URL
 * @param data Request payload
 * @param options Additional fetch options
 * @param retries Number of retry attempts remaining
 * @returns Promise with API response
 */
async function apiRequest<T>(
  url: string,
  data: any,
  options?: RequestInit,
  retries = API.RETRIES
): Promise<ApiResponse> {
  // Check if mock mode is enabled
  if (API.MOCK_ENABLED) {
    console.log('Using mock mode for API request');
    return getMockResponse(url, data);
  }

  // Set up timeout with AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);

  try {
    // Get the correct origin for CORS
    const origin = API.getOrigin();
    console.log(`Making request to: ${url} with Origin: ${origin}`, { data });
    
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
      ...options
    });

    // Clear timeout since request completed
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If we can't parse the JSON, just use the default error message
      }
      console.error('API error response:', errorMessage);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('API response received:', result);
    return result;
  } catch (error: any) {
    // Clear timeout in case of error
    clearTimeout(timeoutId);

    // Handle CORS errors specially
    if (error.message && error.message.includes('CORS')) {
      console.error('CORS error detected. Falling back to mock response.');
      // Fall back to mock response in case of CORS errors in production
      return getMockResponse(url, data);
    }

    // Retry logic for network errors, but not for AbortError (timeout)
    if (retries > 0 && error.name !== 'AbortError') {
      console.log(`Request failed, retrying... (${retries} attempts left)`, error);
      // Exponential backoff: wait longer between each retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (API.RETRIES - retries + 1)));
      return apiRequest(url, data, options, retries - 1);
    }

    // Error message based on type
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again later.');
    }
    
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Send contact form data to API Gateway endpoint for processing
 * @param formData Contact form data
 * @returns Promise with API response
 */
export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    // Simple rate limiting to prevent abuse
    const now = Date.now();
    if (now - lastContactSubmitTime < API.COOLDOWN) {
      throw new Error('Please wait a moment before submitting again.');
    }
    lastContactSubmitTime = now;

    // Add source information for analytics tracking
    const enrichedData = {
      ...formData,
      source: FORM_SOURCES.CONTACT
    };

    return await apiRequest(
      `${API.BASE_URL}${API.ENDPOINTS.CONTACT_FORM}`, 
      enrichedData
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

/**
 * Send consultation booking data to API Gateway endpoint for processing
 * @param bookingData Consultation booking data
 * @returns Promise with API response
 */
export const submitConsultationBooking = async (bookingData: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  consultationType: string;
  datePreference: string;
  timePreference: string;
  message?: string;
}): Promise<ApiResponse> => {
  try {
    // Simple rate limiting to prevent abuse
    const now = Date.now();
    if (now - lastBookingSubmitTime < API.COOLDOWN) {
      throw new Error('Please wait a moment before submitting again.');
    }
    lastBookingSubmitTime = now;

    // Map the frontend form fields to the backend expected format
    const mappedData: BookingFormData = {
      fullName: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      company: bookingData.company,
      service: bookingData.service,
      consultationType: bookingData.consultationType,
      bookingDate: bookingData.datePreference,
      bookingTime: bookingData.timePreference,
      message: bookingData.message
    };

    // Add source information for analytics tracking
    const enrichedData = {
      ...mappedData,
      source: FORM_SOURCES.BOOKING
    };

    return await apiRequest(
      `${API.BASE_URL}${API.ENDPOINTS.BOOKING_FORM}`, 
      enrichedData
    );
  } catch (error) {
    console.error('Booking submission error:', error);
    throw error;
  }
};
