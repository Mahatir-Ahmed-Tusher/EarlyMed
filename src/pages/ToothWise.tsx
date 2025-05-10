import React, { useState, useEffect, useRef } from 'react';

const ToothWise: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content: "Welcome to ToothWise AI! I’m here to help analyze your dental health. To get started, please upload a photo of your teeth or mouth and describe any symptoms in the sidebar on the left.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a JPEG or PNG image.');
    }
  };

  // Convert image to Base64 for API
  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle analysis submission or chat reply
  const submitAnalysis = async (isReply: boolean = false, replyText: string = '') => {
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: API key is missing. Please contact support.' },
      ]);
      return;
    }

    if (!isReply && !image && !symptoms.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Please upload an image or describe your symptoms in the sidebar to proceed.' },
      ]);
      return;
    }

    setIsLoading(true);
    const userMessage = {
      role: 'user',
      content: isReply ? replyText : (symptoms || 'No symptoms provided.'),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const loadingMessage = { role: 'assistant', content: isReply ? 'Processing your response...' : 'Analyzing your input...' };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      let imageBase64 = '';
      if (image && !isReply) {
        imageBase64 = await getBase64(image);
      }

      const conversationHistory = [
        {
          role: 'system',
          content: `You are ToothWise AI, a dental health assistant powered by LLaMA 3.2 Vision. Analyze dental images and/or text symptoms provided by users. Start by greeting users and instructing them to upload an image and describe symptoms in the sidebar. Ask 1-2 relevant follow-up questions to clarify symptoms (e.g., "How often do your gums bleed?"). Then, ask if the user wants a detailed report or a brief summary (e.g., "Would you like a detailed analysis or a brief summary?"). Provide an analysis of possible causes (e.g., cavities, gum disease) and recommendations (e.g., consult a dentist) in a well-formatted report with headings (e.g., **Analysis**, **Possible Causes**, **Recommendations**) and bullet points. Be empathetic, clear, and professional, but keep the tone friendly. Avoid definitive diagnoses; suggest consulting a dentist for confirmation.`,
        },
        ...messages,
        {
          role: 'user',
          content: [
            { type: 'text', text: isReply ? replyText : (symptoms || 'No symptoms provided.') },
            ...(imageBase64 && !isReply
              ? [{ type: 'image_url', image_url: { url: imageBase64 } }]
              : []),
          ],
        },
      ];

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
          messages: conversationHistory,
          max_tokens: 700,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove loading message
        return [...updatedMessages, { role: 'assistant', content: botReply }];
      });
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove loading message
        return [...updatedMessages, { role: 'assistant', content: 'Oops! Something went wrong. Please try again later.' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reply input submission
  const handleReply = () => {
    if (input.trim()) {
      submitAnalysis(true, input);
    }
  };

  // Handle Enter key for reply
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReply();
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .toothwise-container {
            display: flex;
            flex-direction: row;
            min-height: calc(100vh - 60px);
            margin-top: 60px;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #e6e6fa 100%);
          }

          .toothwise-sidebar {
            width: 25%;
            min-width: 280px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-right: 1px solid rgba(224, 224, 224, 0.3);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border-radius: 15px 0 0 15px;
          }

          .toothwise-main {
            width: 75%;
            display: flex;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 0 15px 15px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }

          .toothwise-header {
            background: linear-gradient(90deg, #d1c4e9 0%, #e6e6fa 100%);
            padding: 15px 30px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 0 15px 0 0;
          }

          .toothwise-header img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .toothwise-header span {
            font-size: 22px;
            font-weight: 700;
            color: #2d2d2d;
          }

          .toothwise-content {
            padding: 30px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .toothwise-intro {
            max-width: 800px;
          }

          .toothwise-intro h1 {
            font-size: 30px;
            font-weight: 700;
            color: #2d2d2d;
            margin-bottom: 12px;
          }

          .toothwise-intro p {
            font-size: 16px;
            color: #4a4a4a;
            line-height: 1.6;
          }

          .image-upload {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
          }

          .image-upload input {
            display: none;
          }

          .image-upload label {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(209, 196, 233, 0.8);
            backdrop-filter: blur(5px);
            padding: 15px;
            border-radius: 15px;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .image-upload label:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(209, 196, 233, 0.5);
          }

          .image-upload img {
            width: 50px;
            height: 50px;
          }

          .image-upload span {
            font-size: 14px;
            font-weight: 500;
            color: #2d2d2d;
            margin-top: 5px;
          }

          .image-preview {
            max-width: 100%;
            max-height: 150px;
            border-radius: 10px;
            border: 1px solid rgba(224, 224, 224, 0.3);
            margin-top: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .toothwise-sidebar textarea {
            width: 100%;
            min-height: 120px;
            padding: 12px;
            border: 1px solid rgba(224, 224, 224, 0.3);
            border-radius: 15px;
            font-size: 16px;
            outline: none;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(5px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            resize: vertical;
            transition: border-color 0.3s, box-shadow 0.3s;
            margin-bottom: 20px;
          }

          .toothwise-sidebar textarea:focus {
            border-color: #d1c4e9;
            box-shadow: 0 0 8px rgba(209, 196, 233, 0.5);
          }

          .submit-button {
            background: linear-gradient(90deg, #d1c4e9 0%, #b0a4d3 100%);
            border: none;
            border-radius: 25px;
            padding: 12px 24px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            color: #2d2d2d;
            transition: transform 0.3s, box-shadow 0.3s;
            width: 100%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .submit-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(209, 196, 233, 0.5);
          }

          .submit-button:disabled {
            background: #e0e0e0;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .toothwise-chat {
            flex: 1;
            padding: 20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 15px;
            font-size: 16px;
            line-height: 1.5;
            animation: fadeIn 0.3s ease-in;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .bot-message {
            background: rgba(230, 230, 250, 0.9);
            align-self: flex-start;
            color: #2d2d2d;
          }

          .user-message {
            background: rgba(209, 196, 233, 0.9);
            align-self: flex-end;
            color: #2d2d2d;
          }

          .report {
            background: rgba(249, 249, 255, 0.95);
            border: 1px solid rgba(209, 196, 233, 0.5);
            border-radius: 15px;
            padding: 16px;
            max-width: 100%;
            align-self: flex-start;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .report h2 {
            font-size: 18px;
            font-weight: 700;
            color: #2d2d2d;
            margin-bottom: 10px;
          }

          .report ul {
            list-style-type: disc;
            padding-left: 20px;
            margin-bottom: 10px;
          }

          .report li {
            font-size: 16px;
            color: #2d2d2d;
            line-height: 1.5;
          }

          .report p {
            font-size: 16px;
            color: #2d2d2d;
            line-height: 1.5;
          }

          .chat-footer {
            padding: 15px 20px;
            background: rgba(245, 245, 245, 0.9);
            backdrop-filter: blur(5px);
            border-top: 1px solid rgba(224, 224, 224, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
          }

          .chat-footer input {
            flex: 1;
            padding: 12px 15px;
            border: 1px solid rgba(224, 224, 224, 0.3);
            border-radius: 25px;
            font-size: 16px;
            outline: none;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(5px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: border-color 0.3s, box-shadow 0.3s;
          }

          .chat-footer input:focus {
            border-color: #d1c4e9;
            box-shadow: 0 0 8px rgba(209, 196, 233, 0.5);
          }

          .chat-footer button {
            background: linear-gradient(90deg, #d1c4e9 0%, #b0a4d3 100%);
            border: none;
            border-radius: 25px;
            padding: 12px 20px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            color: #2d2d2d;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .chat-footer button:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 15px rgba(209, 196, 233, 0.5);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="toothwise-container">
        <div className="toothwise-sidebar">
          <div className="image-upload">
            <label htmlFor="image-upload">
              <img src="https://i.postimg.cc/28CJsts3/image.png" alt="Upload Icon" />
              <span>Teeth/Mouth Photo</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="image-preview" />
            )}
          </div>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms (e.g., 'My gums bleed when brushing')..."
          />
          <button
            className="submit-button"
            onClick={() => submitAnalysis(false)}
            disabled={isLoading}
          >
            Submit for Analysis
          </button>
        </div>
        <div className="toothwise-main">
          <div className="toothwise-header">
            <img src="https://i.postimg.cc/fT7zKxMh/image.png" alt="ToothWise Icon" />
            <span>ToothWise AI</span>
          </div>
          <div className="toothwise-content">
            <div className="toothwise-intro">
              <h1>Dental Health Analysis</h1>
              <p>
                ToothWise AI uses advanced vision and language models to analyze your dental health. Upload a clear photo of your teeth or mouth and describe any symptoms (e.g., pain, bleeding gums) in the sidebar on the left. Our AI will ask follow-up questions to better understand your condition and provide a detailed report on possible causes and recommendations. For accurate results, ensure the photo is well-lit and focused.
              </p>
            </div>
            <div className="toothwise-chat" ref={chatBodyRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.role === 'user' ? 'user-message' : 'bot-message'
                  } ${message.content.includes('**') ? 'report' : ''}`}
                >
                  {message.content.includes('**') ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>')
                          .replace(/\* (.*?)\n/g, '<li>$1</li>')
                          .replace(/\n/g, '<p>')
                          .replace(/<p>\s*<\/p>/g, ''),
                      }}
                    />
                  ) : (
                    message.content
                  )}
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your reply..."
              />
              <button onClick={handleReply} disabled={isLoading}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToothWise;