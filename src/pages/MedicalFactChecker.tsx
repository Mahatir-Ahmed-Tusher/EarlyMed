import React, { useState } from "react";

interface FactCheckForm {
  claim: string;
}

const MedicalFactChecker: React.FC = () => {
  const [formData, setFormData] = useState<FactCheckForm>({ claim: "" });
  const [result, setResult] = useState<{ 
    verdict: string; 
    summary: string; 
    confidence: string; 
    sources: string[] 
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://factcheck-api.onrender.com/api/fact-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: formData.claim }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify claim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex justify-center py-12 px-4">
      {/* Sidebar (toggleable) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-20 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all"
      >
        {isSidebarOpen ? "✕" : "ℹ️"}
      </button>

      <div className={`fixed top-0 left-0 z-10 h-full bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"}`}>
        <div className={`p-6 ${isSidebarOpen ? "block" : "hidden"}`}>
          <h2 className="text-xl font-bold text-purple-800 mb-4">How It Works</h2>
          <p className="text-sm text-gray-700 mb-4">
            MedFact AI checks medical claims against trusted sources like WHO and PubMed.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Enter a health claim (e.g., "Vitamin C prevents COVID-19")</li>
            <li>AI searches authoritative sources</li>
            <li>Get a verdict with evidence</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-purple-200 mt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
            MedFact AI
          </h1>
          <p className="text-gray-600">
            Verify medical claims with evidence-based analysis
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-700 font-medium mb-2">
              Enter a Medical Claim
            </label>
            <textarea
              name="claim"
              value={formData.claim}
              onChange={(e) => setFormData({ claim: e.target.value })}
              required
              rows={4}
              className="w-full p-4 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm transition-all"
              placeholder="e.g., 'Drinking lemon water detoxes the liver'"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition-all ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <span className="animate-pulse">🔍</span> Verifying...
              </span>
            ) : (
              "Check Fact"
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className={`mt-8 p-6 rounded-xl border-2 shadow-lg ${
            result.verdict === "True" 
              ? "bg-green-50 border-green-200" 
              : result.verdict === "False" 
              ? "bg-red-50 border-red-200" 
              : "bg-yellow-50 border-yellow-200"
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-4 h-4 rounded-full ${
                result.verdict === "True" ? "bg-green-500" 
                : result.verdict === "False" ? "bg-red-500" 
                : "bg-yellow-500"
              }`} />
              <span className="font-bold text-lg uppercase">{result.verdict}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                result.confidence === "High" ? "bg-green-100 text-green-800" 
                : result.confidence === "Medium" ? "bg-yellow-100 text-yellow-800" 
                : "bg-red-100 text-red-800"
              }`}>
                Confidence: {result.confidence}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Summary</h3>
              <p className="text-gray-700">{result.summary}</p>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Sources</h3>
                <ul className="space-y-2">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      <a 
                        href={source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {source.length > 50 ? `${source.slice(0, 50)}...` : source}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {error.includes("Failed to fetch") 
              ? "Could not connect to the server. Please check the backend service."
              : error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalFactChecker;