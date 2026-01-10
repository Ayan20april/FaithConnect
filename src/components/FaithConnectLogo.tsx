import React from "react";

interface FaithConnectLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
  xl: "w-28 h-28",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-4xl",
};

export const FaithConnectLogo: React.FC<FaithConnectLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Logo - Abstract hands/connection forming a radiant symbol */}
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D4F5C" />
            <stop offset="50%" stopColor="#1A6B70" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>
          <linearGradient id="amberGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D4F5C" />
            <stop offset="100%" stopColor="#F5A623" />
          </linearGradient>
        </defs>
        
        {/* Outer ring - represents community/unity */}
        <circle 
          cx="32" 
          cy="32" 
          r="28" 
          stroke="url(#tealGradient)" 
          strokeWidth="2.5"
          fill="none"
          opacity="0.3"
        />
        
        {/* Inner sacred geometry - two overlapping curves forming connection */}
        <path
          d="M20 32C20 24 26 18 32 18C38 18 44 24 44 32"
          stroke="url(#tealGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M44 32C44 40 38 46 32 46C26 46 20 40 20 32"
          stroke="url(#amberGlow)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Central connection point - radiant star */}
        <circle cx="32" cy="32" r="6" fill="url(#tealGradient)" />
        <circle cx="32" cy="32" r="3" fill="#F5A623" />
        
        {/* Small accent dots representing light/guidance */}
        <circle cx="32" cy="14" r="2" fill="#F5A623" opacity="0.8" />
        <circle cx="32" cy="50" r="2" fill="#0D4F5C" opacity="0.8" />
        <circle cx="14" cy="32" r="2" fill="#1A6B70" opacity="0.6" />
        <circle cx="50" cy="32" r="2" fill="#1A6B70" opacity="0.6" />
      </svg>
      
      {showText && (
        <div className="text-center">
          <h1 className={`font-bold tracking-tight ${textSizeClasses[size]}`}>
            <span className="text-primary">Faith</span>
            <span className="text-accent">Connect</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default FaithConnectLogo;
