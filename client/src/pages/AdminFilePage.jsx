import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AdminFileComponents from "../components/AdminFileComponents";

const AdminFliePage = () => {
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
          <AdminFileComponents />
        </Box>
      </Box>
    </>
  );
};

export default AdminFliePage;
