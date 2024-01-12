import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import CerteficateComponent from "../../components/AdminComponents/CerteficateComponent";

const CerteficateGeneratorPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "46px 8px 32px 8px" }}
        >
          <CerteficateComponent />
        </Box>
      </Box>
    </>
  );
};

export default CerteficateGeneratorPage;
