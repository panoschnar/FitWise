"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

type FormData = {
  name: string;
  email: string;
  age: number;
  sex: "male" | "female";
  height: number;
  weight: number;
  bodyFat?: number;
  activity: "sedentary" | "lightly" | "moderate" | "active" | "very";
  goal: "weight_loss" | "muscle_gain" | "maintain";
};

type Props = {
  user: { name: string; email?: string };
};

export default function OnboardingForm({ user }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<FormData>({
    name: user.name || "",
    email: user.email || "",
    age: 25,
    sex: "male",
    height: 170,
    weight: 70,
    bodyFat: undefined,
    activity: "moderate",
    goal: "maintain",
  });

  const steps = ["Contact Info", "Body Metrics", "Goals"];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (key: keyof FormData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Send data to backend
    // const res = await fetch("/api/user/metrics", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // const result = await res.json();
    alert("Metrics saved!");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Welcome {user.name}, let's set up your profile
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {activeStep === 0 && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            value={data.age}
            onChange={(e) => handleChange("age", Number(e.target.value))}
          />
        </Box>
      )}

      {activeStep === 1 && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Height (cm)"
            type="number"
            value={data.height}
            onChange={(e) => handleChange("height", Number(e.target.value))}
          />
          <TextField
            label="Weight (kg)"
            type="number"
            value={data.weight}
            onChange={(e) => handleChange("weight", Number(e.target.value))}
          />
          <TextField
            label="Body Fat (%)"
            type="number"
            value={data.bodyFat || ""}
            onChange={(e) => handleChange("bodyFat", Number(e.target.value))}
          />
        </Box>
      )}

      {/* {activeStep === 2 && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            select
            label="Activity Level"
            value={data.activity}
            onChange={(e) => handleChange("activity", e.target.value)}
          >
            {["sedentary", "lightly", "moderate", "active", "very"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            select
            label="Goal"
            value={data.goal}
            onChange={(e) => handleChange("goal", e.target.value)}
          >
            {["weight_loss", "muscle_gain", "maintain"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )} */}

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
