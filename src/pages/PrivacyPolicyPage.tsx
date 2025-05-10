import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl border border-white/30">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-tight">
                        Privacy Policy
                    </h1>
                    <div className="prose max-w-none text-black">
                        <p className="mb-4 text-blue-500">
                            At EarlyMed, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            1. Information We Collect
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We may collect the following types of information:
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>
                                    <strong>Personal Information:</strong> Name, email address, and contact details when you register or contact us.
                                </li>
                                <li>
                                    <strong>Health Data:</strong> Symptoms, medical history, or diagnostic data you provide for personalized insights (e.g., via Symptom Checker or MediLexica).
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> IP address, browser type, and pages visited, collected automatically.
                                </li>
                                <li>
                                    <strong>Uploaded Content:</strong> Images, PDFs, or other files you upload for analysis.
                                </li>
                            </ul>
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            2. How We Use Your Information
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We use your data to:
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>Provide and improve our diagnostic and health-related services.</li>
                                <li>Personalize your experience with tailored recommendations.</li>
                                <li>Ensure compliance with healthcare regulations, including HIPAA.</li>
                                <li>Communicate with you about updates or support.</li>
                            </ul>
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            3. Data Sharing and Disclosure
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We do not sell your personal information. We may share data with:
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>
                                    <strong>Service Providers:</strong> Third parties who assist with hosting, analytics, or AI processing (under strict confidentiality agreements).
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> When required by law or to protect our rights.
                                </li>
                            </ul>
                            Your health data is anonymized before any analysis or sharing for research purposes.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            4. Data Security
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We implement encryption, secure servers, and regular audits to protect your data. However, no online service is 100% secure, and we encourage you to safeguard your account credentials.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            5. Your Rights and Choices
                        </h2>
                        <p className="mb-4 text-blue-500">
                            You can:
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>Access, update, or delete your personal information by contacting us.</li>
                                <li>Opt out of non-essential communications.</li>
                                <li>Request data portability where applicable.</li>
                            </ul>
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            6. International Data Transfers
                        </h2>
                        <p className="mb-4 text-blue-500">
                            Your data may be processed in countries outside your region. We ensure compliance with international data protection standards, such as GDPR or HIPAA equivalents.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            7. Changes to This Policy
                        </h2>
                        <p className="mb-4 text-blue-500">
                            We may update this policy periodically. Changes will be posted here with an updated date, and we’ll notify you via email if significant.
                        </p>

                        <h2 className="text-2xl font-semibold mt-6 mb-4 text-primary">
                            8. Contact Us
                        </h2>
                        <p className="mb-4 text-blue-500">
                            For questions or concerns, reach us at{" "}
                            <a
                                href="mailto:mahatirtusher@gmail.com"
                                className="text-primary underline hover:text-primary-light"
                            >
                                mahatirtusher@gmail.com
                            </a>{" "}
                            or through our{" "}
                            <Link
                                to="/contact"
                                className="text-primary underline hover:text-primary-light"
                            >
                                Contact Page
                            </Link>
                            .
                        </p>

                        <p className="text-sm text-gray-400 mt-8">
                            Last Updated: April 25, 2025
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PrivacyPolicyPage;