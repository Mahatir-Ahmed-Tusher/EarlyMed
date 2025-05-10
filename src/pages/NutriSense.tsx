import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';

// Constants
const logoUrl = "https://i.postimg.cc/ZRSsW8hC/logo.png";
const apiUrl = "https://api.mistral.ai/v1/chat/completions";
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";

// Interfaces
interface FormData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  medicalConditions: string[];
  allergies: string[];
  dietaryPref: string;
  activity: string;
  region: string;
  healthGoal: string;
  currentDiet: string;
  mealFreq: number;
  snacking: string;
  hydration: number;
  nutritionalRestrictions: string;
  additionalInfo: string;
  sleepHours: number;
  stressLevel: number;
  smoking: string;
  alcohol: string;
  supplements: string[];
}

const NutriSense: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    age: 25,
    gender: "Male",
    height: 170,
    weight: 65,
    medicalConditions: [],
    allergies: [],
    dietaryPref: "Omnivore",
    activity: "Moderately Active",
    region: "",
    healthGoal: "Overall Health Improvement",
    currentDiet: "",
    mealFreq: 3,
    snacking: "",
    hydration: 8,
    nutritionalRestrictions: "",
    additionalInfo: "",
    sleepHours: 7,
    stressLevel: 5,
    smoking: "No",
    alcohol: "Occasionally",
    supplements: [],
  });
  const [dietPlan, setDietPlan] = useState<string>("");

  const handleInputChange = (field: keyof FormData, value: number | string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateDietPlan = async () => {
    const prompt = (
      `You are an expert nutritionist creating personalized diet plans. Analyze this user profile:\n\n` +
      `**Basic Information**\n` +
      `- Age: ${formData.age}\n- Gender: ${formData.gender}\n- Height: ${formData.height} cm\n- Weight: ${formData.weight} kg\n` +
      `- Region: ${formData.region}\n- Activity Level: ${formData.activity}\n\n` +
      `**Health Profile**\n` +
      `- Medical Conditions: ${formData.medicalConditions.join(', ') || 'None'}\n` +
      `- Allergies/Intolerances: ${formData.allergies.join(', ') || 'None'}\n` +
      `- Dietary Preference: ${formData.dietaryPref}\n- Health Goal: ${formData.healthGoal}\n` +
      `- Nutritional Restrictions: ${formData.nutritionalRestrictions || 'None'}\n\n` +
      `**Lifestyle Habits**\n` +
      `- Current Diet: ${formData.currentDiet}\n- Meals/Day: ${formData.mealFreq}\n` +
      `- Snacking: ${formData.snacking || 'None reported'}\n- Water Intake: ${formData.hydration} glasses/day\n` +
      `- Sleep: ${formData.sleepHours} hrs/night\n- Stress Level: ${formData.stressLevel}/10\n` +
      `- Smoking: ${formData.smoking}\n- Alcohol: ${formData.alcohol}\n- Supplements: ${formData.supplements.join(', ') || 'None'}\n\n` +
      `**Additional Notes**: ${formData.additionalInfo || 'None'}\n\n` +
      `Create a comprehensive diet plan with these sections:\n` +
      `1. Daily Nutritional Targets (calories, macros), use SI, not matrics\n` +
      `2. Meal Schedule with specific food suggestions\n` +
      `3. Hydration Strategy\n` +
      `4. Lifestyle Recommendations\n` +
      `5. Important Considerations/Cautions\n` +
      `Use clear headings, bullet points, and avoid markdown. Prioritize foods common in the user's region. For example, if the user is from India, then suggest Indian diets, things that are only available in India. Do it for every other country. Also, the tone of the suggestion has to be humanlike, be kind, Introduce yourself as NutriSense AI.`
    );

    const payload = {
      model: "mistral-tiny",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    };
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content || "No response received from the API.";
      const disclaimer = "\n\n---\n*Disclaimer: This AI-generated plan is for informational purposes only. Consult a healthcare professional before making dietary changes.*";
      setDietPlan(resultText + disclaimer);
    } catch (error) {
      setDietPlan(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "80px auto 40px", padding: "20px", background: "linear-gradient(135deg, #f6f8fa 0%, #e9ecef 100%)", borderRadius: "15px" }}>
      <style>
        {`
          .navbar {
            padding: 0.5rem 1rem !important; /* Slim padding for navbar */
          }
          .navbar-brand {
            padding: 0.25rem 0.5rem;
          }
          .nav-link {
            padding: 0.5rem 0.75rem;
          }
          body {
            font-family: 'Segoe UI', system-ui;
            background-color: #f8f9fa;
            color: #2c3e50;
          }
          .card {
            border: none;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .tab-content {
            padding: 15px;
          }
          .btn-primary {
            background-color: #2c3e50;
            border-color: #2c3e50;
          }
          .btn-primary:hover {
            background-color: #1a252f;
            border-color: #1a252f;
          }
          .output-box {
            min-height: 200px;
            border: 1px solid #ced4da;
            border-radius: 5px;
            padding: 10px;
            background-color: #fff;
          }
        `}
      </style>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={logoUrl} alt="EarlyMed Logo" style={{ maxHeight: "100px" }} />
        <h1 style={{ fontSize: "2em", color: "#2c3e50", padding: "10px" }}>NutriSense AI: Personalized Diet Planner</h1>
        <p style={{ color: "#7f8c8d" }}>A side project of EarlyMed | Developed by Team Sisyphus at VIT-AP University</p>
      </div>

      <Tabs defaultActiveKey="personal" id="nutrisense-tabs" className="mb-3">
        <Tab eventKey="personal" title="Personal Details">
          <Card>
            <Card.Body>
              <div className="row">
                <div className="col-md-6">
                  <label>What is your age?</label>
                  <input type="number" className="form-control" value={formData.age} onChange={(e) => handleInputChange("age", +e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label>What is your gender?</label>
                  <select className="form-control" value={formData.gender} onChange={(e) => handleInputChange("gender", e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-6 mt-3">
                  <label>Height (cm)</label>
                  <input type="number" className="form-control" value={formData.height} onChange={(e) => handleInputChange("height", +e.target.value)} />
                </div>
                <div className="col-md-6 mt-3">
                  <label>Weight (kg)</label>
                  <input type="number" className="form-control" value={formData.weight} onChange={(e) => handleInputChange("weight", +e.target.value)} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="medical" title="Medical & Dietary Info">
          <Card>
            <Card.Body>
              <label>Do you have any existing medical conditions?</label>
              <div className="form-check">
                {["Diabetes", "Hypertension", "Thyroid issues", "None"].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.medicalConditions.includes(option)}
                      onChange={(e) => {
                        const newConditions = e.target.checked
                          ? [...formData.medicalConditions, option]
                          : formData.medicalConditions.filter((c) => c !== option);
                        handleInputChange("medicalConditions", newConditions);
                      }}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
              <label className="mt-3">Do you have any food allergies or intolerances?</label>
              <div className="form-check">
                {["Peanuts", "Gluten", "Lactose", "Shellfish", "None", "Other"].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.allergies.includes(option)}
                      onChange={(e) => {
                        const newAllergies = e.target.checked
                          ? [...formData.allergies, option]
                          : formData.allergies.filter((a) => a !== option);
                        handleInputChange("allergies", newAllergies);
                      }}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <label>What are your dietary preferences?</label>
                <select className="form-control" value={formData.dietaryPref} onChange={(e) => handleInputChange("dietaryPref", e.target.value)}>
                  <option value="Omnivore">Omnivore</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Pescatarian">Pescatarian</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mt-3">
                <label>How would you describe your daily physical activity?</label>
                <select className="form-control" value={formData.activity} onChange={(e) => handleInputChange("activity", e.target.value)}>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Lightly Active">Lightly Active</option>
                  <option value="Moderately Active">Moderately Active</option>
                  <option value="Highly Active">Highly Active</option>
                </select>
              </div>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="additional" title="Additional Information">
          <Card>
            <Card.Body>
              <div className="mb-3">
                <label>Which region or country do you reside in?</label>
                <input type="text" className="form-control" value={formData.region} onChange={(e) => handleInputChange("region", e.target.value)} placeholder="e.g., USA" />
              </div>
              <div className="mb-3">
                <label>What is your primary health goal?</label>
                <select className="form-control" value={formData.healthGoal} onChange={(e) => handleInputChange("healthGoal", e.target.value)}>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Overall Health Improvement">Overall Health Improvement</option>
                  <option value="Managing a Specific Condition">Managing a Specific Condition</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label>How would you describe your current diet?</label>
                <input type="text" className="form-control" value={formData.currentDiet} onChange={(e) => handleInputChange("currentDiet", e.target.value)} placeholder="e.g., Balanced, High-Carb" />
              </div>
              <div className="mb-3">
                <label>How many meals do you typically consume in a day?</label>
                <input type="number" className="form-control" value={formData.mealFreq} onChange={(e) => handleInputChange("mealFreq", +e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Do you regularly consume snacks? If yes, please specify the type.</label>
                <input type="text" className="form-control" value={formData.snacking} onChange={(e) => handleInputChange("snacking", e.target.value)} placeholder="e.g., Fruits, Nuts" />
              </div>
              <div className="mb-3">
                <label>How many glasses of water do you drink per day?</label>
                <input type="number" className="form-control" value={formData.hydration} onChange={(e) => handleInputChange("hydration", +e.target.value)} />
              </div>
              <div className="mb-3">
                <label>Do you have any specific nutritional restrictions?</label>
                <input type="text" className="form-control" value={formData.nutritionalRestrictions} onChange={(e) => handleInputChange("nutritionalRestrictions", e.target.value)} placeholder="e.g., Low sodium" />
              </div>
              <div className="mb-3">
                <label>Additional information (optional)</label>
                <textarea className="form-control" value={formData.additionalInfo} onChange={(e) => handleInputChange("additionalInfo", e.target.value)} placeholder="Any other details..." rows={2} />
              </div>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="lifestyle" title="Lifestyle & Habits">
          <Card>
            <Card.Body>
              <div className="mb-3">
                <label>How many hours do you sleep per night?</label>
                <input type="number" className="form-control" value={formData.sleepHours} onChange={(e) => handleInputChange("sleepHours", +e.target.value)} />
              </div>
              <div className="mb-3">
                <label>On a scale of 1-10, how would you rate your average stress level?</label>
                <input type="range" className="form-range" min="1" max="10" value={formData.stressLevel} onChange={(e) => handleInputChange("stressLevel", +e.target.value)} />
                <span>{formData.stressLevel}/10</span>
              </div>
              <div className="mb-3">
                <label>Do you smoke?</label>
                <select className="form-control" value={formData.smoking} onChange={(e) => handleInputChange("smoking", e.target.value)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="mb-3">
                <label>How often do you consume alcohol?</label>
                <select className="form-control" value={formData.alcohol} onChange={(e) => handleInputChange("alcohol", e.target.value)}>
                  <option value="Never">Never</option>
                  <option value="Occasionally">Occasionally</option>
                  <option value="Regularly">Regularly</option>
                </select>
              </div>
              <label>Do you take any dietary supplements?</label>
              <div className="form-check">
                {["Multivitamins", "Omega-3", "Protein Supplements", "None", "Other"].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={formData.supplements.includes(option)}
                      onChange={(e) => {
                        const newSupplements = e.target.checked
                          ? [...formData.supplements, option]
                          : formData.supplements.filter((s) => s !== option);
                        handleInputChange("supplements", newSupplements);
                      }}
                    />
                    <label className="form-check-label">{option}</label>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="primary" onClick={generateDietPlan} disabled={!apiKey}>
          Generate Diet Plan
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "#2c3e50", textAlign: "center" }}>Your Personalized Diet Plan</h3>
        <div className="output-box" dangerouslySetInnerHTML={{ __html: dietPlan.replace(/\n/g, '<br/>') }} />
      </div>
    </div>
  );
};

export default NutriSense;