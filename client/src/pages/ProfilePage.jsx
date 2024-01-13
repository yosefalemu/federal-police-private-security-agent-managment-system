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
import toast from "react-hot-toast";
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
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { _id, role } = useSelector((state) => state.user.user);

  const userInformation = [
    { label: "First Name", value: user?.firstName },
    { label: "Middle Name", value: user?.middleName },
    { label: "Last Name", value: user?.lastName },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Email", value: user?.email },
    { label: "Role", value: user?.role },
  ];

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
        toast.success("Employee profile picture uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/getsingle/${_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("log in profile", response.data);
        setUser(response.data);
        setProfileInfo({
          firstName: response.data.firstName || "",
          middleName: response.data.middleName || "",
          lastName: response.data.lastName || "",
          phoneNumber: response.data.phoneNumber || "",
          profilePicture: response.data.profilePicture || "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateProfile = () => {
    const updateData = {
      firstName: profileInfo.firstName,
      middleName: profileInfo.middleName,
      lastName: profileInfo.lastName,
      phoneNumber: profileInfo.phoneNumber,
      profilePicture: profilePicture || profileInfo.profilePicture,
    };
    console.log("data to be updated", updateData);
    axios
      .patch(
        `http://localhost:5000/api/v1/users/updateProfile/${_id}`,
        updateData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("updated data", response.data);
        setUser(response.data.user);
        setProfileInfo(response.data.user);
        console.log("log user id", user._id);
        const dataToBeUpdated = {
          firstName: profileInfo?.firstName,
          middleName: profileInfo?.middleName,
          lastName: profileInfo?.lastName,
          phoneNumber: profileInfo?.phoneNumber,
          profilePicture: profileInfo?.profilePicture,
        };

        if (role === "agent") {
          axios
            .patch(
              `http://localhost:5000/api/v1/agents/updateAgentFromUser/${user?._id}`,
              { dataToBeUpdated },
              { withCredentials: true }
            )
            .then((response) => {
              toast.success("Your profile and agent updated successfully");
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (role !== "agent") {
          toast.success("Profile updated successfully");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.msg);
      });
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log("profile info", profileInfo);

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
                      src={
                        user?.profilePicture
                          ? `${PF}uploads/${user?.profilePicture}`
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGst2EJfEU4M83w0oCJ0mpZ1O_n8jpiuvjOO4IvOFgRA&s"
                      }
                      crossOrigin="anonymous"
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
