import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarClock, Loader } from 'lucide-react';
import { submitConsultationBooking } from '@/utils/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Define the form validation schema using Zod
const bookingFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  consultationType: z.string().min(1, "Please select a consultation type"),
  datePreference: z.string().min(1, "Preferred date is required"),
  timePreference: z.string().min(1, "Preferred time is required"),
  message: z.string().optional(),
});

// Define the type based on our schema
type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = () => {
  const [apiResponse, setApiResponse] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Initialize React Hook Form with Zod resolver
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      consultationType: "",
      datePreference: "",
      timePreference: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // Explicitly pass all required fields and optional fields
      const response = await submitConsultationBooking({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        consultationType: data.consultationType,
        datePreference: data.datePreference,
        timePreference: data.timePreference,
        message: data.message
      });
      
      // Handle successful submission
      setApiResponse({
        success: true,
        message: response.message || "Thank you for booking a consultation with us. We'll confirm your appointment shortly."
      });
      
      // Reset form on success
      form.reset();
      
      toast.success("Booking submitted successfully!");
    } catch (error) {
      // Handle error
      console.error('Booking submission error:', error);
      let errorMessage = "An unexpected error occurred. Please try again later.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setApiResponse({
        success: false,
        message: errorMessage
      });
      
      toast.error("Booking submission failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6">Book a Consultation</h3>
      <p className="text-gray-600 mb-6">
        Schedule a free consultation with our experts to discuss your business needs and how we can help.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cloud-solutions">Cloud Solutions</SelectItem>
                      <SelectItem value="ai-implementation">AI Implementation</SelectItem>
                      <SelectItem value="software-development">Software Development</SelectItem>
                      <SelectItem value="systems-integration">Systems Integration</SelectItem>
                      <SelectItem value="strategy-consulting">Strategy Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video-call">Video Call</SelectItem>
                      <SelectItem value="phone-call">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="datePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormDescription>
                    Choose a date at least 2 business days in the future
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time *</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormDescription>
                    Business hours: 9:00 AM - 5:00 PM
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any specific topics or questions you'd like to discuss?" 
                    rows={4} 
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
                Book Consultation <CalendarClock size={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
