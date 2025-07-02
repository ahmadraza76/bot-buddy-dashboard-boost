
import { useState } from "react";
import { Link } from "react-router-dom";
// import { ThemeToggle } from "./ThemeToggle"; // Removed
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-50 border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/c193fea6-f694-4f4b-9b2c-bb88362a745b.png"
                alt="BotBuddy Logo"
                width={32}
                height={32}
                className="mr-2 rounded"
                style={{ objectFit: "contain" }}
              />
              <span className="text-xl font-bold">BotBuddy</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium hover:text-primary">
              How it Works
            </Link>
            <Link to="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link to="#faq" className="text-sm font-medium hover:text-primary">
              FAQ
            </Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> Removed */}
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-base font-semibold shadow-sm transition-all duration-200">
                Get Started
              </Button>
            </Link>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="#features"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="#how-it-works"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                to="#pricing"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="#faq"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/dashboard"
                className="text-base font-medium hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
