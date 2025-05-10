
import React from 'react';
import Hero from '@/components/home/Hero';
import IntroSection from '@/components/home/IntroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import ProcessSection from '@/components/home/ProcessSection';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BPS Dynamic | Cloud & AI Solutions | App Development | Technology Consulting</title>
        <meta name="description" content="BPS Dynamic delivers expert cloud computing, AI solutions, app development & technology consulting across Africa, Europe & USA. 8+ years experience. Free consultation." />
      </Helmet>
      <Hero />
      <IntroSection />
      <ServicesOverview />
      <ProcessSection />
    </>
  );
};

export default Index;
