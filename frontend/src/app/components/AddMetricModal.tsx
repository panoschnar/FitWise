import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Slide,
  SlideProps,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUserDetails } from "../hooks/useUserDetails";
import { AddMetricSchema } from "../utils/validationSchemas";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
type AddMetricForm = {
  weight?: number;
  bodyFat?: number;
};
const initialFormData: AddMetricForm = {
  weight: undefined,
  bodyFat: undefined,
};
const AddMetricModal = ({ open, onClose, userId }: AuthModalProps) => {
  const [formData, setFormData] = useState<AddMetricForm>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddMetricForm, string>>
  >({});
  const { addMetricToUser } = useUserDetails(userId);

  // Handle Input Change
  const handleChange =
    (field: keyof AddMetricForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData({
        ...formData,
        [field]: value === "" ? undefined : Number(value),
      });
    };

  // --- Handle Submit ---
  const handleAddMetric = () => {
    const parsed = AddMetricSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof AddMetricForm, string>> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0] as keyof AddMetricForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Call your mutation
    addMetricToUser.mutate(parsed.data, {
      onSuccess: () => {
        console.log("✅ Metrics added successfully!");
        setTimeout(() => {
          setFormData(initialFormData);
          onClose();
        }, 500);
      },
      onError: (err) => {
        console.error("❌ Failed to add metrics:", err);
      },
    });
  };

  const handleClose = () => {
    setErrors({});
    setFormData(initialFormData);
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            borderRadius: 3,
            background: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            color: "white",
          }}
        >
          <Typography variant="h6" gutterBottom align="center">
            Add New Metric
          </Typography>

          <TextField
            label="Weight (kg)"
            fullWidth
            type="number"
            required
            margin="dense"
            value={formData.weight ?? ""}
            onChange={handleChange("weight")}
            error={!!errors.weight}
            helperText={errors.weight}
          />

          <TextField
            label="Body Fat (%)"
            fullWidth
            type="number"
            margin="dense"
            value={formData.bodyFat ?? ""}
            onChange={handleChange("bodyFat")}
            error={!!errors.bodyFat}
            helperText={errors.bodyFat}
          />

          <Box
            mt={2}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              onClick={handleAddMetric}
              variant="contained"
              sx={{ backgroundColor: "#aaefda" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AddMetricModal;
