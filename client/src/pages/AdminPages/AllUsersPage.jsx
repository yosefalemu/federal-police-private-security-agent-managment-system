import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AllUsers from "../../components/AdminComponents/AllUsers";

const AllUsersPage = () => {
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
          <AllUsers />
        </Box>
      </Box>
    </>
  );
};

export default AllUsersPage;
