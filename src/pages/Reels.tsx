import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { mockLeaders } from "@/data/mockData";

interface Reel {
  id: string;
  leader: typeof mockLeaders[0];
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockReels: Reel[] = [
  {
    id: "1",
    leader: mockLeaders[0],
    videoUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=700&fit=crop",
    caption: "Shabbat Shalom! Today's message is about finding peace in the midst of chaos. 🕊️",
    likes: 12400,
    comments: 234,
    isLiked: false,
  },
  {
    id: "2",
    leader: mockLeaders[1],
    videoUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&h=700&fit=crop",
    caption: "Remember: You are never alone on this journey. God walks with you every step. 🙏",
    likes: 34500,
    comments: 567,
    isLiked: true,
  },
  {
    id: "3",
    leader: mockLeaders[2],
    videoUrl: "",
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&h=700&fit=crop",
    caption: "The beauty of faith lies in its ability to transform our darkest moments into light. ✨",
    likes: 8900,
    comments: 123,
    isLiked: false,
  },
];

const Reels: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentReel = mockReels[currentIndex];

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "down" && currentIndex < mockReels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="mobile-container h-screen bg-foreground overflow-hidden pb-16">
      {/* Reels Container */}
      <div 
        ref={containerRef}
        className="h-full relative"
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          const handleTouchEnd = (endEvent: TouchEvent) => {
            const endY = endEvent.changedTouches[0].clientY;
            const diff = startY - endY;
            if (Math.abs(diff) > 50) {
              handleScroll(diff > 0 ? "down" : "up");
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        {/* Current Reel */}
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{
            backgroundImage: `url(${currentReel.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-foreground/80" />
          
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between safe-area-top z-10">
            <h1 className="text-primary-foreground font-bold text-lg">Reels</h1>
            <Button 
              variant="ghost" 
              size="iconSm"
              className="text-primary-foreground"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
          </div>
          
          {/* Play/Pause Overlay */}
          <button 
            className="absolute inset-0 flex items-center justify-center z-0"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <div className="w-16 h-16 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-fade-in">
                <Play size={32} className="text-primary-foreground ml-1" />
              </div>
            )}
          </button>
          
          {/* Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
            <button className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-full transition-colors ${currentReel.isLiked ? "text-accent" : "text-primary-foreground"}`}>
                <Heart size={28} className={currentReel.isLiked ? "fill-current" : ""} />
              </div>
              <span className="text-xs text-primary-foreground font-medium">
                {formatNumber(currentReel.likes)}
              </span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <div className="p-2 text-primary-foreground">
                <MessageCircle size={28} />
              </div>
              <span className="text-xs text-primary-foreground font-medium">
                {formatNumber(currentReel.comments)}
              </span>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <div className="p-2 text-primary-foreground">
                <Bookmark size={28} />
              </div>
            </button>
            
            <button className="flex flex-col items-center gap-1">
              <div className="p-2 text-primary-foreground">
                <Share2 size={28} />
              </div>
            </button>
          </div>
          
          {/* Bottom Info */}
          <div className="absolute bottom-20 left-0 right-16 p-4 z-10">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10 ring-2 ring-primary-foreground">
                <AvatarImage src={currentReel.leader.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentReel.leader.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-primary-foreground text-sm">
                  {currentReel.leader.name}
                </p>
                <p className="text-xs text-primary-foreground/70">
                  {currentReel.leader.faith}
                </p>
              </div>
              <Button variant="pillOutline" size="sm" className="ml-auto text-primary-foreground border-primary-foreground">
                Follow
              </Button>
            </div>
            <p className="text-sm text-primary-foreground leading-relaxed">
              {currentReel.caption}
            </p>
          </div>
          
          {/* Progress Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {mockReels.map((_, index) => (
              <div 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary-foreground w-4" 
                    : "bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Reels;
