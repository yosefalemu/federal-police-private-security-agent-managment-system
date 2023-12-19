// HomePage.jsx
import React from "react";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { Box } from "@mui/material";
import AllScreenerRequestList from "../../components/ScreenerComponents/AllScreenerRequestList.jsx";

const ScreenerRequestPage = () => {
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
          <AllScreenerRequestList />
        </Box>
      </Box>
    </>
  );
};

export default ScreenerRequestPage;
