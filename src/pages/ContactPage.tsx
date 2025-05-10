import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Headphones, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const ContactPage = () => {
  const {
    toast
  } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible."
      });

      // Reset form
      setName("");
      setEmail("");
      setTopic("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };
  return <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-poppins font-bold mb-6">
              Get In <span className="text-teal-500">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Have questions or feedback? We'd love to hear from you. Our team is here to help with all your healthcare needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* General Support */}
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">General Support</CardTitle>
                <CardDescription className="mb-4">
                  For general inquiries and assistance with our platform.
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+918121566730</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mt-2">
                  <Mail className="h-4 w-4" />
                  <span>mahatirtusher@gmail.com</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Technical Support */}
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Technical Support</CardTitle>
                <CardDescription className="mb-4">
                  For technical issues with our tools and platform.
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+918985245546</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mt-2">
                  <Mail className="h-4 w-4" />
                  <span>saketchoudarykongara@gmail.com</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Business Inquiries */}
            <Card className="border-none shadow-lg hover-scale">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Business Inquiries</CardTitle>
                <CardDescription className="mb-4">
                  For partnerships and business opportunities.
                </CardDescription>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+919493590897</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mt-2">
                  <Mail className="h-4 w-4" />
                  <span>vangapalli09@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm mt-2">
                  
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Office Info */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="johndoe@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger id="topic">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="press">Press Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={5} placeholder="How can we help you?" value={message} onChange={e => setMessage(e.target.value)} required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <>Sending Message...</> : <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            {/* Office Information */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-poppins font-semibold mb-6">
                  Our Contact Information
                </h2>
                
                <div className="space-y-8">
                  {/* Main Contact */}
                  <div className="flex">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">
                        Contact Us
                      </h3>
                      <p className="text-muted-foreground">
                        suficorporation1942@gmail.com<br />
                        +918121566439
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Residental Block, Vellore Institute of Technology
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Office Hours */}
                  <div className="flex">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold mb-1">
                        Office Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden h-[300px] bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-poppins font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions about our platform and services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  How accurate are EarlyMed's AI diagnostic tools?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI tools are designed to provide preliminary insights and are continuously improving in accuracy. However, they should not replace professional medical advice. All results should be discussed with healthcare providers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  Is my health data secure on EarlyMed?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we take data security very seriously. Our platform is HIPAA-compliant and uses advanced encryption to protect all user data. Your information is never shared without your explicit consent.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I use EarlyMed services on mobile devices?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! EarlyMed is designed to be fully responsive, allowing you to access all our tools and services from smartphones, tablets, and desktop computers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I get technical support for EarlyMed tools?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For technical issues, you can contact our support team at saketchoudarykongara@gmail.com or call our technical support hotline at +918985245546. We also have an extensive help center with guides and tutorials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>;
};
export default ContactPage;