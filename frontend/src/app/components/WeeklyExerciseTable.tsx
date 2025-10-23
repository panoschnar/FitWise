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
} from "@mui/material";
import { ExercisePlan } from "../utils/interfaces";

type WeeklyExerciseTableProps = {
  exercisePlan: ExercisePlan[];
  title?: string;
};

export default function WeeklyExerciseTable({
  exercisePlan,
  title = "Weekly Exercise Plan",
}: WeeklyExerciseTableProps) {
  const days = exercisePlan.map((d) => d.day);

  return (
    <Card sx={{ background: "#fff", borderRadius: 3, boxShadow: 3, my: 4 }}>
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
                    "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>{`Ex ${idx + 1}`}</TableCell>
                  {exercisePlan.map((dayPlan) => {
                    const exercise = dayPlan.exercises[idx];
                    return (
                      <TableCell key={dayPlan.day + idx}>
                        {exercise
                          ? `${exercise.name} ${
                              exercise.reps ? `(${exercise.reps} reps)` : ""
                            } ${exercise.sets ? `x${exercise.sets}` : ""} ${
                              exercise.durationMin ? `(${exercise.durationMin} min)` : ""
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
    </Card>
  );
}
