
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  details: string;
}

const ContactInfoItem = ({ icon, title, details }: ContactInfoItemProps) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 text-bps-red mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-600">{details}</p>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
      
      <div className="space-y-6">
        <ContactInfoItem
          icon={<Mail size={24} />}
          title="Email"
          details="info@bpsdynamic.com"
        />
        
        <ContactInfoItem
          icon={<MapPin size={24} />}
          title="Address"
          details="128 Ricard Drive, Midrand South Africa"
        />
        
        <ContactInfoItem
          icon={<Phone size={24} />}
          title="Phone"
          details="+27 83 200 2196, +27 82 454 4223"
        />
      </div>
      
      <div className="mt-8">
        <h4 className="font-semibold text-lg mb-2">Office Hours</h4>
        <p className="text-gray-600">Monday-Friday: 8:00 AM - 5:00 PM SAST</p>
      </div>
    </div>
  );
};

export default ContactInfo;
