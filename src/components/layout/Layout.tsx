
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Legal Information */}
      <div className="bg-muted/50 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Privacy Policy */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Privacy Policy</h3>
              <p className="text-sm text-muted-foreground mb-4">
                At EarlyMed, we are committed to protecting your privacy. We collect and process your data only for legitimate purposes related to providing our healthcare services. We never sell your data to third parties and implement strict security measures to protect it.
              </p>
              <Link to="/privacy" className="text-sm text-primary hover:underline">
                Read our full Privacy Policy
              </Link>
            </div>
            
            {/* Terms of Service */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Terms of Service</h3>
              <p className="text-sm text-muted-foreground mb-4">
                By using EarlyMed services, you agree to our Terms of Service. These terms outline your rights and responsibilities as a user, limitations of our liability, and important disclaimers regarding the medical information provided on our platform.
              </p>
              <Link to="/terms" className="text-sm text-primary hover:underline">
                Read our full Terms of Service
              </Link>
            </div>
            
            {/* Accessibility */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Accessibility</h3>
              <p className="text-sm text-muted-foreground mb-4">
                EarlyMed is committed to ensuring digital accessibility for people with disabilities. We are continuously improving the user experience for everyone and applying relevant accessibility standards to make our website and tools accessible to all users.
              </p>
              <Link to="/accessibility" className="text-sm text-primary hover:underline">
                Read our Accessibility Statement
              </Link>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <p className="text-xs text-center text-muted-foreground">
            The information provided on this website is for general informational and educational purposes only and is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
