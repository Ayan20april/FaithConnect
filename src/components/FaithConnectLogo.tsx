import React from "react";

interface FaithConnectLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
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
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Logo SVG - Chain Link representing connection */}
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B59B6" />
            <stop offset="50%" stopColor="#E74C8C" />
            <stop offset="100%" stopColor="#F39C12" />
          </linearGradient>
        </defs>
        {/* Left chain link */}
        <path
          d="M28 20C28 28.284 21.284 35 13 35C8.582 35 5 31.418 5 27C5 22.582 8.582 19 13 19H22C26.418 19 30 15.418 30 11C30 6.582 26.418 3 22 3H13C4.716 3 -2 9.716 -2 18C-2 26.284 4.716 33 13 33"
          stroke="url(#logoGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right chain link */}
        <path
          d="M52 20C52 11.716 58.716 5 67 5C71.418 5 75 8.582 75 13C75 17.418 71.418 21 67 21H58C53.582 21 50 24.582 50 29C50 33.418 53.582 37 58 37H67C75.284 37 82 30.284 82 22C82 13.716 75.284 7 67 7"
          stroke="url(#logoGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Center connection point with cross/plus */}
        <circle cx="40" cy="20" r="8" fill="url(#logoGradient)" />
        <path
          d="M40 15V25M35 20H45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <h1 className={`font-bold gradient-brand-text ${textSizeClasses[size]}`}>
          FaithConnect
        </h1>
      )}
    </div>
  );
};

export default FaithConnectLogo;
