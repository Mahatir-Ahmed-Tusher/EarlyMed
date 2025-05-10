import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function CardiovascularHealthPost() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6 md:p-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Understanding Cardiovascular Health: Risk Factors and Prevention
          </h1>
          
          <div className="text-gray-600 mb-6">
            <p className="font-semibold">By Dr. Zarin Nabila, MBBS, MD (Cardiology)</p>
            <p>Bagra Medical College, Bangladesh</p>
          </div>

          <p className="text-xl mb-8">
            A Comprehensive Guide to Heart Health, Risk Assessment, and Preventive Measures
          </p>

          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Cardiovascular diseases (CVDs) remain the leading cause of death globally, 
              accounting for nearly 18 million deaths each year (WHO, 2023). In Bangladesh, 
              the prevalence of heart disease is rising due to lifestyle changes, poor dietary 
              habits, and limited awareness. As a cardiologist, I often encounter patients who could have prevented severe heart conditions with early intervention.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-8">
              <p className="font-semibold mb-2">This blog will help you understand:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Key risk factors for cardiovascular disease
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  How to assess your heart health
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Essential preventive measures
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              1. What Are the Major Risk Factors for Cardiovascular Disease?
            </h2>

            <p className="mb-6">
              Cardiovascular diseases develop due to a combination of <span className="font-semibold">modifiable</span> (controllable) and <span className="font-semibold">non-modifiable</span> (uncontrollable) risk factors.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">A. Non-Modifiable Risk Factors</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Age</span>: Risk increases after 45 for men and 55 for women.</li>
                  <li><span className="font-semibold">Gender</span>: Men are at higher risk earlier in life, but women's risk rises after menopause.</li>
                  <li><span className="font-semibold">Family History</span>: A parent or sibling with heart disease increases your risk.</li>
                  <li><span className="font-semibold">Ethnicity</span>: South Asians (including Bangladeshis) have a higher predisposition to heart disease.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">B. Modifiable Risk Factors</h3>
                <p className="mb-2">These are the areas where lifestyle changes make the biggest impact:</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">1. High Blood Pressure (Hypertension)</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><span className="font-semibold">Why it's dangerous</span>: Damages arteries over time, leading to heart attacks and strokes.</li>
                      <li><span className="font-semibold">Goal</span>: Keep BP below 120/80 mmHg.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">2. High Cholesterol (Dyslipidemia)</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><span className="font-semibold">LDL ("bad" cholesterol)</span>: Should be &lt;100 mg/dL.</li>
                      <li><span className="font-semibold">HDL ("good" cholesterol)</span>: Should be &gt;60 mg/dL.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold">3. Diabetes & Insulin Resistance</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Uncontrolled diabetes <span className="font-semibold">doubles</span> the risk of heart disease.</li>
                      <li>Maintain <span className="font-semibold">HbA1c &lt; 6.5%</span> if diabetic.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold">4. Obesity & Sedentary Lifestyle</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Excess belly fat increases inflammation and strain on the heart.</li>
                  <li><span className="font-semibold">Target</span>: BMI 18.5–24.9 and waist circumference &lt;35" (women) / &lt;40" (men).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">5. Smoking & Excessive Alcohol</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Smoking <span className="font-semibold">damages blood vessels</span> and increases clot formation.</li>
                  <li><span className="font-semibold">Limit alcohol</span>: ≤1 drink/day (women), ≤2 drinks/day (men).</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-semibold">6. Chronic Stress & Poor Sleep</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stress raises <span className="font-semibold">cortisol</span>, increasing blood pressure.</li>
                <li><span className="font-semibold">Sleep 7–9 hours/night</span> to allow heart recovery.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              2. How to Assess Your Cardiovascular Risk?
            </h2>

            <p className="mb-4">
              Early detection saves lives. Here's how to evaluate your heart health:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">A. Medical Tests</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Lipid Profile</span> (Cholesterol check)</li>
                  <li><span className="font-semibold">Blood Pressure Monitoring</span></li>
                  <li><span className="font-semibold">ECG / Echocardiogram</span> (If symptoms like chest pain or breathlessness)</li>
                  <li><span className="font-semibold">HbA1c & Fasting Blood Sugar</span> (Diabetes screening)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">B. Risk Calculators</h3>
                <p className="mb-2">Doctors use tools like:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Framingham Risk Score</span></li>
                  <li><span className="font-semibold">ASCVD Risk Estimator</span></li>
                </ul>
                <p className="mt-2">These predict your <span className="font-semibold">10-year risk</span> of a heart attack or stroke.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              3. Preventive Measures: How to Keep Your Heart Healthy?
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">A. Dietary Changes</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">Eat more</span>: Fruits, vegetables, whole grains, fish (omega-3), nuts.</li>
                  <li><span className="font-semibold">Avoid</span>: Trans fats, excess salt, sugary drinks, processed meats.</li>
                  <li><span className="font-semibold">Mediterranean & DASH diets</span> are proven to lower heart disease risk.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">B. Exercise Regularly</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">150 mins/week</span> of moderate exercise (brisk walking, cycling).</li>
                  <li>Strength training <span className="font-semibold">2x/week</span> improves heart function.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">C. Quit Smoking & Limit Alcohol</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Seek medical help if needed (nicotine patches, counseling).</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">D. Manage Stress</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Practice <span className="font-semibold">yoga, meditation, deep breathing</span>.</li>
                  <li>Stay socially connected to reduce emotional stress.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">E. Regular Health Check-ups</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-semibold">After 30</span>: Annual BP, cholesterol checks.</li>
                  <li><span className="font-semibold">After 40</span>: ECG, stress test if high risk.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
              <p className="text-lg mb-4">
                Heart disease is largely preventable. By understanding your risks and making 
                proactive lifestyle changes, you can significantly reduce your chances of 
                cardiovascular complications.
              </p>
              <p className="text-lg font-semibold">
                If you have a family history of heart disease, high blood pressure, or diabetes, consult a cardiologist for a personalized prevention plan.
              </p>
              <p className="text-lg mt-4">
                Stay heart-healthy!
              </p>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="font-semibold">Dr. Zarin Nabila</p>
              <p>Bagra Medical College, Bangladesh</p>
              <p className="mt-4 text-sm text-gray-600">
                Did you find this helpful? Share with your loved ones to spread heart health awareness!
              </p>
              <p className="text-sm text-gray-500 mt-2">Reading Time: ~10 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}