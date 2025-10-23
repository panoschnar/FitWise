import { Box, Typography } from '@mui/material'
import React from 'react'

const AiButton = () => {
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
            Create My Plans
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
  )
}

export default AiButton