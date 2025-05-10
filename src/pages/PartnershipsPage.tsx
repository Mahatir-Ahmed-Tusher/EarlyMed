import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Hospital, Shield, Users, HeartPulse, GraduationCap, Building } from 'lucide-react';

const PartnershipsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 text-center bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80')] bg-cover opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
            Partnering with EarlyMed
          </h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto animate-fade-in-delay">
            Unlocking the Future of Healthcare Collaboration
          </p>
          <Link to="/contact" className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-teal-100 transition duration-300 animate-fade-in-delay-2">
            Get Started
          </Link>
        </div>
      </section>

      {/* Partnership Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-700">
            Explore Our Partnership Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Clinical Partnerships */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Hospital className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">Clinical Partnerships</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Elevate diagnostic precision with our AI tools (92% accuracy, EarlyMed 2023) like Symptom Checker and MedVision AI, improving patient outcomes by 40%.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>

            {/* Insurance Companies */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">Insurance Companies</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Reduce costs by 30% (CDC 2021) with preventive tools like DiagnoBot, enhancing member outcomes and satisfaction.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>

            {/* NGOs & Government Programs */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">NGOs & Government Programs</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Bridge gaps with 85% sensitive tools (WHO 2022) like WoundWise AI, reducing mortality by 25% in underserved areas.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>

            {/* Medical Device Manufacturers */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <HeartPulse className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">Medical Device Manufacturers</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Pioneer diagnostics with 90% accuracy (Perez 2019), reducing readmissions by 15% with AI-integrated wearables.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>

            {/* Universities & Research */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">Universities & Research</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Cultivate innovators with 30% better outcomes (AAMC 2022) using hands-on AI tools like HealthPredict AI.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>

            {/* Corporate Wellness */}
            <Card className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl border border-teal-200 hover:shadow-xl transition-transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="text-teal-500 h-8 w-8 mr-3" />
                  <h3 className="text-xl font-semibold text-teal-700">Corporate Wellness</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Boost productivity by 15% (WEF 2021) with preventive tools reducing absenteeism by 20%.
                </p>
                <Link to="/services" className="text-teal-500 hover:text-teal-700 font-medium">
                  Learn More
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-teal-700">
            Why Partner with EarlyMed?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Cutting-Edge Innovation:</strong> 92% diagnostic accuracy, validated by 30+ professionals (EarlyMed 2025).
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Customizable Platforms:</strong> Tailored for all sizes, from clinics to corporations.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Mission-Aligned Impact:</strong> Focused on health equity and outcomes.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Proven Excellence:</strong> 4.8-star rating from healthcare experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-teal-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Join Us in Shaping Healthcare’s Future
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Partner with EarlyMed to revolutionize health outcomes through innovation and collaboration.
        </p>
        <Link to="/contact" className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-teal-100 transition duration-300">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default PartnershipsPage;