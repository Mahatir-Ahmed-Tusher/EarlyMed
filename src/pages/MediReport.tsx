import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { FileText, Download } from 'lucide-react';

// Interfaces for type safety
interface AnalysisResponse {
    choices?: { message: { content: string } }[];
}

// Constants
const logoUrl = "https://i.postimg.cc/hjtFMJb4/ed76943c-20f7-4306-98c9-b0f602d9142e-removalai-preview.png";
const apiUrl = "https://openrouter.ai/api/v1/chat/completions";
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";

// Helper Functions
const preprocessImage = (file: File): Promise<{ base64Image: string; mimeType: string; error?: string }> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve({ base64Image: '', mimeType: '', error: 'Canvas context not supported.' });
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                    data[i] = gray;
                    data[i + 1] = gray;
                    data[i + 2] = gray;
                }
                ctx.putImageData(imageData, 0, 0);

                const base64Image = canvas.toDataURL('image/png').split(',')[1];
                resolve({ base64Image, mimeType: 'image/png' });
            };
            img.onerror = () => {
                resolve({ base64Image: '', mimeType: '', error: 'Error loading image.' });
            };
            img.src = event.target?.result as string;
        };
        reader.onerror = () => {
            resolve({ base64Image: '', mimeType: '', error: 'Error reading file.' });
        };
        reader.readAsDataURL(file);
    });
};

const checkImageQuality = (file: File): Promise<{ passed: boolean; message: string }> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve({ passed: false, message: 'Canvas context not supported.' });
                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let passed = true;
            const feedback: string[] = [];

            if (img.width < 800 || img.height < 800) {
                feedback.push("Low resolution image. Higher resolution improves accuracy.");
                passed = false;
            }

            let brightnessSum = 0;
            const grayValues: number[] = [];
            for (let i = 0; i < data.length; i += 4) {
                const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                brightnessSum += gray;
                grayValues.push(gray);
            }
            const brightness = brightnessSum / (data.length / 4);
            if (brightness < 100) {
                feedback.push("Image appears dark. Use well-lit images for better results.");
                passed = false;
            }

            const mean = brightness;
            const variance = grayValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / grayValues.length;
            const contrast = Math.sqrt(variance);
            if (contrast < 40) {
                feedback.push("Low contrast detected. Use images with clear text-background contrast.");
                passed = false;
            }

            const message = passed ? "Image quality checks passed." : "Image quality issues: " + feedback.join(" ");
            resolve({ passed, message });
        };
        img.onerror = () => {
            resolve({ passed: false, message: 'Could not analyze image quality.' });
        };
        const reader = new FileReader();
        reader.onload = (event) => {
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
};

const extractConfidenceLevel = (responseText: string): { confidence: number; uncertaintyPhrases: string[] } => {
    const lowConfidencePhrases = [
        "unclear", "cannot determine", "difficult to see", "not visible",
        "illegible", "hard to read", "cannot make out", "not clear",
        "I'm unsure", "might be", "possibly", "appears to be",
        "could be", "uncertain", "ambiguous"
    ];

    let uncertaintyCount = 0;
    const foundPhrases: string[] = [];

    for (const phrase of lowConfidencePhrases) {
        const count = responseText.toLowerCase().split(phrase).length - 1;
        if (count > 0) {
            uncertaintyCount += count;
            foundPhrases.push(`${phrase} (${count}x)`);
        }
    }

    const baseConfidence = 1.0;
    const penaltyPerPhrase = 0.05;
    const confidence = Math.max(0.0, Math.min(baseConfidence - (uncertaintyCount * penaltyPerPhrase), 1.0));

    return { confidence, uncertaintyPhrases: foundPhrases };
};

// Function to strip Markdown and format text
const stripMarkdown = (text: string): string => {
    // Remove Markdown headings (#, ##, etc.)
    text = text.replace(/^#{1,6}\s*/gm, '');
    // Remove bold/italic markers (** and *)
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2'); // Bold
    text = text.replace(/(\*|_)(.*?)\1/g, '$2'); // Italic
    // Remove unordered list markers (-, *, +)
    text = text.replace(/^[-*+]\s*/gm, '• ');
    // Replace multiple newlines with a single one
    text = text.replace(/\n+/g, '\n');
    // Convert newlines to <br/> for HTML rendering
    text = text.replace(/\n/g, '<br/>');
    return text;
};

// Prompt
const medicalTestPrompt = `
You are an expert in analyzing medical test reports. Your task is to provide a detailed analysis of the test report image uploaded:

1. Test Information:
   - Name of test(s) performed
   - Date of testing (if visible)
   - Laboratory/facility information
2. Results Analysis:
   - List each parameter with its result and reference range
   - Clearly mark abnormal values (HIGH or LOW)
3. Plain Language Explanation: What each test measures in simple terms
4. Context: General information about what results might indicate (without diagnosing)
5. Quality Assessment: Note any illegible text or ambiguous information
6. Recommended Follow-up: Suggest appropriate next steps

Format your response with clear headings and bullet points for readability. If certain information isn't visible or legible in the image, explicitly state this rather than guessing or hallucinating content.

ALWAYS include this disclaimer: "This analysis is provided for educational purposes only. Always consult with your healthcare provider before interpreting test results."
`;

const MediReport: React.FC = () => {
    const { theme } = useTheme();
    const [testReportFile, setTestReportFile] = useState<File | null>(null);
    const [testReportPreview, setTestReportPreview] = useState<string | null>(null);
    const [qualityMessage, setQualityMessage] = useState<string>('');
    const [qualityPassed, setQualityPassed] = useState<boolean>(true);
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [confidence, setConfidence] = useState<number>(0);
    const [uncertaintyPhrases, setUncertaintyPhrases] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setTestReportFile(file);
            setTestReportPreview(previewUrl);

            checkImageQuality(file).then(({ passed, message }) => {
                setQualityPassed(passed);
                setQualityMessage(message);
            });
        }
    };

    const analyzeDocument = async () => {
        if (!testReportFile) return;

        setIsAnalyzing(true);
        setAnalysisResult('');
        setConfidence(0);
        setUncertaintyPhrases([]);

        try {
            const { base64Image, mimeType, error } = await preprocessImage(testReportFile);
            if (error) {
                setAnalysisResult(error);
                return;
            }

            for (let i = 0; i <= 100; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 200));
            }

            const messages = [
                {
                    role: "user",
                    content: [
                        { type: "text", text: medicalTestPrompt },
                        { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } }
                    ]
                }
            ];

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-3.2-11b-vision-instruct:free",
                    messages,
                    max_tokens: 8192,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${errorText}`);
            }

            const data: AnalysisResponse = await response.json();
            const result = data.choices?.[0]?.message?.content || "No response received from the API.";
            const { confidence: conf, uncertaintyPhrases: phrases } = extractConfidenceLevel(result);

            setAnalysisResult(result);
            setConfidence(conf);
            setUncertaintyPhrases(phrases);
        } catch (error) {
            setAnalysisResult(`Error analyzing document: ${error.message}`);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const downloadResult = () => {
        const blob = new Blob([analysisResult], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `EarlyMed_TestReport_Analysis.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-violet-900' : 'bg-light-purple-100'} text-gray-900 dark:text-gray-100 transition-colors duration-300`} style={{ paddingTop: '80px', paddingBottom: '60px' }}>
            <style>
                {`
                    .glass-card {
                        background: ${theme === 'dark' ? 'rgba(91, 33, 182, 0.3)' : 'rgba(221, 214, 254, 0.2)'};
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                        border: 1px solid ${theme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(196, 181, 253, 0.5)'};
                    }
                    .glass-input {
                        background: ${theme === 'dark' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(233, 213, 255, 0.2)'};
                        border: 1px solid ${theme === 'dark' ? 'rgba(147, 51, 234, 0.3)' : 'rgba(221, 214, 254, 0.5)'};
                        backdrop-filter: blur(5px);
                        color: inherit;
                        transition: all 0.3s;
                    }
                    .glass-input:focus {
                        border-color: ${theme === 'dark' ? '#a855f7' : '#9333ea'};
                        box-shadow: 0 0 15px ${theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(147, 51, 234, 0.5)'};
                    }
                    .glass-button {
                        background: linear-gradient(135deg, ${theme === 'dark' ? '#a855f7' : '#9333ea'}, ${theme === 'dark' ? '#d946ef' : '#c026d3'});
                        border: none;
                        padding: 12px 24px;
                        border-radius: 10px;
                        color: white;
                        font-weight: 600;
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .glass-button:hover {
                        transform: scale(1.05);
                        box-shadow: 0 6px 20px ${theme === 'dark' ? 'rgba(217, 70, 239, 0.5)' : 'rgba(192, 38, 211, 0.5)'};
                    }
                    .glass-button:disabled {
                        background: ${theme === 'dark' ? '#4c1d95' : '#d8b4fe'};
                        cursor: not-allowed;
                        transform: none;
                        box-shadow: none;
                    }
                    .typing-dot {
                        width: 10px;
                        height: 10px;
                        background: ${theme === 'dark' ? '#d946ef' : '#c026d3'};
                        border-radius: 50%;
                        margin: 0 4px;
                        animation: typing 1.2s infinite ease-in-out;
                    }
                    @keyframes typing {
                        0%, 60%, 100% { transform: translateY(0); }
                        30% { transform: translateY(-8px); }
                    }
                    .prose {
                        font-size: 1rem;
                        line-height: 1.75;
                        color: ${theme === 'dark' ? '#e5e7eb' : '#4b5563'};
                    }
                    .prose br {
                        margin-bottom: 1rem;
                    }
                `}
            </style>

            <main className="flex-grow flex justify-center items-center px-4">
                <div className="glass-card p-8 w-full max-w-4xl">
                    <div className="flex justify-center mb-6">
                        <img src={logoUrl} alt="Medical Report Analyzer Logo" className="h-32" />
                    </div>
                    <p className="text-center text-lg mb-8 text-purple-600 dark:text-purple-200">Understand your test reports with AI</p>

                    <div className="mb-6">
                        <label className="block text-center mb-4 text-purple-700 dark:text-purple-100">Upload Your Test Report</label>
                        <div className="glass-input flex items-center justify-center h-40 mb-4">
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <button
                                className="glass-button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isAnalyzing}
                            >
                                <FileText className="h-6 w-6 mr-2" /> Upload Image
                            </button>
                        </div>
                        {testReportPreview && (
                            <div className="flex justify-center mb-4">
                                <img src={testReportPreview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
                            </div>
                        )}
                        {qualityMessage && (
                            <p className={`text-center mb-4 ${qualityPassed ? 'text-green-600' : 'text-yellow-600'}`}>
                                {qualityMessage}
                            </p>
                        )}
                    </div>

                    <button
                        className="glass-button w-full mb-6"
                        onClick={analyzeDocument}
                        disabled={isAnalyzing || !testReportFile}
                    >
                        {isAnalyzing ? (
                            <div className="flex justify-center">
                                <span className="typing-dot" />
                                <span className="typing-dot" />
                                <span className="typing-dot" />
                            </div>
                        ) : 'Analyze Report'}
                    </button>

                    {analysisResult && (
                        <div className="glass-card p-6 mt-6">
                            <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800 dark:text-purple-300">Analysis Results</h2>
                            <div className="mb-4">
                                <p className="text-center mb-2">Confidence Level: {Math.round(confidence * 100)}%</p>
                                <div className="w-full h-4 bg-gray-200 rounded-full">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${confidence * 100}%`,
                                            background: confidence > 0.8 ? '#10b981' : confidence > 0.5 ? '#f59e0b' : '#ef4444',
                                        }}
                                    />
                                </div>
                            </div>
                            {confidence < 0.7 && uncertaintyPhrases.length > 0 && (
                                <p className="text-center text-yellow-600 mb-4">
                                    Uncertainty detected: {uncertaintyPhrases.join(', ')}. Consider a clearer image or consult your doctor.
                                </p>
                            )}
                            <div className="prose" dangerouslySetInnerHTML={{ __html: stripMarkdown(analysisResult) }} />
                            <button
                                className="glass-button w-full mt-4"
                                onClick={downloadResult}
                            >
                                <Download className="h-5 w-5 mr-2" /> Download
                            </button>
                        </div>
                    )}

                    {!analysisResult && (
                        <div className="glass-card p-6 mt-6">
                            <h3 className="text-xl font-medium text-center mb-4 text-purple-700 dark:text-purple-200">Instructions</h3>
                            <ul className="list-disc list-inside text-purple-600 dark:text-purple-300">
                                <li>Upload a clear image of your test report.</li>
                                <li>Click "Analyze Report" to process.</li>
                                <li>Review the detailed analysis and download it.</li>
                            </ul>
                            <p className="text-center mt-4 text-purple-600 dark:text-purple-300">
                                <strong>Privacy Note:</strong> Your test reports are processed securely and not stored.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="w-full bg-transparent text-center py-4 mt-auto" style={{ height: '60px' }}>
                <p className="text-sm text-purple-600 dark:text-purple-200">© 2025 EarlyMed | Developed by Team Sisyphus at VIT-AP University</p>
            </footer>
        </div>
    );
};

export default MediReport;