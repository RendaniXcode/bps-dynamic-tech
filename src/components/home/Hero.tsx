
import React from 'react';
import CTAButton from '@/components/common/CTAButton';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4">
            <span className="block text-gradient">Transform Your Business</span>
            <span className="block text-bps-darkblue">with Expert Cloud & AI Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
            Accelerate innovation with our specialized technology services, trusted by businesses across Africa, Europe, and the USA.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <CTAButton 
              text="Book Your Free Consultation Today" 
              to="/contact" 
              className="text-base font-semibold px-6 py-3"
            />
            <CTAButton 
              text="Explore Our Services" 
              to="/services" 
              variant="outline"
              className="bg-transparent text-bps-darkblue border-bps-darkblue hover:bg-bps-darkblue hover:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
