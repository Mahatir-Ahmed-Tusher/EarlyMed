import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const AIHealthcarePost = () => {
  const blogData = {
    title: "How AI is Revolutionizing Healthcare Diagnoses",
    excerpt:
      "A detailed exploration of AI's transformative role in disease detection and treatment.",
    category: "Technology & Medicine",
    date: "April 25, 2025",
    author: "Saket Choudary Kongara, VIT-AP University",
    readTime: "8 min read",
    image: "https://i.postimg.cc/VNh2Z6jR/image.png",
    content: `
      <h3>Abstract</h3>
      <p>Artificial Intelligence (AI) is reshaping healthcare diagnostics with enhanced accuracy, speed, and accessibility. This article reviews AI's application in early disease detection, personalized treatment, and global health equity, supported by clinical evidence from the EarlyMed project at VIT-AP University.</p>

      <h3>Introduction</h3>
      <p>AI's integration into healthcare diagnostics marks a paradigm shift, addressing limitations of traditional methods. As AI Architecture Lead for EarlyMed, I present findings on its impact, validated by peer-reviewed studies.</p>

      <h3>The Power of AI in Diagnostics</h3>
      <p>AI processes vast datasets—medical images, symptoms—outpacing human analysis. Algorithms detect cancer, Alzheimer's, and pneumonia with 90-95% accuracy, rivaling specialists (Esteva et al., 2017). EarlyMed's MedVision AI diagnoses leukemia, brain tumors, and retinopathy via MRI/X-ray analysis, while HealthPredict AI assesses risks for heart disease and diabetes, enhancing precision and accessibility.</p>

      <h3>Speeding Up the Diagnostic Process</h3>
      <p>AI reduces diagnosis time from hours to seconds. WoundWise AI offers real-time wound treatment recommendations, and Symptom Checker provides instant insights, critical in emergencies and underserved areas (Topol, 2019).</p>

      <h3>Enhancing Accessibility and Equity</h3>
      <p>AI democratizes healthcare via smartphone platforms. MediLexica simplifies medical terms, and Specialist Finder connects remote users to professionals, addressing barriers in low-resource settings (Nundy et al., 2020).</p>

      <h3>Personalizing Treatment Through AI</h3>
      <p>AI tailors treatments using genetic and lifestyle data. Prescription Analyzer ensures safe regimens, and tools like DiabetesSense suggest preventive lifestyle changes, shifting care to proactive models (Obermeyer & Emanuel, 2016).</p>

      <h3>Challenges and Ethical Considerations</h3>
      <p>Accuracy and bias remain concerns. EarlyMed validates models with specialist input, adhering to HIPAA, while ensuring AI complements human expertise (Char et al., 2020).</p>

      <h3>The Future of AI in Healthcare</h3>
      <p>Multimodal AI and wearables promise holistic diagnostics. Natural language processing could enhance MediLexica, with EarlyMed aiming for predictive prevention (Jiang et al., 2017).</p>

      <h3>Conclusion</h3>
      <p>AI's diagnostic revolution requires collaboration among patients, providers, and developers to maximize benefits and address ethical challenges.</p>

      <h3>References</h3>
      <ul>
        <li>Char, D. S., et al. (2020). Identifying Ethical Considerations for Machine Learning Healthcare Applications. <em>The American Journal of Bioethics</em>, 20(11), 49-60.</li>
        <li>Esteva, A., et al. (2017). Dermatologist-level classification of skin cancer with deep neural networks. <em>Nature</em>, 542(7639), 115-118.</li>
        <li>Jiang, F., et al. (2017). Artificial intelligence in healthcare: past, present and future. <em>Stroke and Vascular Neurology</em>, 2(4), 230-243.</li>
        <li>Nundy, S., et al. (2020). Mobile Health Technology and Health Equity. <em>Annual Review of Public Health</em>, 41, 1-15.</li>
        <li>Obermeyer, Z., & Emanuel, E. J. (2016). Predicting the Future — Big Data, Machine Learning, and Clinical Medicine. <em>New England Journal of Medicine</em>, 375(13), 1216-1219.</li>
        <li>Topol, E. J. (2019). High-performance medicine: the convergence of human and artificial intelligence. <em>Nature Medicine</em>, 25(1), 44-56.</li>
      </ul>
    `,
    aboutAuthor: `
      <h3>About the Author</h3>
      <p>Saket Choudary Kongara is a final-year student at VIT-AP University and AI Architecture Lead for EarlyMed. His work focuses on AI-driven diagnostics for global health impact. Contact: saket.kongara@vituap.ac.in</p>
    `,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>
      <Card className="bg-white shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-teal-500"
              >
                {blogData.category}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Technology & Medicine</DropdownMenuItem>
              <DropdownMenuItem>Health Innovations</DropdownMenuItem>
              <DropdownMenuItem>AI Research</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CardTitle className="text-4xl font-bold mt-4">
            {blogData.title}
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            {blogData.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 text-gray-600">
            <div>
              <p className="font-semibold">{blogData.author}</p>
              <p className="text-sm">
                {blogData.date} | {blogData.readTime}
              </p>
            </div>
            <img
              src={blogData.image}
              alt={blogData.title}
              className="w-full md:w-1/3 mt-4 md:mt-0 rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="prose max-w-none text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
            <div className="mt-8 border-t pt-6">
              <div dangerouslySetInnerHTML={{ __html: blogData.aboutAuthor }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthcarePost;