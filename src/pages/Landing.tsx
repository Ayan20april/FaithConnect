import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FaithConnectLogo from "@/components/FaithConnectLogo";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen px-8 py-12 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo with entrance animation */}
        <div className="opacity-0 animate-fade-in-up">
          <FaithConnectLogo size="xl" showText />
        </div>
        
        {/* Tagline */}
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed opacity-0 animate-fade-in stagger-2">
          Where Worshipers connect with their Religious Leaders through faith, community, and meaningful conversations.
        </p>
        
        {/* CTA Buttons */}
        <div className="w-full mt-12 space-y-4 opacity-0 animate-fade-in-up stagger-3">
          <Button 
            variant="hero"
            className="w-full group"
            onClick={() => navigate("/auth?role=worshiper")}
          >
            Continue as Worshiper
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="heroOutline"
            className="w-full group"
            onClick={() => navigate("/auth?role=leader")}
          >
            Continue as Religious Leader
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Decorative line */}
        <div className="flex items-center gap-4 mt-12 w-full opacity-0 animate-fade-in stagger-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Est. 2025</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        
        {/* Footer */}
        <p className="mt-8 text-xs text-muted-foreground opacity-0 animate-fade-in stagger-5">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Landing;
