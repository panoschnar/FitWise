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
import { DietPlan } from "../utils/interfaces";

type WeeklyDietTableProps = {
  diet: DietPlan[];
  title?: string;
};

export default function WeeklyDietTable({
  diet,
  title = "Weekly Diet Plan",
}: WeeklyDietTableProps) {
  const mealsOrder = ["Breakfast", "Snack", "Lunch", "Snack2", "Dinner"];

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
    <Card sx={{ background: "#fff", borderRadius: 3, boxShadow: 3, mt: 4 }}>
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
    </Card>
  );
}
