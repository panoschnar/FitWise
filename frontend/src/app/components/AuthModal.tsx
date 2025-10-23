"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Backdrop,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getFriendlyErrorMessage } from "../utils/errorHandler";

import MySnackBar from "./MySnackBar";
import { LoginSchema, RegisterSchema } from "../utils/validationSchemas";
import z from "zod";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type FormData = {
  name: string;
  email: string;
  password: string;
};
const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

export default function AuthModal({
  open,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormData, string[]>>
  >({});

  const { loginMutation, registerMutation } = useAuth();

  const handleFieldErrors = (error: z.ZodError) => {
    const errors: Partial<Record<keyof FormData, string[]>> = {};
    error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof FormData;
      if (!errors[key]) errors[key] = [];
      errors[key]?.push(issue.message);
    });
    setFieldErrors(errors);
  };

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setFieldErrors({});
      loginMutation.reset();
      registerMutation.reset();
      setShowPassword(false);
    }
  }, [open]);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 0) {
      // Login
      const parsedLogin = LoginSchema.safeParse(formData);
      if (!parsedLogin.success) {
        handleFieldErrors(parsedLogin.error);
        return;
      }

      loginMutation.mutate(parsedLogin.data, { onSuccess });
    } else {
      // Register
      const parsedRegister = RegisterSchema.safeParse(formData);
      if (!parsedRegister.success) {
        handleFieldErrors(parsedRegister.error);
        return;
      }

      registerMutation.mutate(parsedRegister.data, { onSuccess });
    }
  };

  // API error for snackbar
  const apiErrorMessage = (
    tab === 0
      ? loginMutation.error && loginMutation.isError
      : registerMutation.error && registerMutation.isError
  )
    ? getFriendlyErrorMessage(
        tab === 0 ? loginMutation.error : registerMutation.error
      )
    : "";
console.log(apiErrorMessage)
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
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
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setFieldErrors({});
              setTab(v);
            }}
            centered
            indicatorColor="secondary"
          >
            <Tab label="Login" sx={{ color: "#aaefda !important" }} />
            <Tab label="Register" sx={{ color: "#aaefda !important" }} />
          </Tabs>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {tab === 1 && (
              <TextField
                label="Full Name"
                value={formData.name}
                onChange={handleChange("name")}
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
                // required
                fullWidth
              />
            )}
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              // required
              fullWidth
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                error={!!fieldErrors.password}
                onChange={handleChange("password")}
                // required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      onMouseUp={(event) => {
                        event.preventDefault();
                      }}
                      edge="end"
                      sx={{
                        color: "#aaefda",
                        "&:hover": {
                          color: "#88d9c2",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {fieldErrors.password && (
                <Box
                  component="ul"
                  sx={{ mt: 0.5, ml: 2, color: "error.main", fontSize: "12px" }}
                >
                  {fieldErrors.password.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </Box>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              disabled={loginMutation.isPending || registerMutation.isPending}
              sx={{
                mt: 2,
                background: "linear-gradient(135deg, #be95be, #d1c6ff)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(135deg, #d1c6ff, #be95be)",
                },
              }}
            >
              {tab === 0 ? (
                loginMutation.isPending ? (
                  <CircularProgress size={24} sx={{ color: "#aaefda" }} />
                ) : (
                  "Login"
                )
              ) : registerMutation.isPending ? (
                <CircularProgress size={24} sx={{ color: "#aaefda" }} />
              ) : (
                "Register"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* ❌ API error snackbar */}
      <MySnackBar
        open={!!apiErrorMessage}
        onClose={() => {
          if (tab === 0) loginMutation.reset();
          else registerMutation.reset();
        }}
        message={apiErrorMessage}
        type="error"
      />

      {/* ✅ Success snackbar */}
      <MySnackBar
        open={tab === 0 ? loginMutation.isSuccess : registerMutation.isSuccess}
        onClose={() => {
          loginMutation.reset();
          registerMutation.reset();
        }}
        message={
          tab === 0 ? "Logged in successfully!" : "Registered successfully!"
        }
        type="success"
      />
    </>
  );
}
