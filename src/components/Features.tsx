
import { 
  Cpu, 
  BarChart, 
  Clock, 
  Shield, 
  Zap, 
  Code
} from "lucide-react";

const features = [
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Powerful Infrastructure",
    description:
      "Our state-of-the-art infrastructure ensures your bots run 24/7 without interruption.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Detailed Analytics",
    description:
      "Monitor your bot's performance with comprehensive analytics and insights.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "99.9% Uptime",
    description:
      "We guarantee 99.9% uptime for your bots, ensuring they're always available to your users.",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Enhanced Security",
    description:
      "Your bot's data is encrypted and protected with enterprise-grade security measures.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Instant Deployment",
    description:
      "Deploy your bots instantly with our easy-to-use platform. No technical knowledge required.",
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "API Integration",
    description:
      "Integrate with third-party services using our flexible API and webhooks.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <p className="text-lg text-muted-foreground mb-12">
            BotBuddy offers a comprehensive set of features to make hosting and managing your 
            Telegram bots as easy as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow 
                         flex flex-col items-center text-center"
            >
              <div className="p-3 rounded-full bg-primary/10 mb-6">
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
