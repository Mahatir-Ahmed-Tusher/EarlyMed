import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Shield, AlertTriangle, AlertOctagon } from 'lucide-react';

interface FormData {
  mediterraneanDiet: { [key: string]: string };
  sleepQuality: { [key: string]: string };
  vigorousDays: number;
  vigorousHours: number;
  vigorousMinutes: number;
  moderateDays: number;
  moderateHours: number;
  moderateMinutes: number;
  walkDays: number;
  walkHours: number;
  walkMinutes: number;
  sittingHours: number;
  sittingMinutes: number;
  weight: number;
  height: number;
  diabetes: string;
  smoker: string;
}

const sections = {
  mediterraneanDiet: [
    'Use olive oil as main cooking fat?',
    'Eat ≥2 servings of vegetables daily?',
    'Eat ≥3 servings of fruit daily?',
    'Eat fish/seafood ≥3 times/week?',
    'Eat legumes ≥2 times/week?',
    'Eat nuts ≥3 times/week?',
    'Limit red/processed meats?',
    'Choose whole grains?',
    'Avoid sugary snacks/drinks?',
    'Drink 6-8 glasses water/day?',
  ],
  sleepQuality: [
    'Trouble falling asleep >30 mins?',
    'Wake up >1 time/night?',
    'Restless/disturbed sleep?',
    'Poor sleep quality?',
    'Daytime fatigue?',
  ],
  healthMetrics: ['Weight (kg)', 'Height (cm)', 'Diabetes?', 'Smoker?'],
};

const CogniTrack: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      mediterraneanDiet: {},
      sleepQuality: {},
      vigorousDays: 0,
      vigorousHours: 0,
      vigorousMinutes: 0,
      moderateDays: 0,
      moderateHours: 0,
      moderateMinutes: 0,
      walkDays: 0,
      walkHours: 0,
      walkMinutes: 0,
      sittingHours: 0,
      sittingMinutes: 0,
      weight: 0,
      height: 0,
      diabetes: '',
      smoker: '',
    },
  });
  const [report, setReport] = useState<string>('');
  const [finalScore, setFinalScore] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const calculateTotalScore = (data: FormData) => {
    try {
      if (Object.keys(data.mediterraneanDiet).length < 10) {
        setReport(
          `<div class="bg-red-500 text-white p-4 rounded-lg text-center">
            <h3 class="text-lg font-bold">❌ Please answer all Mediterranean Diet questions.</h3>
          </div>`
        );
        setFinalScore(0);
        return;
      }
      if (Object.keys(data.sleepQuality).length < 5) {
        setReport(
          `<div class="bg-red-500 text-white p-4 rounded-lg text-center">
            <h3 class="text-lg font-bold">❌ Please answer all Sleep Quality questions.</h3>
          </div>`
        );
        setFinalScore(0);
        return;
      }

      const medDietScore = Object.values(data.mediterraneanDiet).reduce(
        (sum, answer) => sum + (answer === 'Yes' ? 1 : 0),
        0
      );
      const sleepScore = Object.values(data.sleepQuality).reduce(
        (sum, answer) => sum + (answer === 'Yes' ? 2 : 0),
        0
      );

      const vigorous =
        (data.vigorousDays || 0) * ((data.vigorousHours || 0) * 60 + (data.vigorousMinutes || 0));
      const moderate =
        (data.moderateDays || 0) * ((data.moderateHours || 0) * 60 + (data.moderateMinutes || 0));
      const walking =
        (data.walkDays || 0) * ((data.walkHours || 0) * 60 + (data.walkMinutes || 0));

      const met = vigorous * 8.0 + moderate * 4.0 + walking * 3.3;
      let activityScore = 0;
      if (met >= 6000) activityScore = 10;
      else if (met >= 3000) activityScore = 9;
      else if (met >= 1500) activityScore = 7;
      else if (met >= 600) activityScore = 5;
      else if (met >= 100) activityScore = 3;

      const bmi = data.weight / ((data.height / 100) ** 2);
      const bmiScore = bmi >= 30 ? 10 : 0;

      const riskScore = (data.diabetes === 'Yes' ? 5 : 0) + (data.smoker === 'Yes' ? 5 : 0);

      const totalScore = medDietScore + sleepScore + activityScore + bmiScore + riskScore;
      const finalScore = Math.round((totalScore / 50) * 10);

      let statusColor = '#e74c3c';
      let statusTitle = 'High Alzheimer\'s Risk - Take Action';
      let statusIcon = <AlertOctagon className="inline-block mr-2" />;
      if (finalScore >= 7) {
        statusColor = '#2ecc71';
        statusTitle = 'Low Alzheimer\'s Risk - Excellent';
        statusIcon = <Shield className="inline-block mr-2" />;
      } else if (finalScore >= 4) {
        statusColor = '#f1c40f';
        statusTitle = 'Moderate Risk - Needs Improvement';
        statusIcon = <AlertTriangle className="inline-block mr-2" />;
      }

      const categories = {
        Diet: {
          score: medDietScore,
          max: 10,
          advice: {
            good: ['Maintain your healthy eating habits!', 'Increase fish and olive oil consumption'],
            bad: ['Reduce red meat intake', 'Choose whole grains over refined carbs'],
          },
        },
        Sleep: {
          score: sleepScore,
          max: 10,
          advice: {
            good: ['Maintain consistent sleep schedule'],
            bad: ['Avoid caffeine before bedtime', 'Limit screen time before sleep'],
          },
        },
        Activity: {
          score: activityScore,
          max: 10,
          advice: {
            good: ['Great activity level! Keep it up!'],
            bad: ['Aim for 150 mins exercise/week', 'Take walking breaks regularly'],
          },
        },
        Health: {
          score: 20 - (bmiScore + riskScore),
          max: 20,
          advice: {
            good: ['Maintain healthy weight'],
            bad: ['Monitor blood sugar levels', 'Consider smoking cessation programs'],
          },
        },
      };

      const categoryCards = Object.entries(categories).map(([name, data]) => {
        const percent = (data.score / data.max) * 100;
        const color = percent >= 60 ? '#2ecc71' : percent >= 40 ? '#f1c40f' : '#e74c3c';
        const tips = percent >= 60 ? data.advice.good : data.advice.bad.slice(0, 2);

        return `
          <div class="bg-white p-4 rounded-lg mb-4 shadow">
            <h3 class="text-lg font-semibold text-[${color}]">${name}</h3>
            <div class="bg-gray-200 h-2 rounded-full">
              <div class="h-full rounded-full" style="width: ${percent}%; background-color: ${color};"></div>
            </div>
            <ul class="list-disc pl-5 mt-2">
              ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('');

      const reportHtml = `
        <div class="p-5 rounded-lg bg-gray-50">
          <h2 class="text-center text-2xl font-bold mb-5" style="color: ${statusColor};">
            ${statusIcon}
            ${statusTitle}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            ${categoryCards}
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2">General Recommendations:</h3>
            <ul class="list-disc pl-5">
              <li>Maintain regular physical activity</li>
              <li>Follow a balanced Mediterranean diet</li>
              <li>Ensure 7-8 hours of quality sleep</li>
              <li>Monitor weight and blood sugar levels</li>
            </ul>
          </div>
        </div>
      `;

      setReport(reportHtml);
      setFinalScore(finalScore);
    } catch (error) {
      setReport(
        `<div class="bg-red-500 text-white p-4 rounded-lg text-center">
          <h3 class="text-lg font-bold flex items-center justify-center">
            <AlertCircle className="mr-2" /> Calculation Error
          </h3>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p>Please verify all input values</p>
        </div>`
      );
      setFinalScore(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-start justify-center py-12 px-4">
      <div className="flex relative">
        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-12 left-0 z-10 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          {isSidebarOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Sidebar Content */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-r-2xl shadow-xl border border-green-200 transition-all duration-300 ${
            isSidebarOpen ? "w-64 ml-14" : "w-0 ml-14"
          } h-[calc(100vh-6rem)] overflow-hidden mt-12`}
        >
          <div className={`p-4 overflow-y-auto h-full text-gray-700 ${isSidebarOpen ? "block" : "hidden"}`}>
            <h2 className="text-lg font-semibold text-green-800 mb-3">
              How CogniTrack Works
            </h2>
            <p className="text-sm">
              CogniTrack assesses your risk of Alzheimer’s disease based on lifestyle and health factors. Here’s how it works:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>
                <strong>Data Collection:</strong> You answer questions about your diet, sleep, physical activity, and health metrics.
              </li>
              <li>
                <strong>Risk Calculation:</strong> Your inputs are scored based on Mediterranean diet adherence, sleep quality, activity levels, BMI, and risk factors like diabetes and smoking.
              </li>
              <li>
                <strong>Personalized Report:</strong> A detailed report categorizes your risk (Low, Moderate, High) and provides tailored advice to improve your brain health.
              </li>
              <li>
                <strong>Privacy:</strong> All calculations are performed locally, ensuring your data remains private.
              </li>
            </ul>
            <p className="mt-3 text-sm">
              This tool is for informational purposes only and should not replace professional medical advice. Always consult a healthcare provider for a comprehensive evaluation.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-green-200 mt-12"
          style={{ marginBottom: "80px" }}
        >
          <div className="flex justify-center mb-6">
            <img
              src="/earlymed-uploads/cognitrack.png"
              alt="CogniTrack Logo"
              className="h-24"
            />
          </div>
          <p className="text-gray-600 text-center mb-8">
            Answer the following questions to assess your Alzheimer’s risk. Your responses will help generate a personalized health report.
          </p>

          <form onSubmit={handleSubmit(calculateTotalScore)} className="space-y-6">
            {/* Mediterranean Diet */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Mediterranean Diet (Yes/No)</h3>
              {sections.mediterraneanDiet.map((question, index) => (
                <div key={question} className="mb-4">
                  <Label className="text-green-700 font-medium mb-2">{question}</Label>
                  <Controller
                    name={`mediterraneanDiet.q${index}`}
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.mediterraneanDiet?.[`q${index}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mediterraneanDiet[`q${index}`]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Sleep Quality */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Sleep Quality Evaluation</h3>
              {sections.sleepQuality.map((question, index) => (
                <div key={question} className="mb-4">
                  <Label className="text-green-700 font-medium mb-2">{question}</Label>
                  <Controller
                    name={`sleepQuality.q${index}`}
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.sleepQuality?.[`q${index}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sleepQuality[`q${index}`]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Physical Activity */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-green-700 mb-4">International Physical Activity Questionnaire (IPAQ – Short Form)</h3>

              <div className="mb-6">
                <h4 className="text-green-700 font-medium">1. Vigorous Physical Activity</h4>
                <p className="text-sm text-gray-600 mb-2">
                  During the last 7 days, on how many days did you do vigorous physical activities (e.g., heavy lifting, aerobics, fast bicycling)?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="vigorousDays"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 7, message: 'Maximum 7' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Days per week</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={7}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.vigorousDays && (
                          <p className="text-red-500 text-sm mt-1">{errors.vigorousDays.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="vigorousHours"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Hours per day</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.vigorousHours && (
                          <p className="text-red-500 text-sm mt-1">{errors.vigorousHours.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="vigorousMinutes"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 59, message: 'Maximum 59' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Minutes per hour</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={59}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.vigorousMinutes && (
                          <p className="text-red-500 text-sm mt-1">{errors.vigorousMinutes.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-green-700 font-medium">2. Moderate Physical Activity</h4>
                <p className="text-sm text-gray-600 mb-2">
                  During the last 7 days, on how many days did you do moderate physical activities (e.g., carrying light loads, cycling at regular pace)?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="moderateDays"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 7, message: 'Maximum 7' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Days per week</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={7}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.moderateDays && (
                          <p className="text-red-500 text-sm mt-1">{errors.moderateDays.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="moderateHours"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Hours per day</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.moderateHours && (
                          <p className="text-red-500 text-sm mt-1">{errors.moderateHours.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="moderateMinutes"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 59, message: 'Maximum 59' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Minutes per hour</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={59}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.moderateMinutes && (
                          <p className="text-red-500 text-sm mt-1">{errors.moderateMinutes.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-green-700 font-medium">3. Walking</h4>
                <p className="text-sm text-gray-600 mb-2">
                  During the last 7 days, on how many days did you walk for at least 10 minutes at a time?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Controller
                    name="walkDays"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 7, message: 'Maximum 7' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Days per week</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={7}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.walkDays && (
                          <p className="text-red-500 text-sm mt-1">{errors.walkDays.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="walkHours"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Hours per day</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.walkHours && (
                          <p className="text-red-500 text-sm mt-1">{errors.walkHours.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="walkMinutes"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 59, message: 'Maximum 59' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Minutes per hour</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={59}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.walkMinutes && (
                          <p className="text-red-500 text-sm mt-1">{errors.walkMinutes.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-green-700 font-medium">4. Sitting Time</h4>
                <p className="text-sm text-gray-600 mb-2">
                  During the last 7 days, how much time did you spend sitting on a weekday?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="sittingHours"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Hours per day</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.sittingHours && (
                          <p className="text-red-500 text-sm mt-1">{errors.sittingHours.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="sittingMinutes"
                    control={control}
                    rules={{ min: { value: 0, message: 'Minimum 0' }, max: { value: 59, message: 'Maximum 59' } }}
                    render={({ field }) => (
                      <div>
                        <Label className="text-green-700 font-medium mb-2">Minutes per hour</Label>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          min={0}
                          max={59}
                          className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                        />
                        {errors.sittingMinutes && (
                          <p className="text-red-500 text-sm mt-1">{errors.sittingMinutes.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Health Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="weight"
                  control={control}
                  rules={{ required: 'Weight is required', min: { value: 0, message: 'Minimum 0' } }}
                  render={({ field }) => (
                    <div>
                      <Label className="text-green-700 font-medium mb-2">Weight (kg)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                      />
                      {errors.weight && (
                        <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="height"
                  control={control}
                  rules={{ required: 'Height is required', min: { value: 0, message: 'Minimum 0' } }}
                  render={({ field }) => (
                    <div>
                      <Label className="text-green-700 font-medium mb-2">Height (cm)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all"
                      />
                      {errors.height && (
                        <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="diabetes"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div>
                      <Label className="text-green-700 font-medium mb-2">Diabetes?</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.diabetes && (
                        <p className="text-red-500 text-sm mt-1">{errors.diabetes.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="smoker"
                  control={control}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <div>
                      <Label className="text-green-700 font-medium mb-2">Smoker?</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="p-3 rounded-lg bg-white/50 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition-all">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.smoker && (
                        <p className="text-red-500 text-sm mt-1">{errors.smoker.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all bg-green-600 hover:bg-green-700 hover:shadow-xl glow"
            >
              Generate Risk Report
            </button>
          </form>

          {report && (
            <div className="mt-8 p-6 bg-white/70 rounded-xl shadow-lg border border-green-200">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Your Alzheimer’s Risk Assessment Report
              </h2>
              <div dangerouslySetInnerHTML={{ __html: report }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .glow {
          box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
          transition: box-shadow 0.3s ease;
        }
        .glow:hover {
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.8);
        }
      `}</style>
    </div>
  );
};

export default CogniTrack;