import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";
import UserList from "../../components/AdminComponents/AgentsList";

const AgentsListPage = () => {
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
          <UserList />
        </Box>
      </Box>
    </>
  );
};

export default AgentsListPage;
