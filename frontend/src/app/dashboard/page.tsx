"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import PercentIcon from "@mui/icons-material/Percent";
import WeeklyDietTable from "../components/WeeklyDietTable";
import { useAuth } from "../hooks/useAuth";
import { useUserDetails } from "../hooks/useUserDetails";
import {
  calculateBMI,
  calculateDailyCalories,
  displayGoalType,
  getBMICategoryInfo,
} from "../utils/constants";
import TopBar from "../components/TopBar";
import Chart from "../components/Chart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddMetricModal from "../components/AddMetricModal";
import Loader from "../components/Loader";
import WeeklyExerciseTable from "../components/WeeklyExerciseTable";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AiButton from "./AiButton";
import UserMetrics from "./UserMetrics";
function ErrorScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" color="error">
        Failed to load user data.
      </Typography>
    </Box>
  );
}

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const { data: fullUser, isLoading, isError } = useUserDetails(user?.id);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const [openMetricDialog, setOpenMetricDialog] = useState(false);
  // Loader state for AI plan generation
  const [aiLoading, setAiLoading] = useState(false);
  const [aiProgress, setAiProgress] = useState<number>(0);

  // Handle logout first
  const handleLogout = () => {
    setLoggingOut(true);

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setTimeout(() => {
          router.replace("/");
        }, 1000);
      },
      onError: () => {
        alert("Failed to log out.");
        setLoggingOut(false);
      },
    });
  };

  // ✅ Render logout screen before anything else
  if (loggingOut) {
    return <Loader message="Logging out..." />;
  }

  // ✅ Only now handle loading/error once logout is done
  if (isLoading || !fullUser) {
    return <Loader message="Loading your data..." />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  console.log(fullUser);

  const nutrition = fullUser?.myPlans?.[0]?.nutritionSummary ?? [];

  return (
    <>
      <TopBar onLogout={handleLogout} />
      {/* Full-dashboard Loader */}
      {aiLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.8)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader message={`${aiProgress}%`}/>
        </Box>
      )}
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          my: 5,
          px: { lg: 15, sm: 6, xs: 2 },
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          sx={{
            fontWeight: "bold",
            color: "#aaefda",
          }}
        >
          Welcome, {fullUser.name}
        </Typography>
        <Typography>
          {" "}
          Remember your goal to{" "}
          <b>
            {" "}
            {displayGoalType(
              fullUser?.goals?.goalType ? fullUser.goals.goalType : ""
            )}
          </b>
          !
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#be95be" }}
            onClick={() => setOpenMetricDialog(true)}
          >
            Add Metrics
          </Button>
        </Box>

        {/* User Info Cards */}
        <UserMetrics {...fullUser} />

        {/* Diet Plan */}
        {fullUser?.myPlans?.length ? (
          <WeeklyDietTable
            diet={fullUser.myPlans[fullUser.myPlans.length - 1].dietPlan}
            nutrition={nutrition}
          />
        ) : null}

        {/* Exercise Plan */}
        {fullUser?.myPlans?.length ? (
          <WeeklyExerciseTable
            exercisePlan={fullUser.myPlans[0].exercisePlan}
            nutrition={nutrition}
          />
        ) : null}
      </Box>
      {!fullUser?.myPlans?.length && (
        <AiButton
          userId={fullUser.id}
          setLoading={setAiLoading}
          setProgress={setAiProgress}
        />
      )}

      <AddMetricModal
        open={openMetricDialog}
        onClose={() => setOpenMetricDialog(false)}
        userId={fullUser.id}
      />
    </>
  );
}
