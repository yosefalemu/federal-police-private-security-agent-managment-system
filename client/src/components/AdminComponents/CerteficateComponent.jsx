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
  Modal,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Certeficateview from "./Certeficateview";

const CerteficateModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const CerteficateModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
});

const GenerateCeritificateButton = styled(Button)({
  marginTop: "24px",
  background: "#112846",
  borderRadius: "15px",
  "&:hover": {
    background: "#192E77",
  },
});

const CerteficateComponent = () => {
  const [loading, setLoading] = useState(false);
  const { agentName } = useSelector((state) => state.agent);
  const [certeficateModal, setCerteficateModal] = useState(false);

  const [certeficate, setCerteficate] = useState({
    agentName: "",
    address: "",
    profilePicture: "",
    level: "",
    dateOfIssuedInEthiopianCalander: "",
    dateOfIssuedInEuropeanCalander: "",
    dateOfExpiredInEthiopianCalander: "",
    dateOfExpiredInEuropeanCalander: "",
    approvedBy: "",
  });

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/api/v1/agents/getAgentName`,
        { agentName },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setCerteficate({
          agentName: response?.data?.agentName,
          address: `${response?.data?.address?.city} yeka ${response?.data?.address?.woreda} ${response.data.address.houseNumber}`,
          profilePicture: response?.data?.profilePicture,
          level: "",
          dateOfIssuedInEthiopianCalander: "",
          dateOfIssuedInEuropeanCalander: "",
          dateOfExpiredInEthiopianCalander: "",
          dateOfExpiredInEuropeanCalander: "",
          approvedBy: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [agentName]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCerteficate({
      ...certeficate,
      [name]: value,
    });
  };

  const handleGenerateCerteficate = () => {
    console.log(certeficate);
    if (
      certeficate.agentName &&
      certeficate.address &&
      certeficate.level &&
      certeficate.dateOfIssuedInEthiopianCalander &&
      certeficate.dateOfIssuedInEuropeanCalander &&
      certeficate.dateOfExpiredInEthiopianCalander &&
      certeficate.dateOfExpiredInEuropeanCalander &&
      certeficate.approvedBy &&
      certeficate.profilePicture
    ) {
      console.log("certeficate to be printed", certeficate);
      setCerteficate({
        agentName: "",
        address: "",
        profilePicture: "",
        level: "",
        dateOfIssuedInEthiopianCalander: "",
        dateOfIssuedInEuropeanCalander: "",
        dateOfExpiredInEthiopianCalander: "",
        dateOfExpiredInEuropeanCalander: "",
        approvedBy: "",
      });
      setCerteficateModal(true);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  console.log("certeficate", certeficate);

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <Paper
        sx={{
          width: "50%",
          height: "fit-content",
          padding: "20px 30px",
        }}
      >
        <Typography variant="h4" textAlign="center" marginBottom={3}>
          Generate Certeficate
        </Typography>
        <Box>
          <InputLabel htmlFor="agentName">Agent Name</InputLabel>
          <TextField
            fullWidth
            name="agentName"
            value={certeficate?.agentName}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="address">Address</InputLabel>
          <TextField
            fullWidth
            name="address"
            value={certeficate?.address}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="level">Level</InputLabel>
          <TextField
            fullWidth
            name="level"
            value={certeficate?.level}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="dateOfIssuedInEthiopianCalander">
            Date Of Issued In Ethiopian Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfIssuedInEthiopianCalander"
            type="date"
            value={certeficate?.dateOfIssuedInEthiopianCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="dateOfExpiredInEthiopianCalander">
            Date Of Expired In Ethiopian Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfExpiredInEthiopianCalander"
            type="date"
            value={certeficate?.dateOfExpiredInEthiopianCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="dateOfIssuedInEuropeanCalander">
            Date Of Issued In European Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfIssuedInEuropeanCalander"
            type="date"
            value={certeficate?.dateOfIssuedInEuropeanCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="dateOfExpiredInEuropeanCalander">
            Date Of Expired In European Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfExpiredInEuropeanCalander"
            type="date"
            value={certeficate?.dateOfExpiredInEuropeanCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />
          <InputLabel htmlFor="approvedBy">Approved By</InputLabel>
          <TextField
            fullWidth
            name="approvedBy"
            value={certeficate?.approvedBy}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
          />

          <GenerateCeritificateButton
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleGenerateCerteficate}
          >
            Generate Certeficate
          </GenerateCeritificateButton>
        </Box>
      </Paper>
      <CerteficateModalContainer
        open={certeficateModal}
        onClose={() => setCerteficateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CerteficateModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "90%" }}
          sx={{ height: "98%" }}
        >
          <Certeficateview
            certeficate={certeficate}
            setCerteficateModal={setCerteficateModal}
          />
        </CerteficateModalWrapper>
      </CerteficateModalContainer>
    </Box>
  );
};

export default CerteficateComponent;
