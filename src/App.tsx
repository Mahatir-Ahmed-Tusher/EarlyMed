import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import OurStoryPage from './pages/OurStoryPage';
import FindSpecialistPage from './pages/FindSpecialistPage';
import NotFound from './pages/NotFound';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AccessibilityPage from './pages/AccessibilityPage'; 
import PartnershipsPage from './pages/PartnershipsPage';
import HowPage from './pages/HowPage';
import VideosPage from './pages/VideosPage';
import MediReport from './pages/MediReport';
import WoundWise from './pages/WoundWise';
import Autism from './pages/Autism';
import OralHygieneRiskAssessment from './pages/OralHygieneRiskAssessment';
import EyeStrainAssessment from './pages/EyeStrainAssessment';
import Voicebot from './pages/Voicebot';
import MedicalFactChecker from './pages/MedicalFactChecker';

// Import for MentalHealthHub
import MentalHealthHub from './pages/MentalHealthHub';

// Import for EarlyMedBot
import EarlyMedBot from './pages/EarlyMedBot';

// Import for PrescriptionAnalyzer
import PrescriptionAnalyzer from './pages/PrescriptionAnalyzer';
// Import for NutriSense
import NutriSense from './pages/NutriSense';
// Import for DiagnoBot
import DiagnoBot from './pages/DiagnoBot';
// Import for Medilexica
import Medilexica from './pages/Medilexica';
// Import for dental and eye
import ToothWise from './pages/ToothWise';
// Import for DrugScan
import DrugScan from './pages/DrugScan';

// import for specialist finder
import SpecialistFinder from './pages/SpecialistFinder';

// Imports for mental health hub
import MentalHealthRiskAI from './pages/mentalhealth/MentalHealthRiskAI';
import Medicare from './pages/mentalhealth/Medicare';
import Manasmitra from './pages/mentalhealth/Manasmitra';

// Imports for DL models

import TumorDetect from './pages/TumorDetect';
import LeukemiaDetect from './pages/LeukemiaDetect';
import AlzheimersDL from './pages/AlzheimersDL';
import Retinopathy from './pages/Retinopathy';
import Pneumonia from './pages/Pneumonia';
import OptiScan from './pages/OptiScan';

// Import for HealthPredict section
import HeartRisk from './pages/HeartRisk';
import CogniTrack from './pages/CogniTrack';
import BreastCancer from './pages/BreastCancer';
import Diabetes from './pages/Diabetes';
import Stroke from './pages/Stroke';


// Import for blog posts
import AIHealthcarePost from './pages/blog/AIHealthcarePost';
import EarlyDetectionPost from './pages/blog/EarlyDetectionPost';
import CardiovascularHealthPost from './pages/blog/CardiovascularHealthPost';
import NutritionGuidelinesPost from './pages/blog/NutritionGuidelinesPost';
import MentalHealthPost from './pages/blog/MentalHealthPost';
import SleepHealthPost from './pages/blog/SleepHealthPost';
import ImmuneSystemPost from './pages/blog/ImmuneSystemPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="our-story" element={<OurStoryPage />} />
          <Route path="find-specialist" element={<FindSpecialistPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="partnerships" element={<PartnershipsPage />} />
          <Route path="how" element={<HowPage />} />
          <Route path="videospage" element={<VideosPage />} />
          <Route path="medi-report" element={<MediReport />} />
          <Route path="voicebot" element={<Voicebot />} />
          
          {/* AI Feature Routes */}
          <Route path="chatbot" element={<EarlyMedBot />} />
          <Route path="analyzer" element={<PrescriptionAnalyzer />} />
          <Route path="nutrisense" element={<NutriSense />} />
          <Route path="diagnobot" element={<DiagnoBot />} />
          <Route path="medilexica" element={<Medilexica />} />
          <Route path="woundwise" element={<WoundWise />} />
          <Route path="drugscan" element={<DrugScan />} />
          <Route path="medifact" element={<MedicalFactChecker />} />

          
          
          
         {/* Specialist Finder */}
         <Route path="specialist-finder" element={<SpecialistFinder />} />

          {/* DL Models */}
          <Route path="tumor-detect" element={<TumorDetect />} />
          <Route path="leukemia-detect" element={<LeukemiaDetect />} />
          <Route path="alzheimersdetect" element={<AlzheimersDL />} />
          <Route path="retinopathy" element={<Retinopathy />} />
          <Route path="pneumonia" element={<Pneumonia />} />
          <Route path="optiscan" element={<OptiScan />} />
          
          
          {/* HealthPredict AI Services */}

          <Route path="heart-risk" element={<HeartRisk />} />
          <Route path="cogni-track" element={<CogniTrack />} />
          <Route path="breast-cancer" element={<BreastCancer />} />
          <Route path="diabetes" element={<Diabetes />} />
          <Route path="stroke" element={<Stroke />} />
          
       

          {/* Additional Pages */}
          <Route path="mental-health-hub" element={<MentalHealthHub />} />
          <Route path="toothwise" element={<ToothWise />} />
          <Route path="autism" element={<Autism />} />
          <Route path="oral-hygiene-risk-assessment" element={<OralHygieneRiskAssessment />} />
          <Route path="eye-strain-assessment" element={<EyeStrainAssessment />} />
        

          
          {/* Mental Health Related pages */}

          <Route path="mentalhealth/mentalhealthriskai" element={<MentalHealthRiskAI />} />
          <Route path="mentalhealth/medicare" element={<Medicare />} />
          <Route path="mentalhealth/manasmitra" element={<Manasmitra />} />
          
          
          
          {/* Blog Page */}
          {/* Blog Post Routes */}
          <Route path="blog/ai-healthcare" element={<AIHealthcarePost />} />
          <Route path="blog/early-detection" element={<EarlyDetectionPost />} />
          <Route path="blog/cardiovascular-health" element={<CardiovascularHealthPost />} />
          <Route path="blog/nutrition-guidelines" element={<NutritionGuidelinesPost />} />
          <Route path="blog/mental-health" element={<MentalHealthPost />} />
          <Route path="blog/sleep-health" element={<SleepHealthPost />} />
          <Route path="blog/immune-system" element={<ImmuneSystemPost />} />
          {/* Add more blog post routes as needed */}
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;