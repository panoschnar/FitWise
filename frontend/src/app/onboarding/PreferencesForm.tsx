"use client";

import {
  Box,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Button,
} from "@mui/material";
import { useOnboarding } from "../context/OnboardingContext";
import { useState } from "react";
import { dietTypes, workoutTypes } from "../utils/constants";

export default function PreferencesForm() {
  const { preferences, setPreferences } = useOnboarding();
  const [allergyInput, setAllergyInput] = useState("");
  const [dislikeInput, setDislikeInput] = useState("");

  // --- Workout style handling ---
  const handleWorkoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setPreferences({
        ...preferences,
        workoutStyle: [...preferences.workoutStyle, name],
      });
    } else {
      setPreferences({
        ...preferences,
        workoutStyle: preferences.workoutStyle.filter(
          (style) => style !== name
        ),
      });
    }
  };

  // --- Allergies & Dislikes handling ---
  const handleAddChip = (type: "allergies" | "dislikes", value: string) => {
    if (!value.trim()) return;

    setPreferences({
      ...preferences,
      [type]: [...(preferences[type] || []), value.trim()],
    });

    type === "allergies" ? setAllergyInput("") : setDislikeInput("");
  };

  const handleDeleteChip = (
    type: "allergies" | "dislikes",
    chipToDelete: string
  ) => {
    setPreferences({
      ...preferences,
      [type]: preferences[type]?.filter((item) => item !== chipToDelete) || [],
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Diet type */}
      <TextField
        label="Diet Type"
        select
        value={preferences.dietType ?? ""}
        onChange={(e) =>
          setPreferences({ ...preferences, dietType: e.target.value })
        }
        fullWidth
      >
        {dietTypes.map((type) => (
          <MenuItem id={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </TextField>
      {/* Allergies */}
      <Box>
        <TextField
          label="Add Allergy"
          value={allergyInput}
          onChange={(e) => setAllergyInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddChip("allergies", allergyInput)}
          fullWidth
        />
        {/* <Button
          sx={{ mt: 1 }}
          onClick={() => handleAddChip("allergies", allergyInput)}
          disabled={!allergyInput.trim()}
        >
          Add
        </Button> */}
        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {preferences.allergies?.map((item) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => handleDeleteChip("allergies", item)}
              sx={{ backgroundColor: "#aaefda" }}
            />
          ))}
        </Box>
      </Box>

     {/* Dislikes */}
      <Box>
        <TextField
          label="Add Dislike"
          value={dislikeInput}
          onChange={(e) => setDislikeInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddChip("dislikes", dislikeInput)}
          fullWidth
        />
        {/* <Button
          sx={{ mt: 1 }}
          onClick={() => handleAddChip("dislikes", dislikeInput)}
          disabled={!dislikeInput.trim()}
        >
          Add
        </Button> */}
        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {preferences.dislikes?.map((item) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => handleDeleteChip("dislikes", item)}
              sx={{ backgroundColor: "#aaefda" }}
            />
          ))}
        </Box>
      </Box>

      {/* Workout Styles */}
      <FormGroup>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(50%, 1fr))",
          }}
        >
          {workoutTypes.map((type) => (
            <FormControlLabel
              key={type.value}
              control={
                <Checkbox
                  checked={preferences.workoutStyle?.includes(type.value) ?? false}
                  onChange={handleWorkoutChange}
                  name={type.value}
                />
              }
              label={type.label}
            />
          ))}
        </Box>
      </FormGroup>
    </Box>
  );
}
