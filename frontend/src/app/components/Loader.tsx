import React from "react";
import { Box, keyframes, styled, Typography } from "@mui/material";
import { logoIcon, logoTopBarIcon } from "../utils/icons";

// === Animations ===
const ripple = keyframes`
  0% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 10px -0px;
  }
  50% {
    transform: scale(1.3);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 30px 20px -0px;
  }
  100% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 10px -0px;
  }
`;

const colorChange = keyframes`
  0% {
    fill: var(--logo-color);
  }
  50% {
    fill: white;
  }
  100% {
    fill: var(--logo-color);
  }
`;

// === Styled Components ===
const LoaderWrapper = styled(Box)(() => ({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(3px)",
  zIndex: 9999,
}));

const LoaderContainer = styled(Box)(() => ({
  "--size": "230px",
  "--duration": "2s",
  "--logo-color": "grey",
  "--background": "linear-gradient(45deg, #aaefda 0%, #be95be 100%)",
  height: "var(--size)",
  aspectRatio: "1 / 1",
  position: "relative",
}));

const LoaderBox = styled(Box)(() => ({
  position: "absolute",
  background: "var(--background)",
  borderRadius: "50%",
  borderTop: "1px solid rgba(100, 100, 100, 1)",
//   boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 10px -0px",
  backdropFilter: "blur(5px)",
  animation: `${ripple} var(--duration) infinite ease-in-out`,
}));

const LogoWrapper = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeContent: "center",
  padding: "30%",
  "& svg": {
    fill: "var(--logo-color)",
    width: "100%",
    animation: `${colorChange} var(--duration) infinite ease-in-out`,
  },
}));

const LoaderMessage = styled(Typography)(() => ({
  marginTop: "3rem",
  color: "#555",
  fontSize: "1.1rem",
  textAlign: "center",
}));

// === Component ===
interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <LoaderWrapper>
      <LoaderContainer>
        {[...Array(5)].map((_, i) => {
          const delays = [0, 0.2, 0.4, 0.6, 0.8];
          const insets = ["40%", "30%", "20%", "10%", "0%"];
          const borderColors = [
            "rgba(100,100,100,1)",
            "rgba(100,100,100,0.8)",
            "rgba(100,100,100,0.6)",
            "rgba(100,100,100,0.4)",
            "rgba(100,100,100,0.2)",
          ];

          return (
            <LoaderBox
              key={i}
              sx={{
                inset: insets[i],
                zIndex: 99 - i,
                borderColor: borderColors[i],
                animationDelay: `${delays[i]}s`,
              }}
            >
              {i === 0 && (
                <LogoWrapper>
                 {logoTopBarIcon}
                </LogoWrapper>
              )}
            </LoaderBox>
          );
        })}
      </LoaderContainer>
      {message && <LoaderMessage>{message}</LoaderMessage>}
    </LoaderWrapper>
  );
};

export default Loader;
