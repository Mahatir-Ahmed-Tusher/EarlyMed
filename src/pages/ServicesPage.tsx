import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  MessageCircle, 
  Clipboard, 
  Brain, 
  Heart, 
  Apple, 
  BookOpen,
  FileText,
  Image,
  Stethoscope,
  Eye,
  AlertCircle,
  Droplet,
  Users,
  BrainCircuit,
  Baby,
  Calendar,
  ChevronDown,
  ChevronUp,
  Folder
} from "lucide-react";

// Define the service categories with their images and colors
const serviceCategories = [
  {
    id: "primary-ai",
    title: "Primary AI",
    image: "https://i.postimg.cc/nLWx1d7L/Primary-AI.png",
    description: "Our core AI-powered health tools for general health assessment and guidance.",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-500",
    ringColor: "ring-blue-500",
    textColor: "text-blue-600"
  },
  {
    id: "medvision",
    title: "MedVision AI",
    image: "https://i.postimg.cc/j20rpLM0/Medvision-AI.png",
    description: "Our image-based diagnosis tools use advanced machine learning for early detection of various conditions.",
    bgColor: "bg-green-100",
    borderColor: "border-green-500",
    ringColor: "ring-green-500",
    textColor: "text-green-600"
  },
  {
    id: "healthpredict",
    title: "HealthPredict AI",
    image: "https://i.postimg.cc/rmtkZSCN/Health-Vision-AI.png",
    description: "Our symptom-based diagnosis tools provide personalized risk assessments and health insights.",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-500",
    ringColor: "ring-purple-500",
    textColor: "text-purple-600"
  },
  {
    id: "mental-health-hub",
    title: "Mental Health Hub",
    image: "https://i.postimg.cc/g0jd89x5/mental-health.png",
    description: "Resources and tools for mental health assessment, guidance, and support.",
    bgColor: "bg-pink-100",
    borderColor: "border-pink-500",
    ringColor: "ring-pink-500",
    textColor: "text-pink-600"
  },
  {
    id: "dental-and-eye",
    title: "DentEye AI",
    image: "https://i.postimg.cc/fT7zKxMh/image.png",
    description: "Utilize AI for your eye and teeth, keep your teeth tested at least.",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-500",
    ringColor: "ring-orange-500",
    textColor: "text-orange-600"
  },
  {
    id: "additional",
    title: "Additional Healthcare Tools",
    image: "https://i.postimg.cc/mZHLmGmW/Additional-Health-tool.png",
    description: "Explore our supplementary tools designed to enhance your healthcare experience.",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-500",
    ringColor: "ring-yellow-500",
    textColor: "text-yellow-600"
  }
];

const ServicesPage = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const renderServices = (categoryId: string) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    if (!category) return null;

    const { textColor, borderColor } = category;

    switch (categoryId) {
      case "primary-ai":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <img 
                    src="https://i.postimg.cc/526P2B9M/image.png" 
                    alt="Symptom Checker Icon" 
                    className="h-5 w-5"
                  />
                  </div>
                  <div>
                  <CardTitle className="text-lg font-semibold">Symptom Checker</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    AI-powered symptom analysis
                  </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                  Our advanced AI system analyzes your symptoms and provides personalized health insights and preliminary recommendations.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-blue-50`}>
                  <Link to="/chatbot">Check symptoms</Link>
                  </Button>
                </CardContent>
                </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">DiagnoBot</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      AI-powered virtual doctor
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI-powered virtual doctor provides preliminary medical guidelines and advice based on your queries and symptom data.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-blue-50`}>
                    <Link to="/diagnobot">Chat with DiagnoBot</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clipboard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">WoundWise AI</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      AI-powered wound analysis
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our advanced wound analysis tool provides treatment recommendations based on uploaded wound images.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-blue-50`}>
                    <Link to="/woundwise">
                      Upload Wound Image
                    </Link>
                    </Button>
                </CardContent>
              </Card>

              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clipboard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Medical Fact Checker</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Get accurate medical information, fact checking, and evidence-based analysis.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI-powered medical fact checker verifies medical claims and provides evidence-based analysis.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-blue-50`}>
                    <Link to="/medifact">
                      Check Medical Facts
                    </Link>
                    </Button>
                </CardContent>
              </Card>
              
            </div>
          </div>
        );
      case "medvision":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Droplet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Leukemia Detection</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Blood cell image analysis
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI tool for early detection of Acute Lymphoblastic Leukemia via blood cell image analysis.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/leukemia-detect">
                      Upload Image
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Image className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">PneumoNet</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Diagnosis of Pneumonia based on chest X-ray
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI tool for binary and multi-class pneumonia classification using chest X-rays.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/pneumonia">
                      Upload X-ray
                    </Link>
                    </Button>
                </CardContent>
              </Card>
                <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                  <CardTitle className="text-lg font-semibold">Alzheimer MRI Analysis</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Brain MRI scan analysis
                  </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                  AI-powered early Alzheimer's detection through brain MRI scan analysis.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                  <Link to="/alzheimersdetect">
                    Upload MRI Scan
                  </Link>
                  </Button>
                </CardContent>
                </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg pubblica font-semibold">Brain Tumor Detection</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      MRI image analysis
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI tool for detecting brain tumors via MRI scan analysis.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/tumor-detect">
                      Upload MRI Image
                    </Link>
                  </Button>
                </CardContent>
              </Card>
                <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                  <CardTitle className="text-lg font-semibold">Retinopathy Scanner</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Retinal image analysis
                  </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                    AI tool for early diabetic retinopathy detection using retinal images.
                    </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/retinopathy">
                    Upload Retinal Image
                    </Link>
                    </Button>
                </CardContent>
                </Card>
                <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                  <CardTitle className="text-lg font-semibold">Prescription Analyzer</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Analyze prescriptions for insights
                  </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                  Upload a prescription to get AI-powered insights and recommendations.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                  <Link to="/analyzer">Analyze Prescription</Link>
                  </Button>
                </CardContent>
                </Card>
                  <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                    <CardTitle className="text-lg font-semibold">Medi Report Analyzer</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Analyze medical reports for insights
                    </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                    Upload your medical reports to get AI-powered insights and recommendations.
                    </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/medi-report">Analyze Report</Link>
                    </Button>
                  </CardContent>
              </Card>
              
              
            </div>
          </div>
        );
      case "healthpredict":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Heart Risk Assessment</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Cardiovascular health evaluation
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive evaluation of heart health based on user-provided data and risk factors.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}>
                    <Link to="/heart-risk">Take Assessment</Link>
                    </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Stroke Risk Predictor</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Stroke risk assessment
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced stroke risk assessment using AI-driven analysis of health factors and lifestyle.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}>
                    <Link to="/stroke">Take Assessment</Link>
                    </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-purple-600" />
                  </div>
                    <div>
                    <CardTitle className="text-lg font-semibold">Breast Cancer Analysis</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Early detection tool
                    </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                    AI tool for early breast cancer risk assessment based on symptoms and risk factors.
                    </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}>
                    <Link to="/breast-cancer">Take Assessment</Link>
                    </Button>
                  </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <CardHeader className="flex flex-row items-center space-x-4">
    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
      <Droplet className="h-5 w-5 text-purple-600" />
    </div>
    <div>
      <CardTitle className="text-lg font-semibold">DiabetesSense</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Diabetes risk assessment
      </CardDescription>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground mb-4">
      Predict your risk of diabetes based on lifestyle and health data.
    </p>
    <Button
      variant="outline"
      className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}
    >
      <Link to="/diabetes" className="w-full text-center">
        Take Assessment
      </Link>
    </Button>
  </CardContent>
</Card>

              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">CogniTrack</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Cognitive health assessment
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Alzheimer's risk assessment based on cognitive function and lifestyle data.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}>
                    <Link to="/cogni-track">
                      Take Assessment
                    </Link>
                    </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Baby className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">AutismDetect</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                    Autism Spectrum Evaluation Test (ASET)
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                  AI and RAG-based Autism Assessment system
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-purple-50`}>
                    <Link to="/autism">Take Assessment</Link>
                  </Button>
                </CardContent>
              </Card>
              
            </div>
          </div>
        );
      case "mental-health-hub":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">ManasMitra</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Emotional support chatbot
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Offers immediate emotional support with culturally sensitive coping strategies.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-pink-50`}>
                    <Link to="/mentalhealth/manasmitra">Chat Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">MindCare FAQ</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Mental health Q&A
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get answers to mental health questions from trusted sources.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-pink-50`}>
                    <Link to="/mentalhealth/medicare">Ask a Question</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Activity className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">MentalHealthRisk AI</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Mental health assessment
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Assess your mental health with detailed or short questionnaires.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-pink-50`}>
                    <Link to="/mentalhealth/mentalhealthriskai">Take Assessment</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "dental-and-eye":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clipboard className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Toothwise AI</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Upload teeth images and describe symptoms for AI analysis.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                  Upload an image of your teeth and optionally describe your symptoms for AI-powered analysis and recommendations.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-orange-50`}>
                  <Link to="/toothwise">Upload Teeth Image</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Oral Hygiene Risk Assessment</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Questionnaire-based scoring for dental health.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Answer questions about your age, diet, brushing habits, and smoking to receive a “Dental Risk Score” and tailored oral hygiene tips.
                  </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-orange-50`}>
                    <Link to="/oral-hygiene-risk-assessment">
                      Take Assessment
                    </Link>
                    </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Eye className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Eye Strain Assessment Bot</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Screen time and blinking frequency analysis.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Answer questions about your screen time, blinking frequency, and habits to receive an eye strain score and tips like the 20-20-20 rule.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-orange-50`}>
                    <Link to="/eye-strain-assessment">Start Assessment</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                  <CardTitle className="text-lg font-semibold">Retinopathy Scanner</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Retinal image analysis
                  </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                    AI tool for early diabetic retinopathy detection using retinal images.
                    </p>
                    <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-green-50`}>
                    <Link to="/retinopathy">
                    Upload Retinal Image
                    </Link>
                    </Button>
                </CardContent>
                </Card>
            </div>
          </div>
        );
      case "additional":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Apple className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">NutriSense</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      AI-powered nutrition planning
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered diet planning and nutrition recommendations based on your health goals and preferences.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-yellow-50`}>
                    <Link to="/nutrisense">Get Diet Plan</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Specialist Finder</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Find healthcare professionals
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tool to locate and connect with healthcare specialists based on location, specialty, and availability.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-yellow-50`}>
                    <Link to="/specialist-finder">Find Specialist</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">DrugScan</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Your AI-powered drug information assistant
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Write the name of the medicines that your doctor suggested and get to know what did he suggest.
                  </p>
                  <Button variant="outline" className={`w-full ${borderColor} ${textColor} hover:bg-yellow-50`}>
                    <Link to="/drugscan">Search on DrugScan</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">Appointment Booking</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Coming Soon
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our appointment booking system is currently in development. Soon you'll be able to schedule appointments with healthcare providers directly.
                  </p>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-500" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section with Professional Title */}
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-semibold text-gray-900 dark:text-white mb-4">
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover a world of AI-powered health tools designed to empower you with early disease detection, personalized insights, and accessible healthcare solutions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Folders View */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {serviceCategories.map((category) => (
              <div key={category.id} className="flex flex-col">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${category.bgColor} ${expandedCategory === category.id ? `${category.ringColor} ring-2` : ''} rounded-xl shadow-md`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="relative pb-[75%] overflow-hidden rounded-t-xl">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Folder className={`h-5 w-5 ${category.textColor}`} />
                      <h3 className={`text-lg font-medium ${category.textColor}`}>{category.title}</h3>
                    </div>
                    <div>
                      {expandedCategory === category.id ? (
                        <ChevronUp className={`h-5 w-5 ${category.textColor}`} />
                      ) : (
                        <ChevronDown className={`h-5 w-5 ${category.textColor}`} />
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Expanded Content */}
          {expandedCategory && (
            <div className="mt-8 animate-in fade-in-50 slide-in-from-bottom-3 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-poppins font-semibold mb-2 text-teal-600 dark:text-teal-400">
                  {serviceCategories.find(cat => cat.id === expandedCategory)?.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {serviceCategories.find(cat => cat.id === expandedCategory)?.description}
                </p>
              </div>
              {renderServices(expandedCategory)}
            </div>
          )}
        </div>
      </section>
      
      {/* Specialist Finder section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
          <img 
            src="https://i.postimg.cc/R0DRdzcq/Blank-board-2.png" 
            alt="Find your doctor Feature image" 
            style={{ width: '67%', maxWidth: '1430px' }}
            className="object-contain"
          />
          </div>
          <h2 className="text-2xl font-poppins font-semibold text-teal-600 dark:text-teal-200 mb-4">
            Find Your Doctor
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Discover the right healthcare specialist for your needs with our AI-powered Specialist Finder. Whether you need a dermatologist, cardiologist, or any other expert, we connect you to top professionals in your area. <span className="text-red-500">Click on the button below to find your doctor.</span>
          </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              className="w-48 h-16 bg-teal-500 text-white font-semibold rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_20px_rgba(0,0,0,0.4)] hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-300"
            >
              <Link to="/specialist-finder">
                Search
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* MediLexica Section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.postimg.cc/kXhVhRZY/Blank-board.png" 
              alt="MediLexica in a laptop screen" 
              className="w-full max-w-md object-contain"
            />
          </div>
          <h2 className="text-2xl font-poppins font-semibold text-teal-600 dark:text-teal-200 mb-4">
            MediLexica
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Medical terms can be confusing — we’re here to make them clear. MediLexica helps you understand your health with easy, reliable explanations, so you always know what’s going on. <span className="text-red-500">Click on the logo below to access our medical dictionary.</span>
          </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              className="w-48 h-16 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center p-0 bg-transparent"
            >
              <Link to="/medilexica">
                <img 
                  src="https://i.postimg.cc/d3DDQWdP/logo.png" 
                  alt="MediLexica Logo" 
                  className="w-full h-full object-contain"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* DrugScan Section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.postimg.cc/T3GY79CJ/pngwing-com-24.png" 
              alt="Some random medicines" 
              className="w-full max-w-md object-contain"
            />
          </div>
          <h2 className="text-2xl font-poppins font-semibold text-teal-600 dark:text-teal-200 mb-4">
            DrugScan
          </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Not sure what that pill does? Don't guess—search it.
              With DrugScan, just type in any drug name to instantly get clear info on its uses, side effects, and warnings.
              Simple. Fast. Reliable.
              <span className="text-red-500">Click below to explore DrugScan now!</span>
            </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              className="w-48 h-16 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center p-0 bg-transparent"
            >
              <Link to="/drugscan">
                <img 
                  src="https://i.postimg.cc/85F1JnzN/image.png" 
                  alt="DrugScan button" 
                  className="w-full h-full object-contain"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Medi Report Analyzer Section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.postimg.cc/wvJQnz5t/pngwing-com-3.png" 
              alt="MediLexica in a laptop screen" 
              className="w-full max-w-md object-contain"
            />
          </div>
          <h2 className="text-2xl font-poppins font-semibold text-teal-600 dark:text-teal-200 mb-4">
            Medi Report Analyzer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Don't you ever wonder what those hieroglyphics in your medical test report mean? Even your doctor rarely explains them in detail.
          But don’t worry — that’s where we come in! Try our new Medi Report Analyzer. <span className="text-green-500">Click on the button below to access our Medi Report Analyzer.</span>
          </p>
          <div className="flex justify-center">
            <Button 
              asChild 
              className="w-48 h-16 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center p-0 bg-transparent"
            >
              <Link to="/medi-report">
                <img 
                  src="https://i.postimg.cc/T3rN5r5L/medreport-btn.png" 
                  alt="Medi Report Analyzer button" 
                  className="w-full h-full object-contain"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Utilize Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-poppins font-semibold text-gray-900 dark:text-white mb-6 text-center">
            How to Utilize Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                  Step 1: Explore Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Click on any folder to learn about and access our AI-powered health tools, such as symptom analysis or image diagnostics.
                </p>
              </CardContent>
            </Card>
            <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                  Step 2: Follow Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Each tool provides clear guidance. Input your data or upload images as prompted to receive personalized insights.
                </p>
              </CardContent>
            </Card>
            <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                  Step 3: Take Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Use the recommendations or connect with specialists via links provided. Visit MediLexica for term clarification if needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-50 dark:bg-teal-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-poppins font-semibold text-teal-600 dark:text-teal-200 mb-4">
            Start Your Health Journey Today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Take control of your health with our advanced AI-powered tools and personalized insights.
          </p>
          <Button size="lg" className="rounded-full bg-teal-500 hover:bg-teal-600 text-white dark:text-white shadow-md">
            <Link to="/services">Explore All Services</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;