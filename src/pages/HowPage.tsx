import React from 'react';
import { Link } from "react-router-dom";

const HowPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-teal-600 dark:text-teal-400">
            Welcome to EarlyMed: Your Partner in Proactive Healthcare
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            At EarlyMed, we’re revolutionizing the way you approach your health with cutting-edge AI technology designed to detect issues early, provide personalized insights, and connect you with the care you need. Our platform, built with a "Early Detection, Smarter Decision" philosophy, offers a responsive design with dark/light mode support, modern glassmorphism UI elements, and compelling health-focused content—all crafted with accessibility and performance in mind using best practices in React development and modern web standards. Whether you’re a patient seeking clarity or a healthcare professional looking to enhance your practice, EarlyMed is here to empower your health journey.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Below, we’ll take you on a detailed, easy-to-understand tour of how each of our health-related features and tools works. From primary AI tools that analyze your symptoms and images to additional healthcare resources and professional features, we’ve designed every component to be user-friendly yet powerful. Let’s dive into the world of EarlyMed and discover how these innovations can transform your healthcare experience!
          </p>
        </div>
      </section>

      {/* Primary AI Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            Primary AI Tools: Your First Line of Health Defense
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            EarlyMed’s primary AI tools are the heart of our platform, leveraging advanced machine learning and deep learning to provide accurate, actionable health insights. Here’s how each one works in a way that’s clear and approachable, even if you’re not a tech expert.
          </p>

          {/* Symptom Checker */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              EarlyMedBot: Understanding Your Symptoms with Precision
            </h3>
            <img
              src="https://i.postimg.cc/m2jBgHzD/image.png"
              alt="Symptom Checker UI Screenshot"
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our EarlymedBot is like having a knowledgeable health assistant at your fingertips. This AI-powered system lets you input your symptoms—whether it’s a persistent cough, fatigue, or a headache—and provides personalized health insights to guide you. <strong>How it works:</strong> We’ve integrated the API key of Mistral AI, a highly capable language model, to analyze your symptoms and suggest possible conditions. For example, if you mention a fever and sore throat, it might indicate a cold or strep throat. This tool draws from a vast pool of medical knowledge to give you a starting point, helping you decide whether to monitor at home or seek a doctor. It’s designed to be intuitive, with a simple interface where you select or type your symptoms, and the AI delivers results in plain language—perfect for anyone wanting a quick health overview.
              </p>
            </div>
          </div>

          {/* DiagnoBot */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              DiagnoBot: Your Virtual Doctor with Reliable Guidance
            </h3>
            <img
              src="https://example.com/diagnobot-ui-placeholder.png"
              alt="DiagnoBot UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Think of DiagnoBot as your personal AI doctor, available 24/7 to offer preliminary medical guidelines. This tool goes beyond general advice by using a sophisticated approach to ensure accuracy. <strong>How it works:</strong> We’ve converted the *GALE ENCYCLOPEDIA of MEDICINE, Second Edition* into a vector database using Retrieval Augmented Generation (RAG) technology. This means DiagnoBot retrieves specific, verified medical information from this encyclopedia rather than relying solely on the language model’s general knowledge, which can sometimes lead to "hallucinations" (fictional answers). By setting the temperature to 0, we ensure the responses are precise and grounded in real data. For instance, if you ask about chest pain, DiagnoBot will pull relevant entries about heart conditions or muscle strain, offering guidelines like rest or when to see a specialist. It’s a reliable companion for initial health concerns, bridging the gap until you consult a professional.
              </p>
            </div>
          </div>

          {/* WoundWise AI */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              WoundWise AI: Expert Wound Analysis at Your Fingertips
            </h3>
            <img
              src="https://example.com/woundwise-ui-placeholder.png"
              alt="WoundWise AI UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                WoundWise AI is a game-changer for assessing wounds or skin conditions from the comfort of home. This tool uses advanced technology to analyze images you upload and provide treatment recommendations. <strong>How it works:</strong> Built on the GoogLeNet architecture, a state-of-the-art deep learning model, WoundWise AI has been trained on thousands of medical images. Here’s the step-by-step process:
                <ol className="list-decimal ml-6 mt-2">
                  <li><strong>Image Analysis:</strong> You upload a photo of a wound (e.g., a cut or rash), and the AI uses computer vision to examine it.</li>
                  <li><strong>Wound Identification:</strong> It recognizes 18 different types, such as burns, ulcers, or infections, with high precision.</li>
                  <li><strong>Confidence Scores:</strong> The system assigns a confidence level (e.g., 95% sure it’s an infection), so you know how reliable the analysis is.</li>
                  <li><strong>Guidelines:</strong> It then generates tailored advice, like cleaning with antiseptic or seeking urgent care if it detects severity.</li>
                </ol>
                Validated by medical professionals, this tool achieves impressive accuracy, making it a trusted ally for monitoring skin health and deciding next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MedVision AI Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            MedVision AI: Image-Based Diagnosis for Early Detection
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            MedVision AI takes image analysis to the next level, offering specialized tools for detecting serious conditions through visual data. Let’s explore its key features:
          </p>

          {/* Leukemia Detection */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Leukemia Detection: Spotting Acute Lymphoblastic Leukemia Early
            </h3>
            <img
              src="https://example.com/leukemia-detection-ui-placeholder.png"
              alt="Leukemia Detection UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This feature focuses on early detection of Acute Lymphoblastic Leukemia (ALL) using peripheral blood smear images. <strong>How it works:</strong>
                <ul className="list-disc ml-6 mt-2">
                  <li><strong>Image Processing:</strong> The AI resizes and normalizes your uploaded image to match its training data, ensuring consistent analysis.</li>
                  <li><strong>Feature Extraction:</strong> A Vision Transformer, a cutting-edge AI model, scans the image to spot subtle differences in cell shapes and structures that might indicate leukemia.</li>
                  <li><strong>Classification:</strong> It categorizes the image into four stages—BENIGN (no issues), EARLY, PRE, or PRO (progressive stages of ALL)—giving you a clear picture of the risk.</li>
                </ul>
                <strong>Why it’s reliable:</strong> Trained on thousands of diverse samples, validated rigorously, and updated regularly with the latest medical insights, this tool uses top-tier technology to catch leukemia early, potentially saving lives with timely intervention.
              </p>
            </div>
          </div>

          {/* Pneumonia Diagnosis */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Pneumonia Diagnosis: Insightful X-Ray Analysis
            </h3>
            <img
              src="https://example.com/pneumonia-diagnosis-ui-placeholder.png"
              alt="Pneumonia Diagnosis UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                MedVision AI includes two pneumonia detection tools: PneumoInsight and PneumoNet, both built with ResNet50, a deep learning model.
                <ul className="list-disc ml-6 mt-2">
                  <li><strong>PneumoInsight:</strong> This tool classifies pneumonia into three stages (mild, moderate, severe) and uses an attention map to highlight affected areas on the X-ray, showing you exactly where the problem lies.</li>
                  <li><strong>PneumoNet:</strong> A simpler yes/no classifier to confirm pneumonia presence.</li>
                </ul>
                <strong>How it works:</strong> Upload a chest X-ray, and the AI analyzes it using deep learning. The attention map acts like a spotlight, pointing out lung regions with abnormalities, while the classification tells you the severity or presence of pneumonia.
              </p>
            </div>
          </div>

          {/* Alzheimer MRI Analysis */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Alzheimer MRI Analysis: Early Brain Health Monitoring
            </h3>
            <img
              src="https://example.com/alzheimer-mri-ui-placeholder.png"
              alt="Alzheimer MRI Analysis UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This feature detects Alzheimer’s in its early stages using brain MRI scans. <strong>How it works:</strong> Trained on over 7,000 images with transfer learning (a technique that builds on pre-existing models), it classifies scans into non-demented, very mild demented, mild demented, or demented categories. Upload your MRI, and the AI compares it against its vast dataset to identify patterns of brain shrinkage or damage linked to Alzheimer’s, offering early warnings for further evaluation.
              </p>
            </div>
          </div>

          {/* Brain Tumor Detection */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Brain Tumor Detection: Precise MRI Insights
            </h3>
            <img
              src="https://example.com/brain-tumor-ui-placeholder.png"
              alt="Brain Tumor Detection UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Brain Tumor Detection uses MRI analysis to identify tumors. <strong>How it works:</strong> Trained on nearly 4,000 brain MRI images with the VGG16 model, it classifies tumors into pituitary, glioma, meningioma, or no tumor categories. Upload an MRI scan, and the AI pinpoints tumor locations and types, aiding in early diagnosis and treatment planning.
              </p>
            </div>
          </div>

          {/* Retinopathy Scanner */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Retinopathy Scanner: Eye Health for Diabetes Detection
            </h3>
            <img
              src="https://example.com/retinopathy-scanner-ui-placeholder.png"
              alt="Retinopathy Scanner UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Retinopathy Scanner checks the fundus (back of the eye) for signs of diabetic retinopathy. <strong>How it works:</strong> You upload an eye image, and the AI analyzes blood vessel changes or leaks, indicating diabetes-related eye damage. It’s a non-invasive way to catch this complication early, prompting you to consult an eye specialist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HealthPredict AI Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            HealthPredict AI: Symptom-Based Health Forecasts
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            HealthPredict AI uses symptom-based analysis to predict risks for various conditions, employing multiple machine learning models for accuracy.
          </p>

          {/* Heart Risk Assessment */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Heart Risk Assessment: Comprehensive Heart Health Check
            </h3>
            <img
              src="https://example.com/heart-risk-ui-placeholder.png"
              alt="Heart Risk Assessment UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tool evaluates your heart health based on symptoms like chest pain or shortness of breath. <strong>How it works:</strong> It trains models like logistic regression, random forest, and XGBoost, then selects the highest-accuracy model for deployment. Input your symptoms, and it assesses your heart risk, suggesting lifestyle changes or medical consultation.
              </p>
            </div>
          </div>

          {/* Stroke Risk Predictor */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Stroke Risk Predictor: Quantifying Stroke Risk
            </h3>
            <img
              src="https://example.com/stroke-risk-ui-placeholder.png"
              alt="Stroke Risk Predictor UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This feature assesses stroke risk with a dual approach. <strong>How it works:</strong> Using ensemble learning, it classifies risk (yes/no) and predicts a percentage via regression. Enter symptoms like numbness or speech issues, and get a clear risk profile to guide your next steps.
              </p>
            </div>
          </div>

          {/* Breast Cancer Analysis */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Breast Cancer Analysis: Early Detection from Images
            </h3>
            <img
              src="https://example.com/breast-cancer-ui-placeholder.png"
              alt="Breast Cancer Analysis UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tool analyzes mammograms and clinical reports for breast cancer. <strong>How it works:</strong> A CNN-based model processes images, combined with supervised learning on clinical data, to detect early signs. Upload your report or image, and it flags potential issues for further testing.
              </p>
            </div>
          </div>

          {/* DiabetesSense */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              DiabetesSense: Lifestyle and Medical Risk Assessment
            </h3>
            <img
              src="https://example.com/diabetessense-ui-placeholder.png"
              alt="DiabetesSense UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                DiabetesSense evaluates diabetes risk. <strong>How it works:</strong> It uses feature importance analysis to pinpoint key factors (e.g., diet, weight) and applies gradient boosting for prediction. Share your lifestyle details and medical history, and get a personalized risk score.
              </p>
            </div>
          </div>

          {/* CogniTrack */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              CogniTrack: Alzheimer’s Risk from Behavior
            </h3>
            <img
              src="https://example.com/cognitrack-ui-placeholder.png"
              alt="CogniTrack UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CogniTrack assesses Alzheimer’s risk. <strong>How it works:</strong> It uses NLP to analyze cognitive test responses and time-series modeling for behavioral changes. Input your behavior data, and it estimates your risk, encouraging early cognitive health checks.
              </p>
            </div>
          </div>

          {/* AutismDetect */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              AutismDetect: Early Autism Insights
            </h3>
            <img
              src="https://example.com/autismdetect-ui-placeholder.png"
              alt="AutismDetect UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tool detects autism early. <strong>How it works:</strong> Multimodal learning combines medical data with behavioral observations. Provide details about behavior and history, and it offers insights to discuss with a specialist.
              </p>
            </div>
          </div>

          {/* CycleSync */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              CycleSync: Menstrual Cycle Tracking
            </h3>
            <img
              src="https://example.com/cyclesync-ui-placeholder.png"
              alt="CycleSync UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CycleSync tracks and predicts menstrual cycles. <strong>How it works:</strong> Using LSTM neural networks, it analyzes historical patterns to predict cycles and flag anomalies. Log your cycle data, and get tailored predictions and health tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Healthcare Tools Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            Additional Healthcare Tools: Enhancing Your Wellness
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            These tools complement our AI diagnostics with practical health support.
          </p>

          {/* NutriSense */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              NutriSense: Personalized Diet Planning
            </h3>
            <img
              src="https://example.com/nutrisense-ui-placeholder.png"
              alt="NutriSense UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                NutriSense creates diet plans tailored to you. <strong>How it works:</strong> Input your daily habits, preferences, region, and health goals, and the AI generates a meal plan with balanced nutrition. It’s like having a dietitian in your pocket, adjusting suggestions based on your lifestyle.
              </p>
            </div>
          </div>

          {/* MediLexica */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              MediLexica: Your Medical Dictionary
            </h3>
            <img
              src="https://example.com/medilexica-ui-placeholder.png"
              alt="MediLexica UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                MediLexica simplifies medical terms. <strong>How it works:</strong> Using LangChain and RAG, it draws from three books—*Webster's New World Medical Dictionary*, *Dictionary of Medical Terms*, and *AMA Glossary of Medical Terms*. Ask about “hypertension,” and it explains it clearly, pulling verified definitions.
              </p>
            </div>
          </div>

          {/* Prescription Analyzer */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Prescription Analyzer: Understanding Your Medications
            </h3>
            <img
              src="https://i.postimg.cc/W3qWtcdb/image.png"
              alt="Prescription Analyzer UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This tool checks medication interactions. <strong>How it works:</strong>
                <ol className="list-decimal ml-6 mt-2">
                  <li><strong>Upload Your Document:</strong> Snap a photo of your prescription or report.</li>
                  <li><strong>AI Analysis:</strong> The Groq API (powered by llama-3.2-11b-vision-preview) extracts details using computer vision and NLP, ensuring privacy with no permanent storage.</li>
                  <li><strong>Get Insights:</strong> It translates complex terms into simple language, e.g., explaining that “metformin” manages blood sugar.</li>
                </ol>
                It enhances readability and safety, helping you understand your treatment plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Professional Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            Healthcare Professional Features: Connecting You to Experts
          </h2>

          {/* Specialist Finder */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Specialist Finder: Locate the Right Care
            </h3>
            <img
              src="https://example.com/specialist-finder-ui-placeholder.png"
              alt="Specialist Finder UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Specialist Finder helps you find healthcare experts. <strong>How it works:</strong> Enter your location and condition (e.g., diabetes), and the tool lists specialists with availability. It’s a straightforward way to connect with the right professional.
              </p>
            </div>
          </div>

          {/* Appointment Booking System */}
          <div className="mb-12">
            <h3 className="text-2xl font-poppins font-semibold mb-4 text-teal-500 dark:text-teal-300">
              Appointment Booking System (Coming Soon)
            </h3>
            <img
              src="https://example.com/appointment-booking-ui-placeholder.png"
              alt="Appointment Booking System UI Screenshot"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg mb-6"
            />
            <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This upcoming feature will let you schedule appointments directly. <strong>How it works:</strong> Once live, you’ll select a specialist and time slot, with the AI coordinating based on availability—stay tuned!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How EarlyMed Works for You Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12 text-teal-600 dark:text-teal-400">
            How EarlyMed Works for You
          </h2>
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl p-6 shadow-lg border border-teal-200/50 dark:border-teal-700/50">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Each tool integrates AI for early detection and prevention, with user-friendly interfaces. Start by exploring the Symptom Checker or uploading an image to MedVision AI, then use Specialist Finder to connect with care. Our responsive design adapts to your device, and the glassmorphism UI adds a modern, sleek feel. With dark/light mode, it’s comfortable anytime, while accessibility ensures everyone can use it.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              EarlyMed is your partner in health, blending technology with compassion. Whether you’re tracking your cycle with CycleSync or analyzing a wound with WoundWise AI, we’re here to make healthcare smarter, accessible, and proactive. Ready to start? Explore our services or contact us to learn more!
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              Explore Our Services
            </Link>
            <Link
              to="/contact"
              className="ml-4 inline-block bg-transparent border border-teal-500 text-teal-500 font-semibold py-3 px-8 rounded-full hover:bg-teal-500 hover:text-white transition-colors dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowPage;