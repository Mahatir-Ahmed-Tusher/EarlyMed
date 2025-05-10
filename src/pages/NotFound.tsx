
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <img 
            src="https://i.postimg.cc/xjwMSnss/image.png" 
            alt="404 Illustration" 
            className="w-full max-w-[400px] mx-auto"
          />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-4">Oops!</h1>
        <h2 className="text-2xl font-poppins font-semibold mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name 
          changed, or is temporarily unavailable.
        </p>
        <div className="space-x-4">
          <Button 
            asChild 
            className="hover:scale-105 transition-transform"
          >
            <Link to="/">Back to Home</Link>
          </Button>
          <Button 
            variant="outline" 
            asChild 
            className="hover:scale-105 transition-transform"
          >
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
