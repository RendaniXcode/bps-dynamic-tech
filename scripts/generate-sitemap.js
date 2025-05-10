/**
 * Sitemap Generator Script for BPS Dynamic
 * 
 * This script generates a sitemap.xml file in the public directory
 * with all the pages of the BPS Dynamic website.
 */

const fs = require('fs');
const path = require('path');

// Create scripts directory if it doesn't exist
const scriptsDir = path.resolve(__dirname);
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Create public directory if it doesn't exist
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Define your site's routes and their properties
const routes = [
  // Main pages
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/book-consultation', changefreq: 'monthly', priority: '0.8' },
  
  // Services pages
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/cloud-migration', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/managed-services', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/application-development', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/cloud-consulting', changefreq: 'monthly', priority: '0.7' },
  
  // Training pages
  { path: '/training', changefreq: 'weekly', priority: '0.8' },
  { path: '/training/aws', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/gcp', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/azure', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/linux', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/openshift', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/automation', changefreq: 'weekly', priority: '0.7' },
  
  // Events pages
  { path: '/events', changefreq: 'weekly', priority: '0.7' },
  { path: '/events/aws-bootcamp', changefreq: 'weekly', priority: '0.6' },
  { path: '/events/hackathon', changefreq: 'weekly', priority: '0.6' },
  
  // Content pages
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/resources', changefreq: 'monthly', priority: '0.6' },
  
  // Policy pages
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' }
];

// Base URL of your site
const baseUrl = 'https://bpsdynamic.com';

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
/**
 * Sitemap Generator Script for BPS Dynamic
 * 
 * This script generates a sitemap.xml file in the public directory
 * with all the pages of the BPS Dynamic website.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create scripts directory if it doesn't exist
const scriptsDir = __dirname;
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Create public directory if it doesn't exist
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Define your site's routes and their properties
const routes = [
  // Main pages
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/book-consultation', changefreq: 'monthly', priority: '0.8' },
  
  // Services pages
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/cloud-migration', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/managed-services', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/application-development', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/cloud-consulting', changefreq: 'monthly', priority: '0.7' },
  
  // Training pages
  { path: '/training', changefreq: 'weekly', priority: '0.8' },
  { path: '/training/aws', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/gcp', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/azure', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/linux', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/openshift', changefreq: 'weekly', priority: '0.7' },
  { path: '/training/automation', changefreq: 'weekly', priority: '0.7' },
  
  // Events pages
  { path: '/events', changefreq: 'weekly', priority: '0.7' },
  { path: '/events/aws-bootcamp', changefreq: 'weekly', priority: '0.6' },
  { path: '/events/hackathon', changefreq: 'weekly', priority: '0.6' },
  
  // Content pages
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/resources', changefreq: 'monthly', priority: '0.6' },
  
  // Policy pages
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-of-service', changefreq: 'yearly', priority: '0.3' }
];

// Base URL of your site
const baseUrl = 'https://bpsdynamic.com';

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Generate the sitemap XML content
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
sitemap += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

// Group pages by type for better organization with comments
const pageGroups = {
  '/': '<!-- Homepage -->',
  '/about': '<!-- About Us Page -->',
  '/services': '<!-- Services Pages -->',
  '/training': '<!-- Training Pages -->',
  '/book-consultation': '<!-- Consultation Booking -->',
  '/events': '<!-- Events/Programs -->',
  '/blog': '<!-- Blog/Resources -->',
  '/contact': '<!-- Contact Page -->',
  '/privacy-policy': '<!-- Policy Pages -->'
};

let currentGroup = '';

routes.forEach(route => {
  // Add a comment if this is the start of a new group
  if (pageGroups[route.path] && currentGroup !== pageGroups[route.path]) {
    currentGroup = pageGroups[route.path];
    sitemap += `  ${currentGroup}\n`;
  }
  
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}${route.path}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${route.priority}</priority>\n`;
  sitemap += '  </url>\n';
  
  // Add a newline after the last URL in a group
  if (Object.values(pageGroups).includes(currentGroup) && 
      !routes.find(r => r.path.startsWith(route.path) && r.path !== route.path)) {
    sitemap += '\n';
  }
});

sitemap += '</urlset>';

// Write the sitemap to file
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated successfully at: public/sitemap.xml');
console.log(`📅 Last updated: ${today}`);
console.log(`🔗 URL: ${baseUrl}/sitemap.xml`);
console.log(`📊 Total pages: ${routes.length}`);
// Generate the sitemap XML content
let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
sitemap += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

// Group pages by type for better organization with comments
const pageGroups = {
  '/': '<!-- Homepage -->',
  '/about': '<!-- About Us Page -->',
  '/services': '<!-- Services Pages -->',
  '/training': '<!-- Training Pages -->',
  '/book-consultation': '<!-- Consultation Booking -->',
  '/events': '<!-- Events/Programs -->',
  '/blog': '<!-- Blog/Resources -->',
  '/contact': '<!-- Contact Page -->',
  '/privacy-policy': '<!-- Policy Pages -->'
};

let currentGroup = '';

routes.forEach(route => {
  // Add a comment if this is the start of a new group
  if (pageGroups[route.path] && currentGroup !== pageGroups[route.path]) {
    currentGroup = pageGroups[route.path];
    sitemap += `  ${currentGroup}\n`;
  }
  
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}${route.path}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${route.priority}</priority>\n`;
  sitemap += '  </url>\n';
  
  // Add a newline after the last URL in a group
  if (Object.values(pageGroups).includes(currentGroup) && 
      !routes.find(r => r.path.startsWith(route.path) && r.path !== route.path)) {
    sitemap += '\n';
  }
});

sitemap += '</urlset>';

// Write the sitemap to file
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('✅ Sitemap generated successfully at: public/sitemap.xml');
console.log(`📅 Last updated: ${today}`);
console.log(`🔗 URL: ${baseUrl}/sitemap.xml`);
console.log(`📊 Total pages: ${routes.length}`);
