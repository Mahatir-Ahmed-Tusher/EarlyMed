import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';

interface AudioRecorderProps {
  onRecordComplete: (file: File) => void;
  className?: string; // Added className prop
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordComplete, className }) => {
  const [recording, setRecording] = useState(false);
  let mediaRecorder: MediaRecorder | null = null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const file = new File([blob], 'recording.mp3', { type: 'audio/mp3' });
        onRecordComplete(file);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`p-2 rounded-full ${recording ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        <FaMicrophone />
      </button>
      <span>{recording ? 'Recording...' : 'Record Audio'}</span>
    </div>
  );
};

export default AudioRecorder;