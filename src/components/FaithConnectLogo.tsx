import React from "react";

interface FaithConnectLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-5xl",
};

export const FaithConnectLogo: React.FC<FaithConnectLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      {/* Logo - Elegant Rising Flame / Hands Symbol */}
      <div className="relative animate-float">
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="50%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            <linearGradient id="blackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer circle - subtle */}
          <circle 
            cx="40" 
            cy="40" 
            r="38" 
            stroke="url(#goldGradient)" 
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          
          {/* Inner decorative ring */}
          <circle 
            cx="40" 
            cy="40" 
            r="32" 
            stroke="url(#goldGradient)" 
            strokeWidth="0.5"
            fill="none"
            opacity="0.2"
          />
          
          {/* Left hand/wing - rising upward */}
          <path
            d="M24 50C24 50 22 42 26 34C30 26 36 22 40 20"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Right hand/wing - rising upward */}
          <path
            d="M56 50C56 50 58 42 54 34C50 26 44 22 40 20"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Central flame/light */}
          <path
            d="M40 55C40 55 32 48 32 40C32 32 36 26 40 22C44 26 48 32 48 40C48 48 40 55 40 55Z"
            fill="url(#goldGradient)"
            opacity="0.9"
            filter="url(#glow)"
          />
          
          {/* Inner light core */}
          <ellipse 
            cx="40" 
            cy="38" 
            rx="5" 
            ry="8" 
            fill="#FFF8DC"
            opacity="0.8"
          />
          
          {/* Top star accent */}
          <circle cx="40" cy="16" r="2" fill="url(#goldGradient)" opacity="0.6" />
          
          {/* Small accent dots */}
          <circle cx="20" cy="40" r="1.5" fill="url(#goldGradient)" opacity="0.4" />
          <circle cx="60" cy="40" r="1.5" fill="url(#goldGradient)" opacity="0.4" />
        </svg>
        
        {/* Subtle glow effect behind logo */}
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-xl -z-10" />
      </div>
      
      {showText && (
        <div className="text-center space-y-1">
          <h1 className={`font-bold tracking-tight ${textSizeClasses[size]}`}>
            <span className="text-foreground">Faith</span>
            <span className="text-accent">Connect</span>
          </h1>
          {size === "xl" && (
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              United in Spirit
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FaithConnectLogo;
