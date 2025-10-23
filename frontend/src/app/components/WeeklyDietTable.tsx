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
  Grid,
} from "@mui/material";
import { DailySummary, DietPlan } from "../utils/interfaces";
import Chart from "./Chart";

type WeeklyDietTableProps = {
  diet: DietPlan[];
  title?: string;
  nutrition?: DailySummary[];
};

export default function WeeklyDietTable({
  diet,
  title = "Weekly Diet Plan",
  nutrition = [],
}: WeeklyDietTableProps) {
const mealsOrder = Array.from(
  new Set(diet.flatMap((day) => day.meals.map((m) => m.name)))
);
  // Calculate daily totals
  const dailyTotals = diet.map((dayPlan) => {
    const total = dayPlan.meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fats += meal.fats;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    return { day: dayPlan.day, ...total };
  });

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
                <TableCell sx={{ fontWeight: "bold" }}>Meal</TableCell>
                {diet.map((dayPlan) => (
                  <TableCell key={dayPlan.day} sx={{ fontWeight: "bold" }}>
                    {dayPlan.day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {mealsOrder.map((mealName) => (
                <TableRow
                  key={mealName}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#aaefda29",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>{mealName}</TableCell>
                  {diet.map((dayPlan) => {
                    const meal = dayPlan.meals.find((m) => m.name === mealName);
                    return (
                      <TableCell key={dayPlan.day + mealName}>
                        {meal
                          ? `${meal.item} (${meal.grams}g, ${meal.calories} kcal)`
                          : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}

              {/* Daily totals row */}
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Totals</TableCell>
                {dailyTotals.map((total) => (
                  <TableCell key={total.day} sx={{ fontWeight: "bold" }}>
                    {`${total.calories} kcal, P:${total.protein}g C:${total.carbs}g F:${total.fats}g`}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Grid container spacing={4} sx={{ mt: 2, px: 2, }}>
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
            gradientColors={["#be95be", "#aaefda"]}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
