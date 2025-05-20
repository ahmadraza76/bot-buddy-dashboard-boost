
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
