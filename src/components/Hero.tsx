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
                
                {/* Upgraded SVG illustration */}
                <svg
                  viewBox="0 0 200 200"
                  width="200"
                  height="200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-md rounded-xl shadow-2xl border-4 border-purple-500/30 bg-white"
                  style={{ background: "linear-gradient(135deg,#ede9fe 60%,#dbebff 100%)" }}
                >
                  <defs>
                    <radialGradient id="faceGlow" cx="70%" cy="40%" r="70%">
                      <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.8" />
                      <stop offset="90%" stopColor="#ede9fe" stopOpacity="0.1" />
                    </radialGradient>
                    <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="10%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Background */}
                  <rect width="200" height="200" rx="26" fill="url(#faceGlow)" />
                  {/* Main Music Bot Shape */}
                  <g transform="translate(30, 40)">
                    <path
                      d="M70 0C95 0 110 15 110 40V60C110 70 105 80 95 85L100 90V110H80V100C75 105 65 110 50 110C25 110 10 95 10 70V40C10 15 25 0 50 0H70Z"
                      fill="url(#visor)"
                      filter="url(#softGlow)"
                    />
                    {/* Eyes */}
                    <ellipse cx="60" cy="60" rx="6" ry="6" fill="white" opacity="0.95" />
                    <ellipse cx="90" cy="62" rx="5.2" ry="6" fill="#fff" opacity="0.95" />
                    {/* Smile */}
                    <path d="M65 80C70 85 80 85 85 80" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Music Note */}
                    <g filter="url(#softGlow)">
                      <rect x="68" y="-19" width="4" height="20" rx="2" fill="#7B3FE4" />
                      <circle cx="70" cy="-20" r="6" fill="#a78bfa" stroke="#7B3FE4" strokeWidth="1" />
                    </g>
                    {/* Side flair (audio waves) */}
                    <g>
                      <ellipse cx="110" cy="110" rx="8" ry="7" fill="#7B3FE4" opacity="0.7" />
                      <ellipse cx="130" cy="100" rx="6.7" ry="7" fill="#a78bfa" opacity="0.8" />
                      <ellipse cx="98" cy="105" rx="2" ry="4" fill="#a5b4fc" opacity="0.55" />
                    </g>
                    {/* Additional face light */}
                    <ellipse cx="80" cy="22" rx="42" ry="16" fill="#fff" fillOpacity="0.11" />
                  </g>
                  {/* Decorative sound waves */}
                  <path
                    d="M24 185 Q 60 175 100 190 Q 140 206 176 185"
                    stroke="#a78bfa"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M20 198 Q 65 192 100 200 Q 135 207 180 194"
                    stroke="#6366f1"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.18"
                  />
                </svg>
                {/* Badge remains the same */}
                <div className="mt-3 select-none animate-fade-in drop-shadow-lg">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg text-base font-semibold border-2 border-white/10 backdrop-blur-sm">
                    Live Audio &amp; Video Streaming!
                  </span>
                </div>
                {/* Decorative waves under badge remain the same */}
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
