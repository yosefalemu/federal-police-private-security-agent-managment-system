import React, { useState, useEffect } from "react";
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
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddUserButton = styled(Button)({
  marginTop: "24px",
  background: "#112846",
  borderRadius: "15px",
  "&:hover": {
    background: "#192E77",
  },
});

const AddUser = () => {
  const senderEmail = useSelector((state) => state.user.user.email);
  const senderEmailPass = useSelector((state) => state.user.user.emailPass);
  const [profilePicture, setProfilePicture] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    emailPass: "",
    password: "",
    role: "",
    dateOfBirth: "",
    nationalId: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    axios
      .post("http://localhost:5000/api/v1/users/uploadImage", formData)
      .then((response) => {
        console.log(response);
        setProfilePicture(response.data.image);
        setImage(URL.createObjectURL(file));
        toast.success("User profile picture uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const handleCreateEmployee = () => {
    console.log(user);
    console.log("profile picture", profilePicture);

    if (!profilePicture) {
      toast.error("Please upload all required files");
      return;
    }
    if (!user.emailPass) {
      toast.error("Please provide email pass");
      return;
    }

    const userData = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      emailPass: user.emailPass,
      role: user.role,
      profilePicture: profilePicture,
      nationalId: user.nationalId,
      dateOfBirth: user.dateOfBirth,
      senderEmail: senderEmail,
      senderEmailPass: senderEmailPass,
    };
    console.log(userData);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/auth/createUser", userData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        toast.success("User created successfully");
        setLoading(false);
        setUser({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          emailPass: "",
          nationalId: "",
          dateOfBirth: "",
        });
        setImage(null);
        setProfilePicture("");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };
  const roleType = [
    { value: "admin", label: "Manager" },
    { value: "screener", label: "Screener" },
  ];
  return (
    <Box paddingLeft={{ xs: 12 }} marginLeft={{ xs: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              height: "fit-content",
              width: "70%",
              marginTop: "70px",
              borderRadius: "10px",
            }}
          >
            <Box p={5}>
              <Typography variant="h4" color={"#112846"} textAlign={"center"}>
                Add User
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={user.middleName}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email Pass"
                  name="emailPass"
                  value={user.emailPass}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="National Id"
                  name="nationalId"
                  value={user.nationalId}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <InputLabel htmlFor="dateOfBirth" sx={{ marginTop: 2 }}>
                  Date Of Birth
                </InputLabel>
                <TextField
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={user.dateOfBirth}
                  fullWidth
                  type="date"
                  margin="normal"
                  onChange={handleFormChange}
                  sx={{
                    backgroundColor: "#f7f7f7",
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={user.password}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />
                <TextField
                  label="Role"
                  name="role"
                  type="text"
                  value={user.role}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                  sx={{ backgroundColor: "#f7f7f7" }}
                  select
                >
                  {roleType?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <div
                  style={{
                    padding: "2rem",
                    background: "#f0f0f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    border: "2px dashed #97dce6",
                    height: "130px",
                    width: "130px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: "1.5rem auto",
                  }}
                  onMouseEnter={(event) => {
                    event.target.style.border = "2px solid #97dce6";
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.border = "2px dashed #97dce6";
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e)}
                    />
                    {image ? (
                      <img
                        src={image}
                        width={150}
                        height={150}
                        alt="fileName"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <CloudUploadIcon
                          style={{
                            color: "#12596B",
                            fontSize: 50,
                            cursor: "pointer",
                          }}
                        />
                        <span
                          style={{
                            fontSize: 10,
                            marginTop: 5,
                            cursor: "pointer",
                          }}
                        >
                          Upload Image
                        </span>
                      </div>
                    )}
                  </label>
                </div>
                <AddUserButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleCreateEmployee}
                >
                  add user
                </AddUserButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUser;
