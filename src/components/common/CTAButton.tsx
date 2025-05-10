
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  to: string;
  className?: string;
  showArrow?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const CTAButton = ({ 
  text, 
  to, 
  className, 
  showArrow = true,
  variant = 'default',
  size = 'default'
}: CTAButtonProps) => {
  return (
    <Button 
      asChild 
      variant={variant}
      size={size}
      className={cn(
        "bg-bps-red hover:bg-bps-darkred transition-all duration-200",
        className
      )}
    >
      <Link to={to}>
        {text}
        {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
      </Link>
    </Button>
  );
};

export default CTAButton;
