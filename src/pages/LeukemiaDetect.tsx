import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeukemiaDetect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  interface ResultType {
    prediction: string;
    confidence: number;
  }

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
      setError('Please select a blood sample image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8004/predict-leukemia', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      setError('Error analyzing the blood sample. Please try again.');
      setResult(null);
    }
  };

  // Diagnosis-specific content
  const getDiagnosisContent = () => {
    if (!result) return null;

    const prediction = result.prediction.toLowerCase();
    let content = null;

    switch (prediction) {
      case 'nocancer':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">✅ No Cancer Detected</h3>
            <p><strong>What It Means:</strong> No signs of leukemia were detected in your blood sample.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>If you have symptoms like fatigue, fever, or bruising, consult a doctor.</li>
              <li>Maintain regular health check-ups to monitor your blood health.</li>
            </ul>
          </div>
        );
        break;
      case 'early':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🩺 Early Stage Leukemia</h3>
            <p><strong>What It Means:</strong> Early signs of leukemia were detected, indicating the initial stage of the disease.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Consult a hematologist for a detailed blood test and bone marrow examination.</li>
              <li>Early treatment may include monitoring or targeted therapy.</li>
              <li>Maintain a healthy diet and avoid infections.</li>
            </ul>
          </div>
        );
        break;
      case 'pre':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🩺 Pre-Leukemic Stage</h3>
            <p><strong>What It Means:</strong> Your blood sample shows pre-leukemic changes, which may progress if untreated.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Seek a hematologist for further tests, such as a bone marrow biopsy.</li>
              <li>Treatment may involve monitoring or preventive therapies.</li>
              <li>Focus on immune health and regular medical follow-ups.</li>
            </ul>
          </div>
        );
        break;
      case 'pro':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🩺 Proliferative Stage Leukemia</h3>
            <p><strong>What It Means:</strong> Advanced leukemia was detected, indicating a proliferative stage requiring immediate attention.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Urgently consult a hematologist or oncologist for treatment planning.</li>
              <li>Treatment may include chemotherapy, immunotherapy, or stem cell transplant.</li>
              <li>Follow medical advice closely and seek support for care.</li>
            </ul>
          </div>
        );
        break;
      default:
        return null;
    }

    return (
      <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Understanding Your Diagnosis & Next Steps 🩺💡</h2>
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
            src="https://i.postimg.cc/mkWSQyp1/0b08d177-299c-4fcc-b978-540c2d143f10-removalai-preview.png"
            alt="EarlyMed Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-90 text-gray-100' : 'bg-white bg-opacity-90 text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to EarlyMed Leukemia Detection! 🩺✨</h2>
          <p className="mb-2">
            Early detection of leukemia can be life-saving. Upload a blood sample image, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of leukemia stages (No Cancer, Early, Pre-Leukemic, or Proliferative).
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
              <i className="fas fa-upload mr-2"></i> Upload and Analyze
              </button>
              <a
              href="https://huggingface.co/spaces/MahatirTusher/EarlyMed-Acute-Lymphoblastic-Leukemia-Diagnosis"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
              Try it on Huggingface
              </a>
            </div>
            </form>
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
                  alt="Uploaded Blood Sample"
                  className="mx-auto rounded-lg mt-4 max-w-full h-auto"
                />
              )}
            </div>
          </div>
        )}

        {/* Dynamic Diagnosis Section */}
        {getDiagnosisContent()}

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does EarlyMed Leukemia Detection Work? 🤖🩺</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes blood sample images to provide a preliminary assessment of leukemia stages in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your Blood Sample:</strong> Upload a clear image of your blood sample.</p>
            <p><strong>2️⃣ AI-Powered Image Processing:</strong> Our deep learning model, trained on thousands of blood samples, processes your image.</p>
            <p><strong>3️⃣ Classification & Prediction:</strong> The model classifies the image into No Cancer, Early, Pre-Leukemic, or Proliferative stages, with a confidence score.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed in seconds. Consult a doctor for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Trained on real medical data for high accuracy.</li>
              <li>Uses a Vision Transformer (ViT) model for precision.</li>
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

export default LeukemiaDetect;