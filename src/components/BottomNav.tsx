import React from "react";
import { Home, Users, Film, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: "Home", path: "/home" },
    { icon: <Users size={24} />, label: "Leaders", path: "/leaders" },
    { icon: <Film size={24} />, label: "Reels", path: "/reels" },
    { icon: <MessageCircle size={24} />, label: "Messages", path: "/messages" },
    { icon: <User size={24} />, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/home" && location.pathname === "/");
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
