import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * SEO component that manages all meta tags for the website
 */
const SEO: React.FC<SEOProps> = ({
  title = "BPS Dynamic - Expert Cloud Computing & AI Solutions",
  description = "BPS Dynamic delivers expert cloud computing, AI solutions, app development & technology consulting across Africa, Europe & USA.",
  canonical = "https://bpsdynamic.com",
  ogImage = "https://bpsdynamic.com/images/og-image.jpg",
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Sitemap Reference */}
      <link rel="sitemap" type="application/xml" href="https://bpsdynamic.com/sitemap.xml" />
    </Helmet>
  );
};

export default SEO;
