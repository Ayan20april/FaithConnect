import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, MoreHorizontal, Grid, Film, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/PostCard";
import { mockLeaders, mockPosts } from "@/data/mockData";

const LeaderProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Find the leader by ID (fallback to first leader for demo)
  const leader = mockLeaders.find(l => l.id === id) || mockLeaders[0];
  const leaderPosts = mockPosts.filter(p => p.leader.id === leader.id);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  React.useEffect(() => {
    setIsFollowing(leader.isFollowing);
  }, [leader]);

  return (
    <div className="mobile-container min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-semibold text-lg text-foreground truncate max-w-[60%]">
            {leader.name}
          </h1>
          <Button variant="ghost" size="iconSm">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </header>
      
      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 ring-4 ring-primary/20">
            <AvatarImage src={leader.avatar} alt={leader.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
              {leader.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="mt-4 text-xl font-bold text-foreground">{leader.name}</h2>
          <p className="text-sm text-muted-foreground">{leader.faith}</p>
          
          <p className="mt-3 text-sm text-foreground leading-relaxed max-w-xs">
            {leader.bio}
          </p>
          
          {/* Stats */}
          <div className="flex items-center gap-8 mt-6">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{leaderPosts.length}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{formatNumber(leader.followers)}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 mt-6 w-full max-w-xs">
            <Button
              variant={isFollowing ? "secondary" : "default"}
              className="flex-1"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => navigate(`/messages/${leader.id}`)}
            >
              <MessageCircle size={18} />
              Message
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger 
            value="posts" 
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            <Grid size={20} />
          </TabsTrigger>
          <TabsTrigger 
            value="reels" 
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
          >
            <Film size={20} />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-0">
          {leaderPosts.length > 0 ? (
            leaderPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No posts yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reels" className="mt-0">
          <div className="py-16 text-center">
            <Film size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No reels yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderProfile;
