
import { 
  Music, 
  BarChart, 
  Clock, 
  Shield, 
  Zap, 
  Code,
  RefreshCw,
  Bot,
  FileText,
  MonitorCheck,
  Docker
} from "lucide-react";

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Python-Based Music Bot",
    description:
      "Powered by python-telegram-bot and PyTgCalls libraries, supporting YouTube, Spotify, and more audio/video streams.",
  },
  {
    icon: <Docker className="h-8 w-8 text-primary" />,
    title: "Docker Container Deployment",
    description:
      "Your Telegram music bot is automatically deployed in an isolated Docker container with all dependencies configured.",
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Automatic .env Generation",
    description:
      "Just provide your Bot Token and Sudo ID. We'll handle all the configuration file generation for you.",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Self-Healing System",
    description:
      "If something happens and your bot encounters an issue, our system will automatically fix the problem without manual intervention.",
  },
  {
    icon: <MonitorCheck className="h-8 w-8 text-primary" />,
    title: "24/7 Monitoring",
    description:
      "We constantly monitor your bot's health and performance, ensuring it stays online round-the-clock.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Personal Dashboard",
    description:
      "Monitor your bot's performance, view logs, and control settings through your own personal dashboard.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Setup",
    description:
      "Your music bot is deployed instantly after payment. No technical knowledge required.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "No Coding Needed",
    description:
      "We handle all the technical details so you don't need to write a single line of code or touch the terminal.",
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
