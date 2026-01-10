import React, { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";
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
      className="bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-border/50"
      onClick={() => onClick?.(leader.id)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-14 h-14 ring-2 ring-border">
          <AvatarImage src={leader.avatar} alt={leader.name} />
          <AvatarFallback className="bg-secondary text-foreground font-semibold text-lg">
            {leader.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-foreground truncate">{leader.name}</h3>
                {isFollowing && (
                  <CheckCircle size={14} className="text-accent flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{leader.faith}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap bg-secondary px-2 py-1 rounded-full">
              {formatFollowers(followers)} followers
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {leader.bio}
          </p>
          
          <div className="flex items-center gap-2 mt-4">
            <Button
              variant={isFollowing ? "secondary" : "gold"}
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
