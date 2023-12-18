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

const CreateButton = styled(Button)({
  marginTop: "24px",
  background: "#112846",
  borderRadius: "15px",
  "&:hover": {
    background: "#192E77",
  },
});

const CreateUserPage = () => {
  const [image, setImage] = useState(null);
  const handleFormChange = (e) => {
    // const { name, value } = e.target;
    // setProfileInfo({
    //   ...profileInfo,
    //   [name]: value,
    // });
  };

  const handleprofileInfo = (e) => {
    e.preventDefault();
  };

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
          <Box paddingLeft={{ xs: 12 }} marginLeft={{ xs: 20 }}>
            <Grid container spacing={2}>
              {/* First Column: User Profile Display */}

              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    height: "90%",
                    width: "70%",
                    marginTop: "70px",
                    borderRadius: "10px",
                  }}
                >
                  <Box p={5}>
                    <Typography
                      variant="h5"
                      color={"#112846"}
                      textAlign={"center"}
                    >
                      Create User
                    </Typography>

                    <form onSubmit={handleprofileInfo}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_number"
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
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

                      <CreateButton type="submit" variant="contained" fullWidth>
                        Create User
                      </CreateButton>
                    </form>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateUserPage;
