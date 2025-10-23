import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // main: "#be95be",
      main: "#aaefda",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#aaefda",
    },
    background: {
      default: "#ffffff", // light background
      paper: "#f9f9f9", // slightly grey for cards/dialogs
    },
    text: {
      primary: "#171717", // dark text
      secondary: "#444444",
    },
  },
  typography: {
    fontFamily: `"Montserrat", "Manrope", sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "white", // outline color
          },
          "&:hover fieldset": {
            borderColor: "#be95be !important", // hover outline
          },
          "&.Mui-focused fieldset": {
            borderColor: "#aaefda", // focused outline
          },
          "& input": {
            color: "#aaefda", // input text color
          },
          "& input::placeholder": {
            color: "white",
            opacity: 1,
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.1) inset",
            WebkitTextFillColor: "#aaefda",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white", // default label color
          "&.Mui-focused": {
            color: "#aaefda", // focused label color
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "#aaefda", // dropdown text color
        },
        icon: {
          color: "#aaefda", // dropdown arrow color
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: "rgba(255, 255, 255, 0.1)", // frosted glass
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px", // rounded corners
          color: "#aaefda", // default text color inside menu
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#aaefda", // text color
          "&:hover": {
            background: "rgba(255, 255, 255, 0.1)",
          },
          "&.Mui-selected": {
            background: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          "& .MuiStepLabel-label": {
            color: "#aaefda",
            fontWeight: 300, // default
          },
          "& .MuiStepLabel-label.Mui-completed": {
            color: "rgba(170, 239, 218, 0.7) !important", // dimmed
            fontWeight: "500 !important", // force bold
          },
          "& .MuiStepLabel-label.Mui-active": {
            color: "#aaefda !important", // active
            fontWeight: "500 !important",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "& .MuiStepIcon-text": {
            fill: "#000", // step number text
          },
          color: "white", // default (upcoming step) icon color
          "&.Mui-completed": {
            color: "#aaefda", // completed icon
          },
          "&.Mui-active": {
            color: "#aaefda", // active icon
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#be95be", // default unchecked box outline color
          "&.Mui-checked": {
            color: "#aaefda", // checked box color
          },
          "&:hover": {
            backgroundColor: "rgba(190, 149, 190, 0.08)", // subtle hover background
          },
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#aaefda",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#be95be",
            color: "#000",
            "&:hover": { backgroundColor: "#be95be" },
          },
          "&:hover": {
            backgroundColor: "#be95be",
          },
        },
      },
    },
  },
});

export default theme;
