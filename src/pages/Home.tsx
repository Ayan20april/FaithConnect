import React, { useState } from "react";
import { Bell, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { BottomNav } from "@/components/BottomNav";
import FaithConnectLogo from "@/components/FaithConnectLogo";
import { mockPosts, leaderFollowingStatus } from "@/data/mockData";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"explore" | "following">("explore");
  const [showSearch, setShowSearch] = useState(false);

  const filteredPosts = activeTab === "following" 
    ? mockPosts.filter(post => leaderFollowingStatus[post.leader.id])
    : mockPosts;

  return (
    <div className="mobile-container min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <FaithConnectLogo size="sm" showText={false} />
          <h1 className="text-lg font-bold text-foreground">Home</h1>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="iconSm"
              onClick={() => setShowSearch(!showSearch)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="iconSm" className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse-soft" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search posts, leaders..." 
                className="pl-10 bg-secondary border-0 rounded-xl"
              />
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex px-4 gap-2 pb-4">
          <Button
            variant="tab"
            size="sm"
            data-active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
            className="flex-1 gap-1.5"
          >
            <Sparkles size={14} />
            Explore
          </Button>
          <Button
            variant="tab"
            size="sm"
            data-active={activeTab === "following"}
            onClick={() => setActiveTab("following")}
            className="flex-1"
          >
            Following
          </Button>
        </div>
      </header>
      
      {/* Feed */}
      <main>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div 
              key={post.id} 
              style={{ animationDelay: `${index * 0.08}s` }}
              className="animate-fade-in opacity-0"
            >
              <PostCard 
                post={post}
                onLeaderClick={(leaderId) => console.log("Navigate to leader:", leaderId)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-5">
              <Search size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">No posts yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              {activeTab === "following" 
                ? "Follow some leaders to see their posts here"
                : "Check back later for new content"
              }
            </p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Home;
