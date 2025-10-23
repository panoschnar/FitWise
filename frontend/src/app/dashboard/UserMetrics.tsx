"use client";

import { Card, CardContent, Grid, Typography, Chip, Box } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import PercentIcon from "@mui/icons-material/Percent";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { calculateBMI, getBMICategoryInfo } from "../utils/constants";
import Chart from "../components/Chart";
import { IUser } from "../utils/interfaces";

interface latestUserMetricssProps {
  weight?: number | null;
  height?: number | null;
  bodyFat?: number | null;
}
export default function latestUserMetricss(fullUser: IUser) {
  // Get last metrics entry (latest)
  const latestUserMetrics = fullUser.metrics?.[fullUser.metrics.length - 1] ?? {
    weight: 0,
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
  const weightData: number[] =
    fullUser.metrics?.map((m) => m.weight ?? 0) ?? [];

  const bodyFatData: (number | null)[] =
    fullUser.metrics?.map((m) =>
      m.bodyFat !== undefined ? m.bodyFat : null
    ) ?? [];
  const cards = [
    {
      title: "Weight",
      value: latestUserMetrics.weight ?? "-",
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      unit: "kg",
      bg: "#be95be",
    },
    {
      title: "Height",
      value: fullUser.height ?? "-",
      icon: <HeightIcon sx={{ fontSize: 40 }} />,
      unit: "cm",
      bg: "#be95be",
    },
    ...(latestUserMetrics.bodyFat
      ? [
          {
            title: "Body Fat",
            value: latestUserMetrics.bodyFat ?? "-",
            icon: <PercentIcon sx={{ fontSize: 40 }} />,
            unit: "%",
            bg: "#be95be",
          },
        ]
      : []),
  ];

  const bmiCard = {
    title: "BMI",
    icon: <SettingsAccessibilityIcon sx={{ fontSize: 40 }} />,
    bg: "linear-gradient(135deg, #be95be, #aaefda)",
  };
  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: 3,
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)",
        mb: 4,
        padding: 4,
        border: "1px solid #aaefda",
      }}
    >
      <Grid container spacing={3} mb={4}>
        {cards.map((c) => (
          <Grid
            key={c.title}
            container
            spacing={3}
            mb={4}
            component="div"
            size={{ xs: 12, sm: 6, md: "grow" }}
          >
            <Card
              sx={{
                background: c.bg,
                color: "#fff",
                textAlign: "center",
                width: "100%",
                minWidth: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                "&:hover": { boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);" },
              }}
            >
              <CardContent>
                {c.icon}
                <Typography variant="h6" mt={1}>
                  {c.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {c.value} {c.unit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* BMI Card */}
        <Grid
          container
          spacing={3}
          mb={4}
          component="div"
          size={{ xs: 12, sm: 6, md: "grow" }}
        >
          <Card
            sx={{
              background: bmiCard.bg,
              color: "#fff",
              textAlign: "center",
              width: "100%",
              minWidth: 100,
              "&:hover": { boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.45);" },
            }}
          >
            <CardContent>
              {bmiCard.icon}
              <Typography variant="h6" mt={1}>
                BMI
              </Typography>
              {latestUserMetrics.weight && fullUser.height ? (
                (() => {
                  const bmi = calculateBMI(
                    latestUserMetrics.weight,
                    fullUser.height
                  );
                  if (!bmi) return <Typography>-</Typography>;
                  const category = getBMICategoryInfo(bmi);
                  return (
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {bmi.toFixed(1)}
                      </Typography>
                      <Chip
                        label={category.label}
                        sx={{
                          mt: 1,
                          background: category.color,
                          color:
                            category.label === "Overweight" ||
                            category.label === "Obese"
                              ? "#fff"
                              : undefined,
                        }}
                      />
                    </Box>
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
          {bodyFatData.some((v) => v !== null) && (
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
    </Box>
  );
}
