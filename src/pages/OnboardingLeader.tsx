import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { faithOptions } from "@/data/mockData";

const OnboardingLeader: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    faith: "",
    bio: "",
  });

  const handleFaithSelect = (faith: string) => {
    setFormData({ ...formData, faith });
  };

  const handleContinue = () => {
    if (step === 1 && formData.name) {
      setStep(2);
    } else if (step === 2 && formData.faith) {
      setStep(3);
    } else if (step === 3) {
      // Save to localStorage and navigate to home
      localStorage.setItem("faithconnect_profile", JSON.stringify(formData));
      navigate("/home");
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/auth?role=leader");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <button 
          onClick={handleBack}
          className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Leader Profile Setup</h1>
          <p className="text-xs text-muted-foreground">Step {step} of 3</p>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 bg-secondary">
        <div 
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
      
      <div className="p-6 animate-fade-in" key={step}>
        {step === 1 && (
          <div className="space-y-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-accent/20">
                  <AvatarFallback className="bg-accent/10 text-accent text-2xl font-semibold">
                    {formData.name ? formData.name[0].toUpperCase() : "?"}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 gradient-brand text-primary-foreground rounded-full shadow-button">
                  <Camera size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Add your profile photo</p>
            </div>
            
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Your Name / Title</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Rabbi Abraham Cohen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Select Your Faith</h2>
              <p className="text-muted-foreground mt-2">This helps worshipers find you</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {faithOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFaithSelect(option.value)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.faith === option.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30 hover:bg-secondary"
                  }`}
                >
                  <span className="font-medium text-foreground">{option.label}</span>
                  {formData.faith === option.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 gradient-brand rounded-full flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">Tell Us About Yourself</h2>
              <p className="text-muted-foreground mt-2">Help worshipers know you better</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                placeholder="Share your journey, teachings, and what inspires you..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="min-h-[150px] resize-none"
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.bio.length}/300
              </p>
            </div>
          </div>
        )}
        
        {/* Continue Button */}
        <div className="mt-8">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={handleContinue}
            disabled={
              (step === 1 && !formData.name) || 
              (step === 2 && !formData.faith)
            }
          >
            {step === 3 ? "Complete Setup" : "Continue"}
          </Button>
          
          {step === 3 && (
            <Button 
              variant="ghost" 
              className="w-full mt-2"
              onClick={() => navigate("/home")}
            >
              Skip for now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLeader;
