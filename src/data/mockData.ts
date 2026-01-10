import { Leader } from "@/components/LeaderCard";
import { Post } from "@/components/PostCard";

export const mockLeaders: Leader[] = [
  {
    id: "1",
    name: "Rabbi Abraham Cohen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    faith: "Judaism",
    bio: "Senior Rabbi at Beth Shalom Synagogue. Teaching Torah wisdom for 25 years.",
    followers: 45800,
    isFollowing: true,
  },
  {
    id: "2",
    name: "Pastor David Rosenberg",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    faith: "Christianity",
    bio: "Lead Pastor at Grace Community Church. Passionate about spiritual growth and community.",
    followers: 128000,
    isFollowing: false,
  },
  {
    id: "3",
    name: "Imam Hassan Ali",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&h=150&fit=crop&crop=face",
    faith: "Islam",
    bio: "Head Imam at Al-Noor Mosque. Dedicated to interfaith dialogue and community service.",
    followers: 67200,
    isFollowing: true,
  },
  {
    id: "4",
    name: "Rabbi Samuel Katz",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    faith: "Judaism",
    bio: "Spiritual leader and author. Bringing ancient wisdom to modern life.",
    followers: 34500,
    isFollowing: false,
  },
  {
    id: "5",
    name: "Pastor Grace Thompson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    faith: "Christianity",
    bio: "Worship leader and pastor at New Life Church. Music and ministry combined.",
    followers: 89000,
    isFollowing: false,
  },
  {
    id: "6",
    name: "Rabbi Eliyahu Weiss",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    faith: "Judaism",
    bio: "Orthodox Rabbi specializing in Jewish mysticism and Kabbalah teachings.",
    followers: 23400,
    isFollowing: true,
  },
];

// Helper to get only the leader info needed for posts
const getPostLeader = (leader: Leader) => ({
  id: leader.id,
  name: leader.name,
  avatar: leader.avatar,
  faith: leader.faith,
});

export const mockPosts: Post[] = [
  {
    id: "1",
    leader: getPostLeader(mockLeaders[0]),
    content: "Today's Torah portion reminds us that every small act of kindness creates ripples throughout the universe. Let us be mindful of the impact we have on those around us. Shabbat Shalom! 🕊️",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
    likes: 1240,
    comments: 89,
    shares: 156,
    isLiked: false,
    isSaved: false,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    leader: getPostLeader(mockLeaders[1]),
    content: "Remember: Your faith is not defined by the absence of doubt, but by your choice to believe despite it. Keep pressing forward. 🙏",
    likes: 3400,
    comments: 234,
    shares: 567,
    isLiked: true,
    isSaved: true,
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    leader: getPostLeader(mockLeaders[2]),
    content: "In the Quran, we are reminded: 'And whoever puts their trust in Allah, then He will suffice him.' (65:3) Trust in the divine plan, even when the path seems unclear.",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&h=400&fit=crop",
    likes: 2100,
    comments: 156,
    shares: 289,
    isLiked: false,
    isSaved: false,
    createdAt: "8 hours ago",
  },
  {
    id: "4",
    leader: getPostLeader(mockLeaders[3]),
    content: "The Talmud teaches us that whoever saves a single life, saves an entire world. Let this inspire us to perform acts of chesed (loving-kindness) today and every day.",
    likes: 890,
    comments: 67,
    shares: 123,
    isLiked: false,
    isSaved: false,
    createdAt: "12 hours ago",
  },
  {
    id: "5",
    leader: getPostLeader(mockLeaders[4]),
    content: "Worship isn't just what we do on Sunday—it's how we live every moment. Let your life be a continuous song of praise! 🎵✨",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=600&h=400&fit=crop",
    likes: 4500,
    comments: 312,
    shares: 678,
    isLiked: true,
    isSaved: false,
    createdAt: "1 day ago",
  },
];

// Create a map for quick lookup of full leader data
export const leaderFollowingStatus: Record<string, boolean> = mockLeaders.reduce((acc, leader) => {
  acc[leader.id] = leader.isFollowing;
  return acc;
}, {} as Record<string, boolean>);

export const faithOptions = [
  { value: "christianity", label: "Christianity" },
  { value: "islam", label: "Islam" },
  { value: "judaism", label: "Judaism" },
  { value: "other", label: "Other" },
];
