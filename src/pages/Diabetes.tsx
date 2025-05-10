import React, { useState } from "react";
import axios, { AxiosError } from "axios";

interface DiabetesForm {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree_function: number;
  age: number;
}

const Diabetes: React.FC = () => {
  const [formData, setFormData] = useState<DiabetesForm>({
    pregnancies: 0,
    glucose: 0,
    blood_pressure: 0,
    skin_thickness: 0,
    insulin: 0,
    bmi: 0,
    diabetes_pedigree_function: 0,
    age: 0,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Toggle this based on your app's dark mode logic

  const questions = [
    {
      key: "pregnancies",
      question: "How many times have you been pregnant?",
      description: "The number of pregnancies (Normal range: 0–17).",
    },
    {
      key: "glucose",
      question: "What is your glucose level (mg/dL)?",
      description: "The concentration of glucose in your blood (Normal range: 70–140 mg/dL).",
    },
    {
      key: "blood_pressure",
      question: "What is your systolic blood pressure (mmHg)?",
      description: "The systolic blood pressure (Normal range: 90–120 mmHg).",
    },
    {
      key: "skin_thickness",
      question: "What is your skin thickness value (mm)?",
      description: "The thickness of the skin fold at the triceps (Normal range: 10–50 mm).",
    },
    {
      key: "insulin",
      question: "What is your insulin level (µU/mL)?",
      description: "The concentration of insulin in your blood (Normal range: 16–166 µU/mL).",
    },
    {
      key: "bmi",
      question: "What is your BMI (Body Mass Index)?",
      description: "A measure of body fat based on height and weight (Normal range: 18.5–24.9).",
    },
    {
      key: "diabetes_pedigree_function",
      question: "What is your Diabetes Pedigree Function value?",
      description: "A score indicating the genetic influence of diabetes based on family history (Normal range: 0.08–2.42).",
    },
    {
      key: "age",
      question: "What is your age (in years)?",
      description: "Your age in years (Normal range: 21–81 years).",
    },
  ];

  // Function to parse Markdown and render as styled JSX elements
  const renderReport = (reportText: string) => {
    const lines = reportText.split("\n");
    let isInList = false;

    return lines.map((line, index) => {
      line = line.trim();
      if (!line) return null;

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

      if (line.startsWith("-")) {
        const listItem = line.replace(/^-\s*/, "");
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

      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, (_, text) => `<strong>${text}</strong>`);
      return (
        <p key={index} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setReport(null);

    try {
      const response = await axios.post("https://diabetes-backend-01hh.onrender.com/api/diabetes", formData);
      setPrediction(response.data.prediction);
      setReport(response.data.report);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(((err.response?.data as { detail: string })?.detail) || "An error occurred while processing your request.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-200 mt-12">
        <div className="flex justify-center mb-6">
          <img
            src="https://i.postimg.cc/pVQ517Rp/a618a7f9-ea90-4203-8059-384c33684e51-removalai-preview.png"
            alt="Diabetes Prediction Logo"
            className="h-24"
          />
        </div>
        <p className="text-gray-600 text-center mb-8">
          Answer the following questions to assess your diabetes risk. Your responses will be used to predict your risk and provide personalized health advice.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map(({ key, question, description }) => (
            <div key={key} className="flex flex-col">
              <label className="text-green-700 font-medium mb-1">{question}</label>
              <p className="text-sm text-gray-500 mb-2">{description}</p>
              <input
                type="number"
                name={key}
                value={formData[key as keyof DiabetesForm]}
                onChange={handleInputChange}
                min={key === "age" ? 1 : 0}
                max={key === "pregnancies" ? 20 : key === "age" ? 120 : 1000}
                step={key === "bmi" || key === "diabetes_pedigree_function" ? 0.1 : 1}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
              />
            </div>
          ))}

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
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Assessing...
              </>
            ) : (
              "Assess My Diabetes Risk"
            )}
          </button>

          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            <strong>First-Time User Notice</strong><br />
            If this is your first analysis, our backend may take up to a minute to process your MRI scan as it initializes. Subsequent analyses will be much faster. Thank you for your patience! 🚀
          </p>
        </form>

        {(prediction || error) && (
          <div className="mt-8 p-6 bg-white/70 rounded-xl shadow-lg border border-green-200">
            {error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                  Your Diabetes Prediction: {prediction}
                </h2>
                {report && <div>{renderReport(report)}</div>}
              </>
            )}
          </div>
        )}
      </div>

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

export default Diabetes;