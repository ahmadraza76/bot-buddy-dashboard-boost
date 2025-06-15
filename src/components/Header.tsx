
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-base font-semibold shadow-sm transition-all duration-200">
              Get Started
            </Button>
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

