import React, { useState } from "react";
import axios from "axios";

interface StrokeRiskForm {
  age: number;
  gender: string;
  chest_pain: number;
  high_blood_pressure: number;
  irregular_heartbeat: number;
  shortness_of_breath: number;
  fatigue_weakness: number;
  dizziness: number;
  swelling_edema: number;
  neck_jaw_pain: number;
  excessive_sweating: number;
  persistent_cough: number;
  nausea_vomiting: number;
  chest_discomfort: number;
  cold_hands_feet: number;
  snoring_sleep_apnea: number;
  anxiety_doom: number;
}

const Stroke: React.FC = () => {
  const [formData, setFormData] = useState<StrokeRiskForm>({
    age: 0,
    gender: "",
    chest_pain: 0,
    high_blood_pressure: 0,
    irregular_heartbeat: 0,
    shortness_of_breath: 0,
    fatigue_weakness: 0,
    dizziness: 0,
    swelling_edema: 0,
    neck_jaw_pain: 0,
    excessive_sweating: 0,
    persistent_cough: 0,
    nausea_vomiting: 0,
    chest_discomfort: 0,
    cold_hands_feet: 0,
    snoring_sleep_apnea: 0,
    anxiety_doom: 0,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const questions = [
    {
      key: "chest_pain",
      question: "Do you experience chest pain or discomfort?",
      description: "Chest pain may feel like pressure, squeezing, or fullness in the chest. Normal condition: No chest pain."
    },
    {
      key: "high_blood_pressure",
      question: "Do you have high blood pressure (hypertension)?",
      description: "High blood pressure is when blood pressure readings are consistently 140/90 mmHg or higher. Normal condition: Blood pressure below 120/80 mmHg."
    },
    {
      key: "irregular_heartbeat",
      question: "Do you experience an irregular heartbeat or arrhythmias?",
      description: "An irregular heartbeat feels like skipped beats or a racing heart. Normal condition: Regular, steady heartbeat."
    },
    {
      key: "shortness_of_breath",
      question: "Do you often feel short of breath, especially during activity?",
      description: "Shortness of breath is difficulty breathing or feeling unable to get enough air. Normal condition: Breathing comfortably during normal activities."
    },
    {
      key: "fatigue_weakness",
      question: "Do you frequently feel unusually tired or weak?",
      description: "Fatigue is persistent tiredness or weakness not relieved by rest. Normal condition: Feeling energetic after adequate rest."
    },
    {
      key: "dizziness",
      question: "Do you frequently feel dizzy or lightheaded?",
      description: "Dizziness includes feeling unsteady or like you might faint. Normal condition: No dizziness or lightheadedness."
    },
    {
      key: "swelling_edema",
      question: "Do you notice swelling in your legs, ankles, or feet?",
      description: "Swelling (edema) is fluid buildup causing puffiness in extremities. Normal condition: No swelling in limbs."
    },
    {
      key: "neck_jaw_pain",
      question: "Do you experience pain in your neck or jaw?",
      description: "Neck or jaw pain may be sharp or aching, sometimes related to heart issues. Normal condition: No pain in neck or jaw."
    },
    {
      key: "excessive_sweating",
      question: "Do you often experience excessive sweating, even without exertion?",
      description: "Excessive sweating is unexplained perspiration, especially at rest. Normal condition: Sweating only during exercise or heat."
    },
    {
      key: "persistent_cough",
      question: "Do you have a persistent cough that doesn’t go away?",
      description: "A persistent cough lasts weeks and may produce mucus. Normal condition: No chronic cough."
    },
    {
      key: "nausea_vomiting",
      question: "Do you often feel nauseous or experience vomiting?",
      description: "Nausea is a feeling of sickness with an urge to vomit. Normal condition: No frequent nausea or vomiting."
    },
    {
      key: "chest_discomfort",
      question: "Do you feel general discomfort in your chest?",
      description: "Chest discomfort includes aching or burning sensations not classified as pain. Normal condition: No chest discomfort."
    },
    {
      key: "cold_hands_feet",
      question: "Do you often have cold hands or feet, even in warm conditions?",
      description: "Cold extremities feel unusually cold to the touch. Normal condition: Warm hands and feet in normal temperatures."
    },
    {
      key: "snoring_sleep_apnea",
      question: "Do you snore while sleeping or have sleep apnea?",
      description: "Snoring is loud breathing during sleep; sleep apnea involves pauses in breathing. Normal condition: No snoring or breathing pauses during sleep."
    },
    {
      key: "anxiety_doom",
      question: "Do you frequently feel anxiety or a sense of impending doom?",
      description: "Anxiety or a sense of doom is an unexplained feeling of fear or dread. Normal condition: No persistent anxiety or sense of doom."
    },
  ];

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseFloat(value) : name === "gender" ? value : parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setReport(null);

    try {
      const response = await axios.post("https://stroke-backend-api.onrender.com/api/stroke-risk", formData);
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 flex items-start justify-center py-12 px-4">
      <div className="flex relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-12 left-0 z-10 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        <div
          className={`bg-white/90 backdrop-blur-md rounded-r-2xl shadow-xl border border-green-200 transition-all duration-300 ${
            isSidebarOpen ? "w-64 ml-14" : "w-0 ml-14"
          } h-[calc(100vh-6rem)] overflow-hidden mt-12`}
        >
          <div className={`p-4 overflow-y-auto h-full text-gray-700 ${isSidebarOpen ? "block" : "hidden"}`}>
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              How Our Stroke Risk System Works
            </h2>
            <p className="text-sm">
              Our Stroke Risk Assessment system uses a machine learning model to predict your risk of stroke based on demographic information and symptoms. Here’s how it works:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>
                <strong>Data Collection:</strong> You provide your age, gender, and answer Yes/No questions about symptoms like chest pain, high blood pressure, and more.
              </li>
              <li>
                <strong>Prediction:</strong> A pre-trained machine learning model analyzes your input to predict whether you’re “At Risk” or “Not at Risk” for stroke.
              </li>
              <li>
                <strong>Personalized Report:</strong> We use Mistral AI to generate a detailed report with health advice tailored to your symptoms, including diet and lifestyle recommendations specific to South Asia.
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

        <div
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-200 mt-12"
          style={{ marginBottom: "80px" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://i.postimg.cc/TY2sJDJy/52e0d560-c2d1-439f-94f2-b4322a76d677-removalai-preview.png"
              alt="StrokeRisk Logo"
              className="h-32"
            />
          </div>
          <p className="text-gray-600 text-center mb-8">
            Answer the following questions to assess your stroke risk. Your responses will be used to predict your risk and provide personalized health advice.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
                What is your gender?
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {questions.map(({ key, question, description }) => (
              <div key={key} className="flex flex-col">
                <label className="text-green-700 font-medium mb-2">{question}</label>
                <p className="text-sm text-gray-500 mb-2">{description}</p>
                <select
                  name={key}
                  value={formData[key as keyof StrokeRiskForm]}
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-xl glow"
              }`}
            >
              {loading ? "Assessing..." : "Assess My Stroke Risk"}
            </button>
          </form>

          {(prediction || error) && (
            <div className="mt-8 p-6 bg-white/70 rounded-xl shadow-lg border border-green-200">
              {error ? (
                <p className="text-red-600 text-center">{error}</p>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-green-800 mb-4">
                    Your Stroke Risk Prediction: {prediction}
                  </h2>
                  {report && <div>{renderReport(report)}</div>}
                </>
              )}
            </div>
          )}
        </div>
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

export default Stroke;