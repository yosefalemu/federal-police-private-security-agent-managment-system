import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Input,
  TextField,
  Paper,
  styled,
  FormLabel,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ApplyHeader from "../components/ApplyHeader";
import { Link, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const FileContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const InputContainer = styled(Box)({
  width: "80%",
  display: "flex",
  alignItems: "center",
  gap: "30px",
  padding: "14px 10px",
  marginBottom: "15px",
});
const InputContainerUploadFile = styled(Box)({
  width: "80%",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "14px 10px",
  marginBottom: "15px",
});
const WholeInputContainer = styled(Box)({
  height: "80%",
  overflowY: "scroll",
  padding: "0px 20px 10px",
  margin: "10px 0px",
  "&::-webkit-scrollbar": {
    width: "2px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  " &::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
    borderRadius: "5px",
  },
});

const ApplyButton = styled(Button)({
  marginTop: "20px ",
  background: "#112846",
  color: "#fff",
  width: "94%",
  "&:hover": {
    background: "#192E77",
  },
});

const ReApplyPage = () => {
  const navigate = useNavigate();
  const { nationalId } = useParams();
  const [profilePicture, setProfilePicture] = useState("");
  const [agentProfilePictureImage, setAgentProfilePictureImage] = useState("");
  const [agentLogo, setAgentLogo] = useState("");
  const [agentLogoImage, setAgentLogoImage] = useState("");
  const [agentUniform, setAgentUniform] = useState("");
  const [agentUniformImage, setAgentUniformImage] = useState("");
  const [agentFile, setAgentFile] = useState("");
  const [ownerFile, setOwnerFile] = useState("");
  const [loading, setLoading] = useState(false);

  const [apply, setApply] = useState({
    agentName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    nationalId: "",
    phoneNumber: "",
    city: "",
    woreda: "",
    kebele: "",
    houseNumber: "",
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/documents/getbynationalId/${nationalId}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("fetched document", response.data);
        setApply({
          agentName: response.data.agentName,
          firstName: response.data.firstName,
          middleName: response.data.middleName,
          lastName: response.data.lastName,
          dateOfBirth: response.data.dateOfBirth,
          email: response.data.email,
          nationalId: response.data.nationalId,
          phoneNumber: response.data.phoneNumber,
          city: response.data.address.city,
          woreda: response.data.address.woreda,
          kebele: response.data.address.kebele,
          houseNumber: response.data.address.houseNumber,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          `There is no registered document with NationalId ${nationalId}`
        );
        navigate("/notfoundbynationalid");
      });
  }, [nationalId]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setApply({
      ...apply,
      [name]: value,
    });
  };

  const uploadAgentsLogo = async (e) => {
    e.preventDefault();
    console.log("first");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/users/uploadImage", formData)
      .then((response) => {
        console.log(response);
        setAgentLogo(response.data.image);
        setAgentLogoImage(URL.createObjectURL(file));
        toast.success("Agent's Logo uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };
  const uploadAgentsUniform = async (e) => {
    e.preventDefault();
    console.log("first");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/users/uploadImage", formData)
      .then((response) => {
        console.log(response);
        setAgentUniform(response.data.image);
        setAgentUniformImage(URL.createObjectURL(file));
        toast.success("Agent's uniform uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };
  const uploadAgentsAdminProfilePicture = async (e) => {
    e.preventDefault();
    console.log("first");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/users/uploadImage", formData)
      .then((response) => {
        console.log(response);
        setProfilePicture(response.data.image);
        setAgentProfilePictureImage(URL.createObjectURL(file));
        toast.success("Agent's Admin profile picture uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };
  const uploadAgentsFile = async (e) => {
    e.preventDefault();

    const fileInput = e.target;
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/documents/uploadFile", formData)
      .then((response) => {
        console.log(response);
        setAgentFile(response.data.image);
        toast.success("Agent file uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const uploadOwnerFile = async (e) => {
    e.preventDefault();

    const fileInput = e.target;
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/documents/uploadFile", formData)
      .then((response) => {
        console.log(response);
        setOwnerFile(response.data.image);
        toast.success("Owner file uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  const updateDocument = () => {
    const address = {
      city: apply.city,
      kebele: apply.kebele,
      woreda: apply.woreda,
      houseNumber: apply.houseNumber,
    };
    console.log("agentLogo", agentLogo);
    console.log("agentFile", agentFile);
    console.log("ownerFile", ownerFile);
    console.log("profile picture", profilePicture);
    console.log("profile picture", agentUniform);
    if (
      !agentLogo ||
      !agentFile ||
      !ownerFile ||
      !profilePicture ||
      !agentUniform
    ) {
      toast.error("Please upload all required files");
      return;
    }

    const documentData = {
      agentName: apply.agentName,
      firstName: apply.firstName,
      middleName: apply.middleName,
      lastName: apply.lastName,
      dateOfBirth: apply.dateOfBirth,
      email: apply.email,
      nationalId: apply.nationalId,
      phoneNumber: apply.phoneNumber,
      address: address,
      agentLogo: agentLogo,
      agentFile: agentFile,
      ownerFile: ownerFile,
      agentUniform: agentUniform,
      profilePicture: profilePicture,
      newUpdate: true,
      status: "pending",
    };
    console.log("data to be updated", documentData);

    setLoading(true);
    axios
      .patch(
        `http://localhost:5000/api/v1/documents/updatedDocumentByNationalId/${apply?.nationalId}`,
        documentData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        toast.success("Document send wait response on your email");
        setApply({
          agentName: "",
          firstName: "",
          middleName: "",
          lastName: "",
          dateOfBirth: "",
          email: "",
          nationalId: "",
          phoneNumber: "",
          city: "",
          woreda: "",
          kebele: "",
          houseNumber: "",
        });
        setAgentLogoImage(null);
        setAgentProfilePictureImage(null);
        setAgentUniformImage(null);
        setAgentFile(null);
        setOwnerFile(null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };

  return (
    <Container>
      <ApplyHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: "auto",
          position: "relative",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            position: "absolute",
            top: "80px",
            left: "20px",
            background: "#112846",
            color: "#fff",
            textDecoration: "none",
            padding: "10px 20px 10px 10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <KeyboardBackspaceIcon />
          Back
        </Box>
        <Typography
          fontSize={42}
          marginBottom={2}
          fontWeight={700}
          color={"#112846"}
        >
          Apply Here to be Certified
        </Typography>
        <Paper
          elevation={4}
          sx={{
            width: "55%",
            height: "70%",
            textAlign: "center",
            padding: "45px 0px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontWeight={"600"}
            color={"#112846"}
          >
            Fill all the required informations
          </Typography>
          <WholeInputContainer>
            {loading && (
              <Box textAlign={"center"}>
                <ClipLoader
                  color={"#36d7b7"}
                  loading={loading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            )}
            <TextField
              id="agentName"
              label="Agent Name"
              name="agentName"
              value={apply?.agentName}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              value={apply?.firstName}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="middleName"
              label="Middle Name"
              name="middleName"
              value={apply?.middleName}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              value={apply?.lastName}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <InputLabel
              htmlFor="dateOfBirth"
              sx={{ marginTop: "10px", marginBottom: "-5px" }}
            >
              <Typography textAlign={"left"} margin={0}>
                Date Of Birth
              </Typography>
            </InputLabel>
            <TextField
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              value={apply?.dateOfBirth}
              autoFocus
              variant="outlined"
              type="date"
              margin="normal"
              required
              onChange={handleFormChange}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              value={apply?.email}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="nationalId"
              label="National Id"
              name="nationalId"
              value={apply?.nationalId}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={apply?.phoneNumber}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="city"
              label="City"
              name="city"
              value={apply?.city}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="woreda"
              label="Woreda"
              name="woreda"
              value={apply?.woreda}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="kebele"
              label="Kebele"
              name="kebele"
              value={apply?.kebele}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="houseNumber"
              label="House Number"
              name="houseNumber"
              value={apply?.houseNumber}
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />

            <FileContainer>
              <InputContainer>
                <Typography color={"#112846"}>Upload Agent Logo</Typography>
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
                      onChange={(e) => uploadAgentsLogo(e)}
                    />
                    {agentLogoImage ? (
                      <img
                        src={agentLogoImage}
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
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>Upload Agent Uniform</Typography>
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
                      onChange={(e) => uploadAgentsUniform(e)}
                    />
                    {agentUniformImage ? (
                      <img
                        src={agentUniformImage}
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
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>
                  Upload Profile Picture
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
                      onChange={(e) => uploadAgentsAdminProfilePicture(e)}
                    />
                    {agentProfilePictureImage ? (
                      <img
                        src={agentProfilePictureImage}
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
              </InputContainer>
              <InputContainerUploadFile>
                <Typography color={"#112846"} sx={{ flex: "1" }}>
                  Upload Agent's File
                </Typography>
                <TextField
                  sx={{ flex: "2" }}
                  type="file"
                  fullWidth
                  onChange={uploadAgentsFile}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <UploadFileIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </InputContainerUploadFile>
              <InputContainerUploadFile>
                <Typography color={"#112846"} sx={{ flex: "1" }}>
                  Upload Owner's File
                </Typography>
                <TextField
                  sx={{ flex: "2" }}
                  type="file"
                  fullWidth
                  onChange={uploadOwnerFile}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <UploadFileIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </InputContainerUploadFile>
            </FileContainer>
          </WholeInputContainer>
          <ApplyButton onClick={updateDocument}>Submit Application</ApplyButton>
        </Paper>
      </Box>
    </Container>
  );
};

export default ReApplyPage;
