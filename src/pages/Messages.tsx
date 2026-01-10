import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { mockLeaders } from "@/data/mockData";

interface Conversation {
  id: string;
  leader: typeof mockLeaders[0];
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    leader: mockLeaders[0],
    lastMessage: "Shabbat Shalom! Thank you for your kind words.",
    timestamp: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    leader: mockLeaders[2],
    lastMessage: "Jazak Allah Khair for reaching out.",
    timestamp: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    leader: mockLeaders[5],
    lastMessage: "Looking forward to our discussion on Kabbalah.",
    timestamp: "Yesterday",
    unread: 1,
  },
];

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.leader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-foreground">Messages</h1>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search conversations..." 
              className="pl-10 bg-secondary border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>
      
      {/* Conversations List */}
      <main>
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conv, index) => (
            <button
              key={conv.id}
              onClick={() => navigate(`/chat/${conv.leader.id}`)}
              className="w-full flex items-center gap-3 p-4 hover:bg-secondary transition-colors border-b border-border text-left animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={conv.leader.avatar} alt={conv.leader.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {conv.leader.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {conv.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground truncate">{conv.leader.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.timestamp}</span>
                </div>
                <p className={`text-sm truncate mt-0.5 ${conv.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {conv.lastMessage}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Send size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">No messages yet</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Start a conversation with a leader you follow
            </p>
            <Button 
              variant="default" 
              className="mt-4"
              onClick={() => navigate("/leaders")}
            >
              Find Leaders
            </Button>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Messages;
