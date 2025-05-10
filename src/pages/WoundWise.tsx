import React, { useState, useEffect, useRef } from 'react';

const WoundWise: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: 'assistant',
      content:
        "Welcome to WoundWise AI! I'm here to help analyze your wound or skin condition. Please upload a photo of the wound and describe any symptoms (e.g., pain, redness) to get started.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB.');
        return;
      }
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

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

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
        {
          role: 'assistant',
          content: 'Please upload an image or describe your symptoms to proceed.',
        },
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

    const loadingMessage = {
      role: 'assistant',
      content: isReply ? 'Processing your response...' : 'Analyzing your wound...',
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      let imageBase64 = '';
      if (image && !isReply) {
        imageBase64 = await getBase64(image);
      }

      const woundTypes = [
        'Abrasions', 'Lacerations', 'Incised Wounds', 'Puncture Wounds', 'Avulsions', 'Bruises',
        'Crush Injuries', 'Gunshot Wounds', 'Bite Wounds', 'Thermal Burns', 'Chemical Burns',
        'Electrical Burns', 'Radiation Burns', 'Sunburns', 'Friction Burns', 'Cellulitis', 'Impetigo',
        'Chickenpox', 'Shingles', 'Ringworm', "Athlete's Foot", 'Nail Fungus', 'Cutaneous Larva Migrans',
        'Herpes Simplex', 'Gingivitis', 'Periodontitis', 'Tooth Discoloration', 'Oral Ulcers',
        'Diabetic Wounds', 'Venous Ulcers', 'Arterial Ulcers', 'Pressure Ulcers', 'Ischemic Ulcers',
        'Neuropathic Ulcers', 'Cancerous Ulcers', 'Surgical Wounds', 'Post-radiation Ulcers',
        'Stoma-related Wounds', 'Ulcer', 'Abscess', 'Eczema-related Wounds', 'Psoriatic Lesions',
        'Boils', 'Carbuncles', 'Pyoderma Gangrenosum', 'Frostbite', 'Hives', 'Scabies', 'Tinea Versicolor',
        'Basal Cell Carcinoma', 'Melanoma', 'Necrotizing Fasciitis', 'Allergic Contact Dermatitis',
        'Sebaceous Cyst', 'Actinic Keratosis', 'Squamous Cell Carcinoma', 'Leishmaniasis',
        'Sporotrichosis', 'Blastomycosis', 'Chancroid', 'Lymphangitis', 'Erysipelas', 'Paronychia',
      ];

      const conversationHistory = [
        {
          role: 'system',
          content: `You are WoundWise AI, a wound analysis assistant powered by LLaMA 3.2 Vision. Analyze wound images and/or text symptoms provided by users. The possible wound types are: ${woundTypes.join(', ')}. Start by greeting users and instructing them to upload an image and describe symptoms in the sidebar. Ask 1-2 relevant follow-up questions to clarify symptoms (e.g., "Is the wound oozing or bleeding?"). Then, ask if the user wants a detailed report or a brief summary (e.g., "Would you like a detailed analysis or a brief summary?"). Provide a well-formatted report with the following sections using Markdown headings and bullet points:

- **Analysis**: Describe the likely wound type(s) with confidence scores for the top 3-5 (e.g., "Abrasions: 80%").
- **Symptoms**: Summarize the symptoms provided by the user in bullet points.
- **Possible Causes**: List potential causes of the wound in bullet points.
- **Immediate Care Instructions**: Provide step-by-step care instructions tailored to the wound type in bullet points.
- **Primary Aid for Severe Wounds**: If the wound is severe (e.g., gunshot wounds, deep lacerations, severe burns), include urgent primary aid steps in bullet points (e.g., "Apply firm pressure to stop bleeding, seek emergency care immediately"). Also include a subsection titled **What to Do Immediately** (e.g., "Seek emergency medical attention") and **How to Care for It** (e.g., "Keep the wound clean and covered, avoid applying pressure until seen by a professional").
- **Recommendations**: Suggest next steps in bullet points, including consulting a healthcare professional.
- **Language Flexiibility**: If the users speak a different language, provide the analysis in that language. If the user asks for a specific language (specially in bengali), respond in that language.

Ensure all sections use proper Markdown formatting: bold headings with **, and bullet points with -. Be empathetic, clear, and professional, with a friendly tone. Avoid definitive diagnoses; always recommend consulting a healthcare professional for confirmation.`,
        },
        ...messages,
        {
          role: 'user',
          content: [
            { type: 'text', text: isReply ? replyText : (symptoms || 'Analyze the uploaded image please and tell me what to do now and how to take care of it.') },
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
          max_tokens: 800,
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
        updatedMessages.pop();
        return [...updatedMessages, { role: 'assistant', content: botReply }];
      });
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop();
        return [
          ...updatedMessages,
          { role: 'assistant', content: 'Oops! Something went wrong. Please try again later.' },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = () => {
    if (input.trim()) {
      submitAnalysis(true, input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleReply();
    }
  };

  const getConfidenceScores = (content: string) => {
    const scoreRegex = /(\w[\w\s/-]*):\s*(\d+)%/g;
    const scores: { label: string; value: number }[] = [];
    let match;
    while ((match = scoreRegex.exec(content)) !== null) {
      scores.push({ label: match[1].trim(), value: parseInt(match[2]) });
    }
    return scores;
  };

  const downloadResponse = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WoundWise_Report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyResponse = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Response copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy response.');
    });
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

          :root {
            --light-primary: #e63946;
            --light-primary-transparent: rgba(230, 57, 70, 0.15);
            --light-primary-hover: #f94144;
            --light-bg: #fff1f1;
            --light-surface: rgba(255, 255, 255, 0.7);
            --light-surface-hover: rgba(255, 255, 255, 0.9);
            --light-border: rgba(230, 57, 70, 0.2);
            --light-text: #2d2d2d;
            --light-text-secondary: #666666;
            --light-shadow: rgba(230, 57, 70, 0.15);
            
            --dark-primary: #ff6b6b;
            --dark-primary-transparent: rgba(255, 107, 107, 0.15);
            --dark-primary-hover: #ff8787;
            --dark-bg: #2b0a0a;
            --dark-surface: rgba(50, 15, 15, 0.7);
            --dark-surface-hover: rgba(60, 20, 20, 0.9);
            --dark-border: rgba(255, 107, 107, 0.2);
            --dark-text: #ffebeb;
            --dark-text-secondary: #c9b2b2;
            --dark-shadow: rgba(255, 107, 107, 0.15);
            
            --primary: var(--light-primary);
            --primary-transparent: var(--light-primary-transparent);
            --primary-hover: var(--light-primary-hover);
            --bg: var(--light-bg);
            --surface: var(--light-surface);
            --surface-hover: var(--light-surface-hover);
            --border: var(--light-border);
            --text: var(--light-text);
            --text-secondary: var(--light-text-secondary);
            --shadow: var(--light-shadow);
            
            --gradient-primary: linear-gradient(135deg, #f94144, #e63946);
            --gradient-secondary: linear-gradient(135deg, #e63946, #d00000);
            --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --primary: var(--dark-primary);
              --primary-transparent: var(--dark-primary-transparent);
              --primary-hover: var(--dark-primary-hover);
              --bg: var(--dark-bg);
              --surface: var(--dark-surface);
              --surface-hover: var(--dark-surface-hover);
              --border: var(--dark-border);
              --text: var(--dark-text);
              --text-secondary: var(--dark-text-secondary);
              --shadow: var(--dark-shadow);
              --gradient-primary: linear-gradient(135deg, #ff8787, #ff6b6b);
              --gradient-secondary: linear-gradient(135deg, #ff6b6b, #ff4d4d);
            }
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
          }

          body {
            background-color: var(--bg);
            background-image: radial-gradient(circle at 80% 10%, var(--primary-transparent), transparent 40%),
                              radial-gradient(circle at 20% 80%, var(--primary-transparent), transparent 40%);
            color: var(--text);
            min-height: 100vh;
            overflow-x: hidden;
          }

          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 0 20px;
            position: relative;
            z-index: 10;
          }

          .logo {
            width: 180px;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px var(--shadow));
            transition: var(--transition);
          }
          
          .logo:hover {
            transform: scale(1.05);
          }

          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding: 0 24px 64px;
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
          }

          .workspace {
            display: flex;
            gap: 24px;
            min-height: 600px;
          }

          @media (max-width: 1024px) {
            .workspace {
              flex-direction: column;
              height: auto;
            }
          }

          .input-panel {
            width: 30%;
            min-width: 320px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: var(--surface);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 8px 32px var(--shadow);
            border: 1px solid var(--border);
            transition: var(--transition);
            position: sticky;
            top: 20px;
            align-self: flex-start;
          }

          @media (max-width: 1024px) {
            .input-panel {
              width: 100%;
              position: static;
            }
          }

          .panel-heading {
            font-size: 22px;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 8px;
            text-align: center;
          }

          .upload-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .upload-area {
            width: 100%;
            min-height: 180px;
            border: 2px dashed var(--border);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 24px;
            cursor: pointer;
            transition: var(--transition);
            background: var(--primary-transparent);
            backdrop-filter: blur(5px);
          }

          .upload-area:hover {
            border-color: var(--primary);
            background: var(--primary-transparent);
            transform: translateY(-2px);
          }

          .upload-icon {
            width: 48px;
            height: 48px;
            color: var(--primary);
          }

          .upload-text {
            font-size: 16px;
            font-weight: 500;
            color: var(--text);
            text-align: center;
          }

          .upload-input {
            display: none;
          }

          .image-preview {
            max-width: 100%;
            max-height: 200px;
            border-radius: 16px;
            box-shadow: 0 4px 16px var(--shadow);
            object-fit: cover;
            backdrop-filter: blur(5px);
          }

          .symptoms-area {
            width: 100%;
            min-height: 120px;
            padding: 16px;
            border: 1px solid var(--border);
            border-radius: 16px;
            background: var(--surface);
            color: var(--text);
            font-size: 16px;
            resize: vertical;
            transition: var(--transition);
            outline: none;
            backdrop-filter: blur(5px);
          }

          .symptoms-area:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px var(--primary-transparent);
          }

          .analyze-btn {
            background: var(--gradient-primary);
            color: white;
            font-size: 16px;
            font-weight: 600;
            padding: 14px;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 4px 12px var(--shadow), 0 0 15px rgba(230, 57, 70, 0.5);
            backdrop-filter: blur(5px);
          }

          .analyze-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px var(--shadow), 0 0 20px rgba(230, 57, 70, 0.7);
          }

          .analyze-btn:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .chat-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--surface);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 8px 32px var(--shadow);
            border: 1px solid var(--border);
            transition: var(--transition);
          }

          .chat-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            background: var(--surface-hover);
            backdrop-filter: blur(5px);
          }

          .chat-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 6px;
          }

          .chat-subtitle {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.5;
          }

          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            scrollbar-width: thin;
            scrollbar-color: var(--primary-transparent) transparent;
          }

          .chat-messages::-webkit-scrollbar {
            width: 6px;
          }

          .chat-messages::-webkit-scrollbar-track {
            background: transparent;
          }

          .chat-messages::-webkit-scrollbar-thumb {
            background-color: var(--primary-transparent);
            border-radius: 10px;
          }

          .message {
            max-width: 85%;
            padding: 16px;
            border-radius: 18px;
            font-size: 15px;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
            box-shadow: 0 2px 10px var(--shadow);
            backdrop-filter: blur(5px);
          }

          .message.assistant {
            background: var(--primary-transparent);
            border: 1px solid var(--border);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
          }

          .message.user {
            background: var(--gradient-primary);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
          }

          .report-message {
            background: var(--surface-hover);
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 20px;
            max-width: 100%;
            align-self: flex-start;
            font-size: 15px;
            line-height: 1.6;
            box-shadow: 0 4px 20px var(--shadow);
            backdrop-filter: blur(5px);
          }

          .report-section {
            margin-bottom: 16px;
          }

          .report-heading {
            font-size: 18px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 8px;
          }

          .report-list {
            list-style-position: inside;
            padding-left: 8px;
          }

          .report-list li {
            margin-bottom: 6px;
          }

          .confidence-section {
            margin: 16px 0;
          }

          .confidence-item {
            margin-bottom: 12px;
          }

          .confidence-label {
            display: flex;
            justify-content: space-between;
            font-weight: 500;
            margin-bottom: 4px;
          }

          .confidence-bar {
            height: 8px;
            background: var(--primary-transparent);
            border-radius: 4px;
            overflow: hidden;
          }

          .confidence-fill {
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 4px;
            transition: width 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          }

          .report-actions {
            display: flex;
            gap: 12px;
            margin-top: 16px;
          }

          .action-button {
            display: flex;
            align-items: center;
            gap: 6px;
            background: var(--primary-transparent);
            color: var(--primary);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 0 10px rgba(230, 57, 70, 0.3);
            backdrop-filter: blur(5px);
          }

          .action-button:hover {
            background: var(--primary);
            color: white;
            box-shadow: 0 0 15px rgba(230, 57, 70, 0.5);
          }

          .chat-input-container {
            padding: 16px 24px;
            border-top: 1px solid var(--border);
            background: var(--surface-hover);
            backdrop-filter: blur(5px);
          }

          .chat-input-form {
            display: flex;
            gap: 12px;
          }

          .chat-input {
            flex: 1;
            padding: 14px 18px;
            border: 1px solid var(--border);
            border-radius: 12px;
            background: var(--surface);
            color: var(--text);
            font-size: 15px;
            outline: none;
            transition: var(--transition);
            backdrop-filter: blur(5px);
          }

          .chat-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px var(--primary-transparent);
          }

          .send-button {
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0 20px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px rgba(230, 57, 70, 0.5);
            backdrop-filter: blur(5px);
          }

          .send-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px var(--shadow), 0 0 20px rgba(230, 57, 70, 0.7);
          }

          .info-banner {
            background: var(--surface);
            backdrop-filter: blur(15px);
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 8px 32px var(--shadow);
            border: 1px solid var(--border);
            transition: var(--transition);
            margin-top: 24px;
          }

          .banner-heading {
            font-size: 26px;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 16px;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .banner-text {
            font-size: 16px;
            line-height: 1.6;
            color: var(--text);
            margin-bottom: 16px;
          }

          .banner-disclaimer {
            font-size: 14px;
            font-weight: 500;
            color: var(--text-secondary);
            padding: 12px;
            border-left: 3px solid var(--primary);
            background: var(--primary-transparent);
            border-radius: 4px;
            backdrop-filter: blur(5px);
          }

          .footer {
            padding: 24px;
            text-align: center;
            background: var(--surface);
            backdrop-filter: blur(15px);
            margin-top: 24px;
            border-top: 1px solid var(--border);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <div className="app-container">
        <header className="header">
          <img
            src="https://i.postimg.cc/DfRK52Cr/fba57821-4907-4f96-bb21-fd867c5c0927-removalai-preview.png"
            alt="WoundWise Logo"
            className="logo"
          />
        </header>
        
        <main className="main-content">
          <section className="workspace">
            <div className="input-panel">
              <h2 className="panel-heading">Wound Analysis Input</h2>
              
              <div className="upload-section">
                <label className="upload-area" htmlFor="image-upload">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M12 5L7 10M12 5L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 19H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="upload-text">Upload wound photo</span>
                  <span className="upload-text" style={{ fontSize: '14px', opacity: 0.7 }}>JPEG or PNG, max 5MB</span>
                </label>
                <input
                  id="image-upload"
                  className="upload-input"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Wound Preview" className="image-preview" />
                )}
              </div>
              
              <textarea
                className="symptoms-area"
                placeholder="Describe your symptoms and health concerns (e.g., pain level, when it started, any discharge, etc.)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              ></textarea>
              
              <button
                className="analyze-btn"
                onClick={() => submitAnalysis()}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Wound'}
              </button>
            </div>
            
            <div className="chat-panel">
              <div className="chat-header">
                <h2 className="chat-title">Wound Analysis Chat</h2>
                <p className="chat-subtitle">
                  Ask questions about your wound or skin condition. Our AI will analyze the image and provide guidance.
                </p>
              </div>
              
              <div className="chat-messages" ref={chatBodyRef}>
                {messages.map((message, index) => {
                  if (message.role === 'assistant' && message.content.includes('**Analysis**')) {
                    const scores = getConfidenceScores(message.content);
                    return (
                      <div key={index} className="report-message">
                        <div dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<h3 class="report-heading">$1</h3>')
                            .replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>')
                            .replace(/<li>/g, '<ul class="report-list"><li>')
                            .replace(/<\/li>(?!\s*<li>)/g, '</li></ul>')
                        }} />
                        
                        {scores.length > 0 && (
                          <div className="confidence-section">
                            {scores.map((score, i) => (
                              <div key={i} className="confidence-item">
                                <div className="confidence-label">
                                  <span>{score.label}</span>
                                  <span>{score.value}%</span>
                                </div>
                                <div className="confidence-bar">
                                  <div
                                    className="confidence-fill"
                                    style={{ width: `${score.value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="report-actions">
                          <button
                            className="action-button"
                            onClick={() => copyResponse(message.content)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 4V16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V7.242C20 6.97556 19.9467 6.71181 19.8433 6.46624C19.7399 6.22068 19.5883 5.99824 19.398 5.812L16.083 2.57C15.7094 2.20466 15.2076 2.00007 14.685 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 18V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Copy
                          </button>
                          <button
                            className="action-button"
                            onClick={() => downloadResponse(message.content)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className={`message ${message.role}`}
                      >
                        {message.content}
                      </div>
                    );
                  }
                })}
              </div>
              
              <div className="chat-input-container">
                <div className="chat-input-form">
                  <input
                    className="chat-input"
                    placeholder="Ask a follow-up question or provide more details..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <button
                    className="send-button"
                    onClick={handleReply}
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30" strokeDashoffset="0">
                          <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 12 12"
                            to="360 12 12"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          <section className="info-banner">
            <h2 className="banner-heading">How WoundWise AI Works</h2>
            <p className="banner-text">
              WoundWise AI is powered by advanced computer vision and medical AI trained on thousands of wound images. 
              It analyzes your uploaded photo and symptom description to identify the wound type, suggest possible causes, 
              and provide appropriate care instructions. Our system can detect over 60 types of wounds and skin conditions, 
              from minor cuts to complex infections.
            </p>
            <div className="banner-disclaimer">
              <strong>Important Medical Disclaimer:</strong> WoundWise AI is designed to provide information and 
              first-aid guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of a qualified healthcare provider with any questions regarding medical conditions. 
              Never disregard professional medical advice or delay seeking it because of information provided by this tool.
            </div>
          </section>
        </main>
        
        <footer className="footer">
        </footer>
      </div>
    </>
  );
};

export default WoundWise;