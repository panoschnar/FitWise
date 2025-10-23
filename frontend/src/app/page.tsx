"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AuthModal from "./components/AuthModal";
import OnboardingModal from "./onboarding/OnboardingModal";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";
import { useUserDetails } from "./hooks/useUserDetails";
import { logoIcon } from "./utils/icons";
function getFirstIncompleteStep(user: any): number | null {
  if (!user?.metrics) return 0;
  if (!user?.preferences) return 1;
  if (!user?.goals) return 2;
  return null;
}

export default function LandingPage() {
  const { user } = useAuth();
  const { data: fullUser } = useUserDetails(user?.id);
  const [authOpen, setAuthOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const router = useRouter();

  /**
   * When the user logs in, check if they have all onboarding data (metrics, preferences, goals).
   * If anything is missing, open the onboarding modal at the correct step.
   */
  useEffect(() => {
    if (!fullUser) return;

    const step = getFirstIncompleteStep(user);

    if (step !== null) {
      setInitialStep(step);
      setOnboardingOpen(true);
    } else {
      router.push("/dashboard");
    }
  }, [fullUser, router]);

  /**
   * Handle the "Start" button click:
   * - If not logged in → open auth modal
   * - If logged in but onboarding incomplete → open onboarding modal
   * - If all done → go to dashboard
   */
  const handleStartClick = () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }

    const step = getFirstIncompleteStep(user);

    if (step !== null) {
      setInitialStep(step);
      setOnboardingOpen(true);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/fitwise_bg.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        textAlign: "center",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {logoIcon}
      <Typography
        variant="h2"
        gutterBottom
        sx={{ textShadow: "0 4px 5px #754575" }}
      >
        Your journey, your pace, your progress
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Track your metrics, get personalized recommendations, and achieve your
        goals.
      </Typography>
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #be95be, #d1c6ff)",
          "&:hover": {
            background: "linear-gradient(135deg, #d1c6ff, #be95be)",
          },
        }}
        onClick={handleStartClick}
      >
        Start
      </Button>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => setOnboardingOpen(true)}
      />
      {fullUser && (
        <OnboardingModal
          open={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          initialStep={initialStep}
          userData={fullUser}
        />
      )}
    </Box>
  );
}
