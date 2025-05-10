import React, { useState } from "react";

const apiUrl = "https://api.mistral.ai/v1/chat/completions";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

// Debug: Log the API key (remove in production)
console.log("API Key:", apiKey);

const OralHygieneRiskAssessment: React.FC = () => {
  // State for questionnaire inputs
  const [age, setAge] = useState<number | "">("");
  const [diet, setDiet] = useState<string>("low");
  const [brushing, setBrushing] = useState<string>("twice");
  const [flossing, setFlossing] = useState<string>("daily");
  const [smoking, setSmoking] = useState<string>("no");
  const [alcohol, setAlcohol] = useState<string>("no");
  const [dentalVisits, setDentalVisits] = useState<string>("regular");
  const [gumBleeding, setGumBleeding] = useState<string>("no");
  const [toothSensitivity, setToothSensitivity] = useState<string>("no");
  const [mouthwash, setMouthwash] = useState<string>("yes");
  const [toothpasteType, setToothpasteType] = useState<string>("fluoride");
  const [brushingDuration, setBrushingDuration] = useState<string>("adequate");
  const [hardBrushing, setHardBrushing] = useState<string>("no");
  const [teethGrinding, setTeethGrinding] = useState<string>("no");
  const [dryMouth, setDryMouth] = useState<string>("no");
  const [chewingGum, setChewingGum] = useState<string>("no");
  const [oralPain, setOralPain] = useState<string>("no");
  const [familyHistory, setFamilyHistory] = useState<string>("no");
  const [stressLevel, setStressLevel] = useState<string>("low");
  const [waterIntake, setWaterIntake] = useState<string>("adequate");

  // State for results
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [tips, setTips] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Calculate Dental Risk Score
  const calculateRiskScore = () => {
    let score = 0;

    // Age: Higher age increases risk
    if (age && age >= 50) score += 10;
    else if (age && age >= 30) score += 5;

    // Diet: Sugary diet increases risk
    if (diet === "high") score += 15;
    else if (diet === "moderate") score += 8;

    // Brushing: Less frequent brushing increases risk
    if (brushing === "once") score += 10;
    else if (brushing === "rarely") score += 20;

    // Flossing: Not flossing increases risk
    if (flossing === "rarely") score += 10;
    else if (flossing === "never") score += 15;

    // Smoking: Smoking increases risk
    if (smoking === "yes") score += 15;

    // Alcohol: Regular alcohol consumption increases risk
    if (alcohol === "yes") score += 8;

    // Dental Visits: Infrequent visits increase risk
    if (dentalVisits === "infrequent") score += 10;
    else if (dentalVisits === "never") score += 15;

    // Gum Bleeding: Bleeding gums increase risk
    if (gumBleeding === "yes") score += 10;

    // Tooth Sensitivity: Sensitivity increases risk
    if (toothSensitivity === "yes") score += 8;

    // Mouthwash: Not using mouthwash increases risk
    if (mouthwash === "no") score += 5;

    // Toothpaste Type: Non-fluoride toothpaste increases risk
    if (toothpasteType === "non-fluoride") score += 5;

    // Brushing Duration: Inadequate brushing time increases risk
    if (brushingDuration === "short") score += 5;

    // Hard Brushing: Aggressive brushing increases risk
    if (hardBrushing === "yes") score += 5;

    // Teeth Grinding: Grinding increases risk
    if (teethGrinding === "yes") score += 8;

    // Dry Mouth: Dry mouth increases risk
    if (dryMouth === "yes") score += 8;

    // Chewing Gum: Sugary gum increases risk
    if (chewingGum === "yes") score += 5;

    // Oral Pain: Pain indicates potential issues
    if (oralPain === "yes") score += 10;

    // Family History: Genetic predisposition increases risk
    if (familyHistory === "yes") score += 5;

    // Stress Level: High stress increases risk
    if (stressLevel === "high") score += 5;

    // Water Intake: Low water intake increases risk
    if (waterIntake === "low") score += 5;

    return Math.min(score, 100); // Cap score at 100
  };

  // Fetch tailored tips from Mistral AI
  const fetchTips = async (score: number) => {
    if (!apiKey) {
      setError("Mistral API key is missing. Please configure it in your environment.");
      return;
    }

    const prompt = `You are a dental health expert. Provide detailed, actionable oral hygiene suggestions for a ${age}-year-old with a Dental Risk Score of ${score}/100. Their habits are as follows: smokes: ${smoking}, consumes alcohol: ${alcohol}, sugary food intake: ${diet}, brushes: ${brushing} a day, flosses: ${flossing}, dental visits: ${dentalVisits}, gum bleeding: ${gumBleeding}, tooth sensitivity: ${toothSensitivity}, uses mouthwash: ${mouthwash}, toothpaste type: ${toothpasteType}, brushing duration: ${brushingDuration}, hard brushing: ${hardBrushing}, teeth grinding: ${teethGrinding}, dry mouth: ${dryMouth}, chews sugary gum: ${chewingGum}, oral pain: ${oralPain}, family history of dental issues: ${familyHistory}, stress level: ${stressLevel}, water intake: ${waterIntake}. Provide 4-5 sentences of specific advice tailored to their habits and risk score. Do not use markdown formatting (e.g., no **bold**, ### headings, or bullet points). Use plain text with proper punctuation and new lines for readability.`;

    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 3000,
          temperature: 0.7,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.message || "Unknown error"}`);
      }

      const data = await response.json();
      const generatedTips = data.choices[0]?.message?.content || "No tips available.";
      setTips(generatedTips);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to fetch tips: ${errorMessage}. Please try again later.`);
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!age) {
      setError("Please enter your age.");
      return;
    }

    const score = calculateRiskScore();
    setRiskScore(score);
    await fetchTips(score);
  };

  return (
    <div className="max-w-3xl mx-auto pt-16 p-6">
      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/20">
        <h2 className="text-3xl font-poppins font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
          Oral Hygiene Risk Assessment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Enter your age"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Sugary Food Intake */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sugary Food Intake
            </label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="low">Low (Rarely)</option>
              <option value="moderate">Moderate (Occasionally)</option>
              <option value="high">High (Daily)</option>
            </select>
          </div>

          {/* Brushing Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Brushing Frequency
            </label>
            <select
              value={brushing}
              onChange={(e) => setBrushing(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="twice">Twice a Day</option>
              <option value="once">Once a Day</option>
              <option value="rarely">Rarely</option>
            </select>
          </div>

          {/* Flossing Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flossing Frequency
            </label>
            <select
              value={flossing}
              onChange={(e) => setFlossing(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="daily">Daily</option>
              <option value="rarely">Rarely</option>
              <option value="never">Never</option>
            </select>
          </div>

          {/* Smoking */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Smoke?
            </label>
            <select
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Alcohol Consumption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Consume Alcohol Regularly?
            </label>
            <select
              value={alcohol}
              onChange={(e) => setAlcohol(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Dental Visits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frequency of Dental Visits
            </label>
            <select
              value={dentalVisits}
              onChange={(e) => setDentalVisits(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="regular">Regular (Every 6 Months)</option>
              <option value="infrequent">Infrequent (Yearly)</option>
              <option value="never">Never</option>
            </select>
          </div>

          {/* Gum Bleeding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do Your Gums Bleed When Brushing?
            </label>
            <select
              value={gumBleeding}
              onChange={(e) => setGumBleeding(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Tooth Sensitivity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Tooth Sensitivity?
            </label>
            <select
              value={toothSensitivity}
              onChange={(e) => setToothSensitivity(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Mouthwash Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Use Mouthwash?
            </label>
            <select
              value={mouthwash}
              onChange={(e) => setMouthwash(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Toothpaste Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What Type of Toothpaste Do You Use?
            </label>
            <select
              value={toothpasteType}
              onChange={(e) => setToothpasteType(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="fluoride">Fluoride</option>
              <option value="non-fluoride">Non-Fluoride</option>
            </select>
          </div>

          {/* Brushing Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Long Do You Brush Each Time?
            </label>
            <select
              value={brushingDuration}
              onChange={(e) => setBrushingDuration(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="adequate">Adequate (2+ Minutes)</option>
              <option value="short">Short (Less than 2 Minutes)</option>
            </select>
          </div>

          {/* Hard Brushing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Brush Your Teeth Hard/Aggressively?
            </label>
            <select
              value={hardBrushing}
              onChange={(e) => setHardBrushing(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Teeth Grinding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Grind Your Teeth (e.g., at Night)?
            </label>
            <select
              value={teethGrinding}
              onChange={(e) => setTeethGrinding(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Dry Mouth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Often Experience Dry Mouth?
            </label>
            <select
              value={dryMouth}
              onChange={(e) => setDryMouth(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Chewing Gum */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Chew Sugary Gum Regularly?
            </label>
            <select
              value={chewingGum}
              onChange={(e) => setChewingGum(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Oral Pain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Oral Pain or Discomfort?
            </label>
            <select
              value={oralPain}
              onChange={(e) => setOralPain(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Family History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Have a Family History of Dental Issues?
            </label>
            <select
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Stress Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What is Your Stress Level?
            </label>
            <select
              value={stressLevel}
              onChange={(e) => setStressLevel(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Water Intake */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Much Water Do You Drink Daily?
            </label>
            <select
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-teal-500 transition-all"
            >
              <option value="adequate">Adequate (8+ Glasses)</option>
              <option value="low">Low (Less than 8 Glasses)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Risk Score"}
          </button>
        </form>

        {/* Results */}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {riskScore !== null && (
          <div className="mt-6 p-6 bg-teal-50/50 dark:bg-teal-900/50 backdrop-blur-sm rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-300 text-center">
              Your Dental Risk Score: {riskScore}/100
            </h3>
            {tips && (
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-center whitespace-pre-line">{tips}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OralHygieneRiskAssessment;