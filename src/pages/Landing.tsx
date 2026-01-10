import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FaithConnectLogo from "@/components/FaithConnectLogo";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      {/* Background subtle gradient overlay */}
      <div className="absolute inset-0 gradient-subtle pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm animate-fade-in">
        {/* Logo */}
        <FaithConnectLogo size="xl" showText />
        
        {/* Tagline */}
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          A platform where Worshipers connect with their Religious Leaders.
        </p>
        
        {/* CTA Buttons */}
        <div className="w-full mt-12 space-y-4">
          <Button 
            variant="hero"
            className="w-full"
            onClick={() => navigate("/auth?role=worshiper")}
          >
            Continue as Worshiper
          </Button>
          
          <Button 
            variant="heroOutline"
            className="w-full"
            onClick={() => navigate("/auth?role=leader")}
          >
            Continue as Religious Leader
          </Button>
        </div>
        
        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Landing;
