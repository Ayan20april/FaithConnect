import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface Leader {
  id: string;
  name: string;
  avatar: string;
  faith: string;
  bio: string;
  followers: number;
  isFollowing: boolean;
}

interface LeaderCardProps {
  leader: Leader;
  onFollow?: (leaderId: string) => void;
  onMessage?: (leaderId: string) => void;
  onClick?: (leaderId: string) => void;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({
  leader,
  onFollow,
  onMessage,
  onClick,
}) => {
  const [isFollowing, setIsFollowing] = useState(leader.isFollowing);
  const [followers, setFollowers] = useState(leader.followers);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? followers - 1 : followers + 1);
    onFollow?.(leader.id);
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMessage?.(leader.id);
  };

  const formatFollowers = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div 
      className="bg-card rounded-xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={() => onClick?.(leader.id)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-14 h-14 ring-2 ring-primary/20">
          <AvatarImage src={leader.avatar} alt={leader.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
            {leader.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{leader.name}</h3>
              <p className="text-xs text-muted-foreground">{leader.faith}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatFollowers(followers)} followers
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {leader.bio}
          </p>
          
          <div className="flex items-center gap-2 mt-3">
            <Button
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              onClick={handleFollow}
              className="flex-1"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            
            {isFollowing && (
              <Button
                variant="outline"
                size="iconSm"
                onClick={handleMessage}
              >
                <MessageCircle size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
