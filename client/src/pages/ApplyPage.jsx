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
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [agentLogo, setAgentLogo] = useState("");
  const [agentFile, setAgentFile] = useState("");
  const [ownerFile, setOwnerFile] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Add logic to handle file upload
    if (selectedFile) {
      // Perform file upload logic here
      console.log("File uploaded:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: "auto",
        }}
      >
        <Typography
          fontSize={42}
          marginBottom={2}
          fontWeight={700}
          color={"#EDC154"}
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
            color={"#EDC154"}
          >
            Fill all the required informations
          </Typography>
          <WholeInputContainer>
            <TextField
              id="agentName"
              label="Agent Name"
              name="agentName"
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
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
            />

            <FileContainer>
              <InputContainer>
                <Typography color={"#EDC154"}>
                  Upload Your Profile Picture
                </Typography>
                <InputLabelContainer htmlFor="fileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#EDC154"}>
                  Upload your nigd fikad
                </Typography>
                <InputLabelContainer htmlFor="fileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="fileInput"
                    fullWidth
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#EDC154"}>
                  Upload your nigd fikad
                </Typography>
                <InputLabelContainer htmlFor="fileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#EDC154"}>
                  Upload your nigd fikad
                </Typography>
                <InputLabelContainer htmlFor="fileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
              <InputContainer>
                <Typography color={"#EDC154"}>
                  Upload your nigd fikad
                </Typography>
                <InputLabelContainer htmlFor="fileInput">
                  <UploadFileIcon style={{ marginRight: "5px" }} />
                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </InputLabelContainer>
              </InputContainer>
            </FileContainer>
          </WholeInputContainer>
          <ApplyButton>Submit Application</ApplyButton>
        </Paper>
      </Box>
    </Container>
  );
};

export default ApplyPage;
