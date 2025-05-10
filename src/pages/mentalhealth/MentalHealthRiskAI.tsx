import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, Brain, Heart, AlertTriangle } from "lucide-react";

const questionsDetailed = [
  { id: 1, text: "Have you felt persistently sad or hopeless for over two weeks?", type: "yesno" },
  { id: 2, text: "Do you experience sudden, intense feelings of fear or panic?", type: "yesno" },
  { id: 3, text: "How often do you have trouble concentrating on tasks? (1-5)", type: "scale" },
  { id: 4, text: "Do you often feel restless or unable to sit still?", type: "yesno" },
  { id: 5, text: "Have you had periods of unusually high energy where you felt you could do anything?", type: "yesno" },
  { id: 6, text: "How often do you feel irritable or on edge? (1-5)", type: "scale" },
  { id: 7, text: "Do you have recurring, unwanted thoughts that cause anxiety?", type: "yesno" },
  { id: 8, text: "Have you experienced flashbacks or nightmares about a traumatic event?", type: "yesno" },
  { id: 9, text: "How often do you have trouble sleeping due to racing thoughts? (1-5)", type: "scale" },
  { id: 10, text: "Do you feel detached from reality or like you’re observing yourself from outside?", type: "yesno" },
  { id: 11, text: "How often do you feel overwhelmed by daily responsibilities? (1-5)", type: "scale" },
  { id: 12, text: "Have you had periods where you slept very little but felt extremely energetic?", type: "yesno" },
  { id: 13, text: "Do you engage in repetitive behaviors to reduce anxiety (e.g., checking, counting)?", type: "yesno" },
  { id: 14, text: "How often do you feel easily distracted by external stimuli? (1-5)", type: "scale" },
  { id: 15, text: "Have you lost interest in activities you used to enjoy?", type: "yesno" },
  { id: 16, text: "How would you describe your mood swings? (Stable, Occasional, Frequent, Extreme)", type: "mcq", options: ["Stable", "Occasional", "Frequent", "Extreme"] },
  { id: 17, text: "Do you often forget important tasks or appointments?", type: "yesno" },
  { id: 18, text: "How often do you feel worthless or excessively guilty? (1-5)", type: "scale" },
  { id: 19, text: "Have you experienced a traumatic event that still affects you?", type: "yesno" },
  { id: 20, text: "Describe any recurring thoughts that bother you:", type: "text" },
  { id: 21, text: "How often do you feel socially isolated? (1-5)", type: "scale" },
  { id: 22, text: "Do you have periods of extreme sadness followed by high energy?", type: "yesno" },
  { id: 23, text: "How often do you feel hypervigilant or on guard? (1-5)", type: "scale" },
  { id: 24, text: "Do you struggle to organize tasks or manage time effectively?", type: "yesno" },
  { id: 25, text: "Have you had thoughts of harming yourself or others?", type: "yesno" },
  { id: 26, text: "How often do you experience physical symptoms like headaches or fatigue due to stress? (1-5)", type: "scale" },
  { id: 27, text: "What triggers your anxiety the most? (Choose one)", type: "mcq", options: ["Work", "Relationships", "Health", "Other"] },
  { id: 28, text: "Do you feel like you need to perform certain actions to prevent something bad from happening?", type: "yesno" },
  { id: 29, text: "Describe a recent situation where you felt overwhelmed:", type: "text" },
  { id: 30, text: "How often do you feel a sense of impending doom? (1-5)", type: "scale" },
  { id: 31, text: "Do you experience frequent changes in appetite?", type: "yesno" },
  { id: 32, text: "How often do you feel a lack of motivation? (1-5)", type: "scale" },
  { id: 33, text: "Have you noticed any memory problems recently?", type: "yesno" },
  { id: 34, text: "Do you feel overly sensitive to criticism?", type: "yesno" },
  { id: 35, text: "How often do you feel physically exhausted without reason? (1-5)", type: "scale" },
  { id: 36, text: "Have you had episodes of rapid speech or racing thoughts?", type: "yesno" },
  { id: 37, text: "Do you avoid certain places or situations due to fear?", type: "yesno" },
  { id: 38, text: "How often do you feel disconnected from your emotions? (1-5)", type: "scale" },
  { id: 39, text: "Have you experienced sudden weight changes?", type: "yesno" },
  { id: 40, text: "Do you feel a need to check things repeatedly?", type: "yesno" },
  { id: 41, text: "How often do you feel anxious about the future? (1-5)", type: "scale" },
  { id: 42, text: "Have you had difficulty trusting others?", type: "yesno" },
  { id: 43, text: "Describe any recent changes in your sleep patterns:", type: "text" },
  { id: 44, text: "Do you feel overwhelmed by small decisions?", type: "yesno" },
  { id: 45, text: "How often do you experience heart palpitations? (1-5)", type: "scale" },
];

const questionsShort = [
  { id: 1, text: "Do you feel overwhelmed most days?", type: "yesno" },
  { id: 2, text: "Have you lost interest in activities you used to enjoy?", type: "yesno" },
  { id: 3, text: "How often do you have trouble concentrating? (1-5)", type: "scale" },
  { id: 4, text: "Do you experience sudden, intense feelings of fear or panic?", type: "yesno" },
  { id: 5, text: "Have you had periods of unusually high energy where you felt you could do anything?", type: "yesno" },
  { id: 6, text: "How often do you feel restless or unable to sit still? (1-5)", type: "scale" },
  { id: 7, text: "Do you have recurring, unwanted thoughts that cause anxiety?", type: "yesno" },
  { id: 8, text: "Have you experienced flashbacks or nightmares about a traumatic event?", type: "yesno" },
  { id: 9, text: "How often do you feel worthless or excessively guilty? (1-5)", type: "scale" },
  { id: 10, text: "Do you often forget important tasks or appointments?", type: "yesno" },
  { id: 11, text: "How would you describe your mood swings? (Stable, Occasional, Frequent, Extreme)", type: "mcq", options: ["Stable", "Occasional", "Frequent", "Extreme"] },
  { id: 12, text: "How often do you feel socially isolated? (1-5)", type: "scale" },
  { id: 13, text: "Do you feel like you need to perform certain actions to prevent something bad from happening?", type: "yesno" },
  { id: 14, text: "Have you had thoughts of harming yourself or others?", type: "yesno" },
  { id: 15, text: "Describe a recent situation where you felt overwhelmed:", type: "text" },
  { id: 16, text: "How often do you experience physical symptoms like headaches due to stress? (1-5)", type: "scale" },
  { id: 17, text: "Do you have periods of extreme sadness followed by high energy?", type: "yesno" },
  { id: 18, text: "Have you noticed any memory problems recently?", type: "yesno" },
  { id: 19, text: "How often do you feel a lack of motivation? (1-5)", type: "scale" },
  { id: 20, text: "Do you feel anxious about the future?", type: "yesno" },
];

const MentalHealthRiskAI = () => {
  const [step, setStep] = useState<"intro" | "info" | "session" | "questions" | "generate" | "result">("intro");
  const [userInfo, setUserInfo] = useState({ name: "", age: "", gender: "", region: "", profession: "" });
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [tempAnswers, setTempAnswers] = useState<{ [key: number]: string | number }>({});
  const [isLoading, setIsLoading] = useState(false);

  const questions = isDetailed ? questionsDetailed : questionsShort;
  const questionsPerPage = 5;
  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const currentQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);

  useEffect(() => {
    if (step === "questions") {
      setProgress(((currentPage + 1) / totalPages) * 100);
    }
  }, [currentPage, totalPages, step]);

  const handleInfoChange = (field: string, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleTempAnswer = (questionIndex: number, answer: string | number) => {
    setTempAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNextPage = () => {
    const updatedAnswers = { ...answers, ...tempAnswers };
    setAnswers(updatedAnswers);
    setTempAnswers({});

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setStep("generate");
    }
  };

  const handlePrevPage = () => {
    const updatedAnswers = { ...answers, ...tempAnswers };
    setAnswers(updatedAnswers);
    setTempAnswers({});

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const submitAssessment = async () => {
    setIsLoading(true);
    try {
      const prompt = (
        `You are MentalHealthRisk AI, an expert mental health professional analyzing responses for a mental health assessment. Analyze the following user profile and responses using plain text with minimal formatting (no excessive stars or hashes). Provide a clear, empathetic, and professional report:\n\n` +
        `**User Information**\n` +
        `- Name: ${userInfo.name || "Not provided"}\n` +
        `- Age: ${userInfo.age || "Not provided"}\n` +
        `- Gender: ${userInfo.gender || "Not provided"}\n` +
        `- Region: ${userInfo.region || "Not provided"}\n` +
        `- Profession: ${userInfo.profession || "Not provided"}\n\n` +
        `**Responses**\n` +
        `${Object.entries(answers)
          .map(([index, answer]) => {
            const question = questions[parseInt(index)];
            return `- ${question.text}: ${answer}`;
          })
          .join("\n")}\n\n` +
        `Analyze these responses for risk level (Low, Moderate, High, Severe) and potential conditions (depression, anxiety, PTSD, OCD, stress, ADHD, bipolar disorder) using GAD-7, PHQ-9, and other clinical frameworks where applicable. Provide a detailed report with the following sections:\n` +
        `1. Risk Level\n` +
        `2. Identified Conditions\n` +
        `3. Therapy Suggestions\n` +
        `4. Recommendations (suggest consulting a psychiatrist if the condition is severe)\n` +
        `Use simple headings and bullet points. Avoid excessive Markdown symbols like stars or hashes.`
      );

      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
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
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const rawResult = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request. Please try again.";
      const cleanedResult = rawResult.replace(/(\*+|#+)/g, "").trim();
      const disclaimer = "\n\nDisclaimer: This AI-generated report is for informational purposes only. Please consult a healthcare professional for accurate diagnosis and treatment.";
      const finalResult = (
        `Mental Health Assessment Report\n\n` +
        `${cleanedResult}\n\n` +
        `Additional Recommendations: Depending on your condition, consider therapies such as Cognitive Behavioral Therapy (CBT) for anxiety or depression, mindfulness-based therapy for stress, or behavioral therapy for ADHD. Journaling and meditation can also help manage symptoms.\n` +
        `${
          cleanedResult.includes("High") || cleanedResult.includes("Severe")
            ? "Recommendation: Your condition may be severe. We strongly recommend consulting a psychiatrist for professional support.\n"
            : ""
        }` +
        `Analyzed by EarlyMed\n` +
        `${disclaimer}`
      );
      setResult(finalResult);
      setStep("result");
    } catch (error) {
      console.error("Error generating report:", error);
      setResult(`An error occurred while generating your report: ${error.message}. Please try again or contact support@earlymed.com.\n\nDisclaimer: This AI-generated report is for informational purposes only. Please consult a healthcare professional for accurate diagnosis and treatment.`);
      setStep("result");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    const blob = new Blob([result || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MentalHealthReport.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(result || "");
    alert("Report copied to clipboard!");
  };

  if (step === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <Brain className="h-12 w-12" />
              <CardTitle className="text-3xl font-bold">Mental Health Risk Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Welcome to your mental health journey! This tool uses AI to assess your risk for conditions like depression, anxiety, PTSD, OCD, ADHD, and bipolar disorder. Start by providing optional personal details, then choose between a short (20 questions) or detailed (45 questions) session. We recommend the 45-question session for a more rigorous analysis. After completion, get a personalized report with therapy suggestions and, if needed, a psychiatrist recommendation—downloadable as a .txt file!
            </p>
            <Button
              onClick={() => setStep("info")}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              <span>Get Started</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "info") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Your Personal Details</CardTitle>
            <CardDescription className="text-white/80">Optional—share to personalize your assessment.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Input
              placeholder="Name (optional)"
              value={userInfo.name}
              onChange={(e) => handleInfoChange("name", e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-300 dark:border-gray-600"
            />
            <Input
              placeholder="Age (optional)"
              type="number"
              value={userInfo.age}
              onChange={(e) => handleInfoChange("age", e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-300 dark:border-gray-600"
            />
            <Select onValueChange={(value) => handleInfoChange("gender", value)} className="w-full">
              <SelectTrigger className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="Gender (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Region (optional)"
              value={userInfo.region}
              onChange={(e) => handleInfoChange("region", e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-300 dark:border-gray-600"
            />
            <Input
              placeholder="Profession (optional)"
              value={userInfo.profession}
              onChange={(e) => handleInfoChange("profession", e.target.value)}
              className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-2 border border-gray-300 dark:border-gray-600"
            />
            <Button
              onClick={() => setStep("session")}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "session") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold">Choose Your Session</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <Label htmlFor="session-type" className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Detailed Session (45 questions) - Recommended for a more rigorous analysis
              </Label>
              <Switch
                id="session-type"
                checked={isDetailed}
                onCheckedChange={setIsDetailed}
                className="ml-2"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">(Short Session: 20 questions)</span>
            </div>
            <Button
              onClick={() => setStep("questions")}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              <span>Start Assessment</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "questions") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <Heart className="h-6 w-6" />
              <span>Mental Health Questions</span>
            </CardTitle>
            <CardDescription className="text-white/80">Answer the following questions to continue.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <Progress value={progress} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </Progress>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage + 1} of {totalPages} (Questions {currentPage * questionsPerPage + 1} to {Math.min((currentPage + 1) * questionsPerPage, totalQuestions)} of {totalQuestions})
            </p>
            {currentQuestions.map((question, idx) => {
              const globalIndex = currentPage * questionsPerPage + idx;
              return (
                <div key={question.id} className="space-y-2">
                  <p className="text-xl text-gray-800 dark:text-gray-200">{question.text}</p>
                  {question.type === "yesno" ? (
                    <>
                      <Button
                        onClick={() => handleTempAnswer(globalIndex, "Yes")}
                        className={`w-full mb-2 py-2 rounded-lg transition duration-300 ${tempAnswers[globalIndex] === "Yes" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        Yes
                      </Button>
                      <Button
                        onClick={() => handleTempAnswer(globalIndex, "No")}
                        className={`w-full mb-2 py-2 rounded-lg transition duration-300 ${tempAnswers[globalIndex] === "No" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        No
                      </Button>
                      <Button
                        onClick={() => handleTempAnswer(globalIndex, "Sometimes")}
                        className={`w-full mb-2 py-2 rounded-lg transition duration-300 ${tempAnswers[globalIndex] === "Sometimes" ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        Sometimes
                      </Button>
                    </>
                  ) : question.type === "scale" ? (
                    [1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        onClick={() => handleTempAnswer(globalIndex, num)}
                        className={`w-full mb-2 py-2 rounded-lg transition duration-300 ${tempAnswers[globalIndex] === num ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        {num}
                      </Button>
                    ))
                  ) : question.type === "mcq" ? (
                    question.options.map((option: string) => (
                      <Button
                        key={option}
                        onClick={() => handleTempAnswer(globalIndex, option)}
                        className={`w-full mb-2 py-2 rounded-lg transition duration-300 ${tempAnswers[globalIndex] === option ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600 hover:bg-pink-200"}`}
                      >
                        {option}
                      </Button>
                    ))
                  ) : (
                    <Textarea
                      value={tempAnswers[globalIndex] as string || ""}
                      onChange={(e) => handleTempAnswer(globalIndex, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                </div>
              );
            })}
            <div className="flex justify-between space-x-4">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Previous</span>
              </Button>
              <Button
                onClick={handleNextPage}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
              >
                <span>{currentPage < totalPages - 1 ? "Next 5 Questions" : "Finish"}</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "generate") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
        <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
          <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
            <CardTitle className="text-2xl font-bold flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Assessment Complete</span>
            </CardTitle>
            <CardDescription className="text-white/80">Generate your personalized report now.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <Button
              onClick={submitAssessment}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-4 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              {isLoading ? (
                <>
                  <span>Generating...</span>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <span>Generate Report</span>
                  <ChevronRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
      <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <CardTitle className="text-2xl font-bold flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span>Your Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-lg leading-relaxed">{result}</p>
          <div className="space-y-4">
            <Button
              onClick={copyReport}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              <span>Copy Report</span>
            </Button>
            <Button
              onClick={downloadReport}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
            >
              <span>Download Report</span>
            </Button>
            {result?.includes("High") || result?.includes("Severe") ? (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 py-3 rounded-xl flex items-center justify-center space-x-2 transition duration-300"
              >
                <Link to="/find-specialist">
                  <span>Find a Specialist</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthRiskAI;