import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OptiScan: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<Record<string, number> | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', (e) => setIsDarkMode(e.matches));
    return () => mediaQuery.removeEventListener('change', (e) => setIsDarkMode(e.matches));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        if (selectedFile.size > 5 * 1024 * 1024) {
          setError('Image size must be less than 5MB.');
          return;
        }
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
        setPrediction(null);
        setExplanation(null);
        setError(null);
      } else {
        setError('Please upload a JPEG or PNG image.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8014/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.prediction);
      setExplanation(response.data.explanation);
      setError(null);
    } catch (err) {
      setError('Error processing image. Please try again.');
      setPrediction(null);
      setExplanation(null);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = (diagnosis: string): string => {
    let report = `OptiScan Diagnosis Report\n\n`;
    report += `Diagnosis: ${diagnosis}\n`;
    report += `Date: ${new Date().toLocaleDateString()}\n\n`;
    report += `Guidelines:\n`;

    if (diagnosis === 'cataract') {
      report += `- Consult an ophthalmologist immediately for a comprehensive eye exam.\n`;
      report += `- Discuss potential treatments, such as cataract surgery if vision is significantly impaired.\n`;
      report += `- Protect your eyes from UV light by wearing sunglasses.\n`;
      report += `- Avoid smoking, as it can worsen cataracts.\n`;
      report += `- Monitor vision changes and report symptoms like blurriness or glare to your doctor.\n`;
    } else if (diagnosis === 'diabetic_retinopathy') {
      report += `- Schedule an urgent appointment with an ophthalmologist for further evaluation.\n`;
      report += `- Manage blood sugar levels tightly with your healthcare provider to slow progression.\n`;
      report += `- Control blood pressure and cholesterol to reduce retinal damage.\n`;
      report += `- Consider treatments like laser therapy or injections if recommended.\n`;
      report += `- Regular eye exams are crucial to monitor the condition.\n`;
    } else if (diagnosis === 'glaucoma') {
      report += `- Seek immediate consultation with an ophthalmologist to confirm the diagnosis.\n`;
      report += `- Use prescribed eye drops to lower intraocular pressure as directed.\n`;
      report += `- Discuss surgical options like trabeculectomy if the condition progresses.\n`;
      report += `- Avoid activities that increase eye pressure, such as heavy tilting.\n`;
      report += `- Regular monitoring is essential to prevent vision loss.\n`;
    }

    report += `\nDisclaimer: This report is for informational purposes only. Always consult an ophthalmologist for professional medical advice.`;
    return report;
  };

  const handleDownloadReport = (diagnosis: string) => {
    const reportContent = generateReport(diagnosis);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OptiScan_${diagnosis}_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100' : 'bg-gradient-to-br from-green-50 via-green-100 to-green-200 text-gray-800'}`}>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl mt-12 mb-20">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <img
            src="https://i.postimg.cc/LXpHhnRH/Removal-950.png"
            alt="OptiScan Logo"
            className="mx-auto max-w-xs"
          />
        </div>

        {/* Intro Text */}
        <div className={`text-center mb-8 p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-2xl font-bold mb-4">Welcome to OptiScan! 👁️✨</h2>
          <p className="mb-2">
            Early detection of eye diseases can preserve your vision. Upload an eye fundus image, and our AI-powered system will analyze it in seconds, providing a preliminary assessment of conditions like cataracts, diabetic retinopathy, or glaucoma.
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
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 w-full rounded-lg shadow-md" />
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading || !file}
              className={`mt-4 w-full py-3 px-6 rounded-2xl text-white font-semibold ${loading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl glow-button'}`}
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
                'Analyze Image'
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
        {prediction && (
          <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            <h3 className="text-xl font-semibold text-center mb-4">Analysis Results</h3>
            <div className="text-center">
              <h4 className="text-lg font-medium mb-2">Diagnosis: {Object.keys(prediction)[0]}</h4>
              <h4 className="text-md font-medium mt-4 mb-2">Confidence Level</h4>
              {Object.entries(prediction).map(([name, prob]) => (
                <div key={name} className="mb-2">
                  <div className="flex justify-between">
                    <span>{name}</span>
                    <span>{(prob * 100).toFixed(1)}%</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${prob * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation and Report Download Section */}
            {explanation && (
              <div className="mt-6 p-4 rounded-2xl shadow-inner backdrop-blur-md bg-white/20">
                <h4 className="text-lg font-medium mb-2">Preliminary Assessment</h4>
                <p>{explanation}</p>
                {['cataract', 'diabetic_retinopathy', 'glaucoma'].includes(Object.keys(prediction)[0]) && (
                  <button
                    onClick={() => handleDownloadReport(Object.keys(prediction)[0])}
                    className="mt-4 py-2 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl glow-button"
                  >
                    Download Report
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* About Eye Diseases Section */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">About Eye Diseases ℹ️</h2>
          <div className="space-y-4">
            <p>Eye diseases like cataracts, diabetic retinopathy, and glaucoma can lead to vision loss if not detected early. OptiScan helps identify these conditions using AI.</p>
            <h3 className="font-semibold text-blue-500">Key Facts</h3>
            <ul className="list-disc list-inside">
              <li><strong>Cataracts:</strong> Clouding of the lens, often age-related, causing blurry vision.</li>
              <li><strong>Diabetic Retinopathy:</strong> Damage to retinal blood vessels due to diabetes, risking blindness.</li>
              <li><strong>Glaucoma:</strong> Optic nerve damage, often from high eye pressure, leading to vision loss.</li>
            </ul>
            <p><strong>Why Early Detection Matters:</strong> Early diagnosis can prevent progression through timely interventions.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">How Does OptiScan Work? 🤖👁️</h2>
          <div className="space-y-4">
            <p>Our AI-powered tool analyzes eye fundus images to provide a preliminary assessment of eye diseases in seconds. Here’s how:</p>
            <h3 className="font-semibold text-blue-500">🔍 Step-by-Step Process</h3>
            <p><strong>1️⃣ Upload Your Fundus Image:</strong> Upload a clear eye fundus image.</p>
            <p><strong>2️⃣ AI-Powered Analysis:</strong> Our TensorFlow-based deep learning model processes your image.</p>
            <p><strong>3️⃣ Classification:</strong> The model classifies the image as Cataract, Diabetic Retinopathy, Glaucoma, or Normal.</p>
            <p><strong>4️⃣ Instant Results:</strong> Results are displayed with confidence levels. Consult an ophthalmologist for a detailed evaluation.</p>
            <h3 className="font-semibold text-blue-500">🛡️ Why Is It Reliable?</h3>
            <ul className="list-disc list-inside">
              <li>Uses a TensorFlow model for accurate classification.</li>
              <li>Trained on extensive eye fundus datasets.</li>
              <li>Fast, accessible, and continuously improving.</li>
            </ul>
            <p className="text-center font-semibold mt-4">⚠️ Always consult medical professionals for guidance.</p>
          </div>
        </div>

        {/* Why OptiScan is Better Section (Moved from Sidebar) */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-white/30 border border-white/20 mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">Why OptiScan is Better 💡</h2>
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-500">Conventional Diagnosis</h3>
            <ul className="list-disc list-inside">
              <li><strong>Cataracts:</strong> Requires a comprehensive eye exam with pupil dilation, slit-lamp tests, and visual acuity checks, often taking 30-60 minutes per patient.</li>
              <li><strong>Diabetic Retinopathy:</strong> Involves fundus photography or fluorescein angiography, needing specialized equipment and multiple appointments, delaying diagnosis.</li>
              <li><strong>Glaucoma:</strong> Diagnosed through tonometry, optic disc examination, and visual field tests, requiring multiple visits and access to advanced tools.</li>
            </ul>
            <h3 className="font-semibold text-blue-500">OptiScan’s Advantage</h3>
            <ul className="list-disc list-inside">
              <li><strong>Speed:</strong> Analyze fundus images in seconds, no need for lengthy appointments.</li>
              <li><strong>Accessibility:</strong> Upload an image from anywhere—no specialized equipment needed.</li>
              <li><strong>Efficiency:</strong> AI instantly classifies conditions (cataracts, diabetic retinopathy, glaucoma, or normal) with confidence scores.</li>
              <li><strong>Early Detection:</strong> Enables quicker preliminary assessments, prompting timely specialist consultations.</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`p-6 rounded-3xl shadow-xl backdrop-blur-md bg-yellow-100/30 border border-yellow-200 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
          <h3 className="font-semibold mb-2">⚠️ Disclaimer</h3>
          <p>We strongly urge users to consult an ophthalmologist for appropriate medical guidance after getting the diagnosis.</p>
          <p>Developed by the team at VIT-AP University to empower individuals with AI-driven early detection and healthcare awareness.</p>
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

export default OptiScan;