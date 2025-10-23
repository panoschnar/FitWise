export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt?: Date;
  updatedAt?: Date;
  height: number | null;
  birthDate: Date | string | null;
  gender: "MALE" | "FEMALE" | "OTHER" | "";
  metrics?: IMetrics[];
 preferences?: IPreferences;
  goals?: IGoals;
  myPlans?: IUserPlans[] | null;
}

export interface IMetrics {
  weight: number | null;
  bodyFat?: number | null;
  createdAt: Date;
}

export interface IPreferences {
  dietType: string;
  allergies: string[];
  dislikes: string[];
  workoutStyle: string[];
}

export interface IGoals {
  targetWeight: number | null;
  goalType: string;
  weeklyChange?: number | null;
}


export interface DietPlan {
  day: string; // e.g. "Monday"
  meals: {
    name: string; // e.g. "Breakfast"
    item: string; // e.g. "Oats + berries"
    grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }[];
}

export interface ExercisePlan {
  day: string; // e.g. "Monday"
  exercises: {
    name: string; // e.g. "Squats"
    type: string; // e.g. "STRENGTH" | "CARDIO"
    durationMin?: number;
    sets?: number;
    reps?: number;
  }[];
  restDay: boolean;
}

export interface DailySummary {
  day: string; // e.g. "Monday"
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface IUserPlans {
  dietPlan: DietPlan[];
  exercisePlan: ExercisePlan[];
  nutritionSummary: DailySummary[];
}
