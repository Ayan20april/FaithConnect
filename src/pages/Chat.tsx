import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockLeaders } from "@/data/mockData";

interface Message {
  id: string;
  text: string;
  sender: "user" | "leader";
  timestamp: string;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  
  const leader = mockLeaders.find(l => l.id === id) || mockLeaders[0];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Shalom! Thank you for reaching out. How can I help you today?",
      sender: "leader",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "Rabbi, I've been struggling with finding meaning in my daily prayers. Any guidance?",
      sender: "user",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      text: "That's a beautiful question. Prayer is not about perfection—it's about connection. Start small, focus on intention over words. Even a moment of genuine gratitude is powerful.",
      sender: "leader",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      text: "Thank you so much, Rabbi. That really helps! 🙏",
      sender: "user",
      timestamp: "10:36 AM",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="mobile-container h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-background border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-2 py-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate("/messages")}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <button 
              className="flex items-center gap-3"
              onClick={() => navigate(`/leader/${leader.id}`)}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={leader.avatar} alt={leader.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h2 className="font-semibold text-foreground text-sm">{leader.name}</h2>
                <p className="text-xs text-muted-foreground">Online now</p>
              </div>
            </button>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="iconSm">
              <MoreVertical size={20} />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      {/* Input */}
      <footer className="flex-shrink-0 border-t border-border p-4 bg-background safe-area-bottom">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-secondary border-0"
          />
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
