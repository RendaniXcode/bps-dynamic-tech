
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitContactForm } from '@/utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitContactForm(formData);
      
      toast.success("Message Sent!", {
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error("Message could not be sent", {
        description: "There was an error sending your message. Please try again later.",
      });
      console.error("Contact form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
      <p className="text-gray-600 mb-6">
        We'd love to hear from you. Whether you have a question about our 
        services or need support, our team is here to help.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full"
          />
        </div>
        
        <div>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help?"
            rows={5}
            required
            className="w-full"
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-bps-red hover:bg-bps-darkred"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
