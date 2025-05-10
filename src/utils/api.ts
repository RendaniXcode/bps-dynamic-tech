
// API utility functions for AWS Gateway integration

/**
 * Send contact form data to API Gateway endpoint for processing
 * @param formData Contact form data
 * @returns Promise with API response
 */
export const submitContactForm = async (formData: {
  fullName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}) => {
  try {
    // Mock successful response for development while CORS is restricted
    if (import.meta.env.DEV) {
      console.log('DEV MODE: Mock contact form submission', formData);
      return {
        success: true,
        message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
      };
    }

    const response = await fetch('https://tz6x8dtfzf.execute-api.eu-west-1.amazonaws.com/prod/BpsdynamicForm', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://bpsdynamic.com' // Adding origin header for CORS
      },
      body: JSON.stringify({
        ...formData,
        source: 'website_contact_form',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit form');
    }

    return await response.json();
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
}) => {
  try {
    // Mock successful response for development while CORS is restricted
    if (import.meta.env.DEV) {
      console.log('DEV MODE: Mock booking submission', bookingData);
      return {
        success: true,
        message: 'Thank you for your booking request. We\'ll confirm your appointment shortly.',
      };
    }

    const response = await fetch('https://tz6x8dtfzf.execute-api.eu-west-1.amazonaws.com/prod/BookingForm', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://bpsdynamic.com' // Adding origin header for CORS
      },
      body: JSON.stringify({
        ...bookingData,
        source: 'website_booking_form',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Booking submission error:', error);
    throw error;
  }
};
