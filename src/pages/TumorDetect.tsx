import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TumorDetect: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  interface ResultType {
    prediction: string;
    confidence: number;
  }

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
    return () => mediaQuery.removeEventListener('change', (e) => setIsDarkMode(e.matches));
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
      setError('Please select an MRI scan to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        import.meta.env.VITE_TUMOR_API_URL || 'https://braintumor-backend-udfg.onrender.com/predict-tumor',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error('Error analyzing MRI scan:', err);
      let errorMessage = 'Error analyzing the MRI scan. Please try again.';
      if (axios.isAxiosError(err)) {
        if (err.code === 'ERR_NETWORK') {
          errorMessage = 'Cannot connect to the server. Please check your internet or try again later.';
        } else if (err.response) {
          errorMessage = `Server error: ${err.response.statusText} (${err.response.status})`;
        }
      }
      setError(errorMessage);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Diagnosis-specific content
  const getDiagnosisContent = () => {
    if (!result) return null;

    const prediction = result.prediction.toLowerCase();
    let content = null;

    switch (prediction) {
      case 'glioma':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🧠 Glioma Tumor</h3>
            <p><strong>What It Means:</strong> Gliomas develop in the glial cells of the brain or spinal cord. They can be low-grade (slow-growing) or high-grade (aggressive).</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Consult a neurologist or oncologist for a detailed MRI and biopsy.</li>
              <li>Treatment may include surgery, radiation, or chemotherapy.</li>
              <li>Maintain a healthy lifestyle with proper nutrition.</li>
            </ul>
          </div>
        );
        break;
      case 'meningioma':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🧠 Meningioma Tumor</h3>
            <p><strong>What It Means:</strong> Meningiomas grow in the membranes surrounding the brain and spinal cord. Most are benign.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Seek medical advice for further imaging.</li>
              <li>Doctors may monitor small, asymptomatic tumors.</li>
              <li>Surgery or radiation may be needed if symptoms worsen.</li>
            </ul>
          </div>
        );
        break;
      case 'pituitary':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">🧠 Pituitary Tumor</h3>
            <p><strong>What It Means:</strong> Pituitary tumors affect the gland responsible for hormone production. Most are non-cancerous.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>Endocrinologists can assess hormone levels.</li>
              <li>Medication, surgery, or radiation may be recommended.</li>
              <li>Watch for symptoms like vision issues or headaches.</li>
            </ul>
          </div>
        );
        break;
      case 'notumor':
        content = (
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-semibold text-blue-500">✅ No Tumor Detected</h3>
            <p><strong>What It Means:</strong> No signs of a brain tumor were detected.</p>
            <p><strong>What to Do:</strong></p>
            <ul className="list-disc list-inside">
              <li>If you have symptoms like headaches or dizziness, consult a doctor.</li>
              <li>Maintain regular health check-ups.</li>
            </ul>
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
            src="https://i.postimg.cc/0NmL0bWF/f7bafa72-a842-485b-9797-14049ff42922-removalai-preview.png"
            alt="EarlyMed Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-90 text-gray-100' : 'bg-white bg-opacity-90 text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to EarlyMed Brain Tumor Diagnosis! 🧠✨</h2>
          <p className="mb-2">
            Detecting brain tumors early can make all the difference. Upload your brain MRI scan, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of potential tumor types (Glioma, Meningioma, Pituitary, or No Tumor).
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
              disabled={loading}
              className={`bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg mb-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i> Upload and Analyze
                </>
              )}
            </button>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
              <strong>First-Time User Notice</strong><br />
              If this is your first analysis, our backend may take up to a minute to process your MRI scan as it initializes. Subsequent analyses will be much faster. Thank you for your patience! 🚀
            </p>
          </form>
          <a
            href="https://huggingface.co/spaces/MahatirTusher/EarlyMed-Brain-Tumor-Diagnosis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold py-3 px-6 rounded-2xl hover:from-indigo-700 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg mt-4"
          >
            Try This on Huggingface
          </a>
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

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800 bg-opacity-90' : 'bg-white bg-opacity-90'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does EarlyMed Brain Tumor Diagnosis Work? 🤖🧠</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes MRI scans to provide a preliminary assessment of tumor types in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your MRI Scan:</strong> Upload a clear MRI scan of the brain.</p>
            <p><strong>2️⃣ AI-Powered Image Processing:</strong> Our deep learning model, trained on thousands of MRIs, processes your scan.</p>
            <p><strong>3️⃣ Classification & Prediction:</strong> The model classifies the image into Glioma, Meningioma, Pituitary Tumor, or No Tumor, with a confidence score.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed in seconds. Consult a doctor for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Trained on real medical data for high accuracy.</li>
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

export default TumorDetect;