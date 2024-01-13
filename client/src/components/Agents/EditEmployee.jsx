import {
  Paper,
  TextField,
  Typography,
  styled,
  Button,
  Box,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateButton = styled(Button)({
  marginTop: "20px",
  background: "#112846",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#192E77",
  },
});

const EditEmployee = () => {
  const { id } = useParams();

  const employeeStatus = [
    { value: "employeed", label: "Employeed" },
    { value: "free", label: "Free" },
  ];
  const [employees, setEmployees] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "",
  });
  useEffect(() => {
    const getSingleAgentEmployee = () => {
      axios
        .get(`http://localhost:5000/api/v1/employees/getsingle/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleAgentEmployee();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEmployees({
      ...employees,
      [name]: value,
    });
  };

  const handleUpdateEmployee = () => {
    console.log("employees to be updated", employees);
    axios
      .patch(
        `http://localhost:5000/api/v1/employees/updateEmployee/${employees?._id}`,
        { employees },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        toast.success("Employee updated successfully");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
      });
  };

  console.log("update employee", employees);
  return (
    <Box sx={{ padding: "20px" }}>
      <Paper sx={{ width: "50%", margin: "auto", padding: "30px" }}>
        <Typography variant="h4" textAlign={"center"} color={"#112846"}>
          Update Employee
        </Typography>
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <TextField
          id="firstName"
          type="text"
          name="firstName"
          value={employees.firstName}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{
            backgroundColor: "#f7f7f7",
            marginTop: 0,
            marginBottom: 2,
          }}
        />
        <InputLabel htmlFor="middleName">Middle Name</InputLabel>
        <TextField
          id="middleName"
          type="text"
          name="middleName"
          value={employees.middleName}
          fullWidth
          onChange={(e) => handleFormChange(e)}
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <TextField
          id="lastName"
          name="lastName"
          value={employees.lastName}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          id="email"
          name="email"
          value={employees.email}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          value={employees.phoneNumber}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <TextField
          label="Status"
          name="status"
          value={employees.status}
          onChange={(e) => handleFormChange(e)}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
          select
        >
          {employeeStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <UpdateButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleUpdateEmployee}
        >
          Update
        </UpdateButton>
      </Paper>
    </Box>
  );
};

export default EditEmployee;
