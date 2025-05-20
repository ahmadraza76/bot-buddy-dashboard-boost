
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal projects and beginners",
    features: [
      "1 Bot",
      "100 messages/day",
      "Basic analytics",
      "Community support",
      "99.5% Uptime",
    ],
    isPopular: false,
    buttonText: "Start for Free",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "For growing projects that need more power",
    features: [
      "5 Bots",
      "Unlimited messages",
      "Advanced analytics",
      "Priority support",
      "99.9% Uptime",
      "API access",
      "Webhook integration",
    ],
    isPopular: true,
    buttonText: "Get Started",
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "For businesses with advanced requirements",
    features: [
      "Unlimited Bots",
      "Unlimited messages",
      "Enterprise analytics",
      "Dedicated support",
      "99.99% Uptime",
      "Custom integrations",
      "White-label option",
      "SLA agreement",
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
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-card rounded-lg p-8 shadow-md flex flex-col h-full ${
                plan.isPopular ? "ring-2 ring-primary relative" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-primary-foreground text-sm font-medium">
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
                  plan.isPopular ? "bg-primary" : "bg-primary/80"
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
