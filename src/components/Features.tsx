
import { 
  Music, 
  BarChart, 
  Clock, 
  Shield, 
  Zap, 
  Code,
  RefreshCw
} from "lucide-react";

const features = [
  {
    icon: <Music className="h-8 w-8 text-primary" />,
    title: "24/7 Online Music Bot",
    description:
      "Your Telegram music bot stays online round-the-clock, ready to play music whenever your group needs it.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "All Commands Preloaded",
    description:
      "All popular music commands are pre-configured. Just start using your bot with zero setup.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Auto-Restart On Crash",
    description:
      "Our system automatically detects and resolves any issues, ensuring your bot is always available to your users.",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Self-Healing System",
    description:
      "If something happens and someone has a problem with their bot, our system will automatically fix that problem without any manual intervention.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Personal Dashboard",
    description:
      "Monitor your bot's performance and control settings through your own personal dashboard.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Setup",
    description:
      "Your music bot is deployed instantly after payment. No technical knowledge required.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "No VPS Needed",
    description:
      "We handle all the hosting and technical details so you don't need to rent or manage a VPS.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What You Get</h2>
          <p className="text-lg text-muted-foreground mb-12">
            BotifyHost provides everything you need to run a successful Telegram music bot without any technical hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow 
                         flex flex-col items-center text-center border border-purple-500/10"
            >
              <div className="p-3 rounded-full bg-purple-500/10 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
