import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { faithOptions } from "@/data/mockData";

const OnboardingWorshiper: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    faith: "",
  });

  const handleFaithSelect = (faith: string) => {
    setFormData({ ...formData, faith });
  };

  const handleContinue = () => {
    if (step === 1 && formData.name) {
      setStep(2);
    } else if (step === 2 && formData.faith) {
      // Save to localStorage and navigate to home
      localStorage.setItem("faithconnect_profile", JSON.stringify(formData));
      navigate("/home");
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <button 
          onClick={() => step === 1 ? navigate("/auth?role=worshiper") : setStep(1)}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Complete Your Profile</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 2</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-secondary">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>
      
      <div className="p-6 animate-fade-in">
        {step === 1 && (
          <div className="space-y-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                    {formData.name ? formData.name[0].toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-button">
                  <Camera size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Add a profile photo (optional)</p>
            </div>
            
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-center text-lg h-12"
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Select Your Faith</h2>
              <p className="text-muted-foreground mt-2">This helps us personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {faithOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFaithSelect(option.value)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.faith === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-secondary"
                  }`}
                >
                  <span className="font-medium text-foreground">{option.label}</span>
                  {formData.faith === option.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Continue Button */}
        <div className="mt-8">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={handleContinue}
            disabled={(step === 1 && !formData.name) || (step === 2 && !formData.faith)}
          >
            {step === 2 ? "Get Started" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWorshiper;
