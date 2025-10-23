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

  // ✅ Handle logout first
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
  // Get last metrics entry (latest)
  const userMetric = fullUser.metrics?.[fullUser.metrics.length - 1] ?? {
    weight: 0,
    height: 0,
    bodyFat: null,
  };

  // Generate labels from metric creation dates
  const metricLabels =
    fullUser.metrics?.map((m) =>
      new Date(m.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    ) ?? [];

  const nutrition = fullUser?.myPlans?.[0]?.nutritionSummary ?? [];
  const weightData: number[] =
    fullUser.metrics?.map((m) => m.weight ?? 0) ?? [];

  const bodyFatData: number[] =
    fullUser.metrics?.map((m) => m.bodyFat ?? 0).filter((v) => v !== null) ??
    [];
  const exercisePlan = fullUser?.myPlans?.[0]?.exercisePlan ?? [];
  const {
    labels: combinedLabels,
    intake: intakeAligned,
    burned: burnedAligned,
  } = calculateDailyCalories(nutrition, exercisePlan);
  return (
    <>
      <TopBar onLogout={handleLogout} />
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
        <Grid container spacing={3} mb={4}>
          {/* Weight Card*/}
          <Grid
            container
            spacing={3}
            mb={4}
            component="div"
            size={{ xs: 12, sm: 6, md: "grow" }}
          >
            <Card
              sx={{
                background: "#be95be",
                color: "#fff",
                textAlign: "center",
                width: "100%",
                minWidth: 100,
                "&:hover": {
                  boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);",
                },
              }}
            >
              <CardContent>
                <FitnessCenterIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" mt={1}>
                  Weight
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {userMetric.weight} kg
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Height Card*/}
          <Grid
            container
            spacing={3}
            mb={4}
            component="div"
            size={{ xs: 12, sm: 6, md: "grow" }}
          >
            <Card
              sx={{
                background: "#be95be",
                color: "#fff",
                textAlign: "center",
                width: "100%",
                minWidth: 100,

                "&:hover": {
                  boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);",
                },
              }}
            >
              <CardContent>
                <HeightIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" mt={1}>
                  Height
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {fullUser.height ?? "-"} cm
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Body Fat Card*/}
          {userMetric.bodyFat && (
            <Grid
              container
              spacing={3}
              mb={4}
              component="div"
              size={{ xs: 12, sm: 6, md: "grow" }}
            >
              <Card
                sx={{
                  background: "#be95be",
                  color: "#fff",
                  textAlign: "center",
                  width: "100%",
                  minWidth: 100,

                  "&:hover": {
                    boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);",
                  },
                }}
              >
                <CardContent>
                  <PercentIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h6" mt={1}>
                    Body Fat
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {userMetric?.bodyFat ?? "-"} %
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Goal Card*/}
          <Grid
            container
            spacing={3}
            mb={4}
            component="div"
            size={{ xs: 12, sm: 6, md: "grow" }}
          >
            <Card
              sx={{
                background: "linear-gradient(135deg, #be95be, #aaefda)",
                color: "#fff",
                textAlign: "center",
                width: "100%",
                minWidth: 100,
                "&:hover": {
                  boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);",
                },
              }}
            >
              <CardContent>
                <SettingsAccessibilityIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" mt={1}>
                  BMI
                </Typography>
                {userMetric?.weight && fullUser.height ? (
                  (() => {
                    const bmi = calculateBMI(
                      userMetric.weight,
                      fullUser.height
                    );
                    if (!bmi) return <Typography>-</Typography>;
                    const category = getBMICategoryInfo(bmi);
                    return (
                      <>
                        <Typography variant="h5" fontWeight="bold">
                          {bmi.toFixed(1)}
                        </Typography>
                        <Chip
                          label={category.label}
                          sx={{
                            mt: 1,
                            background: `${category.color}`,
                            color: `${
                              category.label === "Overweight" ||
                              (category.label === "Obese" && "#fff")
                            }`,
                          }}
                        />
                      </>
                    );
                  })()
                ) : (
                  <Typography>-</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Weight Progress Chart */}
            <Chart
              title="Weight Progress"
              data={weightData}
              type="line"
              labels={metricLabels}
              yAxisName="Weight (kg)"
              lineColor="#be95be"
              areaGradient={["#aaefda", "#d1c6ff"]}
            />
          </Grid>

          {/* Body Fat  Chart (show only if data exists)  */}
          <Grid size={{ xs: 12, md: 6 }}>
            {bodyFatData.length > 0 && (
              <Chart
                title="Body Fat Progress"
                type="line"
                data={bodyFatData}
                labels={metricLabels}
                yAxisName="Body Fat (%)"
                lineColor="#3ab8ab"
                areaGradient={["#d1c6ff", "#aaefda"]}
              />
            )}
          </Grid>
        </Grid>

        {/* Diet Table */}
        {fullUser?.myPlans?.length ? (
          <WeeklyDietTable
            diet={fullUser.myPlans[fullUser.myPlans.length - 1].dietPlan}
          />
        ) : null}

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* 1️⃣ Pie Chart — Macros Breakdown (avg weekly) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chart
              type="pie"
              title="Average Weekly Macros"
              data={[
                {
                  name: "Protein",
                  value: nutrition.reduce((a, b) => a + b.protein, 0) / 7,
                },
                {
                  name: "Carbs",
                  value: nutrition.reduce((a, b) => a + b.carbs, 0) / 7,
                },
                {
                  name: "Fats",
                  value: nutrition.reduce((a, b) => a + b.fats, 0) / 7,
                },
              ]}
              gradientColors={["#be95be", "#aaefda", "#d1c6ff"]}
            />
          </Grid>
          {/* 2️⃣ Bar Chart — Daily Calories */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Chart
              type="bar"
              title="Daily Calories"
              labels={nutrition.map((d) => d.day)}
              data={nutrition.map((d) => d.calories)}
              yAxisName="kcal"
              // lineColor="#be95be"
              gradientColors={["#be95be", "#aaefda"]}
            />
          </Grid>
        </Grid>

        {/* Exercise Table */}
        {fullUser?.myPlans?.length ? (
          <WeeklyExerciseTable
            exercisePlan={fullUser.myPlans[0].exercisePlan}
          />
        ) : null}

        {/* Calories Burned Bar Chart */}
        <Chart
          type="bar"
          title="Calories Intake vs Burned"
          labels={combinedLabels}
          data={[
            {
              name: "Intake",
              type: "bar",
              data: intakeAligned,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "#be95be" },
                    { offset: 1, color: "#aaefda" },
                  ],
                },
                barBorderRadius: [6, 6, 0, 0], // rounded top corners
              },
            },
            {
              name: "Burned",
              type: "bar",
              data: burnedAligned,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "#aaefda" },
                    { offset: 1, color: "#63ad96" },
                  ],
                },
                barBorderRadius: [6, 6, 0, 0],
              },
            },
          ]}
        />
      </Box>
      {!fullUser?.myPlans?.length && <AiButton />}

      <AddMetricModal
        open={openMetricDialog}
        onClose={() => setOpenMetricDialog(false)}
        userId={fullUser.id}
      />
    </>
  );
}
