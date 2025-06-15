
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Music } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [botToken, setBotToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [botTokenError, setBotTokenError] = useState("");

  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!re.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateBotToken = (token: string) => {
    if (!token) {
      setBotTokenError("Bot token is required");
      return false;
    } else if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
      setBotTokenError("Invalid bot token format");
      return false;
    }
    setBotTokenError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isTokenValid = validateBotToken(botToken);
    
    if (!isEmailValid || !isTokenValid) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Your music bot setup is processing.",
        duration: 5000,
      });
      // Reset form
      setEmail("");
      setBotToken("");
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-6">
              <Music size={40} className="text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                BotifyHost
              </h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Launch Your Telegram Music Bot in 60 Seconds <span className="block text-xl md:text-2xl lg:text-3xl mt-3 text-purple-300 font-medium">Audio &amp; Video Live Streaming Supported</span>
            </h1>
            
            <p className="text-xl text-purple-200 mb-2 font-semibold">
              No Coding, No VPS, No Hassle!
            </p>
            
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Play songs <span className="font-semibold text-purple-300">live</span> from <span className="font-semibold text-purple-300">YouTube</span>, <span className="font-semibold text-purple-300">Spotify</span>, and more. Your Telegram music bot supports <span className="font-semibold text-blue-300">HD audio &amp; video streaming</span> direct in your group.<br /> Just ₹599/month — your bot will be fully installed, hosted, and running 24/7 with all music features ready to use.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-black/50 p-6 rounded-xl backdrop-blur-sm border border-purple-500/10">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(emailError && "border-red-500", "bg-black/50 border-white/10 text-white placeholder:text-gray-400")}
                  aria-label="Email"
                  aria-invalid={!!emailError}
                  aria-describedby="email-error"
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {emailError}
                  </p>
                )}
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Enter your Telegram bot token"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className={cn(botTokenError && "border-red-500", "bg-black/50 border-white/10 text-white placeholder:text-gray-400")}
                  aria-label="Bot token"
                  aria-invalid={!!botTokenError}
                  aria-describedby="token-error"
                />
                {botTokenError && (
                  <p id="token-error" className="mt-1 text-sm text-red-400" role="alert">
                    {botTokenError}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Get Started for ₹599/month"}
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-2">
                No setup fee. Cancel anytime.
              </p>
            </form>
          </div>
          
          {/* IMAGE AND BADGE */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="flex flex-col items-center">
                {/* Updated Music Bot SVG - matching hero background colors */}
                <svg
                  width="280"
                  height="280"
                  viewBox="0 0 280 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-md rounded-full shadow-2xl"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="botGradient" cx="0.5" cy="0.3" r="0.7">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#7c3aed" />
                      <stop offset="100%" stopColor="#5b21b6" />
                    </radialGradient>
                    <linearGradient id="headphoneGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Main bot head - perfect circle */}
                  <circle cx="140" cy="140" r="85" fill="url(#botGradient)" />
                  
                  {/* Headphones */}
                  <g>
                    {/* Left headphone */}
                    <rect x="45" y="115" width="18" height="50" rx="9" fill="url(#headphoneGradient)" />
                    {/* Right headphone */}
                    <rect x="217" y="115" width="18" height="50" rx="9" fill="url(#headphoneGradient)" />
                    {/* Headphone band */}
                    <path d="M63 130 Q70 120 140 120 Q210 120 217 130" stroke="url(#headphoneGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </g>
                  
                  {/* Bot eyes */}
                  <circle cx="115" cy="125" r="8" fill="#1e1b4b" />
                  <circle cx="165" cy="125" r="8" fill="#1e1b4b" />
                  <circle cx="115" cy="125" r="4" fill="#60a5fa" />
                  <circle cx="165" cy="125" r="4" fill="#60a5fa" />
                  
                  {/* Smile */}
                  <path d="M115 165 Q140 180 165 165" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Antenna */}
                  <rect x="137" y="60" width="6" height="25" rx="3" fill="url(#headphoneGradient)" />
                  <circle cx="140" cy="55" r="6" fill="#60a5fa" />
                </svg>
                
                {/* Badge */}
                <div className="mt-6 select-none animate-fade-in">
                  <span
                    className="px-8 py-3 rounded-full shadow-lg text-lg font-semibold border-2"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #3730a3 100%)",
                      color: "#f3f4f6",
                      boxShadow: "0 8px 32px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)",
                      borderColor: "#8b5cf6",
                    }}
                  >
                    Live Audio & Video Streaming!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
