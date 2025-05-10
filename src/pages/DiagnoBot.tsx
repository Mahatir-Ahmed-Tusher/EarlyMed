import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import ReactMarkdown from 'react-markdown';
import { Menu, X } from 'lucide-react';

// Constants
const logoUrl = "https://i.postimg.cc/02MSmjT7/135e5595-1db5-4d69-b5d0-61d0b56c9d61-removalai-preview.png";
const botAvatarUrl = "https://i.postimg.cc/KvD20Dhb/image.png";
const apiUrl = "http://localhost:8055/api/diagnobot"; // Hardcoded for debugging

// Interface for chat messages
interface ChatMessage {
  user: string;
  bot: string;
  isTyping?: boolean; // Added for typing indicator
}

// Example questions
const exampleQuestions = [
  "Headache and fever for the past two days",
  "I have slept enough yet I am having a bad headache accompanied by sensitivity to light",
  "Chest pain and shortness of breath after minimal exertion",
  "Persistent fatigue and dizziness, especially when standing up quickly",
  "Abdominal pain in the lower right side and nausea that worsens after eating"
];

const DiagnoBot: React.FC = () => {
  const { theme } = useTheme();
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showSources, setShowSources] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Welcome message on initial load
  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([{ user: "", bot: "Welcome to DiagnoBot! I'm here to assist you with health-related questions. Please describe your symptoms or ask anything, and I'll do my best to help. Always consult a healthcare professional for personalized advice!" }]);
    }
  }, []);

  const sendMessage = async (query: string = message) => {
    if (!query.trim()) return;

    console.log("Sending request to:", apiUrl); // Debug log to verify URL

    const finalQuery = showSources ? `${query} please include sources` : query;
    setChatHistory([...chatHistory, { user: query, bot: "", isTyping: true }]);
    setIsTyping(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery }),
      });
      if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
      const data = await response.json();
      const botMessage = data.support_message ? `${data.support_message}\n\n${data.result}` : data.result;
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { user: query, bot: botMessage, isTyping: false };
        return newHistory;
      });
    } catch (error) {
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { user: query, bot: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, isTyping: false };
        return newHistory;
      });
    } finally {
      setMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div className="main-container">
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
          }
          .main-container {
            background-color: ${theme === 'dark' ? '#6b5b95' : '#e6e6fa'};
            min-height: 100vh;
            padding-top: 80px; /* Space for navbar */
            padding-bottom: 60px; /* Space for footer */
            transition: background-color 0.3s;
          }
          .content-wrapper {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            gap: 20px;
            position: relative;
          }
          .sidebar {
            width: ${isSidebarOpen ? '250px' : '0'};
            background: ${theme === 'dark' ? '#483d8b' : '#d8bfd8'};
            color: ${theme === 'dark' ? '#e6e6fa' : '#4b0082'};
            padding: ${isSidebarOpen ? '20px' : '0'};
            transition: all 0.3s ease;
            overflow-y: auto; /* Enable scrolling */
            max-height: calc(100vh - 140px); /* Adjust height to avoid overflow */
            box-shadow: 3px 0 15px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            flex-shrink: 0; /* Prevent shrinking */
            height: auto; /* Allow natural height */
          }
          .sidebar-content {
            opacity: ${isSidebarOpen ? '1' : '0'};
            transition: opacity 0.3s ease;
          }
          .sidebar-content h2 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: ${theme === 'dark' ? '#e6e6fa' : '#4b0082'};
          }
          .sidebar-content p, .sidebar-content ul {
            font-size: 0.9em;
            line-height: 1.5;
          }
          .sidebar-content ul {
            padding-left: 20px;
            margin-top: 10px;
          }
          .sidebar-content li {
            margin-bottom: 8px;
          }
          .toggle-btn {
            position: absolute;
            top: 20px;
            left: ${isSidebarOpen ? '270px' : '20px'};
            background: ${theme === 'dark' ? '#483d8b' : '#d8bfd8'};
            border: none;
            border-radius: 50%;
            padding: 8px;
            cursor: pointer;
            z-index: 15;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: left 0.3s ease;
          }
          .toggle-btn:hover {
            background: ${theme === 'dark' ? '#6b5b95' : '#ba55d3'};
          }
          .chat-section {
            flex: 1;
            min-width: 0; /* Ensure chat section takes available space */
          }
          .header {
            text-align: center;
            margingj-bottom: 20px;
          }
          .logo {
            max-height: 80px;
            margin: 0 auto;
            display: block;
          }
          .header p {
            color: ${theme === 'dark' ? '#d8bfd8' : '#6a5acd'};
            font-size: 1.1em;
            margin-top: 10px;
          }
          .chat-container {
            background: ${theme === 'dark' ? '#483d8b' : '#ffffff'};
            border-radius: 15px;
            height: 450px;
            overflow-y: auto;
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            margin-bottom: 20px;
          }
          .chat-message {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
          }
          .chat-message.user {
            justify-content: flex-end;
          }
          .chat-message.bot {
            justify-content: flex-start;
          }
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            flex-shrink: 0;
          }
          .chat-bubble {
            padding: 12px 18px;
            border-radius: 15px;
            max-width: 70%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            line-height: 1.5;
          }
          .chat-bubble.user {
            background: linear-gradient(135deg, #ff6f61, #ff8c68);
            color: white;
          }
          .chat-bubble.bot {
            background: linear-gradient(135deg, #98fb98, #77dd77);
            color: #2c3e50;
          }
          .typing-indicator {
            display: flex;
            gap: 4px;
            align-items: center;
          }
          .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #2c3e50;
            border-radius: 50%;
            animation: typing 1.2s infinite;
          }
          .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes typing {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
          }
          .input-group input {
            flex: 1;
            padding: 12px;
            border: 1px solid ${theme === 'dark' ? '#6b5b95' : '#d8bfd8'};
            border-radius: 10px;
            font-size: 1em;
            background: ${theme === 'dark' ? '#5e4b8b' : '#f5f5f5'};
            color: ${theme === 'dark' ? '#e6e6fa' : '#2c3e50'};
          }
          .input-group input::placeholder {
            color: ${theme === 'dark' ? '#d8bfd8' : '#a9a9a9'};
          }
          .input-group button {
            background: linear-gradient(135deg, #ff6f61, #ff8c68);
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.1s;
          }
          .input-group button:hover {
            transform: scale(1.05);
          }
          .source-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
            color: ${theme === 'dark' ? '#e6e6fa' : '#4b0082'};
          }
          .example-questions {
            margin-bottom: 20px;
          }
          .example-questions h3 {
            color: ${theme === 'dark' ? '#e6e6fa' : '#4b0082'};
            margin-bottom: 10px;
            font-size: 1.3em;
          }
          .example-btn {
            background: linear-gradient(135deg, #87cefa, #4682b4);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            margin: 5px;
            cursor: pointer;
            font-size: 0.9em;
            transition: transform 0.1s;
          }
          .example-btn:hover {
            transform: scale(1.03);
          }
          .disclaimer {
            background: ${theme === 'dark' ? '#ff6347' : '#fffacd'};
            color: ${theme === 'dark' ? '#ffffff' : '#2c3e50'};
            padding: 15px;
            border-radius: 10px;
            border-left: 5px solid ${theme === 'dark' ? '#ff4500' : '#ffb74d'};
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            font-size: 0.9em;
          }
          .chat-bubble.bot ul {
            padding-left: 20px;
            margin: 5px 0;
          }
          .chat-bubble.bot li {
            margin-bottom: 5px;
          }
          .chat-bubble.bot h1, .chat-bubble.bot h2, .chat-bubble.bot h3 {
            margin: 10px 0;
            font-weight: bold;
          }
          .chat-bubble.bot p {
            margin: 5px 0;
          }
        `}
      </style>

      <div className="content-wrapper">
        {/* Collapsible Sidebar */}
        <div className="sidebar">
          <div className="sidebar-content">
            <h2>About DiagnoBot</h2>
            <p>
              DiagnoBot is your friendly health assistant powered by EarlyMed, designed to provide evidence-based health information in a clear and empathetic way, while always encouraging professional medical consultation.
            </p>
          </div>
        </div>

        {/* Toggle Button for Sidebar */}
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main Chat Section */}
        <div className="chat-section">
          <div className="header">
            <img src={logoUrl} alt="EarlyMed Logo" className="logo" />
            <p>A side project of EarlyMed | Developed by Team Sisyphus at VIT-AP University</p>
            <p style={{ fontSize: '1.2em', color: `${theme === 'dark' ? '#d8bfd8' : '#6a5acd'}`, marginTop: '10px' }}>Empowering your health journey with AI</p>
          </div>

          <div className="chat-container">
            {chatHistory.map((msg, index) => (
              <div key={index}>
                <div className="chat-message user">
                  <div className="chat-bubble user">{msg.user}</div>
                </div>
                <div className="chat-message bot">
                  <img src={botAvatarUrl} alt="Bot Avatar" className="avatar" />
                  {msg.isTyping ? (
                    <div className="chat-bubble bot typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <div className="chat-bubble bot">
                      <ReactMarkdown>{msg.bot}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

            <div className="input-group">
            <input
              type="text"
              placeholder="Describe your symptoms or ask a health question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>Send</button>
            <a 
              href="https://huggingface.co/spaces/MahatirTusher/DiagnoBot-V2" 
              target="_blank"
              rel="noopener noreferrer"
              className="huggingface-btn"
              style={{
              background: '#FFB917',
              padding: '12px 20px',
              borderRadius: '10px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              marginLeft: '10px'
              }}
            >
              Try it on Huggingface
            </a>
            </div>

            <div className="source-checkbox">
            <input
              type="checkbox"
              checked={showSources}
              onChange={(e) => setShowSources(e.target.checked)}
              id="showSources"
            />
            <label htmlFor="showSources">Show Sources</label>
          </div>

          <div className="example-questions">
            <h3>Common Symptom Examples</h3>
            {exampleQuestions.map((question, index) => (
              <button key={index} className="example-btn" onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>

          <div className="disclaimer">
            <strong>Important Disclaimer:</strong> DiagnoBot provides general health information and preliminary insights based on described symptoms. It should NOT be used for emergency situations or as a substitute for professional medical advice. The information provided is not a diagnosis. Always consult a qualified healthcare provider for personal health concerns. If you're experiencing severe symptoms, please seek immediate medical attention.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnoBot;