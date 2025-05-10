
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import CTAButton from '@/components/common/CTAButton';
import { Cloud, Server, Bot, Smartphone, CheckCircle2 } from 'lucide-react';

const ServiceSection = ({ 
  title, 
  description, 
  icon,
  features,
  isReversed = false
}: { 
  title: string; 
  description: React.ReactNode;
  icon: React.ReactNode;
  features: string[];
  isReversed?: boolean;
}) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-16`}>
      <div className="md:w-1/2">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-bps-lightgray text-bps-red mr-3">
            {icon}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <div className="prose max-w-none mb-6">
          {description}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 size={20} className="text-bps-red mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-1/2">
        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gray-200 h-64 w-full rounded-t-lg flex items-center justify-center">
              <p className="text-gray-500">Service Image</p>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">{title} Solutions</h4>
              <p className="text-gray-600 mb-4">
                Tailored {title.toLowerCase()} services designed to meet your specific business requirements.
              </p>
              <CTAButton 
                text="Learn More" 
                to="/contact" 
                size="sm"
                variant="outline"
                className="w-full bg-transparent text-bps-darkblue border-bps-darkblue hover:bg-bps-darkblue hover:text-white" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | BPS Dynamic</title>
        <meta name="description" content="Explore BPS Dynamic's comprehensive technology services including cloud solutions, AI development, app development and technology consulting." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">
            <span className="block text-gradient">Technology Solutions</span>
            <span className="block text-bps-darkblue">That Power Business Success</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of services is designed to support your digital transformation journey from strategy to implementation and optimization.
          </p>
        </div>
      </div>

      {/* Services Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ServiceSection
            title="Cloud Services"
            icon={<Cloud size={32} />}
            description={
              <p>
                Cloud computing has revolutionized how businesses operate, but maximizing its potential requires specialized expertise. At BPS Dynamic, we bring over 8 years of experience implementing and optimizing cloud solutions across multiple platforms including AWS, Azure, and Google Cloud.
              </p>
            }
            features={[
              "Cloud Cost Optimization",
              "Cloud Migration Services",
              "Multi-Cloud Architecture Design",
              "Cloud Security Implementation",
              "Managed Cloud Services"
            ]}
          />

          <ServiceSection
            title="Technology Consultation"
            icon={<Server size={32} />}
            description={
              <p>
                In today's rapidly evolving digital landscape, the right technology strategy is critical to business success. BPS Dynamic's consultation services help organizations across Africa, Europe, and the USA navigate complex technology decisions with confidence.
              </p>
            }
            features={[
              "Digital Transformation Strategy",
              "IT Infrastructure Assessment",
              "Technical Architecture Design",
              "Vendor Selection & Management",
              "IT Roadmap Development"
            ]}
            isReversed
          />

          <ServiceSection
            title="AI Solutions"
            icon={<Bot size={32} />}
            description={
              <p>
                Artificial Intelligence is transforming business operations, customer experiences, and decision-making processes across industries. BPS Dynamic helps organizations leverage this transformative technology with practical, results-focused AI solutions designed to address specific business challenges.
              </p>
            }
            features={[
              "AI Strategy & Roadmap Development",
              "Custom AI Solution Development",
              "AI Use Case Workshop",
              "Proof of Concept Development",
              "Data Science & Machine Learning"
            ]}
          />

          <ServiceSection
            title="App Development"
            icon={<Smartphone size={32} />}
            description={
              <p>
                In today's mobile-first world, exceptional app experiences are essential for connecting with customers and streamlining operations. BPS Dynamic delivers end-to-end mobile application development services for iOS and Android platforms, with specialized expertise in navigating the app submission process.
              </p>
            }
            features={[
              "Custom iOS App Development",
              "Android Application Development",
              "Cross-Platform Development",
              "UI/UX Design for Mobile",
              "App Testing & Quality Assurance"
            ]}
            isReversed
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bps-darkblue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our experts to discuss how our services can help your organization thrive in the digital age.
          </p>
          <CTAButton 
            text="Book Your Free Consultation" 
            to="/contact" 
            className="bg-bps-red hover:bg-white hover:text-bps-red px-8 py-3" 
          />
        </div>
      </section>
    </>
  );
};

export default Services;
