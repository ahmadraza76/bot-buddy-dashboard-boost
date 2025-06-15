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
                {/* Updated Music Bot SVG illustration: ALL white/cream/lavender (and their shades) colors removed */}
                <svg
                  width="220"
                  height="220"
                  viewBox="0 0 220 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-md rounded-xl shadow-2xl border-4 border-purple-500/30 bg-transparent"
                  style={{ background: "linear-gradient(135deg,#1e1634 60%,#1a2c40 100%)" }}
                  aria-hidden="true"
                >
                  <defs>
                    {/* Remove botGlow, botGradient, headphonesGradient, noteGradient, etc with white/cream/lavender */}
                    <linearGradient id="botGradientDark" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6d28d9" />
                      <stop offset="100%" stopColor="#312e81" />
                    </linearGradient>
                  </defs>
                  {/* Main bot head */}
                  <ellipse cx="110" cy="110" rx="65" ry="60" fill="url(#botGradientDark)" />
                  {/* --- Headphones --- */}
                  <g>
                    <rect x="38" y="90" width="16" height="52" rx="8" fill="#3730a3" opacity="0.67"/>
                    <rect x="166" y="90" width="16" height="52" rx="8" fill="#3730a3" opacity="0.67"/>
                    <path d="M54 105 Q40 110 54 145" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M166 105 Q180 110 166 145" stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round" fill="none" />
                  </g>
                  {/* Bot eyes */}
                  <ellipse cx="90" cy="128" rx="10" ry="11" fill="#312e81" />
                  <ellipse cx="130" cy="128" rx="10" ry="11" fill="#312e81" />
                  <ellipse cx="90" cy="128" rx="5.2" ry="5.8" fill="#8b5cf6" />
                  <ellipse cx="130" cy="128" rx="5.3" ry="5.7" fill="#6366f1" />
                  {/* Smile */}
                  <path d="M96 151 Q110 163 124 151" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                  {/* Music note (right side) -- no yellow/cream */}
                  <g>
                    <rect x="152" y="65" width="5.5" height="28" rx="2.7" fill="#60a5fa" />
                    <ellipse cx="154.7" cy="63" rx="8" ry="7.5" fill="#312e81" stroke="#6366f1" strokeWidth="1.4" />
                    <ellipse cx="157" cy="97" rx="7" ry="4.5" fill="#6366f1" opacity="0.32" />
                  </g>
                  {/* Audio waves, all darker */}
                  <path d="M60 190 Q110 210 160 190" stroke="#8b5cf6" strokeWidth="6" fill="none" opacity="0.17" />
                  <path d="M45 203 Q110 222 175 203" stroke="#312e81" strokeWidth="3" fill="none" opacity="0.15" />
                  {/* NO sparkles/cream/yellow/light ellipses */}
                  {/* Left mini music note, no lavender nor cream */}
                  <g>
                    <rect x="62" y="70" width="3" height="13" rx="1.3" fill="#3730a3" />
                    <ellipse cx="63.5" cy="70" rx="4.2" ry="3.5" fill="#4f46e5" />
                  </g>
                </svg>
                {/* Matching badge */}
                <div className="mt-3 select-none animate-fade-in drop-shadow-lg">
                  <span
                    className="px-6 py-2 rounded-full shadow-lg text-base font-semibold border border-purple-300 flex items-center gap-2"
                    style={{
                      background:
                        "linear-gradient(90deg, #24113a 0%, #491f7b 60%, #2f51a4 100%)",
                      color: "#ede9fe",
                      boxShadow:
                        "0 2px 14px 0 #a78bfa55, 0 1.5px 8px 1px #6366f170",
                      border: "1.5px solid #a78bfa",
                    }}
                  >
                    {/* Flat minimal headphones icon, no background shape */}
                    <svg width="26" height="26" aria-hidden="true" viewBox="0 0 32 32" fill="none">
                      {/* Red flat badge background behind icon—no white here, already correct */}
                      <rect x="2" y="2" width="22" height="22" rx="7" fill="#ea353a"/>
                      <path d="M10 17a6 6 0 0 1 12 0" stroke="#7c3aed" strokeWidth="2" fill="none"/>
                      <rect x="6" y="17" width="3.5" height="5" rx="1.3" fill="#7c3aed" />
                      <rect x="16.5" y="17" width="3.5" height="5" rx="1.3" fill="#6366f1" />
                      {/* Left wire */}
                      <rect x="12" y="13" width="1.1" height="5" rx="0.54" fill="#facc15" />
                      {/* Tip */}
                      <ellipse cx="12.6" cy="18.3" rx="1.1" ry="0.9" fill="#bb9300" />
                    </svg>
                    <span className="ml-1 font-semibold drop-shadow-sm">
                      Live Audio &amp; Video Streaming!
                    </span>
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
