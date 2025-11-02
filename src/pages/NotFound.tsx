import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center fade-in">
        <h1 className="font-heading text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page not found</p>
        <Button asChild>
          <a href="/" className="inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
