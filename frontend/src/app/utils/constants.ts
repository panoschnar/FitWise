import { DailySummary, ExercisePlan } from "./interfaces";

export const workoutTypes = [
  { value: "CROSS_TRAINING", label: "Cross-training" },
  { value: "FUNCTIONAL_TRAINING", label: "Functional training" },
  { value: "PILATES", label: "Pilates" },
  { value: "AEROBIC", label: "Aerobic" },
  { value: "YOGA", label: "Yoga" },
  { value: "WEIGHT_LIFTING", label: "Weight lifting" },
  { value: "RUNNING", label: "Running" },
  { value: "DANCE", label: "Dance" },
  { value: "SWIMMING", label: "Swimming" },
  { value: "CALISTHENICS", label: "Calisthenics" }
];

export const goalTypes = [
  { value: "LOSE", label: "Lose Weight" },
  { value: "GAIN", label: "Gain Muscle" },
  { value: "MAINTAIN", label: "Maintain" },
  { value: "BODYFAT", label: "Reduce Body Fat %" },
  { value: "MUSCLE", label: "Increase Lean Muscle %" },
  { value: "ENDURANCE", label: "Improve Endurance" },
  { value: "STRENGTH", label: "Increase Strength" },
  { value: "FLEXIBILITY", label: "Improve Flexibility" }
];

export const dietTypes = [
  { value: "OMNIVORE", label: "Omnivore" },
  { value: "VEGETARIAN", label: "Vegetarian" },
  { value: "VEGAN", label: "Vegan" },
  { value: "PESCATARIAN", label: "Pescatarian" },

];


export const displayGoalType = (value: string): string => {
  const goal = goalTypes.find((goal) => goal.value === value);
  return goal ? goal.label : "Unknown Goal";
};



interface CaloriesChartData {
  labels: string[];
  intake: number[];
  burned: number[];
}

export function calculateDailyCalories(
  nutrition: DailySummary[],
  exercisePlan: ExercisePlan[]
): CaloriesChartData {
  const labels: string[] = [];
  const intake: number[] = [];
  const burned: number[] = [];

  // Approximate calories burned per exercise type per duration
  const burnRates: Record<string, number> = {
    CARDIO: 10, // kcal per min
    STRENGTH: 8,
    YOGA: 4,
    PILATES: 5,
    FUNCTIONAL_TRAINING: 9,
    CROSS_TRAINING: 10,
    RUNNING: 11,
    DANCE: 7,
    SWIMMING: 10,
    CALISTHENICS: 9,
    AEROBIC: 8,
  };

  exercisePlan.forEach((dayPlan, idx) => {
    labels.push(dayPlan.day);

    // Intake
    const dailyNutrition = nutrition.find((n) => n.day === dayPlan.day);
    intake.push(dailyNutrition?.calories ?? 0);

    // Burned calories
    if (dayPlan.restDay) {
      burned.push(0);
    } else {
      const dailyBurn = dayPlan.exercises.reduce((sum, ex) => {
        const rate = burnRates[ex.type?.toUpperCase()] ?? 6; 
        const duration = ex.durationMin ?? (ex.sets && ex.reps ? ex.sets * ex.reps * 0.5 : 30);
        return sum + rate * duration;
      }, 0);
      burned.push(dailyBurn);
    }
  });

  return { labels, intake, burned };
}

export function calculateBMI(weightKg: number, heightCm: number): number | null {
  if (!weightKg || !heightCm) return null;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return Math.round(bmi * 10) / 10; 
}

export function getBMICategoryInfo(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "#bbf3d3" }; // blue
  if (bmi < 25) return { label: "Normal", color: "#aaefda" }; // green
  if (bmi < 30) return { label: "Overweight", color: "#ac4c68" }; // orange
  return { label: "Obese", color: "#b02d53" }; // red
}