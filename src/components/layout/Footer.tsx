
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "@/components/ui/logo";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define services with their respective section IDs for direct navigation
  const services = [
    { name: "Cloud Consulting", sectionId: "cloud" },
    { name: "Cloud Migration", sectionId: "cloud" },
    { name: "Cloud Training", sectionId: "cloud" },
    { name: "Cloud Optimization", sectionId: "cloud" },
    { name: "AI Solutions", sectionId: "ai" },
    { name: "App Development", sectionId: "app" },
    { name: "Data Science", sectionId: "datascience" },
    { name: "Technical Training", sectionId: "training" }
  ];

  return (
    <footer className="bg-bps-darkblue text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="mt-4 text-xs text-gray-300">
              BPS Dynamic delivers expert cloud computing, AI solutions, app development & technology consulting across Africa, Europe & USA.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/bpsdynamic" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white">
                <Linkedin size={16} />
              </a>
              <a href="https://facebook.com/bpsdynamic" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-white">
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com/bpsdynamic" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-300 hover:text-white">
                <Twitter size={16} />
              </a>
              <a href="https://instagram.com/bpsdynamic" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Services - Now organized in two columns */}
          <div>
            <h3 className="text-base font-semibold mb-3">Our Services</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2 text-xs text-gray-300">
                {services.slice(0, 4).map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={`/services#${service.sectionId}`} 
                      className="hover:text-bps-red transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-xs text-gray-300">
                {services.slice(4).map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={`/services#${service.sectionId}`} 
                      className="hover:text-bps-red transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/" className="hover:text-bps-red transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-bps-red transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-bps-red transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-bps-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>128 Ricard Drive, Midrand South Africa</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+27 83 200 2196</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>info@bpsdynamic.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-800" />
        
        <div className="text-center text-gray-400 text-xs">
          <p>&copy; {currentYear} BPS Dynamic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
