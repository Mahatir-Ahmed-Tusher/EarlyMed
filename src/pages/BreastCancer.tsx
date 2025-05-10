import React, { useState } from "react";
import axios from "axios";

interface BreastCancerForm {
  clump_thickness: number;
  uniform_cell_size: number;
  uniform_cell_shape: number;
  marginal_adhesion: number;
  single_epithelial_size: number;
  bare_nuclei: number;
  bland_chromatin: number;
  normal_nucleoli: number;
  mitoses: number;
}

const BreastCancer: React.FC = () => {
  const [formData, setFormData] = useState<BreastCancerForm>({
    clump_thickness: 0,
    uniform_cell_size: 0,
    uniform_cell_shape: 0,
    marginal_adhesion: 0,
    single_epithelial_size: 0,
    bare_nuclei: 0,
    bland_chromatin: 0,
    normal_nucleoli: 0,
    mitoses: 0,
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Toggle this based on your app's dark mode logic

  const questions = [
    {
      key: "clump_thickness",
      question: "What is the clump thickness of the breast tissue cells? (1-10)",
      description: "Clump thickness refers to the layering of cells in the tissue sample. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating more concerning layering.",
    },
    {
      key: "uniform_cell_size",
      question: "How uniform is the size of the breast tissue cells? (1-10)",
      description: "Uniformity of cell size measures consistency in cell dimensions. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning size variations.",
    },
    {
      key: "uniform_cell_shape",
      question: "How uniform is the shape of the breast tissue cells? (1-10)",
      description: "Uniformity of cell shape measures morphological consistency. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning shape variations.",
    },
    {
      key: "marginal_adhesion",
      question: "What is the level of marginal adhesion in the breast tissue cells? (1-10)",
      description: "Marginal adhesion measures cell-to-cell adhesion. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning loss of adhesion.",
    },
    {
      key: "single_epithelial_size",
      question: "What is the size of single epithelial cells? (1-10)",
      description: "Single epithelial cell size evaluates individual cell dimensions. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning enlargement.",
    },
    {
      key: "bare_nuclei",
      question: "What is the count of bare nuclei in the sample? (1-10)",
      description: "Bare nuclei count measures nuclei without cytoplasm. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning nuclear presentation.",
    },
    {
      key: "bland_chromatin",
      question: "What is the level of bland chromatin? (1-10)",
      description: "Bland chromatin describes nuclear texture. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning chromatin coarseness.",
    },
    {
      key: "normal_nucleoli",
      question: "How prominent are the nucleoli? (1-10)",
      description: "Nucleoli prominence within cell nuclei. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning nuclear features.",
    },
    {
      key: "mitoses",
      question: "What is the mitotic count in the sample? (1-10)",
      description: "Mitoses count measures cell division frequency. Values 1-2 (normal), 3-10 (potentially abnormal), with higher values indicating concerning proliferation rates.",
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
      const response = await axios.post("https://bcancer-backend.onrender.com/api/breast-cancer", formData);
      setPrediction(response.data.prediction);
      setReport(response.data.report);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error.response?.data?.detail || "An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-start justify-center py-12 px-4">
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
              About Breast Cancer Assessment
            </h2>
            <p className="text-sm">
              Our system uses a machine learning model to predict the likelihood of breast cancer based on clinical data from a biopsy sample. Here's how it works:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>
                <strong>Data Collection:</strong> You provide numerical values for 9 clinical features, such as clump thickness and cell uniformity, based on a biopsy sample.
              </li>
              <li>
                <strong>Prediction:</strong> A pre-trained model (using scikit-learn) analyzes your input to predict whether the tissue is "Malignant" or "Benign."
              </li>
              <li>
                <strong>Personalized Report:</strong> Mistral AI generates a detailed report with health advice tailored to your results, including steps to manage your health if malignant, or maintain wellness if benign.
              </li>
              <li>
                <strong>Privacy:</strong> Your data is processed locally and not stored, ensuring your privacy.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              This tool is for informational purposes only. Always consult a healthcare provider for a definitive diagnosis and treatment plan.
            </p>
          </div>
        </div>

        <div
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-200 mt-12"
          style={{ marginBottom: "80px" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://i.postimg.cc/v87NKbPJ/c11ed97b-68c4-46fe-9aff-4fbdd5e52764-removalai-preview.png"
              alt="BreastCancer Logo"
              className="h-36"
            />
          </div>
          <p className="text-gray-600 text-center mb-8">
            Provide the following clinical data to assess the likelihood of breast cancer. Your responses will be used to predict the tissue status and provide personalized health advice.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map(({ key, question, description }) => (
              <div key={key} className="flex flex-col">
                <label className="text-green-700 font-medium mb-2">{question}</label>
                <p className="text-sm text-gray-500 mb-2">{description}</p>
                <input
                  type="number"
                  name={key}
                  value={formData[key as keyof BreastCancerForm]}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
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
                "Assess Breast Cancer Risk"
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
                    Breast Cancer Prediction: {prediction}
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

export default BreastCancer;