import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';

// Constants
const logoUrl = "https://i.postimg.cc/gJ9Z0RGS/bc20af1b-8ee6-4e1c-8748-eba44e2780c1-removalai-preview.png";
const apiUrl = "https://drugscan-api.onrender.com/api/drugscan";

// Interface for chat messages
interface ChatMessage {
  user: string;
  bot: string;
}

// Suggested drugs
const suggestedDrugs = [
  "Azirox",
  "Augmentin",
  "Ascoril LS",
  "Allepra 120",
  "Amoxycillin",
];

const DrugScan: React.FC = () => {
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
      if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
      const data = await response.json();
      setChatHistory([{ user: query, bot: data.result }, ...chatHistory]); // Prepend new message
      setMessage("");
    } catch (error) {
      setChatHistory([{ user: query, bot: `Error: ${error.message}` }, ...chatHistory]); // Prepend error
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 font-sans">
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
          <img src={logoUrl} alt="DrugScan Logo" className="h-24 mx-auto mb-4 drop-shadow-lg" />
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">DrugScan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter the name of a drug to learn about its active ingredients, uses, mechanism of action, side effects, and more.
          </p>
        </section>

        {/* Search Bar and Results */}
        <section className="glass-panel mb-6">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              placeholder="Enter a drug name (e.g., 'Azirox')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-shadow"
              onClick={() => sendMessage()}
            >
              Search
            </button>
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
        </section>

        {/* Huggingface Link */}
        <section className="mb-4 text-center">
          <a 
            href="https://huggingface.co/spaces/MahatirTusher/DrugScan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Try this on Huggingface
          </a>
        </section>

        {/* Suggested Drugs */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Try These Drugs</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedDrugs.map((drug, index) => (
              <button
                key={index}
                className="suggested-btn"
                onClick={() => sendMessage(drug)}
              >
                {drug}
              </button>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="disclaimer mb-8">
          <h3 className="text-md font-semibold text-blue-800 mb-2">Important Disclaimer</h3>
          <p className="text-gray-700">
            DrugScan provides explanations of drug compositions based on available data. It is not a substitute for professional medical advice or diagnosis. Always consult a qualified healthcare provider for personal health concerns.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DrugScan;