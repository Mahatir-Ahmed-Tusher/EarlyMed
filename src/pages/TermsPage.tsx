import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TermsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
             <Card className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl border border-white/30">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
                    <div className="prose max-w-none text-blue-600">
                        <p className="mb-4">
                            Welcome to EarlyMed! By using EarlyMed services, you agree to our Terms of Service. These terms outline your rights and responsibilities as a user, limitations of our liability, and important disclaimers regarding the medical information provided on our platform.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing or using EarlyMed’s website, tools, or services (collectively, the “Services”), you agree to be bound by these Terms of Service (“Terms”). If you do not agree to these Terms, you may not use our Services.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">2. Use of Services</h2>
                        <p className="mb-4">
                            You agree to use the Services only for lawful purposes and in accordance with these Terms. You are responsible for:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Providing accurate and truthful information when using our diagnostic tools (e.g., Symptom Checker, MedVision AI).</li>
                                <li>Not using the Services to harm others or violate any laws.</li>
                                <li>Not attempting to reverse-engineer, hack, or interfere with the functionality of our Services.</li>
                            </ul>
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">3. Medical Information Disclaimer</h2>
                        <p className="mb-4">
                            The information provided by EarlyMed is for general informational and educational purposes only and is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. EarlyMed does not provide medical diagnoses or treatments, and reliance on any information provided by the Services is at your own risk.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">4. Limitation of Liability</h2>
                        <p className="mb-4">
                            To the fullest extent permitted by law, EarlyMed and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with your use of the Services. Our total liability to you for any claim arising from these Terms or the Services will not exceed $100.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">5. Intellectual Property</h2>
                        <p className="mb-4">
                            All content, trademarks, and intellectual property on the EarlyMed platform are owned by or licensed to EarlyMed. You may not reproduce, distribute, or create derivative works from our content without prior written consent.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">6. User-Generated Content</h2>
                        <p className="mb-4">
                            If you upload content (e.g., images, PDFs) to our Services, you grant EarlyMed a non-exclusive, royalty-free, worldwide license to use, store, and process that content solely for the purpose of providing the Services. You are responsible for ensuring that your content does not infringe on any third-party rights.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">7. Termination</h2>
                        <p className="mb-4">
                            We may suspend or terminate your access to the Services at our discretion if you violate these Terms or engage in any conduct that we believe is harmful to EarlyMed or other users.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">8. Governing Law</h2>
                        <p className="mb-4">
                            These Terms are governed by the laws of the State of California, USA, without regard to its conflict of law principles. Any disputes arising from these Terms will be resolved in the state or federal courts located in San Francisco, California.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">9. Changes to These Terms</h2>
                        <p className="mb-4">
                            We may update these Terms from time to time. If we make significant changes, we will notify you via email or by posting a notice on our website. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms.
                        </p>

                        <h2 className="text-2xl font-bold mt-6 mb-4">10. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about these Terms, please contact us at <a href="mailto:mahatirtusher@gmail.com" className="text-primary underline">mahatirtusher@gmail.com</a> or through our <Link to="/contact" className="text-primary underline">Contact Page</Link>.
                        </p>

                        <p className="text-sm text-gray-500 mt-8">
                            Last Updated: April 25, 2025
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TermsPage;