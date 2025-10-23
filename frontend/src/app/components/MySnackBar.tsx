import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
import React from "react";

interface MySnackBarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: AlertColor; // "success" | "error" | "warning" | "info"
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
const MySnackBar = ({ open, onClose, message, type }: MySnackBarProps) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      slots={{ transition: SlideTransition }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{
          backgroundColor:
            type === "success"
              ? "#aaefda"
              : type === "error"
              ? "#b02d53"
              : type === "warning"
              ? "#fbbc04"
              : "#cce4ff",
          color:
            type === "success"
              ? "#000"
              : type === "error"
              ? "#fff"
              : type === "warning"
              ? "#000"
              : "#000",
          fontWeight: 500,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackBar;
