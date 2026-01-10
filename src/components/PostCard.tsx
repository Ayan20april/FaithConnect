import React, { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface Post {
  id: string;
  leader: {
    id: string;
    name: string;
    avatar: string;
    faith: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onLeaderClick?: (leaderId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onSave,
  onComment,
  onShare,
  onLeaderClick,
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <article className="bg-card border-b border-border transition-all duration-300 hover:bg-secondary/30">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          className="flex items-center gap-3 group"
          onClick={() => onLeaderClick?.(post.leader.id)}
        >
          <Avatar className="w-11 h-11 ring-2 ring-border group-hover:ring-accent transition-all duration-300">
            <AvatarImage src={post.leader.avatar} alt={post.leader.name} />
            <AvatarFallback className="bg-secondary text-foreground font-semibold">
              {post.leader.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{post.leader.name}</p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
        </button>
        <Button variant="ghost" size="iconSm" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-foreground text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-5">
          <button 
            className={`flex items-center gap-2 transition-all duration-300 active:scale-90 ${
              isLiked ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={handleLike}
          >
            <Heart 
              size={22} 
              className={`transition-all duration-300 ${isLiked ? "fill-current scale-110" : ""}`}
            />
            <span className="text-sm font-medium">{formatNumber(likes)}</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-90"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle size={22} />
            <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 active:scale-90"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 size={20} />
            <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
          </button>
        </div>
        
        <button 
          className={`transition-all duration-300 active:scale-90 ${
            isSaved ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={handleSave}
        >
          <Bookmark size={22} className={`transition-all duration-300 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
