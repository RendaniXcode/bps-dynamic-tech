
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Loader } from 'lucide-react';
import { submitContactForm } from '@/utils/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Define the form validation schema using Zod
const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// Define the type based on our schema
type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Initialize React Hook Form with Zod resolver
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await submitContactForm(data);
      
      // Handle successful submission
      setApiResponse({
        success: true,
        message: response.message || "Thank you for your message. We'll get back to you within 24 hours."
      });
      
      // Reset form on success
      form.reset();
      
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How can we help you?" 
                    rows={5} 
                    {...field} 
                    disabled={isSubmitting} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-bps-red hover:bg-bps-darkred"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="animate-spin mr-2" /> Submitting...
              </>
            ) : (
              <>
                Submit <Send size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
