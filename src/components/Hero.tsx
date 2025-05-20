
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
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
              Launch Your Telegram Music Bot in 60 Seconds
            </h1>
            
            <p className="text-xl text-purple-200 mb-2 font-semibold">
              No Coding, No VPS, No Hassle!
            </p>
            
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Just ₹599/month — your bot will be fully installed, hosted, and running 24/7 with all music features ready to use.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(emailError && "border-red-500", "bg-white/20 border-white/10 text-white placeholder:text-gray-400")}
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
                  className={cn(botTokenError && "border-red-500", "bg-white/20 border-white/10 text-white placeholder:text-gray-400")}
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
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <img
                src="https://api.dicebear.com/6.x/shapes/svg?seed=music&backgroundColor=8B5CF6&shape1Color=60A5FA"
                alt="Music Bot Illustration"
                className="w-full max-w-md rounded-xl shadow-lg border-4 border-purple-500/30"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                Live in 60 seconds!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
