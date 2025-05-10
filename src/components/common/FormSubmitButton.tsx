import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSubmitButtonProps {
  isLoading: boolean;
  text: string;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
}

const FormSubmitButton = ({
  isLoading,
  text,
  loadingText = "Submitting...",
  className,
  disabled = false
}: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit"
      disabled={isLoading || disabled}
      className={cn("relative", className)}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {isLoading ? loadingText : text}
    </Button>
  );
};

export default FormSubmitButton;
