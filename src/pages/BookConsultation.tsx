
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  company: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service." }),
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

  return (
    <>
      <Helmet>
        <title>Book a Consultation | BPS Dynamic</title>
        <meta name="description" content="Book a free consultation with BPS Dynamic's technology experts. Get personalized advice on cloud services, AI solutions, and app development." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-gradient mb-4">Book a Consultation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Schedule a free consultation with our experts to discuss your technology needs and how BPS Dynamic can help your business succeed.
          </p>
        </div>
      </div>

      {/* Booking Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Consultation Form */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Request Your Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will contact you to confirm your consultation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
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
                            <FormItem className="md:col-span-2">
                              <FormLabel>Additional Information (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please share any specific topics or questions you'd like to discuss during the consultation."
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-bps-red hover:bg-bps-darkred">
                        Book Consultation
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Clock className="mr-3 text-bps-red shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-medium block">30-60 Minute Session</span>
                        <span className="text-sm text-gray-600">Focused on your specific needs</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Users className="mr-3 text-bps-red shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-medium block">Expert Consultation</span>
                        <span className="text-sm text-gray-600">With our senior technology specialists</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CalendarClock className="mr-3 text-bps-red shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-medium block">Flexible Scheduling</span>
                        <span className="text-sm text-gray-600">We'll work with your availability</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-bps-darkblue text-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Us</h3>
                  <ul className="space-y-3">
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
