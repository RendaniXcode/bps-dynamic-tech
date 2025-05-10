
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Display success message and wait 3 seconds
    setSuccessMessage("Thank you for your message. We'll get back to you within 24 hours.");
    
    // Wait 3 seconds then reset form
    setTimeout(() => {
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
      
      setIsLoading(false);
      setSuccessMessage(null);
      toast.success("Form submitted successfully!");
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
      <p className="text-gray-600 mb-6">
        We'd love to hear from you. Whether you have a question about our 
        services or need support, our team is here to help.
      </p>
      
      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="mb-1">
            <Label htmlFor="fullName" className={errors.fullName ? "text-destructive" : ""}>
              Full Name *
            </Label>
          </div>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full ${errors.fullName ? "border-destructive" : ""}`}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
          )}
        </div>
        
        <div>
          <div className="mb-1">
            <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
              Email Address *
            </Label>
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full ${errors.email ? "border-destructive" : ""}`}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <div className="mb-1">
            <Label htmlFor="phoneNumber">
              Phone Number (optional)
            </Label>
          </div>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="mb-1">
            <Label htmlFor="message" className={errors.message ? "text-destructive" : ""}>
              Message *
            </Label>
          </div>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full ${errors.message ? "border-destructive" : ""}`}
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">{errors.message}</p>
          )}
        </div>
        
        <div className="mt-2">
          <Button
            type="submit"
            className="w-full bg-bps-red hover:bg-bps-darkred"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"} {!isLoading && <Send size={18} />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
