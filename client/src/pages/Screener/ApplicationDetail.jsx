import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import ApplicationComponent from "../../components/ScreenerComponents/ApplicationDetail";

const ApplicationDetail = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "46px 8px 32px 8px" }}
        >
          <ApplicationComponent />
        </Box>
      </Box>
    </>
  );
};

export default ApplicationDetail;
