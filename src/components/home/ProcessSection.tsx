
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
  return (
    <Card className="bg-white border-none shadow-md h-full">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bps-red text-white font-bold text-xl flex-shrink-0">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      number: "1",
      title: "Consult",
      description: "We start by understanding your business needs and goals, and then we develop a tailored cloud strategy that aligns with your vision."
    },
    {
      number: "2",
      title: "Plan",
      description: "Our team of experts will create a detailed plan that outlines the steps needed to achieve your cloud transformation goals."
    },
    {
      number: "3",
      title: "Implement",
      description: "We will work with you to implement the plan, ensuring a smooth transition to the cloud with minimal disruption to your business operations."
    },
    {
      number: "4",
      title: "Optimize",
      description: "Once your cloud infrastructure is up and running, we will continue to monitor and optimize it to ensure peak performance and efficiency."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-bps-darkblue">Process that works</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            With our proven system, we quickly provide the ideal cloud experts for your project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
