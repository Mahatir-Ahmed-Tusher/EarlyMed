import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: string;
  content: string;
}

const Manasmitra: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey there! I’m Manasmitra, your friendly psychiatrist. What’s your name? 😊",
    },
  ]);
  const [input, setInput] = useState<string>('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://api.mistral.ai/v1/chat/completions";
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const loadingMessage: Message = { role: 'assistant', content: 'Manasmitra is typing...' };
    setMessages((prev) => [...prev, loadingMessage]);

    const conversationHistory = [
      {
        role: 'system',
        content: "You are Manasmitra, a friendly and empathetic psychiatrist chatbot. Start by asking the user's name in a warm tone. Provide concise, casual responses (not formal, not overly informal) unless the user asks for detailed answers (e.g., 'Can you explain more?'). Ask relevant, interactive questions to keep the conversation flowing, such as 'How are you feeling today?' or 'What’s been on your mind?' Add light humor when appropriate (e.g., 'Sounds like a rough day—wanna tell me more, or should I prescribe some chocolate therapy?'). Always be supportive and understanding.",
      },
      ...messages,
      userMessage,
    ];

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-medium',
          messages: conversationHistory,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botReply: string = data.choices[0].message.content;

      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop();
        return [...updatedMessages, { role: 'assistant', content: botReply }];
      });
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop();
        return [...updatedMessages, { role: 'assistant', content: 'Oops! Something went wrong. Let’s try again later!' }];
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Added top padding to prevent navbar overlap */}
      <div className="flex flex-col h-[calc(100vh-4rem)] mt-16 mx-4 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20">
        <div className="flex items-center p-4 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-t-2xl shadow-md">
          <img
            src="https://i.postimg.cc/tCNSDgfc/image.png"
            alt="Manasmitra Icon"
            className="w-12 h-12 rounded-full mr-3 border-2 border-white/40 shadow-md"
          />
          <span className="text-2xl font-bold text-white drop-shadow-md">Manasmitra</span>
        </div>
        <div
          ref={chatBodyRef}
          className="flex-1 p-6 overflow-y-auto space-y-4 bg-transparent"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[70%] p-4 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg ${
                message.role === 'user'
                  ? 'ml-auto bg-teal-600/40 border border-teal-400/50 shadow-teal-500/30 text-white'
                  : 'mr-auto bg-purple-600/40 border border-purple-400/50 shadow-purple-500/30 text-white'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="p-4 bg-white/10 rounded-b-2xl flex items-center border-t border-white/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Write your message..."
            className="flex-1 p-4 bg-white/20 rounded-full text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-inner"
          />
          <button
            onClick={sendMessage}
            className="ml-4 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <img
              src="https://i.postimg.cc/tJXPg951/image.png"
              alt="Send"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manasmitra;