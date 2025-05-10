import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Heart, Users, Globe, Award, CheckCircle, Target } from "lucide-react";
const OurStoryPage = () => {
  return <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              Transforming Healthcare Through <span className="text-teal-500">Early Detection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-justify space-y-4">
              <span className="block mb-4">
              You can have a thousand problems in life—until health becomes one. Then, nothing else matters. 
              Money, relationships, stress—all fade into the background.
              </span>

              <span className="block mb-4">
              Health isn't just something you have—it's everything. It's waking up feeling alive, moving freely, 
              laughing without pain, breathing with ease. But we take it for granted—until it's gone.
              </span>

              <span className="block mb-4">
              When your health declines, even small tasks feel impossible. Dreams pause, happiness dims, and life 
              loses its color. That's why self-care isn't a luxury—it's a necessity. EarlyMed helps you stay ahead 
              with AI-powered early health insights, so you can take action before it's too late.
              </span>

              <span className="block mb-4">
              EarlyMed is a Senior Design Project developed by a passionate team of students from VIT-AP University. 
              Our mission is to revolutionize healthcare through early disease detection and personalized health 
              monitoring using cutting-edge AI technology.
              </span>

              <span className="block">
              As final semester students, we're committed to creating a platform that makes preventive healthcare 
              accessible and efficient. Our team combines expertise in AI, healthcare, and software development to 
              build a solution that could potentially save lives through early detection.
              </span>
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
                <h2 className="text-3xl font-poppins font-bold mb-6">
                Empowering Lives Through <br />
                <span className="text-primary">Early Detection</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                At EarlyMed, we believe every life is precious and deserves the best chance at health. Born from the innovative minds of passionate VIT-AP University students, our mission transcends traditional healthcare boundaries. We're not just building technology; we're creating hope through pioneering AI-driven early disease detection.
                </p>
                <p className="text-muted-foreground mb-6">
                As aspiring healthcare innovators in our final semester, we pour our hearts into making preventive healthcare a reality for everyone. By combining our expertise in AI, healthcare, and technology, we're not just developing a platform - we're crafting a lifeline that could make the difference between 'too late' and 'just in time'.
                </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/services">Explore Our Services</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              
              <div className="absolute -bottom-6 -left-6 bg-primary p-4 rounded-lg text-white shadow-lg">
                <h3 className="font-bold text-2xl">Thousands of lives</h3>
                <p className="text-sm">Are Believed to be Impacted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl font-poppins font-bold mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-muted-foreground">
              Our core values shape everything we do at EarlyMed, from technology development to user experience design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Compassion</h3>
                <p className="text-muted-foreground">
                  We approach healthcare with empathy and understanding, recognizing that each user has unique needs and concerns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Accessibility</h3>
                <p className="text-muted-foreground">
                  We're committed to making healthcare tools and resources accessible to everyone, regardless of location or background.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from technical innovation to user experience and customer support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Story Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl font-poppins font-bold mb-4">
              The EarlyMed Story
            </h2>
            <p className="text-muted-foreground">
              From a bold vision to a comprehensive healthcare platform, our journey has been driven by innovation and purpose.
            </p>
          </div>
          
          <div className="relative space-y-8">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-border"></div>
            
            {/* January 2025 - Foundation */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex md:w-1/2 md:pr-8 mb-8 md:mb-0 md:text-right">
                <div className="md:ml-auto">
                  <Badge className="mb-2">January 2025</Badge>
                  <h3 className="text-xl font-poppins font-semibold mb-2">EarlyMed Journey Began</h3>
                  <p className="text-muted-foreground">
                    We started our journey with a vision to revolutionize healthcare through AI and early detection technology.
                  </p>
                </div>
              </div>
              
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary -ml-4 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* February 2025 - Approval */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0"></div>
              
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary -ml-4 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex md:w-1/2 md:pl-8">
                <div>
                  <Badge className="mb-2">February 2nd, 2025</Badge>
                  <h3 className="text-xl font-poppins font-semibold mb-2">Project Approval</h3>
                  <p className="text-muted-foreground">
                    Our idea was approved by our guide, Dr. Ganesh Kari Reddy sir, marking a significant milestone in our journey.
                  </p>
                </div>
              </div>
            </div>
            
            {/* March 2025 - Development */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex md:w-1/2 md:pr-8 mb-8 md:mb-0 md:text-right">
                <div className="md:ml-auto">
                  <Badge className="mb-2">March 2025</Badge>
                  <h3 className="text-xl font-poppins font-semibold mb-2">AI Model Development</h3>
                  <p className="text-muted-foreground">
                    Developed key AI models for the platform, focusing on early disease detection capabilities.
                  </p>
                </div>
              </div>
              
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary -ml-4 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* April 2025 - Testing */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0"></div>
              
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary -ml-4 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex md:w-1/2 md:pl-8">
                <div>
                  <Badge className="mb-2">April 2025</Badge>
                  <h3 className="text-xl font-poppins font-semibold mb-2">Testing & Validation</h3>
                  <p className="text-muted-foreground">
                    Completed designing all the AI models and got them tested by specialists and patient data.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Future - Comprehensive Platform */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="flex md:w-1/2 md:pr-8 mb-8 md:mb-0 md:text-right">
                <div className="md:ml-auto">
                  <Badge className="mb-2">Future</Badge>
                  <h3 className="text-xl font-poppins font-semibold mb-2">Comprehensive Platform</h3>
                  <p className="text-muted-foreground">
                    Evolving into a comprehensive healthcare platform with specialized tools for early disease detection.
                  </p>
                </div>
              </div>
              
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary -ml-4 flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Meet the Innovators Behind EarlyMed
            </h2>
            <p className="text-muted-foreground">
              Our diverse team of students combines expertise in AI, healthcare, and software development to revolutionize early disease detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img src="https://i.postimg.cc/FRKjYwh6/mahatir-photo.jpg" alt="Mahatir Ahmed Tusher" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-poppins font-semibold">Mahatir Ahmed Tusher</h3>
              <p className="text-primary text-sm font-medium mb-2">Lead Developer, Lead Designer</p>
              <p className="text-sm text-muted-foreground">
                Model Tuning, Training and Web Development
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img src="https://i.postimg.cc/8zDtbpDJ/image.png" alt="Saket Choudary Kongara" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-poppins font-semibold">Saket Choudary Kongara</h3>
              <p className="text-primary text-sm font-medium mb-2">Documentation Lead</p>
              <p className="text-sm text-muted-foreground">
                Documentation and Research
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img src="https://i.postimg.cc/5ty5Pjr0/image.png" alt="Vangapalli Sivamani" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-poppins font-semibold">Vangapalli Sivamani</h3>
              <p className="text-primary text-sm font-medium mb-2">Data Integration Lead</p>
              <p className="text-sm text-muted-foreground">
                Data Handling and Integration
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/contact">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Global Impact */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Impact</Badge>
              <h2 className="text-3xl font-poppins font-bold mb-6">
                Making a Difference Globally
              </h2>
                <p className="text-muted-foreground mb-6">
                EarlyMed aims to address healthcare challenges through innovative AI solutions. With our cutting-edge technology and passionate team, we're working to make early disease detection more accessible and efficient.
                </p>
                <p className="text-muted-foreground mb-6">
                Our vision includes developing robust AI models for disease detection, creating user-friendly interfaces for healthcare monitoring, and establishing partnerships with healthcare providers to validate and improve our solutions.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">15+</h3>
                  <p className="text-sm text-muted-foreground">AI Models</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">3</h3>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">100+</h3>
                  <p className="text-sm text-muted-foreground">Test Cases</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold text-primary">5+</h3>
                  <p className="text-sm text-muted-foreground">Research Initiatives</p>
                </div>
                </div>
            </div>
            
            <div className="relative">
              <div className="glass rounded-2xl p-6 shadow-xl">
                <img src="https://i.postimg.cc/W3GKtGcX/Chat-GPT-Image-May-5-2025-07-04-46-AM.png" alt="Global healthcare impact" className="rounded-lg w-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-lg text-white shadow-lg">
                <Globe className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-poppins font-semibold mb-4">
              Join Us in Revolutionizing Healthcare
            </h2>
            <p className="text-muted-foreground mb-6">
              Together, we can make early disease detection and proactive healthcare accessible to everyone.
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
    </>;
};
export default OurStoryPage;