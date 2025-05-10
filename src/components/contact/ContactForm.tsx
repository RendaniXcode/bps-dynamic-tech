
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Send, Loader } from 'lucide-react';
import { submitContactForm } from '@/utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
    
    // Clear API response when user makes changes
    if (apiResponse) {
      setApiResponse(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await submitContactForm(formData);
      
      // Handle successful submission
      setApiResponse({
        success: true,
        message: response.message || "Thank you for your message. We'll get back to you within 24 hours."
      });
      
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
      
      toast.success("Form submitted successfully!");
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error);
      let errorMessage = "An unexpected error occurred. Please try again later.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setApiResponse({
        success: false,
        message: errorMessage
      });
      
      toast.error("Form submission failed");
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
      
      {apiResponse && (
        <Alert 
          className={`mb-6 ${apiResponse.success 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'}`}
        >
          <AlertDescription 
            className={apiResponse.success ? 'text-green-800' : 'text-red-800'}
          >
            {apiResponse.message}
          </AlertDescription>
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" /> Submitting...
              </>
            ) : (
              <>
                Submit <Send size={18} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
