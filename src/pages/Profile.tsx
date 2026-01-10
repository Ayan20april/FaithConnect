import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, ChevronRight, Edit2, Bell, Shield, HelpCircle, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Separator } from "@/components/ui/separator";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Get user data from localStorage (demo)
  const user = JSON.parse(localStorage.getItem("faithconnect_user") || '{"name": "Demo User", "email": "demo@example.com", "role": "worshiper"}');
  const profile = JSON.parse(localStorage.getItem("faithconnect_profile") || '{"faith": "judaism"}');
  
  const isLeader = user.role === "leader";

  const handleLogout = () => {
    localStorage.removeItem("faithconnect_user");
    localStorage.removeItem("faithconnect_profile");
    localStorage.removeItem("faithconnect_role");
    navigate("/");
  };

  const menuItems = [
    { icon: Edit2, label: "Edit Profile", onClick: () => {} },
    { icon: Bell, label: "Notifications", onClick: () => {} },
    { icon: Shield, label: "Privacy & Security", onClick: () => {} },
    { icon: HelpCircle, label: "Help & Support", onClick: () => {} },
  ];

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-background border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <Button variant="ghost" size="iconSm">
            <Settings size={20} />
          </Button>
        </div>
      </header>
      
      {/* Profile Section */}
      <div className="px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className={`w-24 h-24 ring-4 ${isLeader ? "ring-accent/20" : "ring-primary/20"}`}>
              <AvatarFallback className={`${isLeader ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"} text-2xl font-semibold`}>
                {user.name ? user.name[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <button className={`absolute bottom-0 right-0 p-2 rounded-full shadow-button ${isLeader ? "gradient-brand" : "bg-primary"} text-primary-foreground`}>
              <Edit2 size={14} />
            </button>
          </div>
          
          <h2 className="mt-4 text-xl font-bold text-foreground">{user.name || "Demo User"}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
            isLeader 
              ? "bg-accent/10 text-accent" 
              : "bg-primary/10 text-primary"
          }`}>
            {isLeader ? "Religious Leader" : "Worshiper"}
          </span>
          
          {profile.faith && (
            <p className="mt-2 text-sm text-muted-foreground capitalize">
              {profile.faith}
            </p>
          )}
        </div>
        
        {/* Stats for Leaders */}
        {isLeader && (
          <div className="flex items-center justify-center gap-8 mt-6 py-4 bg-secondary rounded-xl">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Reels</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Menu Items */}
      <div className="px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-muted-foreground" />
              <span className="font-medium text-foreground">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        ))}
        
        <Separator className="my-4" />
        
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-destructive/10 transition-colors text-destructive"
        >
          <LogOut size={20} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
      
      {/* Version */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        FaithConnect v1.0.0
      </p>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
