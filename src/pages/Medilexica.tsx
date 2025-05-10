import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

// Constants
const logoUrl = "https://i.postimg.cc/j57K1m7C/logo.png?w=100&h=100";
const apiUrl = import.meta.env.VITE_MEDILEXICA_API_URL || "https://medilexica-backend.onrender.com/api/medilexica";

// Interface for chat messages
interface ChatMessage {
  user: string;
  bot: string;
}

// Suggested terms and questions
const suggestedItems = [
  { type: 'term', text: "Aortic Stenosis" },
  { type: 'term', text: "Myocardial Infarction" },
  { type: 'term', text: "Hypertension" },
  { type: 'question', text: "What is diabetes mellitus?" },
  { type: 'question', text: "How does an electrocardiogram work?" },
];

const Medilexica: React.FC = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const sendMessage = async (query: string = message) => {
    if (!query.trim()) return;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText} (Status: ${response.status})`);
      }
      const data = await response.json();
      setChatHistory([{ user: query, bot: data.result }, ...chatHistory]); // Prepend new message
      setMessage("");
    } catch (error) {
      let errorMessage = error.message;
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Failed to connect to the server. Please check if the backend is running or try again later.";
      }
      setChatHistory([{ user: query, bot: `Error: ${errorMessage}` }, ...chatHistory]); // Prepend error
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 font-sans">
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #e0f7f9, #f0f4f8);
            color: #1a3c34;
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            padding: 20px;
          }
          .chat-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            border-radius: 12px;
            max-height: 400px;
            overflow-y: auto;
            padding: 16px;
            box-shadow: 0 4px 20px rgba(0, 105, 92, 0.2);
          }
          .chat-message {
            margin-bottom: 16px;
            transition: opacity 0.3s;
          }
          .chat-message.user {
            text-align: right;
          }
          .chat-message.bot {
            text-align: left;
          }
          .chat-bubble {
            display: inline-block;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 75%;
            line-height: 1.5;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .chat-bubble.user {
            background: linear-gradient(135deg, #00695c, #004d40);
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
          .chat-bubble.bot {
            background: linear-gradient(135deg, #e6f3f2, #d1e8e6);
            color: #1a3c34;
          }
          .suggested-btn {
            margin: 4px;
            background: linear-gradient(135deg, #00695c, #004d40);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 14px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .suggested-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 105, 92, 0.3);
          }
          .word-of-day {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(8px);
            border-left: 4px solid #26a69a;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
          .disclaimer {
            background: rgba(255, 248, 230, 0.5);
            backdrop-filter: blur(6px);
            border-left: 4px solid #ffca28;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(255, 202, 40, 0.2);
          }
        `}
      </style>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero Section with Logo */}
        <section className="text-center mb-8">
          <img src={logoUrl} alt="MediLexica Logo" className="h-24 mx-auto mb-4 drop-shadow-lg" />
          <h2 className="text-2xl font-semibold text-teal-800 mb-2">Your Trusted Medical Dictionary</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Look up medical terms or ask questions about health concepts. MediLexica provides accurate, detailed answers with citations, helping you understand complex medical language.
          </p>
        </section>

        {/* Search Bar and Results */}
        <section className="glass-panel mb-6">
            <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80"
              placeholder="Search medical terms or ask a question (e.g., 'What is hypertension?' or 'Define aortic stenosis')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-shadow"
              onClick={() => sendMessage()}
            >
              Search
            </button>
            </div>
            <div className="text-center mb-4">
            <a 
              href="https://huggingface.co/spaces/MahatirTusher/MediLexica"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-shadow"
            >
              Try This on Huggingface
            </a>
            </div>
          <div className="chat-container">
            {chatHistory.length === 0 ? (
              <p className="text-gray-500 text-center">Results will appear here after searching!</p>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className="chat-message">
                  <div className="chat-message user">
                    <div className="chat-bubble user">{msg.user}</div>
                  </div>
                  <div className="chat-message bot">
                    <div className="chat-bubble bot" dangerouslySetInnerHTML={{ __html: msg.bot.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              ))
            )}
          </div>
              {/* Loading indicator */}
              {message && chatHistory.length === 0 && (
              <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                <span className="ml-2 text-teal-600">Processing your query...</span>
              </div>
              )}
              {/* First-time user notice */}
              {chatHistory.length === 0 && (
              <div className="mt-4 p-4 rounded-2xl border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800">
                <p className="font-semibold">First-Time User Notice</p>
                <p>If this is your first search, our backend may take up to a minute to respond as it initializes. Subsequent queries will be much faster. Thank you for your patience! 🚀</p>
              </div>
              )}
            </section>


        {/* About MediLexica */}
        <section className="glass-panel mb-8">
          <h3 className="text-xl font-semibold text-teal-800 mb-4">About MediLexica</h3>
          <p className="text-gray-700 mb-4">
            We understand how overwhelming it can feel when doctors use complex medical terms. MediLexica empowers you with clear, reliable explanations, so you can feel confident and informed.
          </p>
          <p className="text-gray-700 mb-4">
            Our answers are sourced from these authoritative references:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Webster’s New World Medical Dictionary</li>
            <li>Dictionary of Medical Terms</li>
            <li>AMA Glossary of Medical Terms</li>
          </ul>
          <p className="text-gray-600 text-sm">
            A side project of EarlyMed | Developed by Team Sisyphus at VIT-AP University
          </p>
        </section>

        {/* Word of the Day */}
        <section className="word-of-day mb-8">
          <h3 className="text-lg font-semibold text-teal-800 mb-2">Word of the Day</h3>
          <h4 className="text-md font-medium text-gray-800">Arrhythmia</h4>
          <p className="text-gray-700 mb-2">
            An irregular or abnormal heart rhythm, which may cause symptoms like palpitations or dizziness.
          </p>
          <p className="text-gray-600 text-sm">
            Source: Webster’s New World Medical Dictionary, p. 45
          </p>
          <button
            className="suggested-btn mt-2"
            onClick={() => sendMessage("What is arrhythmia?")}
          >
            Learn More
          </button>
        </section>

        {/* Suggested Terms and Questions */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-teal-800 mb-4">Explore Terms & Questions</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedItems.map((item, index) => (
              <button
                key={index}
                className="suggested-btn"
                onClick={() => sendMessage(item.type === 'term' ? `Define ${item.text}` : item.text)}
              >
                {item.text}
              </button>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="disclaimer mb-8">
          <h3 className="text-md font-semibold text-teal-800 mb-2">Important Disclaimer</h3>
          <p className="text-gray-700">
            MediLexica provides definitions and explanations of medical terms based on authoritative sources. It is not a substitute for professional medical advice or diagnosis. Always consult a qualified healthcare provider for personal health concerns. For medical questions beyond terminology, seek professional guidance.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Medilexica;