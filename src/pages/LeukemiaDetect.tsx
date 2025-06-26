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
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold text-green-500">
              <i className="fas fa-check-circle mr-2"></i> No Cancer Detected
            </h3>
            <p className="mb-2"><strong>What It Means:</strong> No signs of leukemia were detected in your blood sample.</p>
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
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold text-yellow-500">
              <i className="fas fa-exclamation-triangle mr-2"></i> Early Stage Leukemia
            </h3>
            <p className="mb-2"><strong>What It Means:</strong> Early signs of leukemia were detected, indicating the initial stage of the disease.</p>
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
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold text-orange-500">
              <i className="fas fa-exclamation-circle mr-2"></i> Pre-Leukemic Stage
            </h3>
            <p className="mb-2"><strong>What It Means:</strong> Your blood sample shows pre-leukemic changes, which may progress if untreated.</p>
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
          <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold text-red-500">
              <i className="fas fa-skull-crossbones mr-2"></i> Proliferative Stage Leukemia
            </h3>
            <p className="mb-2"><strong>What It Means:</strong> Advanced leukemia was detected, indicating a proliferative stage requiring immediate attention.</p>
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
      <div className={`rounded-lg shadow-lg p-8 mb-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Understanding Your Diagnosis & Next Steps <i className="fas fa-info-circle"></i>
        </h2>
        {content}
        <p className="text-center mt-4 font-semibold">
          For more information, refer to <a href="/diagnobot" className="text-blue-500 hover:underline">Diagnobot</a>.
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-8">
          <img
            src="https://i.postimg.cc/mkWSQyp1/0b08d177-299c-4fcc-b978-540c2d143f10-removalai-preview.png"
            alt="EarlyMed Logo"
            className="mx-auto w-64"
          />
          <h1 className="text-3xl font-bold mt-4">EarlyMed Leukemia Detection</h1>
        </header>

        <section className={`mb-8 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="mb-4">
            Early detection of leukemia can be life-saving. Upload a blood sample image, and our AI-powered system will analyze it,
            providing a preliminary assessment of leukemia stages.
          </p>
        </section>

        <section className={`mb-8 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Upload Blood Sample</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`mb-4 p-3 w-full rounded-md border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Analyze
            </button>
            <a
              href="https://huggingface.co/spaces/MahatirTusher/EarlyMed-Acute-Lymphoblastic-Leukemia-Diagnosis"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-500 hover:underline"
            >
              Try it on Huggingface
            </a>
          </form>
        </section>

        {error && (
          <div className={`p-4 rounded-md bg-red-100 text-red-800 mb-4 ${isDarkMode ? 'bg-red-900 text-red-100' : ''}`}>
            {error}
          </div>
        )}

        {result && (
          <section className={`mb-8 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
            <div className="mb-4">
              <strong>Prediction:</strong> {result.prediction}
            </div>
            <div>
              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
            </div>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Blood Sample"
                className="mt-4 max-w-full rounded-md"
              />
            )}
          </section>
        )}

        {getDiagnosisContent()}

        <section className={`mb-8 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <p className="mb-2">Our AI-powered tool analyzes blood sample images to provide a preliminary assessment of leukemia stages.</p>
          <ol className="list-decimal list-inside">
            <li>Upload Your Blood Sample</li>
            <li>AI-Powered Image Processing</li>
            <li>Classification & Prediction</li>
            <li>Instant Results</li>
          </ol>
        </section>

        <footer className="p-4 text-center">
          <p>
            <i className="fas fa-exclamation-triangle"></i> Disclaimer: This tool is for preliminary assessment only. Consult a healthcare
            professional for appropriate medical guidance.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default LeukemiaDetect;