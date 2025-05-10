import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription, CardContent, Card } from "@/components/ui/card";
import { 
  Activity, 
  Brain, 
  Heart, 
  Stethoscope, 
  Users, 
  Clipboard, 
  ArrowRight, 
  Search, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Shield,
  Database,
  Network,
  FileText,
  Award,
  Building,
  BadgePercent,
  HeartHandshake,
  Factory,
  GraduationCap,
  BrainCircuit
} from "lucide-react";

const HomePage = () => {
  return <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{
        backgroundImage: "url('https://i.postimg.cc/gkw6LcsW/earlymed-feature-image-2.png')",
        backgroundPosition: "center 30%"
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70 dark:from-background/95 dark:to-background/40"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-enter">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold tracking-tight text-balance mb-6">
                Early Detection,<br />
                <span className="text-teal-500">Smarter Decision</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mb-8 text-balance">
                Advanced AI-powered tools for early disease detection and accessible healthcare services to empower your health journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  asChild 
                  className="rounded-full text-lg px-8 py-4 min-w-[200px] h-16"
                >
                  <Link to="/services">Explore Our Services</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="rounded-full text-lg px-8 py-4 min-w-[200px] h-16"
                >
                  <Link to="/specialist-finder">Find Specialist</Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-teal-500" />
                    </div>)}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Tested by the professionals!</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500 text-lg">★</span>)}
                    <span className="ml-2 text-sm text-muted-foreground">5.0 (by 10 professionals)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="glass rounded-2xl p-6 shadow-xl animate-enter">
                <img 
                  alt="AI-powered healthcare" 
                  src="/earlymed-uploads/bg-free-earlymed-feature-image.png" 
                  className="rounded-lg w-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Doctor Section */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 animate-pulse">
              Find Your Doctor
            </h2>
            
            <img 
              src="https://i.postimg.cc/mgrNF7jN/Blank-board-7.png" 
              alt="Find Your Doctor" 
              className="mx-auto mb-8 w-full max-w-5xl h-auto"
            />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Discover the right healthcare specialist for your needs with our AI-powered Specialist Finder. Whether you need a dermatologist, cardiologist, or any other expert, we connect you to top professionals in your area.
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
              Simply enter your symptoms and location, and let our technology guide you to the best care, anywhere, anytime.
            </p>
            <Button 
              asChild 
              className="rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <Link to="/specialist-finder">
                Find Your Doctor Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How Our AI Works Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
        <img 
          src="https://i.postimg.cc/nLK6d2H6/Blank-board-2.png" 
          alt="How AI Works" 
          className="mx-auto mb-8 w-full max-w-2xl h-auto" // Changed from max-w-3xl to max-w-2xl
        />
            <h2 className="text-3xl font-poppins font-bold mb-4">
              How Our <span className="text-teal-500">AI Technology</span> Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Powered by advanced machine learning algorithms, our AI systems deliver accurate and reliable health insights through a streamlined process.
            </p>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20"></div>
            
            {/* Step 1 */}
            <div className="bg-card rounded-xl p-6 shadow-md relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-center mb-3">Data Collection</h3>
              <p className="text-muted-foreground text-center">
          Securely provide your symptoms, images, or health data through our easy-to-use interface.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-card rounded-xl p-6 shadow-md relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-center mb-3">Analysis</h3>
              <p className="text-muted-foreground text-center">
          Our AI processes your information against vast medical databases and the latest research.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-card rounded-xl p-6 shadow-md relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-center mb-3">AI Processing</h3>
              <p className="text-muted-foreground text-center">
          Advanced neural networks identify patterns and correlations human eyes might miss.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="bg-card rounded-xl p-6 shadow-md relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-center mb-3">Results & Guidance</h3>
              <p className="text-muted-foreground text-center">
          Receive personalized insights, recommendations, and next steps for your healthcare journey.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/how">Learn More About Our Technology</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* How Our System Works */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Your <span className="text-teal-500">Healthcare Journey</span> With EarlyMed
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience a seamless path from initial assessment to professional care with our integrated healthcare ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            <Card className="border border-primary/10 shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-teal-500"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Initial Assessment</CardTitle>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Use our AI tools to analyze symptoms or health concerns</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Upload images or input health data for analysis</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Receive preliminary insights and recommendations</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
            
            <Card className="border border-primary/10 shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-teal-600"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Personalized Plan</CardTitle>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Get tailored health recommendations based on your results</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Access educational resources about your health conditions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Receive guidance on when to seek professional care</span>
                  </li>
                </ol>
              </CardContent>
            </Card>  
            
            <Card className="border border-primary/10 shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-teal-700"></div>
              <CardContent className="p-6 pt-8">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Professional Connection</CardTitle>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Find specialists relevant to your health needs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Schedule appointments with healthcare providers</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Share your AI assessment results with your doctor</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
        <img 
        src="https://i.postimg.cc/HxpP0V1Y/EarlyMed.png" 
        alt="EarlyMed Featured Image" 
        className="mx-auto mb-6 w-full max-w-3xl h-auto"
        />
            <h2 className="text-4xl font-poppins font-bold mb-4">
            Advanced AI-Powered <span className="text-teal-500">Healthcare Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge AI solutions provide early detection and personalized insights to help you make informed health decisions.
            </p>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Symptom Checker */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Symptom Checker</CardTitle>
                <CardDescription className="text-base">
                  AI-powered analysis of your symptoms providing personalized health insights and recommendations.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/chatbot" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* DiagnoBot */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">DiagnoBot</CardTitle>
                <CardDescription className="text-base">
                  AI-powered virtual doctor offering preliminary medical guidelines and advice for your health concerns.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/services" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* WoundWise AI */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clipboard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">WoundWise AI</CardTitle>
                <CardDescription className="text-base">
                  Advanced wound analysis tool providing treatment recommendations based on uploaded wound images.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/services" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* MedVision AI */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">MedVision AI</CardTitle>
                <CardDescription className="text-base">
                  Image-based diagnosis for early detection of various conditions using advanced machine learning.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/services" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* HealthPredict AI */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">HealthPredict AI</CardTitle>
                <CardDescription className="text-base">
                  Symptom-based diagnosis tools for heart health, stroke risk, and other critical conditions.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/services" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Specialist Finder */}
            <Card className="border-0 shadow-lg bg-card hover-scale">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-2">Specialist Finder</CardTitle>
                <CardDescription className="text-base">
                  Locate and connect with healthcare specialists based on location, specialty, and availability.
                </CardDescription>
                <Button variant="link" className="p-0 mt-4 h-auto" asChild>
                  <Link to="/find-specialist" className="flex items-center">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Professional Reviews */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold mb-4">
          Trusted by <span className="text-teal-500">Healthcare Professionals</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hear what doctors and medical students are saying about our AI-powered healthcare solutions.
        </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Review 1 */}
        <Card className="border border-muted shadow-lg bg-card">
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500 text-lg">★</span>)}
            </div>
            <p className="italic text-muted-foreground mb-6">
          "As a primary care physician, EarlyMed's tools have been invaluable for patient education and preliminary assessment. The AI accuracy is impressive and helps patients take a more active role in their healthcare."
            </p>
            <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Dr. Priya Nair</p>
            <p className="text-sm text-muted-foreground">Family Medicine, 15 years experience, Chennai</p>
          </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Review 2 */}
        <Card className="border border-muted shadow-lg bg-card">
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500 text-lg">★</span>)}
            </div>
            <p className="italic text-muted-foreground mb-6">
          "The WoundWise AI system has transformed how we approach wound care assessment. It provides accurate analyses that help us prioritize cases and develop better treatment plans for our patients."
            </p>
            <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Dr. Arjun Menon</p>
            <p className="text-sm text-muted-foreground">Dermatologist, Apollo Hospitals, Bengaluru</p>
          </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Review 3 */}
        <Card className="border border-muted shadow-lg bg-card">
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500 text-lg">★</span>)}
            </div>
            <p className="italic text-muted-foreground mb-6">
          "As a medical student, EarlyMed has been an incredible learning tool. The AI explanations help me understand differential diagnoses and the reasoning behind various treatment approaches."
            </p>
            <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Ananya Reddy</p>
            <p className="text-sm text-muted-foreground">4th Year Medical Student, JIPMER, Puducherry</p>
          </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Review 4 */}
        <Card className="border border-muted shadow-lg bg-card">
          <CardContent className="p-6 pt-8">
            <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-500 text-lg">★</span>)}
            </div>
            <p className="italic text-muted-foreground mb-6">
          "The specialist finder tool has helped connect my rural patients with specialists they might otherwise never have found. It's bridging healthcare gaps and improving access to care."
            </p>
            <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Dr. Ravi Kumar</p>
            <p className="text-sm text-muted-foreground">Rural Healthcare Practitioner, Madurai</p>
          </div>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </section>
      
      {/* Mental Health Section - Serene Mind */}
      <section className="py-20 bg-indigo-50 dark:bg-indigo-950/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Your Mental Health <span className="text-indigo-600 dark:text-indigo-400">Matters</span>
              </h2>
              <p className="text-lg mb-6">
                We believe in holistic care - your mental wellbeing is just as important as your physical health. That's why we've partnered with Serene Mind to provide comprehensive mental health resources.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span>AI-guided meditation and stress reduction techniques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Mental health assessments and personalized resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Connection with licensed mental health professionals</span>
                </li>
              </ul>
              <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                <a href="https://serene-mind-world.netlify.app/" target="_blank" rel="noopener noreferrer">
                  Visit Serene Mind
                </a>
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
                <a href="https://serene-mind-world.netlify.app/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://i.postimg.cc/dtVdxBxY/Removal-154.png" 
                  alt="Serene Mind - Mental Health Support" 
                  className="w-3/4 h-auto mx-auto hover:opacity-90 transition-opacity"
                />
                </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-poppins font-bold mb-3">
        Partnership <span className="text-teal-500">Opportunities</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Partner with us to transform healthcare together! Join our mission to make healthcare more accessible, proactive, and personalized.
        </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Clinic Partnerships */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">Clinic Partnerships</CardTitle>
                <CardDescription className="text-base mb-6">
                  Integrate our AI tools into your clinical workflow to enhance diagnostic capabilities and improve patient outcomes.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
            
            {/* Insurance Companies */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BadgePercent className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">Insurance Companies</CardTitle>
                <CardDescription className="text-base mb-6">
                  Partner with us to provide your members with preventive health tools that can lower costs and improve health outcomes.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
            
            {/* NGOs and Government Programs */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">NGOs & Government Programs</CardTitle>
                <CardDescription className="text-base mb-6">
                  Collaborate on public health initiatives to bring early detection technology to underserved communities.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
            
            {/* Medical Device Manufacturers */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Factory className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">Medical Device Manufacturers</CardTitle>
                <CardDescription className="text-base mb-6">
                  Integrate your medical devices with our AI platform for enhanced diagnostics and improved patient monitoring.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
            
            {/* Universities & Research */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">Universities & Research</CardTitle>
                <CardDescription className="text-base mb-6">
                  Collaborate on research initiatives and provide students with hands-on experience with cutting-edge healthcare AI.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
            
            {/* Corporate Wellness */}
            <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 pt-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mb-3">Corporate Wellness</CardTitle>
                <CardDescription className="text-base mb-6">
                  Enhance your employee wellness programs with our preventive health tools and early detection technologies.
                </CardDescription>
                <Link
                  to="/partnerships"
                  className="w-full inline-block text-center bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-md transition-colors"
                >
                  Learn More
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/partnerships"
              className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors"
            >
              Explore All Partnership Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
        <img 
          src="https://i.postimg.cc/wvw2z2yJ/Blank-board-3.png" 
          alt="Why Choose EarlyMed" 
          className="mx-auto w-1/2 h-auto"
        />
          </div>
          <div className="text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold mb-4">
          Why Choose <span className="text-teal-500">EarlyMed</span>
        </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to making healthcare more accessible, proactive, and personalized with our advanced technology solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-2">Early Detection</h3>
              <p className="text-muted-foreground">
                Advanced AI technology to identify potential health issues before they become serious.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                Healthcare tools and resources available to everyone, anywhere, anytime.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">
                Comprehensive resources to help you understand your health and make informed decisions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-2">Convenience</h3>
              <p className="text-muted-foreground">
                User-friendly platform designed to make healthcare management simple and efficient.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild className="rounded-full">
              <Link to="/our-story">Learn About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Start your journey towards better health with EarlyMed's advanced AI-powered tools and resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="rounded-full">
                <Link to="/services">Explore Our Services</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </section>
    </div>;
};

export default HomePage;