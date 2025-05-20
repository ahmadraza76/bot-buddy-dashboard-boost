
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is BotBuddy?",
    answer:
      "BotBuddy is a platform that allows you to host and manage your Telegram bots without any technical knowledge. We provide a simple interface to deploy, monitor, and scale your bots.",
  },
  {
    question: "Do I need coding knowledge to use BotBuddy?",
    answer:
      "No, you don't need any coding knowledge. All you need is a Telegram bot token, which you can get from BotFather on Telegram. Our platform handles all the technical aspects for you.",
  },
  {
    question: "How do I create a Telegram bot?",
    answer:
      "You can create a Telegram bot by talking to BotFather on Telegram. Follow the instructions to create a new bot and get your bot token. Once you have the token, you can use it to deploy your bot on BotBuddy.",
  },
  {
    question: "Is there a limit to how many bots I can host?",
    answer:
      "The number of bots you can host depends on your subscription plan. Our Free plan allows you to host 1 bot, Pro plan allows 5 bots, and Business plan allows unlimited bots.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Your billing will be adjusted accordingly on your next billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our service, you can request a refund within 14 days of your purchase.",
  },
  {
    question: "How do I get support if I have issues?",
    answer:
      "We offer support via email, live chat, and our help center. Pro and Business plan subscribers get priority support with faster response times.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
