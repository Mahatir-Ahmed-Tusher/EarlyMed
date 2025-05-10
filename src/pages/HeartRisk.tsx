import React, { useState } from "react";
import axios from "axios";

interface HeartRiskForm {
  pain_arms_jaw_back: number;
  age: number;
  cold_sweats_nausea: number;
  chest_pain: number;
  fatigue: number;
  dizziness: number;
  swelling: number;
  shortness_of_breath: number;
  palpitations: number;
  sedentary_lifestyle: number;
}

const HeartRisk: React.FC = () => {
  const [formData, setFormData] = useState<HeartRiskForm>({
    pain_arms_jaw_back: 0,
    age: 0,
    cold_sweats_nausea: 0,
    chest_pain: 0,
    fatigue: 0,
    dizziness: 0,
    swelling: 0,
    shortness_of_breath: 0,
    palpitations: 0,
    sedentary_lifestyle: 0,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const questions = [
    {
      key: "chest_pain",
      question: "Do you currently experience chest pain or frequently feel it?",
    },
    {
      key: "shortness_of_breath",
      question: "Do you often feel shortness of breath, especially during activity?",
    },
    {
      key: "fatigue",
      question: "Do you frequently feel unusually tired or fatigued?",
    },
    {
      key: "palpitations",
      question: "Do you often experience heart palpitations or irregular heartbeats?",
    },
    {
      key: "dizziness",
      question: "Do you frequently feel dizzy or lightheaded?",
    },
    {
      key: "swelling",
      question: "Do you notice swelling in your legs, ankles, or feet?",
    },
    {
      key: "pain_arms_jaw_back",
      question: "Do you experience pain in your arms, jaw, or back?", // Fixed
    },
    {
      key: "cold_sweats_nausea",
      question: "Do you often have cold sweats or feel nauseous?",
    },
    {
      key: "sedentary_lifestyle",
      question: "Do you lead a sedentary lifestyle with little physical activity?",
    },
  ];

  // Function to parse Markdown and render as styled JSX elements
  const renderReport = (reportText: string) => {
    const lines = reportText.split("\n");
    let isInList = false;

    return lines.map((line, index) => {
      // Trim whitespace
      line = line.trim();

      // Skip empty lines
      if (!line) return null;

      // Handle headings (## or ###)
      if (line.startsWith("###")) {
        return (
          <h3 key={index} className="text-xl font-semibold text-green-800 mt-4 mb-2">
            {line.replace(/^###+\s*/, "")}
          </h3>
        );
      }
      if (line.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-green-800 mt-6 mb-3">
            {line.replace(/^##+\s*/, "")}
          </h2>
        );
      }

      // Handle list items (starting with -)
      if (line.startsWith("-")) {
        const listItem = line.replace(/^-\s*/, "");
        // Parse bold text within the list item (e.g., **Bold**)
        const formattedLine = listItem.replace(/\*\*(.*?)\*\*/g, (_, text) => `<strong>${text}</strong>`);
        if (!isInList) {
          isInList = true;
          return (
            <ul key={index} className="list-disc pl-5 text-gray-700">
              <li dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </ul>
          );
        } else {
          return <li key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
        }
      } else if (isInList) {
        isInList = false;
      }

      // Handle paragraphs with bold text
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, (_, text) => `<strong>${text}</strong>`);
      return (
        <p key={index} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseFloat(value) : parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setReport(null);

    try {
      const response = await axios.post("https://heart-backend-api.onrender.com/api/heart-risk", formData);
      setPrediction(response.data.prediction);
      setReport(response.data.report);
    } catch (err: Error | unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-start justify-center py-12 px-4">
      {/* Collapsible Sidebar with Hamburger Toggle */}
      <div className="flex relative">
        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-12 left-0 z-10 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {isSidebarOpen ? (
            // X Icon when sidebar is open
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon when sidebar is closed
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Sidebar Content */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-r-2xl shadow-xl border border-green-200 transition-all duration-300 ${
            isSidebarOpen ? "w-64 ml-14" : "w-0 ml-14"
          } h-[calc(100vh-6rem)] overflow-hidden mt-12`}
        >
          <div className={`p-4 overflow-y-auto h-full text-gray-700 ${isSidebarOpen ? "block" : "hidden"}`}>
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              How Our System Works
            </h2>
            <p className="text-sm">
              Our Heart Risk Assessment system uses a machine learning model to predict your risk of heart disease based on your symptoms and lifestyle factors. Here’s how it works:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>
                <strong>Data Collection:</strong> You provide your age and answer a series of Yes/No questions about symptoms like chest pain, shortness of breath, and more.
              </li>
              <li>
                <strong>Prediction:</strong> A pre-trained machine learning model (using scikit-learn) analyzes your input to predict whether you’re “At Risk” or “Not at Risk” for heart disease.
              </li>
              <li>
                <strong>Personalized Report:</strong> We use Mistral AI to generate a detailed report with health advice tailored to your symptoms, including diet and lifestyle recommendations specific to Bangladesh/India.
              </li>
              <li>
                <strong>Privacy:</strong> Your data is processed locally and not stored, ensuring your privacy.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              This tool is for informational purposes only and should not replace professional medical advice. Always consult a healthcare provider for a comprehensive evaluation.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-200 mt-12"
          style={{ marginBottom: "80px" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://i.postimg.cc/NfnP8hX2/39570508-6ad0-4d54-823d-2297a0aada22-removalai-preview.png"
              alt="HeartRisk Logo"
              className="h-24"
            />
          </div>
          <p className="text-gray-600 text-center mb-8">
            Answer the following questions to assess your heart health risk. Your
            responses will be used to predict your risk and provide personalized
            health advice.
          </p>

            <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Time User Notice */}
            {loading && (
              <div className="mt-4 p-4 rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800">
              <p className="font-semibold">Please Note</p>
              <p>Our server may take up to 30 seconds to process your first request as it initializes. Subsequent assessments will be much faster. Thank you for your patience! 🚀</p>
              </div>
            )}

            {/* Age Input */}
            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
              What is your age?
              </label>
              <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="1"
              max="120"
              required
              className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
              />
            </div>

            {/* Yes/No Questions */}
            {questions.map(({ key, question }) => (
              <div key={key} className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">{question}</label>
              <select
                name={key}
                value={formData[key as keyof HeartRiskForm]}
                onChange={handleInputChange}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
              >
                <option value="" disabled>
                Select an option
                </option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all flex items-center justify-center ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:shadow-xl glow"
              }`}
            >
              {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Assessing...
              </>
              ) : (
              "Assess My Heart Risk"
              )}
            </button>
            </form>

          {/* Results Section */}
          {(prediction || error) && (
            <div className="mt-8 p-6 bg-white/70 rounded-xl shadow-lg border border-green-200">
              {error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-green-800 mb-4">
                    Your Heart Risk Prediction: {prediction}
                  </h2>
                  {report && <div>{renderReport(report)}</div>}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS for glowing buttons */}
      <style>{`
        .glow {
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
          transition: box-shadow 0.3s ease;
        }
        .glow:hover {
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.8);
        }
      `}</style>
    </div>
  );
};

export default HeartRisk;