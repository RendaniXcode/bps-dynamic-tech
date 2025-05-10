import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const ENDPOINT = "https://tz6x8dtfzf.execute-api.eu-west-1.amazonaws.com/prod/BpsdynamicForm";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message
        }),
      });

      // For successful responses with JSON
      if (response.ok) {
        const data = await response.json();
        
        // Show success message
        toast.success(data.message || "Thank you for your message. We'll get back to you within 24 hours.");
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          message: ''
        });
      } else {
        // Handle HTTP error responses
        let errorMessage = "An error occurred while submitting the form";
        
        try {
          // Try to get error details from response
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If can't parse JSON, use status text
          errorMessage = `Error ${response.status}: ${response.statusText || errorMessage}`;
        }
        
        setApiError(errorMessage);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      
      // Special handling for CORS errors
      if (error instanceof TypeError && error.message.includes('NetworkError')) {
        setApiError("Network error: This could be due to CORS restrictions. Please ensure CORS is enabled on your API Gateway.");
      } else {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while submitting the form';
        setApiError(errorMessage);
      }
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
      
      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{apiError}</AlertDescription>
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
            {isLoading ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
