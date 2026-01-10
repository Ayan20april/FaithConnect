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
    <article className="bg-card border-b border-border animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          className="flex items-center gap-3"
          onClick={() => onLeaderClick?.(post.leader.id)}
        >
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src={post.leader.avatar} alt={post.leader.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {post.leader.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-semibold text-foreground text-sm">{post.leader.name}</p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
        </button>
        <Button variant="ghost" size="iconSm">
          <MoreHorizontal size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="relative">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button 
            className={`flex items-center gap-1.5 transition-all duration-200 active:scale-90 ${
              isLiked ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={handleLike}
          >
            <Heart 
              size={22} 
              className={isLiked ? "fill-current" : ""} 
            />
            <span className="text-sm font-medium">{formatNumber(likes)}</span>
          </button>
          
          <button 
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-90"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle size={22} />
            <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
          </button>
          
          <button 
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors active:scale-90"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 size={20} />
            <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
          </button>
        </div>
        
        <button 
          className={`transition-all duration-200 active:scale-90 ${
            isSaved ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={handleSave}
        >
          <Bookmark size={22} className={isSaved ? "fill-current" : ""} />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
