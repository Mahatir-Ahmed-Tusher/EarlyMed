import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, BookOpen } from "lucide-react";

const Medicare = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);
    setSupportMessage(null);

    try {
      const res = await fetch("http://localhost:8002/api/mindcare-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Failed to fetch response");
      const data = await res.json();
      setResponse(data.result);
      setSupportMessage(data.support_message);
    } catch (error) {
      setResponse(`Error: ${error.message}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const commonQuestions = [
    "What is depression?",
    "How to manage stress?",
    "What are the symptoms of anxiety?",
    "How can I help a friend with depression?",
    "What is bipolar disorder?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-24 pb-12 px-4">
      <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden transform hover:scale-102 transition duration-300">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <Brain className="h-12 w-12" />
            <CardTitle className="text-3xl font-bold">MindCare FAQ</CardTitle>
          </div>
          <CardDescription className="text-white/80">
            An AI-powered Q&A system for mental health education. This section provides trustworthy, evidence-based answers to help you understand your well-being, sourced from:
          </CardDescription>
          <ul className="list-disc list-inside mt-2 text-sm text-white/80">
            <li>What We Know About Emotional Intelligence</li>
            <li>Clinical Guide to the Diagnosis and Treatment of Mental Disorders</li>
            <li>Mental Health Information for Teens</li>
            <li>The Oxford Handbook of Clinical Psychology</li>
            <li>The WHO Mental Health Gap Action Programme (mhGAP) Intervention Guide</li>
            <li>Diagnostic and Statistical Manual of Mental Disorders (DSM-5)</li>
            <li>The Gale Encyclopedia of Mental Disorders A-L Volume 1</li>
            <li>The Gale Encyclopedia of Mental Disorders M-Z Volume 2</li>
            <li>Mental Health and Mental Disorders An Encyclopedia of Conditions Treatments, and Well-Being</li>
          </ul>
          <CardDescription className="text-white/80 mt-2">
          It’s here to reduce misinformation and empower you with knowledge, suggesting support (e.g., ManasMitra) if distress is detected.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about mental health (e.g., What is depression? How to manage stress?)"
                className="flex-1 bg-white/50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 p-3 rounded-lg transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Asking..." : "Ask"}
              </Button>
            </div>
          </form>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Common Questions:</p>
            <div className="flex flex-wrap gap-2">
              {commonQuestions.map((q, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setQuery(q);
                    handleSubmit();
                  }}
                  className="bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-full px-4 py-2 text-sm transition duration-300"
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
          {response && (
            <div className="mt-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg shadow-inner overflow-y-auto max-h-64 text-gray-800 dark:text-gray-200 animate-fade-in">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          )}
          {supportMessage && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-800 dark:text-yellow-200 flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <p>{supportMessage} <a href="/manasmitra" className="underline">Visit ManasMitra</a></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Animation keyframes
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;

export default Medicare;