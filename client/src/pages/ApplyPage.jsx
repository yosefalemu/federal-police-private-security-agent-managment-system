import React, { useState } from "react";
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
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ApplyHeader from "../components/ApplyHeader";
import { Link } from "react-router-dom";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const FileContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const InputContainer = styled(Box)({
  width: "50%",
  display: "flex",
  alignItems: "center",
  gap: "30px",
  padding: "14px 10px",
  marginBottom: "15px",
});

const InputLabelContainer = styled(InputLabel)({
  border: "2px dashed gray",
  padding: "5px",
  cursor: "pointer",
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

const ApplyPage = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [agentLogo, setAgentLogo] = useState("");
  const [agentFile, setAgentFile] = useState("");
  const [ownerFile, setOwnerFile] = useState("");
  const [agentUniform, setAgentUniform] = useState("");
  const [loading, setLoading] = useState(false);

  const [apply, setApply] = useState({
    agentName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    woreda: "",
    kebele: "",
  });

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
        toast.success("Agent's Logo uploaded successfully");
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
    console.log("tested");

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/documents/uploadFile", formData)
      .then((response) => {
        console.log(response);
        setAgentFile(response.data.image);
        toast.success("Agent file upload successfully");
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
    console.log("third");

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/documents/uploadFile", formData)
      .then((response) => {
        console.log(response);
        setOwnerFile(response.data.image);
        toast.success("Owner file upload successfully");
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
        toast.success("Agent's Admin profile picture uploaded successfully");
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
        toast.success("Agent's uniform uploaded successfully");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
        console.log(error);
      });
  };
  const createDocument = () => {
    const address = {
      city: apply.city,
      kebele: apply.kebele,
      woreda: apply.woreda,
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
      email: apply.email,
      phoneNumber: apply.phoneNumber,
      address: address,
      agentLogo: agentLogo,
      agentFile: agentFile,
      ownerFile: ownerFile,
      agentUniform: agentUniform,
      profilePicture: profilePicture,
    };
    console.log(documentData);

    setLoading(true);
    axios
      .post("http://localhost:5000/api/v1/documents/apply", documentData)
      .then((response) => {
        console.log(response);
        // setProfilePicture(response.data.image);
        toast.success("Document send wait response on your email");
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
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleFormChange}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
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
                <InputLabelContainer htmlFor="agentLogoInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="agentLogoInput"
                    onChange={uploadAgentsLogo}
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>Upload Agent's File</Typography>
                <InputLabelContainer htmlFor="AgentsFileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="AgentsFileInput"
                    onChange={uploadAgentsFile}
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>Upload Owner's File</Typography>
                <InputLabelContainer htmlFor="AgentsOwnerInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="AgentsOwnerInput"
                    onChange={uploadOwnerFile}
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>
                  Upload Profile Picture
                </Typography>
                <InputLabelContainer htmlFor="AgentsAdminProfilePicture">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="AgentsAdminProfilePicture"
                    onChange={uploadAgentsAdminProfilePicture}
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#112846"}>Upload Agent Uniform</Typography>
                <InputLabelContainer htmlFor="AgentsUniformUpload">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="AgentsUniformUpload"
                    onChange={uploadAgentsUniform}
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
            </FileContainer>
          </WholeInputContainer>
          <ApplyButton onClick={createDocument}>Submit Application</ApplyButton>
        </Paper>
      </Box>
    </Container>
  );
};

export default ApplyPage;
