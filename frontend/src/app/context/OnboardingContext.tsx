import { createContext, useContext, useState, ReactNode } from "react";
import { IMetrics, IPreferences, IGoals, IUser } from "../utils/interfaces";

interface OnboardingContextProps {
  metrics: IMetrics;
  setMetrics: (metrics: IMetrics) => void;
  preferences: IPreferences;
  setPreferences: (preferences: IPreferences) => void;
  goals: IGoals;
  setGoals: (goals: IGoals) => void;
  constantMetrics: any;
  setConstantMetrics: (goals: any) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
  userData: {
    metrics?: IMetrics[];
    preferences?: IPreferences;
    goals?: IGoals;
  };
}

export function OnboardingProvider({ children, userData }: ProviderProps) {
  // Pick last metric or default
  const lastMetric: IMetrics = userData?.metrics?.[
    userData.metrics.length - 1
  ] ?? {
    weight: null,
    // height: null,
    // age: null,
    // gender: "" as "MALE" | "FEMALE" | "OTHER" | "",
    bodyFat: null,
    createdAt: new Date(),
  };

  const [metrics, setMetrics] = useState<IMetrics>(lastMetric);
  const [preferences, setPreferences] = useState<IPreferences>(
    userData?.preferences ?? {
      dietType: "",
      allergies: [],
      dislikes: [],
      workoutStyle: [],
    }
  );
  const [goals, setGoals] = useState<IGoals>(
    userData?.goals ?? { goalType: "", targetWeight: null, weeklyChange: null }
  );
  const [constantMetrics, setConstantMetrics] = useState<Partial<IUser>>({
    height: null,
    birthDate: null,
    gender: "" as "MALE" | "FEMALE" | "OTHER" | "",
  });
  const reset = () => {
    setMetrics(lastMetric);
    setPreferences(
      userData.preferences ?? {
        dietType: "",
        allergies: [],
        dislikes: [],
        workoutStyle: [],
      }
    );
    setGoals(
      userData.goals ?? {
        goalType: "",
        targetWeight: null,
        weeklyChange: null,
      }
    );
    setConstantMetrics({
    height: null,
    birthDate: null,
    gender: "" as "MALE" | "FEMALE" | "OTHER" | "",
  })
  };

  return (
    <OnboardingContext.Provider
      value={{
        metrics,
        setMetrics,
        preferences,
        setPreferences,
        goals,
        setGoals,
        constantMetrics,
        setConstantMetrics,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
}
