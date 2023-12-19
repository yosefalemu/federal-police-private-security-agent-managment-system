import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
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
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateButton = styled(Button)({
  marginTop: "24px",
  background: "#112846",
  borderRadius: "15px",
  "&:hover": {
    background: "#192E77",
  },
});

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const userInformation = [
    { label: "First Name", value: user?.firstName },
    { label: "Middle Name", value: user?.middleName },
    { label: "Last Name", value: user?.lastName },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.role },
  ];

  const { _id } = useSelector((state) => state.user.user);
  console.log("user", user);
  console.log("profileInfo", profileInfo);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/${_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setProfileInfo({
          firstName: response.data.firstName || "",
          middleName: response.data.middleName || "",
          lastName: response.data.lastName || "",
          phoneNumber: response.data.phoneNumber || "",
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateProfile = () => {
    axios
      .patch(
        `http://localhost:5000/api/v1/users/updateProfile/${_id}`,
        profileInfo,
        { withCredentials: true }
      )
      .then((response) => {
        setUser(response.data.user);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "66px 8px 32px 10px" }}
        >
          <Paper>
            <Grid container spacing={2}>
              {/* First Column: User Profile Display */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: {
                      xs: "40px",
                      md: "0px",
                    },
                  }}
                >
                  <Box
                    textAlign="center"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Avatar
                      alt="User Image"
                      src={user.profilePicture}
                      sx={{
                        width: { xs: 100, md: 120, xl: 150 },
                        height: { xs: 100, md: 120, xl: 150 },
                        alignSelf: "center",
                        marginBottom: 4,
                      }}
                    />
                    <TableContainer sx={{ width: "100%" }}>
                      <Table>
                        <TableBody>
                          {userInformation.map((row, index) => (
                            <TableRow
                              key={row.label}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "#F6F5F5",
                                },
                                padding: 2,
                              }}
                            >
                              <TableCell>{row.label}</TableCell>
                              <TableCell>{row.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Grid>
              {/* Second Column: Profile Update Form */}
              <Grid item xs={12} md={6}>
                <Box p={5}>
                  <Typography
                    variant="h5"
                    color={"#112846"}
                    textAlign={"center"}
                  >
                    Update Profile
                  </Typography>

                  <Box>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      value={profileInfo?.firstName}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 2 }}
                    />
                    <InputLabel htmlFor="middleName">Middle Name</InputLabel>
                    <TextField
                      fullWidth
                      name="middleName"
                      value={profileInfo?.middleName}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      name="lastName"
                      value={profileInfo?.lastName}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      value={profileInfo?.phoneNumber}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />

                    <div
                      style={{
                        padding: "2rem",
                        background: "#f0f0f0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        border: "2px dashed #667378",
                        height: "130px",
                        width: "130px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        margin: "1.5rem auto",
                      }}
                      onMouseEnter={(event) => {
                        event.target.style.border = "2px solid #667378";
                      }}
                      onMouseLeave={(event) => {
                        event.target.style.border = "2px dashed #667378";
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
                          onChange={(e) => {
                            const file = e.target.files[0];
                            // setFileName(file?.name);

                            if (file) {
                              const reader = new FileReader();

                              reader.onload = (event) => {
                                const imageUrl = event.target.result;
                                setImage(imageUrl);
                              };

                              reader.readAsDataURL(file);
                            }
                          }}
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
                                color: "#667378",
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

                    <UpdateButton
                      type="submit"
                      variant="contained"
                      fullWidth
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </UpdateButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
