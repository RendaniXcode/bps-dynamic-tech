import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOUpdaterProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

/**
 * Component to update SEO information per page
 * Use this in individual page components to set page-specific meta tags
 */
const SEOUpdater: React.FC<SEOUpdaterProps> = ({ 
  title, 
  description,
  ogImage
}) => {
  const location = useLocation();
  const currentUrl = `https://bpsdynamic.com${location.pathname}`;
  
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={currentUrl} />
      
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={currentUrl} />
      
      {title && <meta property="twitter:title" content={title} />}
      {description && <meta property="twitter:description" content={description} />}
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      <meta property="twitter:url" content={currentUrl} />
    </Helmet>
  );
};

export default SEOUpdater;
