
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <div className="font-bold text-3xl">
        <span className="text-bps-red">BPS</span> 
        <span className="text-bps-darkblue">Dynamic</span>
      </div>
    </Link>
  );
};

export default Logo;
