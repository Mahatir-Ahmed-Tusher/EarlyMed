import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlzheimersDL: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  interface ResultType {
    prediction: string;
    confidence: number;
    probabilities: { [key: string]: number };
  }

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCaution, setShowCaution] = useState<boolean>(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a brain MRI scan to upload.');
      return;
    }

    setShowCaution(true);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://alzheimers-earlymed-api.onrender.com/predict-alzheimers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Error analyzing the MRI scan. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
      setShowCaution(false);
    }
  };

  // Diagnosis-specific content
  const getDiagnosisContent = () => {
    if (!result) return null;

    const prediction = result.prediction;
    let content = null;

    switch (prediction) {
      case 'Non Demented':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🟢 Healthy Stage Assessment</h3>
            <p><strong>What It Means:</strong> Your brain scan shows normal patterns with no significant signs of cognitive decline, indicating healthy brain function.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Maintain a healthy lifestyle with regular exercise and a balanced diet.</li>
              <li>Engage in brain-stimulating activities like puzzles or reading.</li>
              <li>Schedule routine medical check-ups to monitor brain health.</li>
            </ul>
            <p><strong>Stay proactive:</strong> Prevention is key to long-term brain health! 🌟</p>
          </div>
        );
        break;
      case 'Very Mild Demented':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🟡 Early Stage Assessment</h3>
            <p><strong>What It Means:</strong> Your scan indicates very mild cognitive changes, which is an early sign of potential decline. Early detection is critical for effective management.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Consult a neurologist for a comprehensive evaluation.</li>
              <li>Start cognitive exercises to stimulate brain function.</li>
              <li>Explore lifestyle changes, such as improved diet and stress management.</li>
              <li>Join support groups for early-stage guidance.</li>
            </ul>
            <p><strong>Act now:</strong> Early intervention can significantly improve outcomes! 🌟</p>
          </div>
        );
        break;
      case 'Mild Demented':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🟠 Middle Stage Assessment</h3>
            <p><strong>What It Means:</strong> Your scan shows patterns consistent with mild cognitive decline, requiring immediate attention and medical supervision.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Schedule an urgent consultation with a specialist.</li>
              <li>Discuss medication options and develop a care plan.</li>
              <li>Implement home safety modifications.</li>
              <li>Connect with support groups for patients and caregivers.</li>
            </ul>
            <p><strong>You’re not alone:</strong> Professional support can make a big difference! 🌟</p>
          </div>
        );
        break;
      case 'Moderate Demented':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🔴 Late Stage Assessment</h3>
            <p><strong>What It Means:</strong> Your scan indicates moderate cognitive decline, necessitating urgent medical attention and comprehensive care planning.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Seek immediate consultation with a healthcare provider.</li>
              <li>Establish a full-time care plan with professional support.</li>
              <li>Explore care facilities or in-home care options.</li>
              <li>Join caregiver support groups for guidance.</li>
            </ul>
            <p><strong>Help is available:</strong> Comprehensive care can improve quality of life! 🌟</p>
          </div>
        );
        break;
      default:
        return null;
    }

    return (
      <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Understanding Your Diagnosis & Next Steps 🧠💡</h2>
        {content}
        <p className="text-center mt-4 font-semibold">
          For more information, refer to <a href="/diagnobot" className="text-blue-500 hover:underline">Diagnobot</a>.
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100' : 'bg-gradient-to-br from-teal-100 via-green-100 to-orange-100 text-gray-800'}`}>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl mt-20 mb-20">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img
            src="https://i.postimg.cc/CM76kzpP/906d6c3b-498c-4924-bb12-e741f8d902a4-removalai-preview.png"
            alt="EarlyMed Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-90 text-gray-100' : 'bg-white bg-opacity-90 text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to EarlyMed Alzheimer’s Detection! 🧠✨</h2>
          <p className="mb-2">
            Early detection of Alzheimer’s can improve outcomes. Upload a brain MRI scan, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of Alzheimer’s stages (Non Demented, Very Mild Demented, Mild Demented, or Moderate Demented).
          </p>
        </div>

        {/* Upload Section */}
        <div className={`text-center p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <img
            src="https://i.postimg.cc/MH6DvPBp/icon-3.png"
            alt="Upload Icon"
            className="mx-auto w-24 mb-4"
          />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full p-3 border-2 rounded-2xl ${isDarkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span>
                  <i className="fas fa-upload mr-2"></i> Upload and Analyze
                </span>
              )}
            </button>
          </form>
          {showCaution && (
            <div className={`mt-4 p-4 rounded-2xl border-l-4 border-yellow-500 ${isDarkMode ? 'bg-gray-700 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
              <p className="font-semibold">First-Time User Notice</p>
              <p>If this is your first analysis, our backend may take up to a minute to process your MRI scan as it initializes. Subsequent analyses will be much faster. Thank you for your patience! 🚀</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {error && (
          <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-red-900 bg-opacity-90 text-red-200' : 'bg-red-100 bg-opacity-90 text-red-800'}`}>
            <p>{error}</p>
          </div>
        )}
        {result && (
          <div className={`p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
            <h3 className="text-xl font-semibold text-center mb-4">Analysis Results</h3>
            <div className="text-center">
              <h4 className="text-green-500 text-lg mb-2">
                <i className="fas fa-check-circle mr-2"></i> {result.prediction}
              </h4>
              <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
              <div className={`h-3 rounded-full overflow-hidden mt-2 mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded MRI Scan"
                  className="mx-auto rounded-lg mt-4 max-w-full h-auto"
                />
              )}
            </div>
          </div>
        )}

        {/* Dynamic Diagnosis Section */}
        {getDiagnosisContent()}

        {/* Example Scans Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Example MRI Scans 🖼️</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-center">
              <img
                src="https://i.postimg.cc/Vvh62mpx/Non-Demented.jpg"
                alt="Non Demented Scan"
                className="mx-auto rounded-lg w-48 h-48 object-cover"
              />
              <p className="mt-2 font-semibold">Non Demented</p>
            </div>
            <div className="text-center">
              <img
                src="https://i.postimg.cc/4yyy8mLv/Very-Mild-Demented.jpg"
                alt="Very Mild Demented Scan"
                className="mx-auto rounded-lg w-48 h-48 object-cover"
              />
              <p className="mt-2 font-semibold">Very Mild Demented</p>
            </div>
            <div className="text-center">
              <img
                src="https://i.postimg.cc/Y9bjf13q/milddemented.jpg"
                alt="Mild Demented Scan"
                className="mx-auto rounded-lg w-48 h-48 object-cover"
              />
              <p className="mt-2 font-semibold">Mild Demented</p>
            </div>
            <div className="text-center">
              <img
                src="https://i.postimg.cc/NGC5KkFd/Moderate-Demented.jpg"
                alt="Moderate Demented Scan"
                className="mx-auto rounded-lg w-48 h-48 object-cover"
              />
              <p className="mt-2 font-semibold">Moderate Demented</p>
            </div>
          </div>
        </div>

        {/* About Alzheimer's Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">About Alzheimer’s Disease ℹ️</h2>
          <div className="space-y-4">
            <p>Alzheimer’s is a progressive neurological disorder that impairs memory, thinking, and behavior. As the leading cause of dementia, it impacts daily life and independence over time. While no cure exists, early detection can slow progression and enhance quality of life.</p>
            <h3 className="font-semibold text-blue-500">Key Facts</h3>
            <ul className="list-disc list-inside">
              <li>Affects millions worldwide, with rising prevalence.</li>
              <li>Early signs include memory loss, confusion, and difficulty with routine tasks.</li>
              <li>Advanced stages may require full-time care.</li>
            </ul>
            <p><strong>Why Early Detection Matters:</strong> Early diagnosis enables timely interventions, improving outcomes for patients and caregivers.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does EarlyMed Alzheimer’s Detection Work? 🤖🧠</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes brain MRI scans to provide a preliminary assessment of Alzheimer’s stages in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your MRI Scan:</strong> Upload a clear MRI scan of the brain.</p>
            <p><strong>2️⃣ AI-Powered Image Processing:</strong> Our deep learning model, trained on thousands of MRIs, processes your scan.</p>
            <p><strong>3️⃣ Classification & Prediction:</strong> The model classifies the image into Non Demented, Very Mild Demented, Mild Demented, or Moderate Demented, with a confidence score.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed in seconds. Consult a doctor for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Trained on thousands of MRI scans for robust accuracy.</li>
              <li>Uses a Convolutional Neural Network (CNN) for precision.</li>
              <li>Fast, accessible, and continuously improving.</li>
            </ul>
            <p className="text-center font-semibold mt-4">⚠️ Always consult medical professionals for guidance.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`p-6 rounded-3xl shadow-lg border-l-4 border-yellow-500 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h3 className="font-semibold mb-2">⚠️ Disclaimer</h3>
          <p>We strongly urge users to consult a healthcare professional for appropriate medical guidance after getting the diagnosis.</p>
          <p>Developed by the team at VIT-AP University to empower individuals with AI-driven early detection and healthcare awareness.</p>
        </div>
      </main>
    </div>
  );
};

export default AlzheimersDL;