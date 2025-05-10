
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cloud, Server, Bot, Smartphone, GraduationCap, Database } from "lucide-react";
import CTAButton from '../common/CTAButton';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  serviceId: string;
}

const ServiceCard = ({ title, description, icon, serviceId }: ServiceCardProps) => {
  return (
    <Link to={`/services#${serviceId}`} className="block h-full">
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
        <CardHeader className="flex justify-center">
          <div className="p-3 rounded-full bg-bps-lightgray text-bps-red mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-center">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const ServicesOverview = () => {
  const services = [
    {
      title: "Cloud Services",
      description: "We Offer Cloud Migration, Managed Services, Cloud Computing Training for GCP, AWS, and Azure, Linux, OpenShift, Automation",
      icon: <Cloud size={32} />,
      serviceId: "cloud"
    },
    {
      title: "Information Technology",
      description: "Benefit from our scalable solutions and leverage the power of the cloud with dedicated support from your personal consultant.",
      icon: <Server size={32} />,
      serviceId: "technology"
    },
    {
      title: "AI Solutions",
      description: "Custom AI solutions for businesses leveraging OpenAI, Azure AI, AWS Bedrock & GCP. From strategy to implementation.",
      icon: <Bot size={32} />,
      serviceId: "ai"
    },
    {
      title: "App Development",
      description: "Professional app development for iOS & Android with guaranteed App Store submissions for clients in South Africa, Africa, Europe & USA.",
      icon: <Smartphone size={32} />,
      serviceId: "app"
    },
    {
      title: "Training Services",
      description: "Custom cloud engineering training programs designed to meet your specific business needs and technical requirements.",
      icon: <GraduationCap size={32} />,
      serviceId: "training"
    },
    {
      title: "Data Science",
      description: "Comprehensive data analysis, machine learning solutions and data science training to help businesses extract valuable insights.",
      icon: <Database size={32} />,
      serviceId: "datascience"
    }
  ];

  return (
    <section className="py-16 bg-bps-lightgray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Technology Solutions That Power Business Success</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our comprehensive suite of services is designed to support your digital transformation journey from strategy to implementation and optimization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              serviceId={service.serviceId}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <CTAButton 
            text="Explore All Services" 
            to="/services"
            className="px-6 py-2" 
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
