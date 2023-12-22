import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import DetailEmployeeModal from "./DetailEmployeeModal";
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
  const sortedEmployees = [...employees].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  if (employees.length === 0) {
    return <Box>No Employee</Box>;
  }
  return (
    <Box>
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
                        navigate(`/agentemployee/${item._id}`);
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
      <EditEmployeeModal editModal={editModal} setEditModal={setEditModal} />
      <DetailEmployeeModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
      />
      <DeleteEmployeeModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </Box>
  );
};

export default EmployeeList;
