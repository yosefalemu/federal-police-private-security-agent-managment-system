import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const MovableText = styled.p`
  font-size: 54px;
  color: #edc154;
  font-weight: 800;
  font-family: "Arial", sans-serif;
  margin: 0;
  display: inline;
  & span {
    display: inline-block;
    animation: ${fadeIn} 3s linear infinite;
    animation-fill-mode: forwards;
  }
  & span:nth-child(1) {
    animation-delay: 0s;
  }
  & span:nth-child(2) {
    animation-delay: 0.2s;
  }
  & span:nth-child(3) {
    animation-delay: 0.4s;
  }
  & span:nth-child(4) {
    animation-delay: 0.6s;
  }
  & span:nth-child(5) {
    animation-delay: 0.8s;
  }
  & span:nth-child(6) {
    animation-delay: 1s;
  }
  & span:nth-child(7) {
    animation-delay: 1.2s;
  }
  & span:nth-child(8) {
    animation-delay: 1.4s;
  }
  & span:nth-child(9) {
    animation-delay: 1.6s;
  }
  & span:nth-child(10) {
    animation-delay: 1.8s;
  }
  & span:nth-child(11) {
    animation-delay: 2s;
  }
  & span:nth-child(12) {
    animation-delay: 2.2s;
  }
  & span:nth-child(13) {
    animation-delay: 2.4s;
  }
  & span:nth-child(14) {
    animation-delay: 2.6s;
  }
`;

const LandingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
        backgroundImage: `url('/images/federal.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          overflowX: "hidden",
          overflowY: "hidden",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "20px",
            backgroundColor: "#F6F5F5",
          }}
        >
          <Button
            sx={{
              background: "#112846",
              color: "#F6F5F5",
              "&:hover": {
                background: "#192E77",
              },
            }}
            variant="contained"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            sx={{
              background: "#112846",
              color: "#F6F5F5",
              marginRight: "25px",
              "&:hover": {
                background: "#192E77",
              },
            }}
            variant="contained"
            component={Link}
            to="/apply"
          >
            Apply
          </Button>
        </Box>
        <Box
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "#EDC154", fontWeight: 800, margin: 0 }}
          >
            Welcome
          </Typography>
          <MovableText>
            <span>T</span>
            <span>o</span>
            <span></span>
            <span> </span>
            <span>f</span>
            <span>e</span>
            <span>d</span>
            <span>e</span>
            <span>r</span>
            <span>a</span>
            <span>l</span>
            <span> </span>
            <span> </span>
            <span>p</span>
            <span>o</span>
            <span>l</span>
            <span>i</span>
            <span>c</span>
            <span>e</span>
          </MovableText>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
