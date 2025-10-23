import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useUserDetails } from "../hooks/useUserDetails";

interface AiButtonProps {
  userId: string;
  setLoading: (loading: boolean) => void;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AiButton = ({ userId, setLoading, setProgress }: AiButtonProps) => {
  const { generateAiPlans } = useUserDetails(userId);

  const handleClick = async () => {
    setLoading(true);
    setProgress(0);

    // Fake progress simulation
    const interval = setInterval(() => {
      setProgress((old: number) => {
        const next = old + Math.floor(Math.random() * 5 + 1); // increase 1–5%
        return next >= 99 ? 99 : next;
      });
    }, 400);

    try {
      await generateAiPlans.mutateAsync();
      setProgress(100);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setTimeout(() => setLoading(false), 400);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: 120,
          height: 120,
          cursor: "pointer",
          "&:hover": {
            borderRadius: "50%",
            boxShadow: "0px -5px 30px #be95be, 0px 5px 30px #aaefda",
          },
          "&:focus": {
            borderRadius: "50%",
            border: "5px solid #be95be",
          },
        }}
        onClick={() => !generateAiPlans.isPending && handleClick()}
      >
        {/* Spinning gradient layer */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundImage: "linear-gradient(186deg, #be95be 35%, #aaefda)",
            animation: "spin 3s linear infinite",
            filter: "blur(1px)",
            boxShadow: "0px -5px 20px #be95be, 0px 5px 20px #aaefda",
            zIndex: 1,
          }}
        />

        {/* White blurred core */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "90%",
            height: "90%",
            borderRadius: "50%",
            backgroundColor: "#fff",
            filter: "blur(10px)",
            zIndex: 2,
          }}
        />

        {/* Text on top */}
        <Typography
          sx={{
            position: "relative",
            zIndex: 3,
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
          }}
        >
          {generateAiPlans.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "Create My Plans"
          )}
        </Typography>

        <style>
          {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
        </style>
      </Box>
    </Box>
  );
};

export default AiButton;
