import React, { useState } from "react";

const apiUrl = "https://api.mistral.ai/v1/chat/completions";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

// Debug: Log the API key (remove in production)
console.log("API Key:", apiKey);

const EyeStrainAssessment: React.FC = () => {
  // State for questionnaire inputs
  const [age, setAge] = useState<number | "">("");
  const [screenTime, setScreenTime] = useState<string>("low");
  const [blinkingFrequency, setBlinkingFrequency] = useState<string>("normal");
  const [breaksFrequency, setBreaksFrequency] = useState<string>("frequent");
  const [screenBrightness, setScreenBrightness] = useState<string>("moderate");
  const [blueLightFilter, setBlueLightFilter] = useState<string>("yes");
  const [lightingConditions, setLightingConditions] = useState<string>("adequate");
  const [screenDistance, setScreenDistance] = useState<string>("appropriate");
  const [eyeDryness, setEyeDryness] = useState<string>("no");
  const [headaches, setHeadaches] = useState<string>("no");
  const [blurredVision, setBlurredVision] = useState<string>("no");
  const [neckPain, setNeckPain] = useState<string>("no");
  const [glassesUsage, setGlassesUsage] = useState<string>("no");
  const [eyeRubbing, setEyeRubbing] = useState<string>("no");
  const [sleepQuality, setSleepQuality] = useState<string>("good");
  const [screenTimeBeforeBed, setScreenTimeBeforeBed] = useState<string>("no");
  const [eyeExercises, setEyeExercises] = useState<string>("no");
  const [hydrationLevel, setHydrationLevel] = useState<string>("adequate");
  const [stressLevel, setStressLevel] = useState<string>("low");

  // State for results
  const [eyeStrainScore, setEyeStrainScore] = useState<number | null>(null);
  const [tips, setTips] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Calculate Eye Strain Score
  const calculateEyeStrainScore = () => {
    let score = 0;

    // Age: Older age can increase eye strain risk
    if (age && age >= 50) score += 10;
    else if (age && age >= 30) score += 5;

    // Screen Time: Higher screen time increases risk
    if (screenTime === "high") score += 20;
    else if (screenTime === "moderate") score += 10;

    // Blinking Frequency: Reduced blinking increases risk
    if (blinkingFrequency === "low") score += 15;
    else if (blinkingFrequency === "very-low") score += 25;

    // Breaks Frequency: Fewer breaks increase risk
    if (breaksFrequency === "infrequent") score += 15;
    else if (breaksFrequency === "never") score += 25;

    // Screen Brightness: High brightness increases risk
    if (screenBrightness === "high") score += 10;

    // Blue Light Filter: Not using a filter increases risk
    if (blueLightFilter === "no") score += 10;

    // Lighting Conditions: Poor lighting increases risk
    if (lightingConditions === "poor") score += 10;

    // Screen Distance: Too close increases risk
    if (screenDistance === "too-close") score += 10;

    // Eye Dryness: Dryness increases risk
    if (eyeDryness === "yes") score += 10;

    // Headaches: Frequent headaches indicate strain
    if (headaches === "yes") score += 10;

    // Blurred Vision: Indicates strain
    if (blurredVision === "yes") score += 10;

    // Neck Pain: Poor posture increases risk
    if (neckPain === "yes") score += 8;

    // Glasses Usage: Not using prescribed glasses increases risk
    if (glassesUsage === "needed-but-not-used") score += 10;

    // Eye Rubbing: Frequent rubbing indicates strain
    if (eyeRubbing === "yes") score += 5;

    // Sleep Quality: Poor sleep increases risk
    if (sleepQuality === "poor") score += 8;

    // Screen Time Before Bed: Increases strain
    if (screenTimeBeforeBed === "yes") score += 8;

    // Eye Exercises: Not doing exercises increases risk
    if (eyeExercises === "no") score += 5;

    // Hydration Level: Low hydration increases risk
    if (hydrationLevel === "low") score += 5;

    // Stress Level: High stress increases risk
    if (stressLevel === "high") score += 5;

    return Math.min(score, 100); // Cap score at 100
  };

  // Fetch tailored tips from Mistral AI
  const fetchTips = async (score: number) => {
    if (!apiKey) {
      setError("Mistral API key is missing. Please configure it in your environment.");
      return;
    }

    const prompt = `You are an eye health expert. Provide detailed, actionable suggestions to reduce eye strain for a ${age}-year-old with an Eye Strain Score of ${score}/100. Their habits are as follows: daily screen time: ${screenTime}, blinking frequency: ${blinkingFrequency}, breaks frequency: ${breaksFrequency}, screen brightness: ${screenBrightness}, uses blue light filter: ${blueLightFilter}, lighting conditions: ${lightingConditions}, screen distance: ${screenDistance}, eye dryness: ${eyeDryness}, headaches: ${headaches}, blurred vision: ${blurredVision}, neck pain: ${neckPain}, glasses usage: ${glassesUsage}, eye rubbing: ${eyeRubbing}, sleep quality: ${sleepQuality}, screen time before bed: ${screenTimeBeforeBed}, eye exercises: ${eyeExercises}, hydration level: ${hydrationLevel}, stress level: ${stressLevel}. Include recommendations like the 20-20-20 rule if relevant. Provide 4-5 sentences of specific advice tailored to their habits and score. Do not use markdown formatting (e.g., no **bold**, ### headings, or bullet points). Use plain text with proper punctuation and new lines for readability.`;

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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
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

    const score = calculateEyeStrainScore();
    setEyeStrainScore(score);
    await fetchTips(score);
  };

  return (
    <div className="max-w-3xl mx-auto pt-16 p-6">
      <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-200/20">
        <h2 className="text-3xl font-poppins font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Eye Strain Assessment Bot
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
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your age"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Daily Screen Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Screen Time
            </label>
            <select
              value={screenTime}
              onChange={(e) => setScreenTime(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="low">Low (Less than 2 hours)</option>
              <option value="moderate">Moderate (2-6 hours)</option>
              <option value="high">High (More than 6 hours)</option>
            </select>
          </div>

          {/* Blinking Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blinking Frequency While Using Screens
            </label>
            <select
              value={blinkingFrequency}
              onChange={(e) => setBlinkingFrequency(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="normal">Normal (Regular Blinking)</option>
              <option value="low">Low (Reduced Blinking)</option>
              <option value="very-low">Very Low (Rarely Blinking)</option>
            </select>
          </div>

          {/* Breaks Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Often Do You Take Breaks from Screens?
            </label>
            <select
              value={breaksFrequency}
              onChange={(e) => setBreaksFrequency(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="frequent">Frequent (Every 20-30 Minutes)</option>
              <option value="infrequent">Infrequent (Every Hour)</option>
              <option value="never">Never</option>
            </select>
          </div>

          {/* Screen Brightness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Screen Brightness Level
            </label>
            <select
              value={screenBrightness}
              onChange={(e) => setScreenBrightness(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Blue Light Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Use a Blue Light Filter on Your Screens?
            </label>
            <select
              value={blueLightFilter}
              onChange={(e) => setBlueLightFilter(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Lighting Conditions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lighting Conditions While Using Screens
            </label>
            <select
              value={lightingConditions}
              onChange={(e) => setLightingConditions(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="adequate">Adequate (No Glare, Even Lighting)</option>
              <option value="poor">Poor (Glare or Dim Lighting)</option>
            </select>
          </div>

          {/* Screen Distance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Distance Between Your Eyes and the Screen
            </label>
            <select
              value={screenDistance}
              onChange={(e) => setScreenDistance(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="appropriate">Appropriate (Arm's Length)</option>
              <option value="too-close">Too Close (Less than Arm's Length)</option>
            </select>
          </div>

          {/* Eye Dryness */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Eye Dryness?
            </label>
            <select
              value={eyeDryness}
              onChange={(e) => setEyeDryness(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Headaches */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Headaches After Screen Use?
            </label>
            <select
              value={headaches}
              onChange={(e) => setHeadaches(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Blurred Vision */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Blurred Vision After Screen Use?
            </label>
            <select
              value={blurredVision}
              onChange={(e) => setBlurredVision(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Neck Pain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Experience Neck Pain After Screen Use?
            </label>
            <select
              value={neckPain}
              onChange={(e) => setNeckPain(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Glasses Usage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Wear Glasses or Need Them for Screen Work?
            </label>
            <select
              value={glassesUsage}
              onChange={(e) => setGlassesUsage(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No (Not Needed or Used)</option>
              <option value="used">Yes (Used as Needed)</option>
              <option value="needed-but-not-used">Yes (Needed but Not Used)</option>
            </select>
          </div>

          {/* Eye Rubbing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Frequently Rub Your Eyes While Using Screens?
            </label>
            <select
              value={eyeRubbing}
              onChange={(e) => setEyeRubbing(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Sleep Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How is Your Sleep Quality?
            </label>
            <select
              value={sleepQuality}
              onChange={(e) => setSleepQuality(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="good">Good</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Screen Time Before Bed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Use Screens Within 1 Hour Before Bed?
            </label>
            <select
              value={screenTimeBeforeBed}
              onChange={(e) => setScreenTimeBeforeBed(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Eye Exercises */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do You Practice Eye Exercises (e.g., Focusing on Distant Objects)?
            </label>
            <select
              value={eyeExercises}
              onChange={(e) => setEyeExercises(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Hydration Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              How Much Water Do You Drink Daily?
            </label>
            <select
              value={hydrationLevel}
              onChange={(e) => setHydrationLevel(e.target.value)}
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="adequate">Adequate (8+ Glasses)</option>
              <option value="low">Low (Less than 8 Glasses)</option>
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
              className="w-full p-3 border border-gray-300/20 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Eye Strain Score"}
          </button>
        </form>

        {/* Results */}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {eyeStrainScore !== null && (
          <div className="mt-6 p-6 bg-blue-50/50 dark:bg-blue-900/50 backdrop-blur-sm rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-300 text-center">
              Your Eye Strain Score: {eyeStrainScore}/100
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

export default EyeStrainAssessment;