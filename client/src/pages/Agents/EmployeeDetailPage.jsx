import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import EmployeeDetail from "../../components/Agents/EmployeeDetail";
import { Box } from "@mui/material";

const EmployeeDetailPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "16px 0px 32px 0px" }}
        >
          <EmployeeDetail />
        </Box>
      </Box>
    </>
  );
};

export default EmployeeDetailPage;
