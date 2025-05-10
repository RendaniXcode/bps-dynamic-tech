
// API utility functions for AWS Gateway integration

/**
 * Send contact form data to API Gateway endpoint for processing
 * @param formData Contact form data
 * @returns Promise with API response
 */
export const submitContactForm = async (formData: {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
  try {
    const response = await fetch('https://api.bpsdynamic.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch('https://api.bpsdynamic.com/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
