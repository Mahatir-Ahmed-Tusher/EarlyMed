import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AnalysisResult {
  prediction: string;
  grade: string;
  confidence_levels: Record<string, number>;
  bright_lesions?: number;
  red_lesions?: number;
  total_affected?: number;
  overlay_image?: string;
}

const Retinopathy: React.FC = () => {
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
      const response = await axios.post('http://localhost:8010/analyze/', formData, {
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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100' : 'bg-gradient-to-br from-teal-100 via-green-100 to-orange-100 text-gray-800'}`}>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl mt-20 mb-20">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img
            src="https://i.postimg.cc/pTVpQ3QF/ec2d989a-b5d8-4005-8c18-1d748fbea3bd-removalai-preview.png"
            alt="EarlyMed Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-90 text-gray-100' : 'bg-white bg-opacity-90 text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to EarlyMed Diabetic Retinopathy Detection! 👁️✨</h2>
          <p className="mb-2">
            Early detection of Diabetic Retinopathy can prevent vision loss. Upload a retinal scan, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of Diabetic Retinopathy stages (No DR, Mild, Moderate, Severe, or Proliferative DR).
          </p>
        </div>

        {/* Upload Section */}
        <div className={`text-center p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <img
            src="https://i.postimg.cc/MH6DvPBp/icon-3.png"
            alt="Upload Icon"
            className="mx-auto w-24 mb-4"
          />
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
              className={`mt-4 w-full py-3 px-6 rounded-2xl text-white font-semibold ${loading || !image ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg'}`}
            >
              <i className="fas fa-upload mr-2"></i> {loading ? 'Analyzing...' : 'Analyze'}
            </button>
            <a 
              href="https://huggingface.co/spaces/MahatirTusher/EarlyMed-Retinopathy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full py-3 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg text-center"
            >
              Try this on Huggingface 🤗
            </a>
            </div>
          </div>


        {/* Results Section */}
        {error && (
          <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-red-900 bg-opacity-90 text-red-200' : 'bg-red-100 bg-opacity-90 text-red-800'}`}>
            <p>{error}</p>
          </div>
        )}
        {result && (
          <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
            <h3 className="text-xl font-semibold text-center mb-4">Analysis Results</h3>
            <div className="text-center">
              <h4 className="text-lg font-medium mb-2">Classification Results</h4>
              <p><strong>Prediction:</strong> {result.prediction}</p>
              <p><strong>Grade:</strong> {result.grade}</p>
              <h4 className="text-md font-medium mt-4 mb-2">Confidence Levels</h4>
              {Object.entries(result.confidence_levels).map(([name, prob]) => (
                <div key={name} className="mb-2">
                  <div className="flex justify-between">
                    <span>{name}</span>
                    <span>{(prob as number).toFixed(1)}%</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${prob}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              {result.prediction !== "No_DR" && (
                <>
                  <h4 className="text-lg font-medium mt-6 mb-2">Lesion Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p><strong>Bright Lesions:</strong> {result.bright_lesions?.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p><strong>Red Lesions:</strong> {result.red_lesions?.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p><strong>Total Affected:</strong> {result.total_affected?.toFixed(2)}%</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Lesion Overlay</h4>
                  <img src={result.overlay_image} alt="Overlay" className="mx-auto rounded-lg mt-4 max-w-full h-auto" />
                </>
              )}
            </div>
          </div>
        )}

        {/* About Diabetic Retinopathy Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">About Diabetic Retinopathy ℹ️</h2>
          <div className="space-y-4">
            <p>Diabetic Retinopathy is a complication of diabetes that affects the eyes, caused by damage to the blood vessels of the retina. It’s a leading cause of blindness among adults.</p>
            <h3 className="font-semibold text-blue-500">Key Facts</h3>
            <ul className="list-disc list-inside">
              <li>Affects millions of people with diabetes worldwide.</li>
              <li>Early signs include blurred vision, floaters, and difficulty seeing colors.</li>
              <li>Advanced stages can lead to severe vision loss if untreated.</li>
            </ul>
            <p><strong>Why Early Detection Matters:</strong> Early diagnosis can prevent vision loss through timely interventions.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does EarlyMed Diabetic Retinopathy Detection Work? 🤖👁️</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes retinal scans to provide a preliminary assessment of Diabetic Retinopathy stages in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your Retinal Scan:</strong> Upload a clear retinal scan image.</p>
            <p><strong>2️⃣ AI-Powered Image Processing:</strong> Our deep learning models process your scan for classification and lesion detection.</p>
            <p><strong>3️⃣ Classification & Segmentation:</strong> The model classifies the image into stages (No DR, Mild, Moderate, Severe, Proliferative DR) and detects lesions if present.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed in seconds. Consult a doctor for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Uses a ResNet152 model for classification and a UNet model for lesion segmentation.</li>
              <li>Trained on diverse retinal datasets for accuracy.</li>
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

export default Retinopathy;