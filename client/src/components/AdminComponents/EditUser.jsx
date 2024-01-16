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

const EditUser = () => {
  const { id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [users, setUsers] = useState({});

  const userstatus = [
    { value: "screener", label: "Screener" },
    { value: "admin", label: "Admin" },
  ];

  useEffect(() => {
    const getSingleUser = () => {
      axios
        .get(`http://localhost:5000/api/v1/users/getsingle/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("to be updated", response);
          setUsers(response.data);
          setNewPassword(response.data.password);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleUser();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUsers({
      ...users,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    const dataToBeUpdated = {
      firstName: users.firstName,
      middleName: users.middleName,
      lastName: users.lastName,
      email: users.email,
      phoneNumber: users.phoneNumber,
      role: users.role,
      emailPass: users.emailPass,
      password: users.password,
    };
    if (newPassword !== users.password) {
      dataToBeUpdated.newPasswordToUpdated = newPassword;
    }

    axios
      .patch(
        `http://localhost:5000/api/v1/users/updateUserByAdmin/${users?._id}`,
        { dataToBeUpdated },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        toast.success("User updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while updating");
      });
  };

  console.log("logged user", users);
  return (
    <Box sx={{ padding: "50px" }}>
      <Paper sx={{ width: "50%", margin: "auto", padding: "30px" }}>
        <Typography variant="h4" textAlign={"center"} color={"#112846"}>
          Update User
        </Typography>
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <TextField
          id="firstName"
          type="text"
          name="firstName"
          value={users.firstName}
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
          value={users.middleName}
          fullWidth
          onChange={(e) => handleFormChange(e)}
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <TextField
          id="lastName"
          name="lastName"
          value={users.lastName}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="email">Email</InputLabel>
        <TextField
          id="email"
          name="email"
          value={users.email}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          value={users.phoneNumber}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="phoneNumber">Email Pass</InputLabel>
        <TextField
          id="emailPass"
          name="emailPass"
          value={users.emailPass}
          fullWidth
          margin="normal"
          onChange={(e) => handleFormChange(e)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        <InputLabel htmlFor="password">Password</InputLabel>
        <TextField
          id="password"
          name="password"
          fullWidth
          margin="normal"
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ backgroundColor: "#f7f7f7", marginTop: 0, marginBottom: 2 }}
        />
        {users.agent === "agent" && (
          <>
            <InputLabel htmlFor="role">Role</InputLabel>
            <TextField
              name="role"
              value={users.role}
              onChange={(e) => handleFormChange(e)}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
              select
            >
              {userstatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        <UpdateButton
          variant="contained"
          size="large"
          fullWidth
          onClick={handleUpdateUser}
        >
          Update
        </UpdateButton>
      </Paper>
    </Box>
  );
};

export default EditUser;
