"use client";

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import { DailySummary, ExercisePlan } from "../utils/interfaces";
import Chart from "./Chart";
import { calculateDailyCalories } from "../utils/constants";

type WeeklyExerciseTableProps = {
  exercisePlan: ExercisePlan[];
  title?: string;
  nutrition?: DailySummary[];
};

export default function WeeklyExerciseTable({
  exercisePlan,
  title = "Weekly Exercise Plan",
  nutrition = [],
}: WeeklyExerciseTableProps) {
  const days = exercisePlan.map((d) => d.day);
  const {
    labels: combinedLabels,
    intake: intakeAligned,
    burned: burnedAligned,
  } = calculateDailyCalories(nutrition, exercisePlan);
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)",
        mt: 4,
        padding: 2,
        background:
          "linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #aaefda, #be95be) border-box",
        border: "3px solid transparent",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#be95be" }}
        >
          {title}
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Exercise</TableCell>
                {days.map((day) => (
                  <TableCell key={day} sx={{ fontWeight: "bold" }}>
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {["Exercise 1", "Exercise 2", "Exercise 3"].map((_, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>{`Ex ${
                    idx + 1
                  }`}</TableCell>
                  {exercisePlan.map((dayPlan) => {
                    const exercise = dayPlan.exercises[idx];
                    return (
                      <TableCell key={dayPlan.day + idx}>
                        {exercise
                          ? `${exercise.name} ${
                              exercise.reps ? `(${exercise.reps} reps)` : ""
                            } ${exercise.sets ? `x${exercise.sets}` : ""} ${
                              exercise.durationMin
                                ? `(${exercise.durationMin} min)`
                                : ""
                            }`
                          : dayPlan.restDay
                          ? "Rest"
                          : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Box sx={{ mt: 2, px: 2 }}>
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
    </Card>
  );
}
