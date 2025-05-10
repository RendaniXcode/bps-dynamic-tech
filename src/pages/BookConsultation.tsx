
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner";
import { CalendarClock, Clock, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  company: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service." }),
  consultationType: z.string().min(1, { message: "Please select a consultation type." }),
  datePreference: z.string().min(1, { message: "Please provide a preferred date." }),
  timePreference: z.string().min(1, { message: "Please provide a preferred time." }),
  message: z.string().optional(),
});

const BookConsultation = () => {
  // Define the form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    toast.success("Consultation request submitted! We'll contact you shortly.");
    form.reset();
  };

  // Service options
  const serviceOptions = [
    { value: "cloud", label: "Cloud Consulting" },
    { value: "ai", label: "AI Solutions" },
    { value: "app", label: "App Development" },
    { value: "datascience", label: "Data Science" },
    { value: "training", label: "Technical Training" },
    { value: "other", label: "Other Services" },
  ];

  // Consultation type options with updated pricing to include travel time
  const consultationTypes = [
    { value: "online", label: "Online Consultation (30-minute free video call)" },
    { value: "onsite-1h", label: "On-site (1 hour - R950 + R1900 travel time)" },
    { value: "onsite-2h", label: "On-site (2 hours - R1900 + R1900 travel time)" },
  ];

  return (
    <>
      <Helmet>
        <title>Book a Consultation | BPS Dynamic</title>
        <meta name="description" content="Book a free consultation with BPS Dynamic's technology experts. Get personalized advice on cloud services, AI solutions, and app development." />
      </Helmet>

      {/* Hero Section - More compact */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-gradient mb-3">Book a Consultation</h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Schedule a consultation with our experts to discuss your technology needs and how BPS Dynamic can help your business succeed.
          </p>
        </div>
      </div>

      {/* Booking Content - More compact layout */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Consultation Form - Takes more space */}
            <div className="lg:col-span-8">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>Request Your Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will contact you to confirm your consultation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+27 83 123 4567" {...field} />
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
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Ltd" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service of Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {serviceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
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
                              <FormLabel>Consultation Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select consultation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {consultationTypes.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="datePreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timePreference"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Time</FormLabel>
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
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
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please share any specific topics or questions you'd like to discuss during the consultation."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-bps-red hover:bg-bps-darkred">
                        Book Consultation
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar - Takes less space */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="mr-2 text-bps-red shrink-0 mt-1" size={18} />
                      <div>
                        <span className="font-medium block text-sm">Tailored Consultation</span>
                        <span className="text-xs text-gray-600">Online (30 min) or on-site (1-2 hours)</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="mr-2 text-bps-red shrink-0 mt-1" size={18} />
                      <div>
                        <span className="font-medium block text-sm">Expert Consultation</span>
                        <span className="text-xs text-gray-600">With our senior technology specialists</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CalendarClock className="mr-2 text-bps-red shrink-0 mt-1" size={18} />
                      <div>
                        <span className="font-medium block text-sm">Flexible Scheduling</span>
                        <span className="text-xs text-gray-600">We'll work with your availability</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-bps-darkblue text-white rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Why Choose Us</h3>
                  <ul className="space-y-2 text-sm">
                    <li>✓ 8+ years of specialized experience</li>
                    <li>✓ Customized solutions for your business</li>
                    <li>✓ Ongoing support after implementation</li>
                    <li>✓ Proven track record of success</li>
                    <li>✓ Transparent, no-pressure approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookConsultation;
