
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BlogPost from "@/components/blog/BlogPost";

const MentalHealthPost = () => {
  const blogData = {
    title: "Mental Health Awareness: Early Signs and Support",
    excerpt: "A comprehensive guide to understanding mental health, recognizing warning signs, and finding the right support systems for better well-being.",
    category: "Mental Health",
    date: "March 25, 2024",
    author: "Dr. Srinivasa Manish",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1474071432118-7f9513cf58d9?auto=format&fit=crop&q=80&w=700",
    content: `Mental health is a crucial component of our overall well-being, yet it often goes overlooked or misunderstood. As a mental health specialist at AIIMS with over 15 years of experience, I've witnessed firsthand how early intervention can transform lives. This comprehensive guide will help you understand mental health, recognize warning signs, and find appropriate support.

Understanding Mental Health Fundamentals

Mental health encompasses our emotional, psychological, and social well-being. It influences how we:
• Think, feel, and act
• Handle stress
• Make choices
• Relate to others

Early Warning Signs to Watch For

1. Emotional Changes:
- Persistent sadness or depression
- Excessive anxiety or worry
- Extreme mood swings
- Anger or irritability
- Emotional numbness

2. Behavioral Changes:
- Withdrawal from social activities
- Loss of interest in previously enjoyed activities
- Changes in sleeping patterns
- Changes in eating habits
- Difficulty concentrating
- Substance use or abuse

3. Physical Manifestations:
- Unexplained aches and pains
- Fatigue
- Changes in appetite
- Sleep disturbances
- Digestive problems

Risk Factors and Triggers

Understanding what contributes to mental health challenges is crucial:

Environmental Factors:
• Chronic stress
• Trauma or abuse
• Major life changes
• Social isolation
• Work-related pressure

Biological Factors:
• Genetic predisposition
• Brain chemistry
• Hormonal changes
• Chronic health conditions

Seeking Support: A Step-by-Step Guide

1. Professional Help:
- Mental health professionals
- Counselors and therapists
- Psychiatrists
- Support groups

2. Self-Care Strategies:
- Regular exercise
- Healthy sleep habits
- Balanced nutrition
- Mindfulness practices
- Stress management techniques

Breaking the Stigma

Despite increased awareness, mental health stigma persists. We must:
• Normalize mental health conversations
• Share experiences
• Support others
• Educate ourselves and others
• Challenge misconceptions

Prevention and Maintenance

Maintaining good mental health involves:

1. Regular Check-ins:
- Monitor your mood
- Track sleep patterns
- Assess stress levels
- Evaluate relationships

2. Healthy Lifestyle Choices:
- Regular exercise
- Balanced diet
- Adequate sleep
- Limited alcohol and caffeine
- Social connections

3. Stress Management:
- Time management
- Boundary setting
- Relaxation techniques
- Regular breaks

When to Seek Emergency Help

Recognize these urgent warning signs:
• Suicidal thoughts
• Severe depression
• Panic attacks
• Loss of touch with reality
• Risk of self-harm

Resources and Support Networks

1. Professional Services:
- Mental health hotlines
- Crisis intervention services
- Online therapy platforms
- Support groups

2. Community Resources:
- Local mental health organizations
- Peer support programs
- Educational workshops
- Family support services

Moving Forward

Remember that seeking help is a sign of strength, not weakness. Mental health is a journey, not a destination. With proper support and understanding, recovery and management are possible.

Take the first step today by:
1. Acknowledging your feelings
2. Reaching out to someone you trust
3. Consulting a mental health professional
4. Joining support groups
5. Practicing self-care

Your mental health matters, and help is always available.

About the Author:
Dr. Srinivasa Manish is a Senior Consultant Psychiatrist at AIIMS with extensive experience in treating various mental health conditions. He is dedicated to breaking mental health stigma and promoting early intervention strategies.`
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
      <BlogPost {...blogData} />
    </>
  );
};

export default MentalHealthPost;
