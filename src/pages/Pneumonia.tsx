import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AnalysisResult {
  prediction: string;
  confidence: string; // Updated to handle percentage string (e.g., "85.23%")
}

const Pneumonia: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
    return () => mediaQuery.removeEventListener('change', (e) => setIsDarkMode(e.matches));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    } else {
      setError('Please upload a JPEG or PNG image.');
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('https://pneumo-earlymed-api.onrender.com/analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || 'An error occurred while analyzing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-gray-800'}`}>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl mt-20 mb-20">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img
            src="https://i.postimg.cc/CMqrZ5Pq/92aaee61-1ae6-4280-ba00-3477f82c1f4d-removalai-preview.png"
            alt="PneuNet Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to PneuNet! 🩺✨</h2>
          <p className="mb-2">
            Early detection of pneumonia can save lives. Upload a chest X-ray, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of pneumonia presence.
          </p>
        </div>

        {/* Upload Section */}
        <div className={`text-center p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div className="mx-auto w-24 mb-4">
            <svg className="w-24 h-24 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <div>
            <label className="block mb-2">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500">
                <p className="text-gray-600">Click to upload (JPEG/PNG, max 5MB)</p>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-full rounded-lg shadow-md" />
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading || !image}
              className={`mt-4 w-full py-3 px-6 rounded-2xl text-white font-semibold ${loading || !image ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl glow-button'}`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {error && (
          <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-red-100/30 border border-red-200 mb-8 ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
            <p>{error}</p>
          </div>
        )}
        {result && (
          <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            <h3 className="text-xl font-semibold text-center mb-4">Analysis Results</h3>
            <div className="text-center">
              <h4 className="text-lg font-medium mb-2">Diagnosis: {result.prediction}</h4>
              <h4 className="text-md font-medium mt-4 mb-2">Confidence</h4>
              <div className="mb-2">
                <div className="flex justify-between">
                  <span>{result.prediction}</span>
                  <span>{result.confidence}</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${parseFloat(result.confidence)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Report Section */}
            <div className="mt-6 p-4 rounded-2xl shadow-inner backdrop-blur-md bg-white/20">
              <h4 className="text-lg font-medium mb-2">Report & Recommendations</h4>
              {result.prediction === "Pneumonia" ? (
                <div>
                  <p className="mb-2"><strong>Diagnosis:</strong> Pneumonia detected.</p>
                  <p className="mb-2"><strong>What to Do:</strong></p>
                  <ul className="list-disc list-inside">
                    <li>Consult a healthcare provider immediately for a detailed evaluation.</li>
                    <li>Follow prescribed treatments, which may include antibiotics if bacterial, or antivirals if viral.</li>
                    <li>Rest and stay hydrated to support recovery.</li>
                    <li>Avoid spreading infection: Cover your mouth when coughing, wash hands frequently, and isolate if possible.</li>
                    <li>Monitor symptoms: Seek emergency care if you experience severe difficulty breathing, chest pain, or confusion.</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="mb-2"><strong>Diagnosis:</strong> No pneumonia detected.</p>
                  <p className="mb-2"><strong>How to Stay Healthy:</strong></p>
                  <ul className="list-disc list-inside">
                    <li>Maintain good hygiene: Wash hands regularly and avoid touching your face.</li>
                    <li>Stay vaccinated: Get the pneumococcal vaccine and annual flu shots.</li>
                    <li>Avoid smoking and limit exposure to air pollutants.</li>
                    <li>Strengthen your immune system with a balanced diet, exercise, and adequate sleep.</li>
                    <li>Monitor your health: If you develop symptoms like cough or fever, consult a doctor promptly.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* About Pneumonia Section */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">About Pneumonia ℹ️</h2>
          <div className="space-y-4">
            <p>Pneumonia is a serious infection that inflames the air sacs in one or both lungs. It can be caused by bacteria, viruses, or fungi, leading to symptoms such as cough, fever, and difficulty breathing.</p>
            <h3 className="font-semibold text-blue-500">Key Facts</h3>
            <ul className="list-disc list-inside">
              <li>Affects millions globally, especially children and the elderly.</li>
              <li>Early signs include cough, fever, chills, and fatigue.</li>
              <li>Can lead to severe complications if untreated.</li>
            </ul>
            <p><strong>Why Early Detection Matters:</strong> Early diagnosis can prevent complications through timely interventions.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does PneuNet Work? 🤖🩺</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes chest X-rays to provide a preliminary assessment of pneumonia in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your Chest X-ray:</strong> Upload a clear chest X-ray image.</p>
            <p><strong>2️⃣ AI-Powered Analysis:</strong> Our deep learning model processes your X-ray.</p>
            <p><strong>3️⃣ Classification:</strong> The model classifies the image as Normal or Pneumonia.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed with confidence levels. Consult a doctor for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Uses a trained deep learning model for accurate classification.</li>
              <li>Trained on extensive chest X-ray datasets.</li>
              <li>Fast, accessible, and continuously improving.</li>
            </ul>
            <p className="text-center font-semibold mt-4">⚠️ Always consult medical professionals for guidance.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8 text-sm opacity-75">
          <p>Please note that we strongly recommend users to consult with a medical professional for appropriate medical advice after receiving the diagnosis.</p>
          <p>Developed by VIT-AP University team to empower people through early detection and healthcare awareness using AI.</p>
        </div>
      </main>

      {/* Inline CSS for glowing buttons */}
      <style>
        {`
          .glow-button {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(34, 197, 94, 0.3);
            transition: box-shadow 0.3s ease;
          }
          .glow-button:hover {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(34, 197, 94, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default Pneumonia;