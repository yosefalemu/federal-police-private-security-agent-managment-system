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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import DetailEmployeeModal from "./DetailEmployeeModal";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeList = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [agent, setAgent] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { email } = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/agents/getagentwithemail/${email}`, {
        withCredentials: true,
      })
      .then((response) => {
        setAgent(response.data.agent);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  useEffect(() => {
    if (agent._id) {
      const getAllEmployeeList = () => {
        axios
          .get(`http://localhost:5000/api/v1/employees/${agent._id}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            setEmployees(response.data.employee);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllEmployeeList();
    }
  }, [agent]);

  console.log("employees", employees);

  const sortedEmployees = [...employees]
    .filter((employee) =>
      (employee.firstName + employee.middleName + employee.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (employees.length === 0) {
    return <Box>No Employee</Box>;
  }
  return (
    <Box>
      <Box
        sx={{
          width: { xs: "80%", md: "60%" },
          marginX: "auto",
          marginBottom: "20px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          type="text"
          fullWidth
          placeholder="Search by name"
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
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>Edit</TableCell>
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
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.status === "employeed" ? (
                      <IconButton sx={{ color: "green" }}>
                        <ThumbUpAltIcon />
                      </IconButton>
                    ) : (
                      <IconButton sx={{ color: "red" }}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "12%" }}>
                    <IconButton
                      sx={{ color: "orange" }}
                      onClick={() => {
                        navigate(`/agentemployee/editemployee/${item?._id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: "12%" }}>
                    <IconButton
                      sx={{ color: "blue" }}
                      onClick={() => {
                        navigate(`/agentemployee/${item?._id}`);
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

export default EmployeeList;
