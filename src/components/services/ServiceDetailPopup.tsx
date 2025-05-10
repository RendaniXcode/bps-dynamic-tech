
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ServiceDetailProps {
  title: string;
  description: string;
  benefits: string[];
  offerings: { title: string; description: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailPopup = ({
  title,
  description,
  benefits,
  offerings,
  isOpen,
  onClose
}: ServiceDetailProps) => {
  const { toast } = useToast();
  
  const handleContactClick = () => {
    // Close the dialog
    onClose();
    
    // Show a toast notification
    toast({
      title: "Contact Request Initiated",
      description: "Redirecting you to our contact page...",
      duration: 3000,
    });
    
    // Navigate to contact page
    setTimeout(() => {
      window.location.href = '/contact';
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-bps-darkblue">{title}</DialogTitle>
          <DialogDescription className="text-base text-gray-700 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Key Benefits</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 size={20} className="text-bps-red mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-800">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Our Offerings</h3>
          <div className="space-y-4">
            {offerings.map((offering, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-bps-darkblue">{offering.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-300"
          >
            Close
          </Button>
          <Button 
            onClick={handleContactClick}
            className="bg-bps-red hover:bg-bps-darkred text-white flex items-center"
          >
            Contact Us <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailPopup;
