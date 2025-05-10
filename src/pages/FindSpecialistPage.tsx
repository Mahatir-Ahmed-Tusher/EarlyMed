
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

const FindSpecialistPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-poppins font-bold mb-6">
              Find a <span className="text-teal-500">Specialist</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with top healthcare professionals in your area and get the specialized care you need.
            </p>
          </div>
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Construction className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Under Construction
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're working hard to bring you our specialist finder tool. This feature will be available soon to help you connect with healthcare professionals that match your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/services">Explore Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-poppins font-semibold mb-4">
              Need help finding the right specialist?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our health concierge team can help you find the perfect match for your healthcare needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="tel:+918121566439">Call Health Concierge</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:suficorporation1942@gmail.com">Email Health Concierge</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindSpecialistPage;
