import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeaderCard } from "@/components/LeaderCard";
import { BottomNav } from "@/components/BottomNav";
import { mockLeaders, faithOptions } from "@/data/mockData";

const Leaders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"explore" | "myLeaders">("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaith, setSelectedFaith] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeaders = mockLeaders.filter(leader => {
    const matchesTab = activeTab === "myLeaders" ? leader.isFollowing : true;
    const matchesSearch = leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         leader.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFaith = !selectedFaith || leader.faith.toLowerCase() === selectedFaith;
    return matchesTab && matchesSearch && matchesFaith;
  });

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-foreground">Religious Leaders</h1>
          <Button 
            variant="ghost" 
            size="iconSm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="flex px-4 gap-2">
          <Button
            variant="tab"
            size="sm"
            data-active={activeTab === "myLeaders"}
            onClick={() => setActiveTab("myLeaders")}
            className="flex-1"
          >
            My Leaders
          </Button>
          <Button
            variant="tab"
            size="sm"
            data-active={activeTab === "explore"}
            onClick={() => setActiveTab("explore")}
            className="flex-1"
          >
            Explore
          </Button>
        </div>
        
        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search leaders..." 
              className="pl-10 bg-secondary border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="px-4 pb-3 animate-fade-in">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Button
                variant={selectedFaith === "" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedFaith("")}
              >
                All Faiths
              </Button>
              {faithOptions.map((faith) => (
                <Button
                  key={faith.value}
                  variant={selectedFaith === faith.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedFaith(faith.value)}
                  className="whitespace-nowrap"
                >
                  {faith.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Leaders List */}
      <main className="p-4 space-y-3">
        {filteredLeaders.length > 0 ? (
          filteredLeaders.map((leader, index) => (
            <div 
              key={leader.id}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-fade-in opacity-0"
            >
              <LeaderCard 
                leader={leader}
                onClick={(id) => navigate(`/leader/${id}`)}
                onMessage={(id) => navigate(`/messages/${id}`)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">No leaders found</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {activeTab === "myLeaders" 
                ? "You haven't followed any leaders yet"
                : "Try adjusting your search or filters"
              }
            </p>
            {activeTab === "myLeaders" && (
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => setActiveTab("explore")}
              >
                Explore Leaders
              </Button>
            )}
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Leaders;
