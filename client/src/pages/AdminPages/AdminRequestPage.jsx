import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import AdminRequest from "../../components/AdminComponents/AdminRequest";

const AdminRequestPage = () => {
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
          <AdminRequest />
        </Box>
      </Box>
    </>
  );
};

export default AdminRequestPage;
