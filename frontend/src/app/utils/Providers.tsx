"use client"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
// import { AuthProvider } from "../context/AuthContext";
import theme from "../styles/theme";
import { queryClient } from "./queryClient";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
