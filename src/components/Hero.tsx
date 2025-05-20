
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
        description: "Your bot has been successfully deployed.",
        duration: 5000,
      });
      // Reset form
      setEmail("");
      setBotToken("");
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Host Your Telegram Bots with Ease
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Deploy, manage, and scale your Telegram bots without any technical hassle. 
              Get started in less than 5 minutes with our simple setup process.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(emailError && "border-red-500")}
                  aria-label="Email"
                  aria-invalid={!!emailError}
                  aria-describedby="email-error"
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
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
                  className={cn(botTokenError && "border-red-500")}
                  aria-label="Bot token"
                  aria-invalid={!!botTokenError}
                  aria-describedby="token-error"
                />
                {botTokenError && (
                  <p id="token-error" className="mt-1 text-sm text-red-500" role="alert">
                    {botTokenError}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Deploying..." : "Deploy Bot Now"}
              </Button>
            </form>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="https://api.dicebear.com/6.x/identicon/svg?seed=botbuddy&backgroundColor=0088cc"
              alt="Telegram Bot Illustration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
