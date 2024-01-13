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
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddEmployeeButton = styled(Button)({
  marginTop: "24px",
  background: "#112846",
  borderRadius: "15px",
  "&:hover": {
    background: "#192E77",
  },
});

const AddEmployee = () => {
  const [image, setImage] = useState(null);
  const [employeeImage, setEmployeeImage] = useState(null);
  const [emergencyImage, setEmergencyImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [cosignerId, setCosignerId] = useState("");
  const [agent, setAgent] = useState({});

  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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
        toast.success("Employee profile picture uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const handleUploadEmployeeId = (e) => {
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
        setEmployeeId(response.data.image);
        setEmployeeImage(URL.createObjectURL(file));
        toast.success("Employee Id uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const handleUploadEmergencyIdUpload = (e) => {
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
        setCosignerId(response.data.image);
        setEmergencyImage(URL.createObjectURL(file));
        toast.success("Cosigner image uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

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
  }, []);

  const handleCreateEmployee = () => {
    console.log(user);
    console.log("profile picture", profilePicture);
    console.log("emergency id", employeeId);
    console.log("consiger", cosignerId);
    console.log("agentId", agent._id);
    if (!profilePicture || !employeeId || !cosignerId) {
      toast.error("Please upload all required files");
      return;
    }

    const employeeData = {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      nationalId: user.nationalId,
      employeeId: employeeId,
      profilePicture: profilePicture,
      cosignerId: cosignerId,
      agentId: agent._id,
    };
    console.log(employeeData);
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/v1/employees/createEmployee",
        employeeData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        axios
          .post(
            "http://localhost:5000/api/v1/employeeagent/createEmployeeAgent",
            {
              employeeId: response.data._id,
              agentId: agent._id,
              agentName: agent?.agentName,
            },
            { withCredentials: true }
          )
          .then((response) => {
            console.log(
              "final response including add employee to agent",
              response.data
            );
            toast.success("Employee created successfully");
            setLoading(false);
            setUser({
              firstName: "",
              middleName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              nationalId: "",
            });
            setImage(null);
            setEmergencyImage(null);
            setEmployeeImage(null);
            setProfilePicture("");
            setEmployeeId("");
            setCosignerId("");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

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
              <Typography variant="h5" color={"#112846"} textAlign={"center"}>
                Add Employee
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
                  label="National Id"
                  name="nationalId"
                  value={user.nationalId}
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
                  label="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleFormChange}
                  sx={{ backgroundColor: "#F6F5F5", marginTop: 3 }}
                />

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" color={"#112846"}>
                    Upload Employee Photo
                  </Typography>
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
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "50px" }}
                >
                  <Typography variant="h6" color={"#112846"}>
                    Upload Employee Id
                  </Typography>
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
                        onChange={(e) => handleUploadEmployeeId(e)}
                      />
                      {employeeImage ? (
                        <img
                          src={employeeImage}
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
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "50px" }}
                >
                  <Typography variant="h6" color={"#112846"}>
                    Upload Emergency Id
                  </Typography>
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
                        onChange={(e) => handleUploadEmergencyIdUpload(e)}
                      />
                      {emergencyImage ? (
                        <img
                          src={emergencyImage}
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
                </Box>

                <AddEmployeeButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleCreateEmployee}
                >
                  add Employee
                </AddEmployeeButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddEmployee;
