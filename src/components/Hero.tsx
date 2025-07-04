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
    <section className="py-10 md:py-24 bg-gradient-to-br from-black via-purple-950 to-black text-white">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-4 md:mb-6">
              <Music size={32} className="text-purple-400 mr-2 md:mr-3" />
              <h2 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                BotifyHost
              </h2>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 md:mb-4 leading-tight md:leading-tight">
              Launch Your Telegram Music Bot in 60 Seconds
              <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl mt-2 md:mt-3 text-purple-300 font-medium">
                Audio &amp; Video Live Streaming Supported
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-200 mb-1 md:mb-2 font-semibold">
              No Coding, No VPS, No Hassle!
            </p>
            <p className="mt-3 md:mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-xl">
              Play songs <span className="font-semibold text-purple-300">live</span> from <span className="font-semibold text-purple-300">YouTube</span>, <span className="font-semibold text-purple-300">Spotify</span>, and more. Your Telegram music bot supports <span className="font-semibold text-blue-300">HD audio &amp; video streaming</span> direct in your group.<br /> Just ₹599/month — your bot will be fully installed, hosted, and running 24/7 with all music features ready to use.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 md:mt-8 space-y-3 md:space-y-4 bg-black/50 p-4 md:p-6 rounded-xl backdrop-blur-sm border border-purple-500/10">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    emailError && "border-red-500",
                    "bg-black/50 border-white/10 text-white placeholder:text-gray-400 text-sm md:text-base py-2 md:py-3"
                  )}
                  aria-label="Email"
                  aria-invalid={!!emailError}
                  aria-describedby="email-error"
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-xs md:text-sm text-red-400" role="alert">
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
                  className={cn(
                    botTokenError && "border-red-500",
                    "bg-black/50 border-white/10 text-white placeholder:text-gray-400 text-sm md:text-base py-2 md:py-3"
                  )}
                  aria-label="Bot token"
                  aria-invalid={!!botTokenError}
                  aria-describedby="token-error"
                />
                {botTokenError && (
                  <p id="token-error" className="mt-1 text-xs md:text-sm text-red-400" role="alert">
                    {botTokenError}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full text-sm md:text-base py-2 md:py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Get Started for ₹599/month"}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-2">
                No setup fee. Cancel anytime.
              </p>
            </form>
          </div>
          {/* Illustration and streaming badge */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="flex flex-col items-center">
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 280 280"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 h-40 sm:w-64 sm:h-64 md:w-full md:h-full max-w-md"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="botFaceGradient" cx="0.5" cy="0.4" r="0.6">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="70%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </radialGradient>
                    <linearGradient id="headphoneGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="antennaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <circle cx="140" cy="140" r="90" fill="url(#botFaceGradient)" />
                  <rect x="137" y="45" width="6" height="18" rx="3" fill="url(#antennaGradient)" />
                  <circle cx="140" cy="42" r="5" fill="#60a5fa" />
                  <g>
                    <rect x="38" y="120" width="22" height="44" rx="11" fill="url(#headphoneGradient)" />
                    <rect x="220" y="120" width="22" height="44" rx="11" fill="url(#headphoneGradient)" />
                    <path
                      d="M49 128 Q140 55 231 128"
                      stroke="url(#headphoneGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </g>
                  <circle cx="120" cy="125" r="6" fill="#1e1b4b" />
                  <circle cx="160" cy="125" r="6" fill="#1e1b4b" />
                  <circle cx="122" cy="123" r="2" fill="#60a5fa" />
                  <circle cx="162" cy="123" r="2" fill="#60a5fa" />
                  <path d="M120 160 Q140 175 160 160" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
                <div className="mt-3 md:mt-6 w-full flex justify-center animate-fade-in">
                  <span
                    className="
                      inline-flex items-center justify-center
                      rounded-full select-none
                      bg-gradient-to-r from-purple-700 to-blue-500
                      text-xs sm:text-sm md:text-base font-medium
                      px-3 py-1 md:px-4 md:py-1
                      text-white
                      border border-white/10
                      shadow-none
                      transition-all
                    "
                    style={{
                      letterSpacing: "0.01em",
                    }}
                  >
                    Live Audio &amp; Video Streaming!
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
