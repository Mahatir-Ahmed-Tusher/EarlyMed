import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Send } from 'lucide-react';

// Constants
const logoUrl = "https://i.postimg.cc/tJffCsHk/ff58f292-97d6-45ce-8e74-affc24c9b667-removalai-preview.png";
const botAvatarUrl = "https://i.postimg.cc/KjdLKHsP/image.png";
const apiUrl = "https://api.mistral.ai/v1/chat/completions";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

// System prompt
const getSystemPrompt = (language: string) => `
    You are Symptom Checker, an AI-powered health assistant created by EarlyMed to provide users with evidence-based health insights in ${language}.
    - Communicate with empathy, professionalism, and clarity.
    - Collect user input in a multi-step process: age, gender, symptoms, and follow-up questions to refine insights.
    - Avoid definitive diagnoses; instead, suggest possible conditions with estimated probabilities and guide users to consult healthcare professionals.
    - For symptoms, generate 3-4 follow-up questions to gather more context (e.g., duration, severity, location). Format each question as a concise, standalone sentence with a question mark. Example: "How long have you been experiencing these symptoms?" or "Do you have any other symptoms like nausea or fatigue?"
    - Generate a report with Markdown formatting, including possible conditions, probabilities, and a recommendation to try DiagnoBot.
    - Ensure all responses are in ${language}, maintaining cultural and linguistic appropriateness.
    - Make complex medical information accessible to a general audience.
`;

// Ensure marked is synchronous (assuming marked is configured for sync use)
marked.setOptions({ async: false });

const EarlyMedBot = () => {
  const [step, setStep] = useState(1);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [followUpAnswers, setFollowUpAnswers] = useState<string[]>([]);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ content: string; isBot: boolean; isReport?: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Bengali", "Hindi", "Telugu"];

  // Initialize welcome message
  useEffect(() => {
    const welcomeMessage = {
      content: marked.parse(
        `**Symptom Checker**  
        powered by AI  
        Welcome! Let's assess your health step by step. *Please consult a healthcare professional for accurate diagnosis and treatment.*`
      ) as string,
      isBot: true,
    };
    setMessages([welcomeMessage]);
  }, [language]);

  // Scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, step]);

  // Send message to API
  const sendMessage = async () => {
    // Validate inputs for step 1
    if (step === 1) {
      if (!age || !gender) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      const newMessages = [...messages, { content: `Age: ${age}, Gender: ${gender}`, isBot: false }];

      // Simulate API call for step 1 (since we just need to confirm and move to next step)
      try {
        const botResponse = "Thank you for providing your age and gender. Please describe your symptoms in the next step.";
        newMessages.push({ content: botResponse, isBot: true });
        setMessages(newMessages);
        setStep(2); // Move to the next step
      } catch (error) {
        newMessages.push({ content: "Sorry, something went wrong. Please try again.", isBot: true });
        setMessages(newMessages);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // Handle step 2 (symptom input)
    if (step === 2) {
      if (!symptoms) {
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      const newMessages = [...messages, { content: symptoms, isBot: false }];
      const prompt = `User provided symptoms: ${symptoms}. Generate a confirmation message and provide 3-4 follow-up questions to gather more context (e.g., duration, severity, location). Format each question as a concise, standalone sentence with a question mark.`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
              { role: "system", content: getSystemPrompt(language) },
              { role: "user", content: prompt },
            ],
            max_tokens: 3000,
            temperature: 0.7,
            top_p: 0.9,
          }),
        });

        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";

        const questions = botResponse.split('\n').filter(q => q.trim()).slice(1);
        setFollowUpQuestions(questions);
        newMessages.push({ content: `Symptoms noted. I have a few follow-up questions to better understand your condition. You can answer them or skip to the report if you'd like.`, isBot: true });
        setMessages(newMessages);
        setStep(3); // Move to follow-up questions
      } catch (error) {
        newMessages.push({ content: "Sorry, something went wrong. Please try again.", isBot: true });
        setMessages(newMessages);
      } finally {
        setIsTyping(false);
      }
      return;
    }

    // Handle step 3 (follow-up questions and report)
    if (step === 3) {
      const prompt = `User provided answers to follow-up questions: ${followUpAnswers.filter(a => a).join(', ') || 'No answers provided'}. Based on age: ${age}, gender: ${gender}, symptoms: ${symptoms}, and follow-up answers (if any), generate a health insight report with possible conditions, estimated probabilities (e.g., High, Medium, Low), and recommend trying DiagnoBot. Format in Markdown.`;
      const newMessages = [...messages];

      setIsTyping(true);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
              { role: "system", content: getSystemPrompt(language) },
              { role: "user", content: prompt },
            ],
            max_tokens: 3000,
            temperature: 0.7,
            top_p: 0.9,
          }),
        });

        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";

        newMessages.push({ content: botResponse, isBot: true, isReport: true });
        setMessages(newMessages);
      } catch (error) {
        newMessages.push({ content: "Sorry, something went wrong. Please try again.", isBot: true });
        setMessages(newMessages);
      } finally {
        setIsTyping(false);
      }
    }
  };

  // Handle follow-up answers
  const handleFollowUpAnswer = (answer: string, index: number) => {
    const updatedAnswers = [...followUpAnswers];
    updatedAnswers[index] = answer;
    setFollowUpAnswers(updatedAnswers);
  };

  // Handle download report
  const handleDownload = (content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Symptom-Checker-Report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-light-blue-100 to-light-blue-300 dark:from-blue-900 dark:to-purple-900 text-gray-900 dark:text-gray-100 transition-colors duration-300" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <style>
        {`
          .glass-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          .dark .glass-card {
            background: rgba(31, 41, 55, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .glass-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            color: inherit;
            transition: all 0.3s;
          }
          .dark .glass-input {
            background: rgba(31, 41, 55, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .glass-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          .dark .glass-input:focus {
            border-color: #a78bfa;
            box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
          }
          .glass-button {
            background: linear-gradient(135deg, #10b981, #34d399);
            border: none;
            padding: 10px 20px;
            border-radius: 15px;
            color: white;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .dark .glass-button {
            background: linear-gradient(135deg, #a78bfa, #7c3aed);
          }
          .glass-button:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.5);
          }
          .dark .glass-button:hover {
            box-shadow: 0 5px 15px rgba(167, 139, 250, 0.5);
          }
          .glass-button:disabled {
            background: #d1d5db;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          .dark .glass-button:disabled {
            background: #4b5563;
          }
          .typing-dot {
            width: 8px;
            height: 8px;
            background-color: #3b82f6;
            border-radius: 50%;
            margin: 0 2px;
            animation: typing 1.2s infinite ease-in-out;
          }
          .dark .typing-dot {
            background-color: #a78bfa;
          }
          .typing-dot:nth-child(1) { animation-delay: 0s; }
          .typing-dot:nth-child(2) { animation-delay: 0.2s; }
          .typing-dot:nth-child(3) { animation-delay: 0.4s; }
          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-6px); }
          }
          .chat-container::-webkit-scrollbar {
            width: 6px;
          }
          .chat-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .dark .chat-container::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.3);
          }
          .chat-container::-webkit-scrollbar-thumb {
            background: #3b82f6;
            border-radius: 3px;
          }
          .dark .chat-container::-webkit-scrollbar-thumb {
            background: #a78bfa;
          }
        `}
      </style>

      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Choose Language</h3>
            {languages.map((lang) => (
              <button
                key={lang}
                className="w-full py-2 mb-2 bg-blue-500 dark:bg-purple-600 text-white rounded hover:bg-blue-600 dark:hover:bg-purple-500"
                onClick={() => {
                  setLanguage(lang);
                  setShowLanguageModal(false);
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mb-8 flex-col items-center">
        <img src={logoUrl} alt="Symptom Checker Logo" className="h-24" />
        <p className="text-lg font-medium text-teal-600 dark:text-purple-300 mt-2">Empowering Your Health with AI</p>
      </div>

      <div className="flex justify-center">
        <div className="glass-card p-6 w-full max-w-2xl">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">GENERAL INFORMATION (Step 1/3)</h2>
              <div className="flex justify-between mb-4 gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Age significantly impacts health risks and wellness strategies.</p>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 48"
                    className="glass-input w-full p-3 mt-2 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sex assigned at birth</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Biological sex can impact risk for certain conditions and response to treatments.</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className={`glass-input p-3 rounded-lg flex-1 ${gender === 'Male' ? 'bg-teal-200 dark:bg-purple-700' : ''}`}
                      onClick={() => setGender('Male')}
                    >
                      Male
                    </button>
                    <button
                      className={`glass-input p-3 rounded-lg flex-1 ${gender === 'Female' ? 'bg-teal-200 dark:bg-purple-700' : ''}`}
                      onClick={() => setGender('Female')}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="glass-button w-full mt-4"
                onClick={sendMessage}
                disabled={!age || !gender}
              >
                Continue
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">SYMPTOMS (Step 2/3)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Describe your symptoms</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">For accurate insights, provide detailed descriptions of your symptoms.</p>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. itching, coughing, and fever"
                className="glass-input w-full p-3 h-24 rounded-lg mb-4"
              />
              <button
                className="glass-button w-full"
                onClick={sendMessage}
                disabled={!symptoms}
              >
                Continue
              </button>
            </>
          )}
          {step === 3 && followUpQuestions.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">FOLLOW-UP QUESTIONS (Step 3/3)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">These questions help me understand your condition better, but you can skip them if you'd like.</p>
              {followUpQuestions.map((question, index) => (
                <div key={index} className="mb-6">
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">{question}</p>
                  <input
                    type="text"
                    value={followUpAnswers[index] || ''}
                    onChange={(e) => handleFollowUpAnswer(e.target.value, index)}
                    className="glass-input w-full p-3 rounded-lg"
                    placeholder="Your answer (optional)"
                  />
                </div>
              ))}
              <button
                className="glass-button w-full"
                onClick={sendMessage}
              >
                Generate Report
              </button>
            </>
          )}
          {step === 3 && messages.length > 0 && messages[messages.length - 1].isReport && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Your Health Insights</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Your possible health conditions based on the information you provided.</p>
              <div
                className="glass-card p-4 mb-4"
                dangerouslySetInnerHTML={{ __html: marked.parse(messages[messages.length - 1].content) }}
              />
              <button
                className="glass-button w-full"
                onClick={() => handleDownload(messages[messages.length - 1].content)}
              >
                Download Report
              </button>
            </div>
          )}
          {isTyping && (
            <div className="flex justify-center mt-4">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyMedBot;