import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ExternalLink, Keyboard, Eye, VolumeX, MousePointer2, BookOpen } from 'lucide-react';

const AccessibilityPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl border border-white/30">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-tight">
                        Accessibility Statement
                    </h1>

                    <div className="prose max-w-none text-black">
                    <p className="mb-4 text-blue-500">
                            EarlyMed is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary flex items-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            Our Commitment
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We strive to ensure that our website and services are accessible to all users, regardless of technology or ability. We are actively working to increase the accessibility and usability of our website and in doing so adhere to many of the available standards and guidelines.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary flex items-center gap-2">
                            <Eye className="h-6 w-6" />
                            Visual Accessibility
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>High contrast text and background colors</li>
                            <li>Clear and consistent navigation</li>
                            <li>Alt text for all images</li>
                            <li>Resizable text without loss of functionality</li>
                            <li>Compatible with screen readers</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary flex items-center gap-2">
                            <Keyboard className="h-6 w-6" />
                            Keyboard Navigation
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>Full keyboard accessibility</li>
                            <li>Logical tab order</li>
                            <li>Visible focus indicators</li>
                            <li>Skip navigation links</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary flex items-center gap-2">
                            <VolumeX className="h-6 w-6" />
                            Audio & Video Content
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>Captions for video content</li>
                            <li>Transcripts for audio content</li>
                            <li>No auto-playing media</li>
                            <li>Adjustable volume controls</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary flex items-center gap-2">
                            <MousePointer2 className="h-6 w-6" />
                            Input Assistance
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>Clear form labels and instructions</li>
                            <li>Error identification and suggestions</li>
                            <li>Multiple input methods supported</li>
                            <li>Sufficient time to complete actions</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">
                            Conformance Status
                        </h2>
                        <p className="mb-4 text-blue-500">
                            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. EarlyMed is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">
                            Feedback
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We welcome your feedback on the accessibility of EarlyMed. Please let us know if you encounter accessibility barriers:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>
                                Email:{" "}
                                <a
                                    href="mailto:mahatirtusher@gmail.com"
                                    className="text-primary hover:text-primary-dark inline-flex items-center"
                                >
                                    mahatirtusher@gmail.com
                                    <ExternalLink className="h-4 w-4 ml-1" />
                                </a>
                            </li>
                            <li>
                                Visit our{" "}
                                <Link
                                    to="/contact"
                                    className="text-primary hover:text-primary-dark"
                                >
                                    Contact Page
                                </Link>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">
                            Technical Specifications
                        </h2>
                        <p className="mb-4 text-blue-500">
                            Accessibility of EarlyMed relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>HTML</li>
                            <li>WAI-ARIA</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">
                            Assessment Approach
                        </h2>
                        <p className="mb-4 text-blue-500">
                            EarlyMed assessed the accessibility of our website by the following approaches:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6 text-blue-500">
                            <li>Self-evaluation</li>
                            <li>External accessibility evaluation</li>
                            <li>User testing with assistive technologies</li>
                            <li>Regular automated testing</li>
                        </ul>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                This statement was last updated on April 25, 2025.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AccessibilityPage;