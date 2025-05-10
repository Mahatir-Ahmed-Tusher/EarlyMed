import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaMicrophone, FaStop, FaImage, FaSpinner, FaPaperPlane } from 'react-icons/fa';

interface Message {
  sender: 'user' | 'doctor';
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  timestamp: Date;
  isRecording?: boolean;
}

const Voicebot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Add recording to messages immediately
        setMessages(prev => [...prev, {
          sender: 'user',
          content: '[Audio message]',
          audioUrl,
          timestamp: new Date(),
          isRecording: false
        }]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Add recording indicator to messages
      setMessages(prev => [...prev, {
        sender: 'user',
        content: 'Recording...',
        timestamp: new Date(),
        isRecording: true
      }]);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      // Remove the recording indicator
      setMessages(prev => prev.filter(msg => !msg.isRecording));
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputMessage && !audioBlob && !imageFile) || loading) return;

    setLoading(true);

    // Create form data
    const formData = new FormData();
    if (audioBlob) {
      formData.append('audio', audioBlob, 'recording.wav');
    }
    if (imageFile) formData.append('image', imageFile);
    if (inputMessage) formData.append('text', inputMessage);

    try {
      const response = await axios.post('http://localhost:8021/voicebot/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { transcription, doctor_response, audio_response } = response.data;
      
      // Decode base64 audio and create blob URL
      let doctorAudioUrl = '';
      if (audio_response) {
        const audioBytes = atob(audio_response);
        const audioArray = new Uint8Array(audioBytes.length);
        for (let i = 0; i < audioBytes.length; i++) {
          audioArray[i] = audioBytes.charCodeAt(i);
        }
        const audioBlob = new Blob([audioArray], { type: 'audio/mp3' });
        doctorAudioUrl = URL.createObjectURL(audioBlob);
      }

      const doctorMessage: Message = {
        sender: 'doctor',
        content: doctor_response || '[Audio response]',
        audioUrl: doctorAudioUrl,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, doctorMessage]);
    } catch (error) {
      console.error('Error processing inputs:', error);
      setMessages(prev => [...prev, {
        sender: 'doctor',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
      setInputMessage('');
      setImageFile(null);
      setAudioBlob(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md flex flex-col h-[80vh]">
        <h1 className="text-xl font-bold text-gray-800 p-4 border-b">
          AI Doctor with Vision and Voice
        </h1>
        
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Start a conversation with the AI Doctor
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.sender === 'user' 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'bg-gray-100 text-gray-900'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">
                      {message.sender === 'user' ? 'You' : 'AI Doctor'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  
                  {message.imageUrl && (
                    <img 
                      src={message.imageUrl} 
                      alt="Uploaded" 
                      className="mb-2 rounded-md max-h-40 object-contain"
                    />
                  )}
                  
                  {message.content && <p>{message.content}</p>}
                  
                  {message.audioUrl && !message.isRecording && (
                    <audio 
                      controls 
                      src={message.audioUrl} 
                      className="mt-2 w-full"
                    />
                  )}

                  {message.isRecording && (
                    <div className="flex items-center mt-2 text-gray-500">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      Recording...
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              {isRecording ? (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <FaStop />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  <FaMicrophone />
                </button>
              )}
              
              <label className="flex items-center justify-center p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                <FaImage />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                type="submit"
                disabled={loading || isRecording}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
            
            {(audioBlob || imageFile) && (
              <div className="flex gap-2 items-center text-sm text-gray-600">
                {audioBlob && (
                  <span className="flex items-center">
                    <FaMicrophone className="mr-1" /> Audio recording
                  </span>
                )}
                {imageFile && (
                  <span className="flex items-center">
                    <FaImage className="mr-1" /> {imageFile.name}
                  </span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Voicebot;