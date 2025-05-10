import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  type: 'yes/no' | 'mcq' | 'written';
  options?: string[];
}

// API base URL (use environment variable or fallback to Render URL)
const API_BASE_URL = import.meta.env.VITE_AUTISM_API_URL || "https://autism-assessment-backend.onrender.com";

const Autism: React.FC = () => {
  const [tab, setTab] = useState<'assessment' | 'chatbot'>('assessment');
  const [version, setVersion] = useState<'rigorous' | 'short'>('rigorous');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [chatQuestion, setChatQuestion] = useState<string>('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', message: string }[]>([
    { role: 'bot', message: 'Hi! Ask me any question about autism.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tab === 'assessment') {
      setLoading(true);
      setError(null);
      axios.get(`${API_BASE_URL}/questions/${version}`)
        .then(response => {
          setQuestions(response.data.questions || []);
          setAnswers(new Array(response.data.questions.length).fill(null)); // Initialize answers
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          let errorMessage = 'Failed to load questions. Please try again later.';
          if (error.code === 'ERR_NETWORK') {
            errorMessage = 'Cannot connect to the server. Please check your internet or try again later.';
          } else if (error.response) {
            errorMessage = `Server error: ${error.response.statusText} (${error.response.status})`;
          }
          setError(errorMessage);
          setQuestions([]);
          setLoading(false);
        });
    }
  }, [tab, version]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const submitAssessment = () => {
    if (!answers.every(answer => answer !== null)) {
      setError('Please answer all questions before submitting.');
      return;
    }
    setLoading(true);
    setError(null);
    axios.post(`${API_BASE_URL}/evaluate`, { answers })
      .then(response => {
        setResult(response.data.final_evaluation);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error submitting assessment:', error);
        let errorMessage = 'Failed to submit assessment. Please try again later.';
        if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Cannot connect to the server. Please check your internet or try again later.';
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.statusText} (${error.response.status})`;
        }
        setError(errorMessage);
        setLoading(false);
      });
  };

  const submitChatQuestion = () => {
    if (!chatQuestion.trim()) return;

    const newHistory = [...chatHistory, { role: 'user' as const, message: chatQuestion }];
    setChatHistory(newHistory);
    setIsTyping(true);

    axios.post(`${API_BASE_URL}/chatbot`, { question: chatQuestion })
      .then(response => {
        setChatHistory([...newHistory, { role: 'bot', message: response.data.response }]);
        setChatResponse(response.data.response);
        setIsTyping(false);
      })
      .catch(error => {
        console.error('Error in chatbot request:', error);
        let errorMessage = 'Sorry, I encountered an error. Please try again later.';
        if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Cannot connect to the server. Please check your internet or try again later.';
        } else if (error.response) {
          errorMessage = `Server error: ${error.response.statusText} (${error.response.status})`;
        }
        setChatHistory([...newHistory, { role: 'bot', message: errorMessage }]);
        setIsTyping(false);
      });

    setChatQuestion('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 text-gray-900 dark:text-gray-100 pt-20 pb-10">
      {/* Title with Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="https://i.postimg.cc/1zL79ZyZ/71efa626-c730-423d-b997-f1d3fecae5a1-removalai-preview.png"
          alt="Autism Spectrum Evaluation Test"
          className="h-16"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Chatbot Section */}
        <div className="md:w-1/3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-green-200/50 dark:border-green-700/50">
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-600 dark:text-green-400">Chatbot</h2>
          <div className="h-96 overflow-y-auto mb-4 p-4 bg-green-100/30 dark:bg-green-900/30 rounded-xl shadow-inner">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded-lg shadow-md max-w-[80%] ${
                  chat.role === 'user'
                    ? 'bg-blue-300/80 dark:bg-blue-600/80 ml-auto text-right'
                    : 'bg-green-300/80 dark:bg-green-600/80 mr-auto text-left'
                } backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 transition-all duration-300 hover:shadow-lg`}
              >
                {chat.message}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="mr-2">Thinking</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatQuestion}
              onChange={(e) => setChatQuestion(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-3 rounded-lg bg-green-100/50 dark:bg-green-900/50 text-gray-900 dark:text-gray-100 border border-green-200/50 dark:border-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition-all duration-300"
            />
            <button
              onClick={submitChatQuestion}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-600 dark:hover:bg-green-700 hover:shadow-xl hover:scale-105 transition-all duration-300 glow"
            >
              Send
            </button>
          </div>
        </div>

        {/* Assessment Section */}
        <div className="md:w-2/3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-green-200/50 dark:border-green-700/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">The Test</h2>
            <div>
              <label className="mr-2 text-gray-700 dark:text-gray-300">Version:</label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as 'rigorous' | 'short')}
                className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/50 text-gray-900 dark:text-gray-100 border border-green-200/50 dark:border-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition-all duration-300"
              >
                <option value="rigorous">Rigorous (50 questions)</option>
                <option value="short">Short (25 questions)</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading questions...
            </div>
          ) : error ? (
            <div className="text-center text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No questions available.
            </div>
          ) : (
            <>
              <div className="h-96 overflow-y-auto space-y-4 p-4 bg-green-100/30 dark:bg-green-900/30 rounded-xl shadow-inner">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-200/50 dark:border-green-700/50"
                  >
                    <p className="mb-2 text-gray-800 dark:text-gray-200">{q.text}</p>
                    {q.type === 'yes/no' && (
                      <div className="flex gap-4">
                        <label className="flex items-center text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            value="Yes"
                            onChange={() => handleAnswerChange(index, 'Yes')}
                            className="mr-2 accent-green-500 dark:accent-green-600"
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-gray-700 dark:text-gray-300">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            value="No"
                            onChange={() => handleAnswerChange(index, 'No')}
                            className="mr-2 accent-green-500 dark:accent-green-600"
                          />
                          No
                        </label>
                      </div>
                    )}
                    {q.type === 'mcq' && (
                      <select
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="w-full p-2 rounded-lg bg-green-100/50 dark:bg-green-900/50 text-gray-900 dark:text-gray-100 border border-green-200/50 dark:border-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition-all duration-300"
                      >
                        <option value="">Select an option</option>
                        {q.options.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}
                    {q.type === 'written' && (
                      <textarea
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="w-full p-3 rounded-lg bg-green-100/50 dark:bg-green-900/50 text-gray-900 dark:text-gray-100 border border-green-200/50 dark:border-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-600 transition-all duration-300"
                        placeholder="Write your response here..."
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={submitAssessment}
                disabled={loading}
                className="mt-4 px-6 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-600 dark:hover:bg-green-700 hover:shadow-xl hover:scale-105 transition-all duration-300 glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {result && (
                <p className="mt-4 p-4 bg-green-300/50 dark:bg-green-600/50 rounded-lg border border-green-400/50 dark:border-green-700/50 text-gray-800 dark:text-gray-200">
                  Result: {result}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Book References */}
      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>References:</p>
        <p>
          <em>Autism Spectrum Disorder: The Complete Guide to Understanding Autism</em> by Chantal Sicile-Kira
        </p>
        <p>
          <em>The Encyclopedia of Autism Spectrum Disorders</em> by Carol Turkington
        </p>
      </div>
    </div>
  );
};

export default Autism;