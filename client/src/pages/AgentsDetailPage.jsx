import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AgentsDetailComponent from "../components/AgentsDetailComponent";

const AgentsDetailPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "66px 8px 32px 10px" }}
        >
          <AgentsDetailComponent />
        </Box>
      </Box>
    </>
  );
};

export default AgentsDetailPage;
