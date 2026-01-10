import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import OnboardingWorshiper from "./pages/OnboardingWorshiper";
import OnboardingLeader from "./pages/OnboardingLeader";
import Home from "./pages/Home";
import Leaders from "./pages/Leaders";
import LeaderProfile from "./pages/LeaderProfile";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding/worshiper" element={<OnboardingWorshiper />} />
          <Route path="/onboarding/leader" element={<OnboardingLeader />} />
          <Route path="/home" element={<Home />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/leader/:id" element={<LeaderProfile />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
