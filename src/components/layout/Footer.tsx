import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-muted pt-12 pb-6 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
            <div>
            <div className="flex items-center mb-4">
              <img src="https://i.postimg.cc/wvw2z2yJ/Blank-board-3.png" alt="EarlyMed Logo" className="h-12" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Empowering users with early disease detection and accessible healthcare services.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/drugscan" className="text-sm hover:text-primary transition-colors">
                  DrugScan
                </Link>
              </li>
              <li>
                <Link to="/medilexica" className="text-sm hover:text-primary transition-colors">
                  MediLexica
                </Link>
              </li>
              <li>
                <Link to="mentalhealth/manasmitra" className="text-sm hover:text-primary transition-colors">
                  Manasmitra
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm hover:text-primary transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/woundwise" className="text-sm hover:text-primary transition-colors">
                  Woundwise AI
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-sm hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Health Services */}
          <div>
            <h3 className="font-poppins text-base font-semibold mb-4">Health Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/medi-report" className="text-sm hover:text-primary transition-colors">
                  Medi Report Analyzer
                </Link>
              </li>
              <li>
                <Link to="/diagnobot" className="text-sm hover:text-primary transition-colors">
                  DiagnoBot
                </Link>
              </li>
              <li>
                <Link to="/toothwise" className="text-sm hover:text-primary transition-colors">
                  Toothwise AI
                </Link>
              </li>
              <li>
                <Link to="/find-specialist" className="text-sm hover:text-primary transition-colors">
                  Find a Specialist
                </Link>
              </li>
              <li>
                <Link to="/retinopathy" className="text-sm hover:text-primary transition-colors">
                  Retinopathy Detection
                </Link>
              </li>
              <li>
                <Link to="/optiscan" className="text-sm hover:text-primary transition-colors">
                  OptiScan
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-sm hover:text-primary transition-colors">
                  Prescription Analyzer
                </Link>
              </li>
              <li>
                <Link to="mentalhealth/medicare" className="text-sm hover:text-primary transition-colors">
                  Mental Health FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-poppins text-base font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-sm">suficorporation1942@gmail.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-sm">+918121566439</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                <span className="text-sm">Residential Area, VIT-AP University</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              © {currentYear} EarlyMed. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-xs hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-xs hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;