"use client";

import { Box, TextField, MenuItem } from "@mui/material";
import { useOnboarding } from "../context/OnboardingContext";
import { IMetrics } from "../utils/interfaces";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";


export default function MetricsForm() {
  const { metrics, setMetrics, constantMetrics, setConstantMetrics } =
    useOnboarding();
console.log(constantMetrics)
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Weight (kg)"
        type="number"
        value={metrics.weight ?? undefined}
        onChange={(e) =>
          setMetrics({ ...metrics, weight: Number(e.target.value) })
        }
        fullWidth
        required
      />
      <TextField
        label="Height (cm)"
        type="number"
        value={constantMetrics.height ?? undefined}
        onChange={(e) =>
          setConstantMetrics({
            ...constantMetrics,
            height: Number(e.target.value),
          })
        }
        fullWidth
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Birthdate"
          value={
            constantMetrics.birthDate ? dayjs(constantMetrics.birthDate) : null
          }
          onChange={(newValue: Dayjs | null) =>
            setConstantMetrics({
              ...constantMetrics,
              birthDate: newValue ? newValue.toISOString() : null,
            })
          }
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              variant: "outlined",
              sx: {
                "& .MuiPickersOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#be95be !important" },
                  "&.Mui-focused fieldset": { borderColor: "#aaefda" },
                  "& input": { color: "#aaefda" },
                },
                "& .MuiPickersInputBase-root": {
                  color: "white",
                  "&.Mui-focused": { color: "#aaefda" },
                },
                "& .MuiSvgIcon-root": {
                  color: "#aaefda",
                },
                "& .MuiPaper-root-MuiPickerPopper-paper": {
                  backgroundColor: "#aaefda",
                  "&.Mui-focused": { color: "#aaefda" },
                },
              },
            },
          }}
        />
      </LocalizationProvider>

      <TextField
        label="Gender"
        select
        value={constantMetrics.gender ?? ""}
        onChange={(e) =>
          setConstantMetrics({
            ...constantMetrics,
            gender: e.target.value,
          })
        }
        fullWidth
      >
        <MenuItem value="MALE">Male</MenuItem>
        <MenuItem value="FEMALE">Female</MenuItem>
        <MenuItem value="OTHER">Other / Prefer not to say</MenuItem>
      </TextField>
      <TextField
        label="Body Fat % (optional)"
        type="number"
        value={metrics.bodyFat ?? null}
        onChange={(e) =>
          setMetrics({
            ...metrics,
            bodyFat: e.target.value ? Number(e.target.value) : null,
          })
        }
        fullWidth
      />
    </Box>
  );
}
