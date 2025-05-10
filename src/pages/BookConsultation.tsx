
import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingForm from '@/components/booking/BookingForm';

const BookConsultation = () => {
  return (
    <>
      <Helmet>
        <title>Book a Consultation | BPS Dynamic Technology Solutions</title>
        <meta name="description" content="Schedule a free consultation with BPS Dynamic's technology experts. Discuss your business needs and get tailored solutions for cloud, AI, and digital transformation." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-gradient mb-4">Book a Consultation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Schedule a free consultation with our technology experts to discuss your business needs and how we can help you achieve your goals.
          </p>
        </div>
      </div>

      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Book a Consultation?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-bps-red">Expert Guidance</h3>
                <p className="text-gray-700">
                  Get personalized advice from our experienced technology consultants who understand your industry's specific challenges.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-bps-red">Tailored Solutions</h3>
                <p className="text-gray-700">
                  We'll discuss your unique requirements and provide customized technology solutions designed specifically for your business needs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-bps-red">Strategic Planning</h3>
                <p className="text-gray-700">
                  Develop a clear roadmap for implementing technology solutions that align with your business goals and budget.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-bps-red">No Obligation</h3>
                <p className="text-gray-700">
                  Our initial consultations are completely free with no obligation to proceed with our services afterward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookConsultation;
