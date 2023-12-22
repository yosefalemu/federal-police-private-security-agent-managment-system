import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  styled,
} from "@mui/material";
import AddEmployee from "../../components/Agents/AddEmployee";

const AddEmployeePage = () => {
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
          <AddEmployee />
        </Box>
      </Box>
    </>
  );
};

export default AddEmployeePage;
