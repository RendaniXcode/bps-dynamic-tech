
import React from 'react';
import Hero from '@/components/home/Hero';
import IntroSection from '@/components/home/IntroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import ProcessSection from '@/components/home/ProcessSection';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // JSON-LD structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BPS Dynamic",
    "url": "https://bpsdynamic.com",
    "logo": "https://bpsdynamic.com/logo.png",
    "description": "BPS Dynamic delivers expert cloud computing, AI solutions, app development & technology consulting across Africa, Europe & USA.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Midrand",
      "addressRegion": "Gauteng",
      "addressCountry": "South Africa"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27-000-000-000",
      "contactType": "customer service",
      "areaServed": ["Africa", "Europe", "United States"]
    },
    "sameAs": [
      "https://www.facebook.com/bpsdynamic",
      "https://www.linkedin.com/company/bpsdynamic",
      "https://twitter.com/bpsdynamic"
    ]
  };

  // Service structured data
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Technology Consulting",
    "provider": {
      "@type": "Organization",
      "name": "BPS Dynamic"
    },
    "areaServed": ["Africa", "Europe", "United States"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Computing & Architecture"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI & Data Science Solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software & Mobile Development"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>BPS Dynamic | Cloud & AI Solutions | App Development | Technology Consulting</title>
        <meta name="description" content="BPS Dynamic delivers expert cloud computing, AI solutions, app development & technology consulting across Africa, Europe & USA. 8+ years experience. Free consultation." />
        <meta name="keywords" content="cloud computing, AI solutions, app development, technology consulting, digital transformation, South Africa tech" />
        <link rel="canonical" href="https://bpsdynamic.com" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceData)}
        </script>
      </Helmet>
      <Hero />
      <IntroSection />
      <ServicesOverview />
      <ProcessSection />
    </>
  );
};

export default Index;
