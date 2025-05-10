import React from 'react';
import { useTheme } from '@/components/ThemeProvider';

// Placeholder for illustration (replace with actual image in production)
const illustrationUrl = "https://via.placeholder.com/300x200/ff8c66/fff?text=Mental+Health+Illustration";

const MentalHealthHub: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-orange-50 to-teal-50 text-gray-900'} font-sans`}>
      <style>
        {`
          body {
            font-family: 'Poppins', sans-serif;
          }
          .glass-card {
            background: ${theme === 'dark' ? 'rgba(50, 50, 50, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
            backdrop-filter: blur(12px);
            border-radius: 16px;
            border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)'};
            box-shadow: 0 8px 32px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'};
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)'};
          }
          .chat-bubble-demo {
            background: ${theme === 'dark' ? 'linear-gradient(135deg, #ff8c66, #ff7043)' : 'linear-gradient(135deg, #ff8c66, #ff7043)'};
            color: white;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 75%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          .qa-demo {
            background: ${theme === 'dark' ? 'rgba(255, 245, 230, 0.1)' : 'rgba(255, 245, 230, 0.5)'};
            border-left: 4px solid #ff8c66;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .button-primary {
            background: linear-gradient(135deg, #ff8c66, #ff7043);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 112, 67, 0.4);
          }
          .section-title {
            color: ${theme === 'dark' ? '#ff8c66' : '#d84315'};
            font-weight: 600;
            margin-bottom: 1rem;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-800'} mb-4`}>
          Mental Health Hub
        </h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto mb-6`}>
          Welcome to a safe space for your mental well-being. Explore tools to support, educate, and assess your mental health with care and compassion.
        </p>
        <img src={illustrationUrl} alt="Mental Health Illustration" className="mx-auto h-48 drop-shadow-lg" />
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pb-12">
        {/* ManasMitra Section */}
        <section className="glass-card p-6 mb-8">
          <h2 className="section-title text-2xl">ManasMitra: Your Emotional Support Friend</h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            ManasMitra offers immediate emotional support with culturally sensitive responses. Share your feelings and get coping strategies tailored for you.
          </p>
          {/* Demo Placeholder */}
          <div className="chat-bubble-demo inline-block mb-4">
            I’m here to help! Try saying, “I feel stressed about work.”
          </div>
          <button className="button-primary">Chat with ManasMitra</button>
        </section>

        {/* MindCare FAQ Section */}
        <section className="glass-card p-6 mb-8">
          <h2 className="section-title text-2xl">MindCare FAQ: Mental Health Q&A</h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Get answers to your mental health questions, sourced from trusted books like *The Oxford Handbook of Clinical Psychology*.
          </p>
          {/* Demo Placeholder */}
          <div className="qa-demo mb-4">
            <p className="font-medium">Q: What is anxiety?</p>
            <p>Anxiety is a feeling of worry or fear, often with physical symptoms like a racing heart. (*WHO Mental Health Guide*)</p>
          </div>
          <button className="button-primary">Ask a Question</button>
        </section>

        {/* MentalHealthRisk AI Section */}
        <section className="glass-card p-6 mb-8">
          <h2 className="section-title text-2xl">MentalHealthRisk AI: Assess Your Mental Health</h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Take a short or detailed questionnaire to understand your mental health risks, with personalized guidelines and professional recommendations.
          </p>
          {/* Demo Placeholder */}
          <div className="qa-demo mb-4">
            <p className="font-medium">Sample Question:</p>
            <p>Have you felt sad or hopeless for more than two weeks? (Yes/No/Sometimes)</p>
          </div>
          <div className="flex gap-3 mb-4">
            <button className="button-primary">Short Session (15 Questions)</button>
            <button className="button-primary">Detailed Session (30 Questions)</button>
          </div>

          {/* MythBusters Subsection */}
          <div className="glass-card p-4 mt-4">
            <h3 className="section-title text-xl">MythBusters: Mental Health Realities</h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Debunk myths about disorders like schizophrenia and DID, with science-backed answers to reduce stigma.
            </p>
            {/* Demo Placeholder */}
            <div className="qa-demo">
              <p className="font-medium">Q: Is schizophrenia caused by spirits?</p>
              <p>No, schizophrenia is a medical condition caused by brain chemistry changes. (*WHO Fact Sheet*)</p>
            </div>
            <button className="button-primary mt-4">Explore Myths</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MentalHealthHub;