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
              <img
                src="/brand-logo.png"
                alt="Music Bot Illustration"
                className="w-full max-w-md rounded-xl shadow-lg border-4 border-purple-500/30"
              />
              <div className="flex flex-col items-center">
                <div className="mt-3 select-none animate-fade-in drop-shadow-lg">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full shadow-lg text-base font-semibold border-2 border-white/10 backdrop-blur-sm">
                    Live Audio &amp; Video Streaming!
                  </span>
                </div>
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
