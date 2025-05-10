
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact BPS Dynamic | Technology Consultation & Cloud Services</title>
        <meta name="description" content="Reach BPS Dynamic for expert technology consulting, cloud services & AI solutions. Serving South Africa, Africa, Europe & USA. Book your free consultation today." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-gradient mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We're here to help you navigate your technology challenges and explore new opportunities for innovation. 
            Our team is ready to assist you.
          </p>
          <Button asChild className="bg-bps-red hover:bg-bps-darkred">
            <Link to="/book-consultation" className="flex items-center">
              <CalendarClock className="mr-2" /> Book a Consultation
            </Link>
          </Button>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-bps-darkblue mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">What regions do you serve?</h3>
                <p className="text-gray-600">
                  BPS Dynamic provides services to clients in South Africa, throughout the African continent, Europe, and the United States. Our team works remotely with clients worldwide, with in-person options available for clients in southern Africa.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">How do you approach new client projects?</h3>
                <p className="text-gray-600">
                  We follow a structured methodology that begins with understanding your business objectives and challenges. After an initial consultation, we develop a tailored proposal outlining our recommended approach, timeline, and investment. All projects include regular communication, milestone reviews, and post-implementation support.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">What makes BPS Dynamic different from other technology consultants?</h3>
                <p className="text-gray-600">
                  Our unique combination of technical expertise across multiple platforms, business acumen, and practical experience implementing solutions in diverse environments sets us apart. We focus on delivering measurable business outcomes rather than technology for its own sake, and our 8+ years of experience allows us to anticipate challenges and deliver solutions efficiently.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer ongoing support after project completion?</h3>
                <p className="text-gray-600">
                  Yes, we provide various support options ranging from on-demand assistance to comprehensive managed services. We'll work with you to determine the appropriate level of ongoing support for your specific needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
