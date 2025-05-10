/**
 * API Testing Utility
 * 
 * This file provides a simple way to test API integrations during development.
 * Run this with `npm run test:api` to test your API connectivity.
 */
import { submitContactForm, submitConsultationBooking } from '../api';
import { logDebug } from '../constants';

async function testContactFormSubmission() {
  try {
    const result = await submitContactForm({
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '+27123456789',
      message: 'This is a test message from the API testing utility.'
    });
    
    console.log('✅ Contact form submission test successful:');
    console.log(result);
    return true;
  } catch (error) {
    console.error('❌ Contact form submission test failed:');
    console.error(error);
    return false;
  }
}

/**
 * API Testing Utility
 * 
 * This file provides a simple way to test API integrations during development.
 * Run this with `npm run test:api` to test your API connectivity.
 */
import { submitContactForm, submitConsultationBooking } from '../api';
import { logDebug } from '../constants';

async function testContactFormSubmission() {
  try {
    const result = await submitContactForm({
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '+27123456789',
      message: 'This is a test message from the API testing utility.'
    });
    
    console.log('✅ Contact form submission test successful:');
    console.log(result);
    return true;
  } catch (error) {
    console.error('❌ Contact form submission test failed:');
    console.error(error);
    return false;
  }
}

async function testBookingFormSubmission() {
  try {
    // Using the frontend format which will be mapped to the backend format
    const result = await submitConsultationBooking({
      name: 'Test Booking User',
      email: 'booking@example.com',
      phone: '+27123456789',
      company: 'Test Company Ltd',
      service: 'cloud',
      consultationType: 'virtual',
      datePreference: '2023-12-01', // Will be mapped to bookingDate
      timePreference: 'morning',    // Will be mapped to bookingTime
      message: 'This is a test booking from the API testing utility.'
    });
    
    console.log('✅ Booking form submission test successful:');
    console.log(result);
    return true;
  } catch (error) {
    console.error('❌ Booking form submission test failed:');
    console.error(error);
    return false;
  }
}

async function runAllTests() {
  console.log('🔍 Starting API integration tests...');
  console.log('--------------------------------------');
  
  const contactTestSuccess = await testContactFormSubmission();
  
  console.log('--------------------------------------');
  
  const bookingTestSuccess = await testBookingFormSubmission();
  
  console.log('--------------------------------------');
  console.log('📊 Test Results Summary:');
  console.log(`Contact Form: ${contactTestSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Booking Form: ${bookingTestSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log('--------------------------------------');
  
  if (contactTestSuccess && bookingTestSuccess) {
    console.log('🎉 All tests passed successfully!');
  } else {
    console.log('⚠️ Some tests failed. Check the logs above for details.');
    process.exit(1);
  }
}

// Run the tests only if this file is executed directly
if (require.main === module) {
  runAllTests();
}

export {
  testContactFormSubmission,
  testBookingFormSubmission,
  runAllTests
};

async function runAllTests() {
  console.log('🔍 Starting API integration tests...');
  console.log('--------------------------------------');
  
  const contactTestSuccess = await testContactFormSubmission();
  
  console.log('--------------------------------------');
  
  const bookingTestSuccess = await testBookingFormSubmission();
  
  console.log('--------------------------------------');
  console.log('📊 Test Results Summary:');
  console.log(`Contact Form: ${contactTestSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Booking Form: ${bookingTestSuccess ? '✅ PASS' : '❌ FAIL'}`);
  console.log('--------------------------------------');
  
  if (contactTestSuccess && bookingTestSuccess) {
    console.log('🎉 All tests passed successfully!');
  } else {
    console.log('⚠️ Some tests failed. Check the logs above for details.');
    process.exit(1);
  }
}

// Run the tests only if this file is executed directly
if (require.main === module) {
  runAllTests();
}

export {
  testContactFormSubmission,
  testBookingFormSubmission,
  runAllTests
};
