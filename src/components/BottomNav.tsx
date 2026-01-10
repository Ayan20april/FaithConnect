import React from "react";
import { Home, Users, Film, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  label: string;
  path: string;
}

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { 
      icon: <Home size={22} strokeWidth={1.5} />, 
      activeIcon: <Home size={22} strokeWidth={2.5} />,
      label: "Home", 
      path: "/home" 
    },
    { 
      icon: <Users size={22} strokeWidth={1.5} />, 
      activeIcon: <Users size={22} strokeWidth={2.5} />,
      label: "Leaders", 
      path: "/leaders" 
    },
    { 
      icon: <Film size={22} strokeWidth={1.5} />, 
      activeIcon: <Film size={22} strokeWidth={2.5} />,
      label: "Reels", 
      path: "/reels" 
    },
    { 
      icon: <MessageCircle size={22} strokeWidth={1.5} />, 
      activeIcon: <MessageCircle size={22} strokeWidth={2.5} />,
      label: "Messages", 
      path: "/messages" 
    },
    { 
      icon: <User size={22} strokeWidth={1.5} />, 
      activeIcon: <User size={22} strokeWidth={2.5} />,
      label: "Profile", 
      path: "/profile" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/home" && location.pathname === "/");
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "text-accent" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full animate-scale-in" />
              )}
              
              <div className={`transition-all duration-300 ${isActive ? "scale-110" : ""}`}>
                {isActive ? item.activeIcon : item.icon}
              </div>
              <span className={`text-[10px] font-medium transition-all ${isActive ? "text-accent" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
