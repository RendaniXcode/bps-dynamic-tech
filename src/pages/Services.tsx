import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import CTAButton from '@/components/common/CTAButton';
import { Cloud, Server, Bot, Smartphone, CheckCircle2, GraduationCap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceDetailPopup from '@/components/services/ServiceDetailPopup';
import { useLocation } from 'react-router-dom';

// Define service detail content
const serviceDetails = {
  cloud: {
    title: "Cloud Services Solutions",
    description: "Our comprehensive cloud services help organizations leverage the full potential of cloud computing across AWS, Azure, and Google Cloud platforms. From migration to optimization and management, we provide end-to-end solutions tailored to your business requirements.",
    benefits: [
      "Reduce infrastructure costs by 20-40%",
      "Improve application performance and scalability",
      "Enhance security with best-practice implementations",
      "Access 24/7 managed cloud support",
      "Optimize cloud spending across multiple platforms",
      "Accelerate innovation with modern cloud architecture"
    ],
    offerings: [
      {
        title: "Cloud Migration Services",
        description: "Move your applications, data, and infrastructure to the cloud with our proven methodology that minimizes disruption and risk."
      },
      {
        title: "Multi-Cloud Architecture",
        description: "Design resilient, optimized environments across AWS, Azure, and Google Cloud with expert architecture planning."
      },
      {
        title: "Cloud Cost Optimization",
        description: "Identify and eliminate waste in your cloud spending through our detailed assessment and continuous optimization service."
      },
      {
        title: "Cloud Security Implementation",
        description: "Protect your cloud resources with comprehensive security protocols, compliance frameworks, and monitoring tools."
      },
      {
        title: "Cloud Managed Services",
        description: "Get 24/7 monitoring, maintenance, and support for your cloud infrastructure from our team of certified experts."
      }
    ]
  },
  technology: {
    title: "Technology Consultation Solutions",
    description: "Navigate complex technology decisions with confidence through our expert consultation services. We help organizations across Africa, Europe, and the USA develop strategic technology roadmaps aligned with business objectives.",
    benefits: [
      "Align technology investments with business goals",
      "Reduce risk in technology decision-making",
      "Accelerate digital transformation initiatives",
      "Optimize existing technology investments",
      "Develop clear technology implementation roadmaps",
      "Access specialized expertise across multiple domains"
    ],
    offerings: [
      {
        title: "Digital Transformation Strategy",
        description: "Develop a comprehensive plan to leverage technology for business growth and efficiency with practical implementation steps."
      },
      {
        title: "IT Infrastructure Assessment",
        description: "Evaluate your current systems and identify opportunities for optimization, cost reduction, and performance improvements."
      },
      {
        title: "Technical Architecture Design",
        description: "Design scalable, secure, and efficient technology architectures that provide a foundation for future growth."
      },
      {
        title: "Vendor Selection & Management",
        description: "Navigate the complex technology marketplace with expert guidance on vendor evaluation, selection, and ongoing management."
      },
      {
        title: "IT Roadmap Development",
        description: "Build strategic technology plans aligned with your business objectives, with clear milestones and implementation guidance."
      }
    ]
  },
  ai: {
    title: "AI Solutions",
    description: "Harness the transformative power of artificial intelligence with our practical, results-focused solutions. From strategy to implementation, we help organizations identify and capitalize on AI opportunities.",
    benefits: [
      "Automate routine tasks and processes",
      "Gain insights from unstructured data",
      "Enhance customer experiences with AI",
      "Make data-driven decisions faster",
      "Develop competitive advantages through AI",
      "Create intelligent applications and workflows"
    ],
    offerings: [
      {
        title: "AI Strategy & Roadmap",
        description: "Identify high-impact AI opportunities and create implementation plans aligned with business goals and technical capabilities."
      },
      {
        title: "Custom AI Solution Development",
        description: "Design and build tailored AI applications using the most appropriate technologies for your specific business needs."
      },
      {
        title: "AI Use Case Workshop",
        description: "Collaborative discovery sessions to identify practical AI implementation opportunities within your organization."
      },
      {
        title: "Proof of Concept Development",
        description: "Rapidly prototype AI solutions to validate business value before full implementation and investment."
      },
      {
        title: "Data Science & Machine Learning",
        description: "Extract actionable insights from your data with advanced analytics, predictive modeling, and machine learning solutions."
      }
    ]
  },
  app: {
    title: "App Development Solutions",
    description: "Create exceptional mobile experiences with our end-to-end application development services. From design to deployment and optimization, we deliver mobile solutions that connect with customers and streamline operations.",
    benefits: [
      "Reach customers on their preferred devices",
      "Streamline business processes with mobile solutions",
      "Ensure consistent brand experience across platforms",
      "Guarantee app store approval with our submission expertise",
      "Implement secure, scalable mobile architecture",
      "Deliver intuitive, engaging user experiences"
    ],
    offerings: [
      {
        title: "Custom iOS App Development",
        description: "Create native applications designed specifically for the Apple ecosystem, optimized for performance and user experience."
      },
      {
        title: "Android Application Development",
        description: "Build tailored solutions optimized for the diverse Android device landscape with consistent functionality."
      },
      {
        title: "Cross-Platform Development",
        description: "Develop efficient solutions that work seamlessly across multiple platforms, reducing development time and cost."
      },
      {
        title: "UI/UX Design for Mobile",
        description: "Design intuitive, engaging interfaces that enhance user satisfaction and drive adoption of your mobile applications."
      },
      {
        title: "App Testing & Quality Assurance",
        description: "Implement rigorous testing protocols to ensure flawless performance across devices and use cases."
      }
    ]
  },
  training: {
    title: "Training Services",
    description: "Empower your team with our comprehensive training programs tailored for cloud engineering and technical skills development. We design custom training solutions to meet your organization's specific needs and learning objectives.",
    benefits: [
      "Customized curriculum based on your organization's needs",
      "Hands-on practical labs and exercises",
      "Expert instructors with real-world experience",
      "Flexible delivery options (on-site, virtual, hybrid)",
      "Post-training support and resources",
      "Certification preparation paths"
    ],
    offerings: [
      {
        title: "Cloud Platform Training (AWS, Azure, GCP)",
        description: "Comprehensive training on major cloud platforms covering architecture, services, best practices, and certification preparation."
      },
      {
        title: "DevOps and Automation Training",
        description: "Learn modern DevOps practices, CI/CD pipelines, infrastructure as code, and automation tools to streamline operations."
      },
      {
        title: "Cloud Security Training",
        description: "Master cloud security principles, compliance frameworks, and security best practices to protect cloud workloads."
      },
      {
        title: "Custom Technical Curriculum",
        description: "Tailored training programs designed specifically for your team's skill gaps and technology stack."
      },
      {
        title: "Cloud Migration Workshop",
        description: "Practical workshop focused on planning, executing, and optimizing cloud migrations for various workloads."
      }
    ]
  },
  datascience: {
    title: "Data Science Solutions",
    description: "Transform your raw data into actionable insights with our comprehensive data science services. From data analysis to predictive modeling and machine learning implementation, we help organizations leverage their data assets for competitive advantage.",
    benefits: [
      "Extract meaningful insights from complex datasets",
      "Make data-driven business decisions",
      "Develop predictive models for forecasting",
      "Automate data collection and analysis processes",
      "Visualize data in intuitive, actionable formats",
      "Build custom machine learning solutions"
    ],
    offerings: [
      {
        title: "Data Analysis and Visualization",
        description: "Transform raw data into meaningful insights through advanced statistical analysis and intuitive visual representations."
      },
      {
        title: "Machine Learning Solutions",
        description: "Custom machine learning models designed to address specific business problems and deliver measurable results."
      },
      {
        title: "Data Science Training",
        description: "Comprehensive training programs to build your team's capabilities in data analysis, statistics, and machine learning."
      },
      {
        title: "Big Data Infrastructure",
        description: "Design and implementation of scalable data processing architectures for handling large volumes of data."
      },
      {
        title: "AI Model Deployment",
        description: "End-to-end implementation of machine learning models into production environments with ongoing optimization."
      }
    ]
  }
};

const ServiceSection = ({ 
  title, 
  description, 
  icon,
  features,
  serviceKey,
  isReversed = false
}: { 
  title: string; 
  description: React.ReactNode;
  icon: React.ReactNode;
  features: string[];
  serviceKey: keyof typeof serviceDetails;
  isReversed?: boolean;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        id={serviceKey}
        className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-16 scroll-mt-20`}
      >
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
                <Button 
                  onClick={() => setShowDetails(true)}
                  variant="outline"
                  className="w-full bg-transparent text-bps-darkblue border-bps-darkblue hover:bg-bps-darkblue hover:text-white" 
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service Detail Popup */}
      <ServiceDetailPopup
        title={serviceDetails[serviceKey].title}
        description={serviceDetails[serviceKey].description}
        benefits={serviceDetails[serviceKey].benefits}
        offerings={serviceDetails[serviceKey].offerings}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

const Services = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const serviceId = location.hash.substring(1);
      
      // Scroll to the section
      const element = document.getElementById(serviceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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
            serviceKey="cloud"
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
            serviceKey="technology"
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
            serviceKey="ai"
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
            serviceKey="app"
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

          <ServiceSection
            title="Training Services"
            icon={<GraduationCap size={32} />}
            serviceKey="training"
            description={
              <p>
                Professional development and skills enhancement are crucial in the rapidly evolving technology landscape. BPS Dynamic offers specialized training programs in cloud engineering and technical skills, with custom-designed curricula tailored to your organization's specific needs and learning objectives.
              </p>
            }
            features={[
              "Cloud Platform Training (AWS, Azure, GCP)",
              "DevOps and Automation Training",
              "Custom Technical Curriculum",
              "Cloud Security Training",
              "Cloud Migration Workshop"
            ]}
          />

          <ServiceSection
            title="Data Science"
            icon={<Database size={32} />}
            serviceKey="datascience"
            description={
              <p>
                Data is one of your organization's most valuable assets. BPS Dynamic's data science services help you extract meaningful insights, build predictive models, and implement machine learning solutions to drive business growth and operational efficiency.
              </p>
            }
            features={[
              "Data Analysis and Visualization",
              "Machine Learning Solutions",
              "Data Science Training",
              "Big Data Infrastructure",
              "AI Model Deployment"
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
