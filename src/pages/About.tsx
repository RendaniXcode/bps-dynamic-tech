
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import CTAButton from '@/components/common/CTAButton';

const ValueCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <Card className="border-none shadow-md h-full">
      <CardContent className="p-6">
        <h4 className="font-semibold text-lg mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const About = () => {
  const values = [
    {
      title: "Innovation",
      description: "We embrace emerging technologies and creative approaches to solve complex challenges."
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to client communication."
    },
    {
      title: "Integrity",
      description: "We build relationships based on honesty, transparency, and ethical business practices."
    },
    {
      title: "Collaboration",
      description: "We work as partners with our clients, understanding their unique needs and challenges."
    },
    {
      title: "Impact",
      description: "We focus on delivering solutions that create meaningful business outcomes."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About BPS Dynamic | Leading Technology Consultants in South Africa & Beyond</title>
        <meta name="description" content="BPS Dynamic delivers innovative technology solutions across Africa, Europe & USA. 8+ years expertise in cloud, AI & software development. Learn about our mission & team." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-gradient mb-4">Driving Digital Innovation Across Africa and Beyond</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded with a passion for technology and innovation, BPS Dynamic has grown to become a leading provider of IT consulting and cloud services.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-bps-darkblue mb-4">About US</h2>
              <p className="text-gray-700 mb-4">
                At BPS Dynamic, we specialize in Information Technology, Digital Transformation, and Cloud Services. Our mission is to empower businesses with the knowledge and tools they need to thrive in the digital age.
              </p>
              <p className="text-gray-700">
                Based in Midrand South Africa, we serve forward-thinking organizations across the African continent, Europe, and the USA. Our team of experienced professionals brings a wealth of knowledge and practical expertise to help businesses succeed in their digital transformation journeys.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Company Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-bps-lightgray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-bps-darkblue mb-6 text-center">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded with a passion for technology and innovation, BPS Dynamic is committed to providing top-notch IT consulting and cloud services. Our team of experienced professionals brings a wealth of knowledge and practical expertise to help businesses succeed.
            </p>
            <p className="text-lg text-gray-700">
              With over 8 years of experience in the technology sector, BPS Dynamic specializes in Cloud Computing & Architecture, Artificial Intelligence & Data Science, Software & Mobile Development, Technology Consultation, and Custom Training Programs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl text-bps-red font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To empower organisations with innovative IT solutions and comprehensive consulting services, enabling them to achieve their full potential in the digital landscape.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-bps-red font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be a leading provider of IT consulting and cloud services, recognised for our excellence, innovation, and commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-bps-lightgray">
        <div className="container mx-auto px-4">
          <h2 className="text-bps-darkblue mb-10 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard key={index} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bps-darkblue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-4">Ready to Start Your Digital Transformation?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect with our team to discuss how BPS Dynamic can help your business leverage technology for growth and innovation.
          </p>
          <CTAButton 
            text="Contact Us Today" 
            to="/contact" 
            className="bg-bps-red hover:bg-white hover:text-bps-red px-8 py-3" 
          />
        </div>
      </section>
    </>
  );
};

export default About;
