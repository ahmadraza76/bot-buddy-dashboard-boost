
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹599",
    period: "/month",
    description: "Perfect for small to medium Telegram groups",
    features: [
      "1 Music Bot",
      "Unlimited songs",
      "Basic analytics",
      "Standard support",
      "99.5% Uptime",
      "YouTube & SoundCloud support",
    ],
    isPopular: false,
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "For larger groups with advanced needs",
    features: [
      "1 Music Bot",
      "Unlimited songs",
      "Advanced analytics",
      "Priority support",
      "99.9% Uptime",
      "YouTube, SoundCloud & Spotify",
      "Custom bot name & logo",
      "Custom commands",
    ],
    isPopular: true,
    buttonText: "Get Started",
  },
  {
    name: "Enterprise",
    price: "₹2,499",
    period: "/month",
    description: "For professional music channels & large communities",
    features: [
      "3 Music Bots",
      "Unlimited songs",
      "Enterprise analytics",
      "Dedicated support",
      "99.99% Uptime",
      "All music platforms support",
      "White-label option",
      "Custom integrations",
      "API access",
    ],
    isPopular: false,
    buttonText: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your Telegram group's needs. All plans include our core music bot features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-lg p-8 shadow-md flex flex-col h-full border border-purple-500/10 ${
                plan.isPopular ? "ring-2 ring-purple-500 relative" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-1 rounded-full text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-3 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.isPopular 
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white" 
                  : "bg-primary/80"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
