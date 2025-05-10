import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Film, ExternalLink } from 'lucide-react';

const videos = [
    { title: "How AI is making it easier to diagnose disease | Pratik Shah", url: "https://www.youtube.com/embed/mhEYvrFOP88", category: "General Health" },
    { title: "Heart Disease Symptoms: 7 Warning Signs You Should Never Ignore", url: "https://www.youtube.com/embed/J1DUQFL-VHw", category: "Heart Health" },
    { title: "How to Stay Alive During a Heart Attack When You're Alone", url: "https://www.youtube.com/embed/IwcNNeEBzvE", category: "Heart Health" },
    { title: "6 Surprising Signs Of A SILENT HEART ATTACK And How to Stay Alert", url: "https://www.youtube.com/embed/dAY25HZmfsM", category: "Heart Health" },
    { title: "Stay Motivated by Measuring Progress After Stroke", url: "https://www.youtube.com/embed/dcXeOShnNZg", category: "Heart Health" },
    { title: "Tired All The Time? Here Are Your Super Fast And Easy Ways To Fight Fatigue", url: "https://www.youtube.com/embed/yVL6B4yZjC4", category: "General Health" },
    { title: "How the food you eat affects your brain - Mia Nacamulli", url: "https://www.youtube.com/embed/xyQY8a-ng6g", category: "Nutrition" },
    { title: "How do carbohydrates impact your health? - Richard J. Wood", url: "https://www.youtube.com/embed/wxzc_2c6GMg", category: "Nutrition" },
    { title: "The role of food in health | Dr Rupy Aujla | TEDxBristol", url: "https://www.youtube.com/embed/yTQ0tBmLbns", category: "Nutrition" },
    { title: "How to make healthy eating unbelievably easy | Luke Durward | TEDxYorkU", url: "https://www.youtube.com/embed/Q4yUlJV31Rk", category: "Nutrition" },
    { title: "Winning The Mental Battle of Physical Fitness and Obesity | Ogie Shaw", url: "https://www.youtube.com/embed/K60xHx836T0", category: "General Health" },
    { title: "How To Stay Healthy | Mark Gendreau | TEDxCambridge", url: "https://www.youtube.com/embed/z6ffSvkAkSM", category: "General Health" },
    { title: "Do This in Your 20s To Stay Healthy in Your 50s | Dr. Nene", url: "https://www.youtube.com/embed/r1RhM0RfObM", category: "General Health" },
    { title: "HEALTHY HABITS: 10 Daily Habits That Changed My Life (as an MD)", url: "https://www.youtube.com/embed/CRn_83wTPSM", category: "General Health" },
    { title: "The Science of Gut Health (& Why It Matters)", url: "https://www.youtube.com/embed/E3QpXj_QOqQ", category: "Nutrition" },
    { title: "The Best Foods to Cleanse & Repair Your Kidneys | Dr. Mandell", url: "https://www.youtube.com/embed/eXdE2AWG-wg", category: "Kidney Health" },
    { title: "5 Powerful Fruits Boosting Kidney Cleanse and How to Enjoy Them", url: "https://www.youtube.com/embed/3nEh1fLwjzU", category: "Kidney Health" },
    { title: "CKD stage 5 RENAL DIET: Foods I ate to improve kidney function", url: "https://www.youtube.com/embed/zH6fnXyPee8", category: "Kidney Health" },
    { title: "The 5 Worst Foods for Our Kidneys! Dr. Mandell", url: "https://www.youtube.com/embed/ljW7abOCnC4", category: "Kidney Health" },
    { title: "How do your kidneys work? - Emma Bryce", url: "https://www.youtube.com/embed/FN3MFhYPWWo", category: "Kidney Health" },
    { title: "Understanding Net Carbs vs. Total Carbs in Type 1 Diabetes Management", url: "https://www.youtube.com/embed/F7Fz74Yi6b8", category: "Diabetes" },
    { title: "Caring for Someone with Diabetes", url: "https://www.youtube.com/embed/Mxf27WaXbt0", category: "Diabetes" },
    { title: "Diet Tips For Someone With Diabetes", url: "https://www.youtube.com/embed/RhvRLR-1JH4", category: "Diabetes" },
    { title: "Diabetes and your feet", url: "https://www.youtube.com/embed/X8RQ5KMVjPY", category: "Diabetes" },
    { title: "Diabetic Foot Care - Dos & Don'ts | @LevelUpRN", url: "https://www.youtube.com/embed/17r-d_l-IEk", category: "Diabetes" },
    { title: "How to take care of your feet if you have diabetes | CARE Hospitals", url: "https://www.youtube.com/embed/PeA4aDtTajk", category: "Diabetes" },
    { title: "The diet changes you can make to keep your thyroid balanced", url: "https://www.youtube.com/embed/fNZRaS0Hrxc", category: "Thyroid Health" },
    { title: "3 Easy Ways to Help Thyroid Work Correctly", url: "https://www.youtube.com/embed/DvqReFr5AtA", category: "Thyroid Health" },
    { title: "How I recovered From Hyperthyroidism / Graves Disease", url: "https://www.youtube.com/embed/EsaLn0p9xpo", category: "Thyroid Health" },
    { title: "A Doctor's Guide to Hashimoto's: Learn How to Heal Your Thyroid!", url: "https://www.youtube.com/embed/Fhgh42-mZkw", category: "Thyroid Health" },
    { title: "The #1 Most Important Nutrient for Hypothyroidism", url: "https://www.youtube.com/embed/3ykJdD-W_n8", category: "Thyroid Health" },
    { title: "How to Heal Your Thyroid, Dr. Josh Axe", url: "https://www.youtube.com/embed/s2YNLWnK-xc", category: "Thyroid Health" },
    { title: "How to Heal Hypothyroidism and Hashimoto's Naturally", url: "https://www.youtube.com/embed/OpI4SSyOQ6c", category: "Thyroid Health" },
    { title: "Caregiver Training: Agitation and Anxiety | UCLA Alzheimer's and Dementia Care", url: "https://www.youtube.com/embed/hahvUXwTXE4", category: "Dementia & Alzheimer's" },
    { title: "Caregiver Training: Repetitive Questions | UCLA Alzheimer's and Dementia Care", url: "https://www.youtube.com/embed/hke8ek_aHkE", category: "Dementia & Alzheimer's" },
    { title: "Caregiver Training: Refusal to Bathe | UCLA Alzheimer's and Dementia Care", url: "https://www.youtube.com/embed/sl3Dc1kERto", category: "Dementia & Alzheimer's" },
    { title: "Episode 25- Alzheimers and AI Med Tech Augmenting HealthCare", url: "https://www.youtube.com/embed/sOBKtmx4MKY", category: "Dementia & Alzheimer's" },
    { title: "How To Stop A 'Frustrating' Dementia Behavior", url: "https://www.youtube.com/embed/bmYTxsexFo0", category: "Dementia & Alzheimer's" },
    { title: "How To Talk To Someone With Dementia", url: "https://www.youtube.com/embed/rl3HEySOvcs", category: "Dementia & Alzheimer's" },
    { title: "Top 3 signs your loved one with dementia needs nursing home care", url: "https://www.youtube.com/embed/3ZuhqHK8wDE", category: "Dementia & Alzheimer's" },
    { title: "How To Get A Dementia Diagnosis: 4 things", url: "https://www.youtube.com/embed/tt4STJE757Q", category: "Dementia & Alzheimer's" },
    { title: "Elderly Future Memory Loss Can Be Detected in Advance Using AI", url: "https://www.youtube.com/embed/JfBnCbo0r8c", category: "Dementia & Alzheimer's" },
    { title: "Pneumonia symptoms, patho, nursing interventions for NCLEX RN & LPN", url: "https://www.youtube.com/embed/F8ozBT4sIrk", category: "Pneumonia & Lung Health" },
    { title: "Pneumonia Diet | Foods for Pneumonia Patients | MFine", url: "https://www.youtube.com/embed/XNXAyRMZmI8", category: "Pneumonia & Lung Health" },
    { title: "Pneumonia: Causes, Symptoms, Diagnosis & Treatments - Ask A Nurse", url: "https://www.youtube.com/embed/vp8FXgcunfE", category: "Pneumonia & Lung Health" },
    { title: "Recovering from a Severe Lung Infection", url: "https://www.youtube.com/embed/Ub0LGwAdCBA", category: "Pneumonia & Lung Health" },
    { title: "Acute Lymphoblastic Leukemia (ALL)", url: "https://www.youtube.com/embed/4fXoAFmpRO4", category: "Leukemia" },
    { title: "Acute Lymphoblastic Leukemia, Causes, Signs and Symptoms, Diagnosis and Treatment", url: "https://www.youtube.com/embed/w4u3f7k-klA", category: "Leukemia" },
    { title: "What are the Treatments for Acute Lymphocytic Leukemia (ALL)?", url: "https://www.youtube.com/embed/wlZ6g-dwNWA", category: "Leukemia" },
    { title: "Acute Lymphoblastic Leukemia (ALL) - Treatment", url: "https://www.youtube.com/embed/SBDZtArHViE", category: "Leukemia" },
    { title: "Treatment Options for Acute Lymphoblastic Leukemia (ALL)", url: "https://www.youtube.com/embed/RJDSUOfGbYM", category: "Leukemia" },
    { title: "Polycystic Ovary Syndrome (PCOS) Symptoms", url: "https://www.youtube.com/embed/TduTthL5Fr8", category: "PCOS" },
    { title: "Understanding PCOS Symptoms and Treatment: How To Manage Your PCOS", url: "https://www.youtube.com/embed/NcGeMWaF4ac", category: "PCOS" },
    { title: "PCOD (Polycystic Ovary Disease) - Cause, Symptoms and Treatment", url: "https://www.youtube.com/embed/tVfQr-T4g18", category: "PCOS" },
    { title: "Signs and Symptoms of a Brain Tumor | Dana-Farber Cancer Institute", url: "https://www.youtube.com/embed/MnOITHXlW6U", category: "Brain Tumors" },
    { title: "Signs and Symptoms of Brain Tumors", url: "https://www.youtube.com/embed/vGgMOvDY0oU", category: "Brain Tumors" },
    { title: "Symptoms of Brain Tumour in Children | Dr Tarang K Vora", url: "https://www.youtube.com/embed/pg9GM02zrKY", category: "Brain Tumors" },
    { title: "2-Minute Neuroscience: Brain tumors", url: "https://www.youtube.com/embed/pBSncknENRc", category: "Brain Tumors" },
    { title: "Primary Brain Tumors | What Are They and How Do They Form?", url: "https://www.youtube.com/embed/cSeXJKSQpiI", category: "Brain Tumors" },
    { title: "Understanding Brain Tumor Survival Rates", url: "https://www.youtube.com/embed/y2wm046M2d4", category: "Brain Tumors" },
    { title: "If these symptoms are seen then it may be brain tumor | Dr VP Singh", url: "https://www.youtube.com/embed/nEXEHIA5_yw", category: "Brain Tumors" },
    { title: "Brain Tumors: Frequently Asked Questions | Jon Weingart, M.D.", url: "https://www.youtube.com/embed/LIVDhFeaAUM", category: "Brain Tumors" },
    { title: "System (PCOS) Symptoms", url: "https://www.youtube.com/embed/TduTthL5Fr8", category: "PCOS" },
    { title: "Understanding PCOS Symptoms and Treatment: How To Manage Your PCOS", url: "https://www.youtube.com/embed/NcGeMWaF4ac", category: "PCOS" },
    { title: "PCOD (Polycystic Ovary Disease) - Cause, Symptoms and Treatment", url: "https://www.youtube.com/embed/tVfQr-T4g18", category: "PCOS" },
    { title: "Signs and Symptoms of a Brain Tumor | Dana-Farber Cancer Institute", url: "https://www.youtube.com/embed/MnOITHXlW6U", category: "Brain Tumors" },
    { title: "Signs and Symptoms of Brain Tumors", url: "https://www.youtube.com/embed/vGgMOvDY0oU", category: "Brain Tumors" },
    { title: "Symptoms of Brain Tumour in Children | Dr Tarang K Vora", url: "https://www.youtube.com/embed/pg9GM02zrKY", category: "Brain Tumors" },
    { title: "2-Minute Neuroscience: Brain tumors", url: "https://www.youtube.com/embed/pBSncknENRc", category: "Brain Tumors" },
    { title: "Primary Brain Tumors | What Are They and How Do They Form?", url: "https://www.youtube.com/embed/cSeXJKSQpiI", category: "Brain Tumors" },
    { title: "Understanding Brain Tumor Survival Rates", url: "https://www.youtube.com/embed/y2wm046M2d4", category: "Brain Tumors" },
    { title: "If these symptoms are seen then it may be brain tumor | Dr VP Singh", url: "https://www.youtube.com/embed/nEXEHIA5_yw", category: "Brain Tumors" },
    { title: "Brain Tumors: Frequently Asked Questions | Jon Weingart, M.D.", url: "https://www.youtube.com/embed/LIVDhFeaAUM", category: "Brain Tumors" },
    { title: "Breast cancer - signs and symptoms | NHS", url: "https://www.youtube.com/embed/ojddACFfVa8", category: "Breast Cancer" },
    { title: "5 Signs of Breast cancer | 3D Animation", url: "https://www.youtube.com/embed/srDdIbFLbJY", category: "Breast Cancer" },
    { title: "Morning Medical Update - Breast Cancer in Men", url: "https://www.youtube.com/embed/9bN8yp3nYa8", category: "Breast Cancer" },
    { title: "7 Early Signs of Autism Every Parent Should Know", url: "https://www.youtube.com/embed/WRRF4NZB3WQ", category: "Autism & Down Syndrome" },
    { title: "How to tell the difference between giftedness, ADHD and autism", url: "https://www.youtube.com/embed/jOdQ4g1gjJU", category: "Autism & Down Syndrome" },
    { title: "What it's really like to have autism | Ethan Lisi", url: "https://www.youtube.com/embed/y4vurv9usYA", category: "Autism & Down Syndrome" },
    { title: "Are You Undiagnosed Autistic? How To Tell If You're On The Autism Spectrum", url: "https://www.youtube.com/embed/UcqBgXCxddE", category: "Autism & Down Syndrome" },
    { title: "Down Syndrome and Autism Spectrum Disorder", url: "https://www.youtube.com/embed/RL7TsFDPnVw", category: "Autism & Down Syndrome" },
    { title: "An Autistic Wife with Down Syndrome and Her Husband", url: "https://www.youtube.com/embed/r_b9l1E5IsI", category: "Autism & Down Syndrome" },
    { title: "CrossRoad: Where Down Syndrome Meets Autism", url: "https://www.youtube.com/embed/zkyB-UUgj4Y", category: "Autism & Down Syndrome" }
];

const categories = [
    "All",
    "Heart Health",
    "Nutrition",
    "Kidney Health",
    "Diabetes",
    "Thyroid Health",
    "Dementia & Alzheimer's",
    "Pneumonia & Lung Health",
    "Leukemia",
    "PCOS",
    "Brain Tumors",
    "Breast Cancer",
    "Autism & Down Syndrome",
    "General Health"
];

const VideosPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredVideos = videos.filter(video => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Card className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl border border-white/30">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-4xl font-extrabold mb-6 text-primary tracking-tight flex items-center gap-2">
                        <Film className="h-8 w-8" />
                        Health Education Videos
                    </h1>
                    <p className="mb-8 text-blue-500 prose max-w-none">
                        Explore our curated collection of health education videos from YouTube, covering topics like heart health, nutrition, diabetes, mental health, and more. Use the search and category filters to find videos that interest you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Search videos by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-1/2 p-2 rounded-lg bg-white/10 border border-white/30 text-blue-500 placeholder-blue-500/50 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Search videos by title"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-1/4 p-2 rounded-lg bg-white/10 border border-white/30 text-blue-500 focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Filter videos by category"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    {filteredVideos.length === 0 ? (
                        <p className="text-blue-500 text-center">No videos found matching your search or category.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.map((video, index) => (
                                <div key={index} className="flex flex-col">
                                    <Card className="bg-white/5 border-white/20 hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="relative aspect-video mb-4">
                                                <iframe
                                                    className="w-full h-full rounded-lg"
                                                    src={video.url}
                                                    title={video.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    loading="lazy"
                                                ></iframe>
                                            </div>
                                            <h3 className="text-lg font-semibold text-primary mb-2">{video.title}</h3>
                                            <p className="text-sm text-blue-500 mb-2">{video.category}</p>
                                            <a
                                                href={video.url.replace('/embed/', '/watch?v=')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-400 inline-flex items-center text-sm"
                                                aria-label={`Watch ${video.title} on YouTube`}
                                            >
                                                Watch on YouTube
                                                <ExternalLink className="h-4 w-4 ml-1" />
                                            </a>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Have feedback or suggestions? Visit our{" "}
                            <Link to="/contact" className="text-primary hover:text-primary-dark">
                                Contact Page
                            </Link>.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Last updated on April 25, 2025.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VideosPage;