import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { removeFrom, setFrom } from "../../redux-toolkit/slices/agents";

const AllEmployee = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllEmployeeList = () => {
      axios
        .get("http://localhost:5000/api/v1/employees", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setEmployees(response.data.employees);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllEmployeeList();
  }, []);

  console.log("employees", employees);

  const sortedEmployees = [...employees]
    .filter((employee) =>
      (employee?.firstName + employee?.middleName + employee?.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  useEffect(() => {
    dispatch(removeFrom());
  }, []);

  if (employees.length === 0) {
    return <Box>No Employee</Box>;
  }
  return (
    <Box>
      <Box
        sx={{
          marginX: "auto",
          marginBottom: "10px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "80%", md: "50%" },
        }}
      >
        <TextField
          type="text"
          fullWidth
          placeholder="Search by name with out space"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                Middle Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees?.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.firstName}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.middleName}
                  </TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ width: "12%" }}>
                    <IconButton
                      sx={{ color: "blue" }}
                      onClick={() => {
                        navigate(`/allemployee/${item._id}`);
                        dispatch(setFrom("allemployee"));
                      }}
                    >
                      <SettingsAccessibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllEmployee;
