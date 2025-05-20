
import { Link } from "react-router-dom";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Telegram 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 240 240"
                className="mr-2"
              >
                <path
                  fill="#0088cc"
                  d="M120 20c55.23 0 100 44.77 100 100s-44.77 100-100 100S20 175.23 20 120S64.77 20 120 20z"
                />
                <path
                  fill="#FFF"
                  d="M165 72.84c-3.79-1.58-17.6-5.63-49.32 17.25c-15.84 11.44-26.35 21.47-30.55 26.9c-1.56 2.03-1.88 3.1-2.05 4.44c0 0-.58 5.02 3.68 6.89c1.35.59 3.31.95 5.12 0c3.64-1.94 9.83-6.21 15.05-9.54c5.86-3.75 6.22-1.2 4.44 1.73c-3.67 6.04-11.28 14.56-15.15 19.07c-1.58 1.85-.17 3.77 1.25 4.42c3.52 1.62 9.25 3.68 13.13 4.92c3.88 1.24 6.28.47 8.1-3.08c2.77-5.39 8.86-28.78 10.7-37.56c.18-.89.39-1.75.6-2.58c1.65-6.41 3.14-12.14 6.56-11.47c5.9 1.15 3.8 21.8 3.51 26.08c-.28 3.95-1.5 8.28-.56 10.25c.93 1.97 2.66 1.79 5.09 1.12c1.91-.53 12.2-4.72 12.76-5.12c1.53-1.08 1.36-2.18 1.36-2.18s1.35-11.15 2.06-19.99c.7-8.84 1.73-18.09.76-25.45c-.96-7.36-5.1-7.9-7.06-7.28z"
                />
              </svg>
              <span className="text-xl font-bold">BotBuddy</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop solution for hosting and managing Telegram bots with ease.
            </p>
            <div className="flex mt-4 space-x-4">
              <a 
                href="https://instagram.com/botbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://telegram.me/botbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Telegram"
              >
                <Telegram size={20} />
              </a>
              <a 
                href="https://facebook.com/botbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/botbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com/botbuddy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#features" className="text-sm text-muted-foreground hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted-foreground/20">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} BotBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
