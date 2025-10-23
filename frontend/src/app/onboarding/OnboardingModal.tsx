"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Backdrop,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Fade,
  Snackbar,
  SlideProps,
  Slide,
  Alert,
  CircularProgress,
} from "@mui/material";

import MetricsForm from "./MetricsForm";
import PreferencesForm from "./PreferencesForm";
import GoalsForm from "./GoalsForm";
import {
  OnboardingProvider,
  useOnboarding,
} from "../context/OnboardingContext";
import { IUser } from "../utils/interfaces";
import { useUserDetails } from "../hooks/useUserDetails";
import { useRouter } from "next/navigation";
import MySnackBar from "../components/MySnackBar";
import { getFriendlyErrorMessage } from "../utils/errorHandler";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  initialStep?: number;
  userData: IUser;
}
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
function OnboardingModalContent({
  onClose,
  initialStep = 0,
  userData,
  updateUser,
}: {
  onClose: () => void;
  initialStep?: number;
  userData: IUser;
  updateUser: ReturnType<typeof useUserDetails>["updateUser"];
}) {
  const steps = ["metrics", "preferences", "goals"];
  const [activeStep, setActiveStep] = useState(initialStep);
  const { reset, metrics, preferences, goals, constantMetrics } =
    useOnboarding();
  const router = useRouter();
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFinish = async () => {
    try {
      updateUser.mutate(
        {
          metrics: [metrics],
          preferences,
          goals,
          gender: constantMetrics.gender,
          height: constantMetrics.height,
          birthDate: constantMetrics.birthDate,
        },
        {
          onSuccess: () => {
            console.log("✅ User updated successfully!");

            setTimeout(() => {
              reset();
              onClose();
              router.push("./dashboard");
            }, 2000); // 2s is enough
          },
          onError: (err) => {
            console.error("❌ Failed to update user:", err);
          },
        }
      );
    } catch (err) {
      console.error("Error preparing update payload:", err);
    }
  };

  if (!userData || !userData == undefined) {
    return "Error on fetching User data!";
  }
  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: 600,
        p: 4,
        borderRadius: 3,
        background: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        color: "#eee",
      }}
    >
      {updateUser.isPending && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10,
            borderRadius: 3,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Typography variant="h6" gutterBottom align="center">
        Onboarding
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mb: 2 }}>
        <Fade in={activeStep === 0}>
          <div>{activeStep === 0 && <MetricsForm />}</div>
        </Fade>
        <Fade in={activeStep === 1}>
          <div>{activeStep === 1 && <PreferencesForm />}</div>
        </Fade>
        <Fade in={activeStep === 2}>
          <div>{activeStep === 2 && <GoalsForm />}</div>
        </Fade>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
            "&:hover": { borderColor: "#aaefda" },
          }}
        >
          Back
        </Button>

        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #be95be, #d1c6ff)",
              "&:hover": {
                background: "linear-gradient(135deg, #d1c6ff, #be95be)",
              },
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #be95be, #d1c6ff)",
              "&:hover": {
                background: "linear-gradient(135deg, #d1c6ff, #be95be)",
              },
            }}
          >
            Finish
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default function OnboardingModal({
  open,
  onClose,
  initialStep,
  userData,
}: OnboardingModalProps) {
  const { updateUser } = useUserDetails(userData.id);
  // API error for snackbar
  const apiErrorMessage = getFriendlyErrorMessage(
    updateUser.error ? updateUser.error : ""
  );

  return (
    <>
      <Modal
        open={open}
        onClose={() => {}}
        disableEscapeKeyDown
        disableAutoFocus
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <OnboardingProvider userData={userData}>
          <OnboardingModalContent
            onClose={onClose}
            initialStep={initialStep}
            userData={userData}
            updateUser={updateUser}
          />
        </OnboardingProvider>
      </Modal>

      {/* ❌ API error snackbar */}
      <MySnackBar
        open={!!apiErrorMessage}
        onClose={() => {
          updateUser.reset();
        }}
        message={apiErrorMessage}
        type="error"
      />

      {/* ✅ Success snackbar */}
      <MySnackBar
        open={updateUser.isSuccess}
        onClose={() => {
          updateUser.reset();
        }}
        message={"User has been updated successfully!"}
        type="success"
      />
    </>
  );
}
