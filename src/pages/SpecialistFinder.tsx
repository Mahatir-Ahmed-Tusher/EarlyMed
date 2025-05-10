import React, { useState } from "react";

interface SpecialistFinderForm {
  symptoms: string;
  city: string;
  state: string;
  country: string;
}

const SpecialistFinder: React.FC = () => {
  const [formData, setFormData] = useState<SpecialistFinderForm>({
    symptoms: "",
    city: "",
    state: "",
    country: "",
  });
  const [specialist, setSpecialist] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSpecialist(null);
    setReport(null);

    try {
      const response = await fetch("https://specialist-api.onrender.com/api/specialist-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSpecialist(result.specialist);
      setReport(result.report);
    } catch (err) {
      setError("An error occurred while processing your request.");
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
              How Our Specialist Finder Works
            </h2>
            <p className="text-sm">
              Our Specialist Finder uses AI to analyze your symptoms and location to recommend the most appropriate medical specialist and find nearby doctors. Here’s how it works:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>
                <strong>Input Symptoms:</strong> Describe your symptoms and provide your city, state, and country.
              </li>
              <li>
                <strong>AI Analysis:</strong> Mistral AI identifies the best specialist for your symptoms.
              </li>
              <li>
                <strong>Search:</strong> We search for specialists in your area using a search engine API.
              </li>
              <li>
                <strong>Personalized Report:</strong> AI generates a report recommending specific doctors or clinics to consult.
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
              src="https://i.postimg.cc/c1DC64Mp/Blank-board-5.png"
              alt="SpecialistFinder Logo"
              className="h-24"
            />
          </div>
          <p className="text-gray-600 text-center mb-8">
            Describe your symptoms and provide your location to find a specialist near you. Our AI will recommend the best doctor to consult.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
                Describe Your Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                required
                rows={4}
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                placeholder="e.g., Itchy skin, rashes, hair loss"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                placeholder="e.g., Guntur"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                placeholder="e.g., Andhra Pradesh"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-green-700 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                placeholder="e.g., India"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-xl glow"
              }`}
            >
              {loading ? "Finding Specialist..." : "Find a Specialist"}
            </button>
          </form>

          {(specialist || error) && (
            <div className="mt-8 p-6 bg-white/70 rounded-xl shadow-lg border border-green-200">
              {loading && (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
                <p className="text-center text-gray-700">
                Looking for the best specialist for you...
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        First time users: Please note that our backend service may take up to 50 seconds to activate. Thank you for your patience!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )}
              {error ? (
              <p className="text-red-600 text-center">{error}</p>
              ) : (
              specialist && (
                <>
                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                  Recommended Specialist: {specialist}
                </h2>
                {report && <div>{renderReport(report)}</div>}
                </>
              )
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

export default SpecialistFinder;