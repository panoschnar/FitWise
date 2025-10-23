"use client";

import { Box, TextField, MenuItem } from "@mui/material";
import { useOnboarding } from "../context/OnboardingContext";
import { goalTypes } from "../utils/constants";
import { IGoals } from "../utils/interfaces";

export default function GoalsForm() {
  const { goals, setGoals } = useOnboarding();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Target Weight (kg)"
        type="number"
        value={goals.targetWeight ?? null}
        onChange={(e) => setGoals({ ...goals, targetWeight:  Number(e.target.value)  })}
        fullWidth
        required
      />
      <TextField
        label="Goal Type"
        select
        value={goals.goalType}
        onChange={(e) => setGoals({ ...goals, goalType: e.target.value })}
        fullWidth
      >
        {goalTypes.map((goal) => (
          <MenuItem key={goal.value} value={goal.value}>
            {goal.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Weekly Change (kg/week)"
        type="number"
        value={goals.weeklyChange ?? null}
        onChange={(e) => setGoals({ ...goals, weeklyChange: e.target.value ? Number(e.target.value) : null })}
        fullWidth
      />
    </Box>
    
  );
}
