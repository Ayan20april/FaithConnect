import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
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
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <FaithConnectLogo size="sm" showText={false} />
          <h1 className="text-lg font-bold gradient-brand-text">Home Feed</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="iconSm"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="iconSm" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3 animate-fade-in">
            <Input 
              placeholder="Search posts, leaders..." 
              className="bg-secondary border-0"
            />
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex px-4 gap-2 pb-3">
          <Button
            variant="tab"
            size="sm"
            data-active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
            className="flex-1"
          >
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
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-fade-in opacity-0"
            >
              <PostCard 
                post={post}
                onLeaderClick={(leaderId) => console.log("Navigate to leader:", leaderId)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">No posts yet</h3>
            <p className="text-sm text-muted-foreground mt-2">
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
