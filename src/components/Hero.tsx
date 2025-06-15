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
                {/* New SVG illustration: Music Bot w/ Headphones and Modern Glow */}
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 220 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-md rounded-xl shadow-2xl border-4 border-purple-500/30 bg-white"
                  style={{ background: "linear-gradient(135deg,#ede9fe 60%,#dbebff 100%)" }}
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="botGlow" cx="0.6" cy="0.35" r="0.8">
                      <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.13"/>
                    </radialGradient>
                    <linearGradient id="botGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient id="headphonesGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#60a5fa"/>
                    </linearGradient>
                    <linearGradient id="noteGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fef9c3"/>
                      <stop offset="100%" stopColor="#a78bfa"/>
                    </linearGradient>
                    <filter id="botShadow" x="-40%" y="-20%" width="180%" height="180%">
                      <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#a78bfa" floodOpacity="0.19"/>
                    </filter>
                  </defs>
                  {/* Background */}
                  <rect width="220" height="220" rx="32" fill="url(#botGlow)" />
                  {/* Main bot head */}
                  <ellipse cx="110" cy="110" rx="65" ry="60" fill="url(#botGradient)" filter="url(#botShadow)" />
                  {/* Face highlight */}
                  <ellipse cx="110" cy="110" rx="48" ry="36" fill="white" fillOpacity="0.07" />
                  {/* Headphones */}
                  <g>
                    <rect x="38" y="90" width="16" height="52" rx="8" fill="url(#headphonesGradient)" opacity="0.58"/>
                    <rect x="166" y="90" width="16" height="52" rx="8" fill="url(#headphonesGradient)" opacity="0.58"/>
                    <path d="M54 105 Q40 110 54 145" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M166 105 Q180 110 166 145" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </g>
                  {/* Bot eyes */}
                  <ellipse cx="90" cy="128" rx="10" ry="11" fill="#fff" />
                  <ellipse cx="130" cy="128" rx="10" ry="11" fill="#fff" />
                  <ellipse cx="90" cy="128" rx="5.2" ry="5.8" fill="#a78bfa" />
                  <ellipse cx="130" cy="128" rx="5.3" ry="5.7" fill="#a78bfa" />
                  {/* Smile */}
                  <path d="M96 151 Q110 163 124 151" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                  {/* Music note (right side) */}
                  <g>
                    <rect x="152" y="65" width="5.5" height="28" rx="2.7" fill="url(#noteGradient)" />
                    <ellipse cx="154.7" cy="63" rx="8" ry="7.5" fill="url(#noteGradient)" stroke="#a78bfa" strokeWidth="1.4" />
                    <ellipse cx="157" cy="97" rx="7" ry="4.5" fill="url(#noteGradient)" opacity="0.52" />
                  </g>
                  {/* Subtle waves/audio signals */}
                  <path d="M60 190 Q110 210 160 190" stroke="#a78bfa" strokeWidth="6" fill="none" opacity="0.21" />
                  <path d="M45 203 Q110 222 175 203" stroke="#6366f1" strokeWidth="3" fill="none" opacity="0.13" />
                  {/* Ear sparkles */}
                  <circle cx="52" cy="142" r="4" fill="#a78bfa" opacity="0.8" />
                  <circle cx="176" cy="142" r="3.5" fill="#60a5fa" opacity="0.7" />
                  <circle cx="107" cy="64" r="7" fill="#fef9c3" opacity="0.15"/>
                  {/* Little music note left side */}
                  <g>
                    <rect x="62" y="70" width="3" height="13" rx="1.3" fill="#60a5fa" />
                    <ellipse cx="63.5" cy="70" rx="4.2" ry="3.5" fill="#6366f1" />
                  </g>
                </svg>
                {/* Badge remains the same */}
                <div className="mt-3 select-none animate-fade-in drop-shadow-lg">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg text-base font-semibold border-2 border-white/10 backdrop-blur-sm flex items-center gap-2">
                    <span className="inline-block">
                      <svg width="18" height="18" fill="none" aria-hidden="true" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="9" fill="#a78bfa" />
                        <path d="M8 5v6a3 3 0 0 0 6 0V6.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                        <ellipse cx="15.7" cy="8.3" rx="1.6" ry="1.3" fill="#fff" opacity="0.8"/>
                        <ellipse cx="7.2" cy="15.6" rx="1.3" ry="1" fill="#fff" opacity="0.5"/>
                        <ellipse cx="5" cy="8" rx="1" ry="0.7" fill="#fff" opacity="0.45"/>
                      </svg>
                    </span>
                    Live Audio &amp; Video Streaming!
                  </span>
                </div>
                {/* Decorative waves under badge */}
                <svg
                  width="180"
                  height="32"
                  viewBox="0 0 180 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-2 w-44"
                  aria-hidden="true"
                >
                  <path
                    d="M0,20 Q30,32 60,20 T120,20 T180,20"
                    stroke="#a78bfa"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M0,28 Q30,40 60,28 T120,28 T180,28"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
