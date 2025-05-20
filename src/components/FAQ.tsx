
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Do I need a server or coding knowledge?",
    answer:
      "No, you don't need any server or coding knowledge. We host everything for you and handle all the technical aspects.",
  },
  {
    question: "Can I update my bot image or token?",
    answer:
      "Yes, you can update your bot image, token, and other settings anytime through your personal dashboard.",
  },
  {
    question: "What happens if I miss a payment?",
    answer:
      "If you miss a payment, your bot will automatically pause until the payment is complete. Once payment is received, your bot will be back online within minutes.",
  },
  {
    question: "How do I create a Telegram bot?",
    answer:
      "You can create a Telegram bot by talking to BotFather on Telegram. Follow the instructions to create a new music bot and get your bot token. Once you have the token, you can use it to deploy your bot on BotifyHost.",
  },
  {
    question: "What music sources does the bot support?",
    answer:
      "Our music bots support YouTube, SoundCloud, Spotify, and local files. Users can search and play music from these platforms directly in their Telegram groups.",
  },
  {
    question: "Can I customize the bot commands?",
    answer:
      "Yes, you can customize certain commands and bot responses through your dashboard. Advanced customization options are available on higher-tier plans.",
  },
  {
    question: "How do I get support if I have issues?",
    answer:
      "We offer support via email, live chat, and our Telegram support group. All customers get priority support with fast response times.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Have questions about our Telegram music bot hosting service? Find answers below or contact our support team.
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
