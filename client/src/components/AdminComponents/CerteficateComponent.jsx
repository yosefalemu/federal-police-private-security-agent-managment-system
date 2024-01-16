import React, { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SignatureCanvas from "react-signature-canvas";
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

const ClearButton = styled(Button)({
  marginTop: "10px",
  background: "red",
  borderRadius: "5px",
  color: "white",
  "&:hover": {
    background: "#FF6868",
  },
});

const SaveButton = styled(Button)({
  marginTop: "10px",
  background: "#112846",
  borderRadius: "5px",
  color: "white",
  "&:hover": {
    background: "#192E77",
  },
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
  const [approver, setApprover] = useState({});
  const [certeficateData, setCerteficateData] = useState({});
  const [sign, setSign] = useState("");
  const [url, setUrl] = useState("");

  const [certeficate, setCerteficate] = useState({
    agentName: "",
    address: "",
    profilePicture: "",
    level: "",
    dateOfIssuedInEuropeanCalander: "",
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
          dateOfIssuedInEuropeanCalander: "",
          dateOfExpiredInEuropeanCalander: "",
        });
        axios
          .get(
            `http://localhost:5000/api/v1/users/getsingle/${response?.data?.approvedBy}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
            setApprover(response.data);
          })
          .catch((error) => {
            console.log(error);
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
      certeficate.dateOfIssuedInEuropeanCalander &&
      certeficate.dateOfExpiredInEuropeanCalander &&
      certeficate.profilePicture &&
      approver.firstName &&
      approver.middleName &&
      approver.lastName &&
      url
    ) {
      console.log("certeficate to be printed", certeficate);
      const wholeCerteficateData = {
        agentName: certeficate.agentName,
        address: certeficate.address,
        level: certeficate.level,
        dateOfIssuedInEuropeanCalander:
          certeficate.dateOfIssuedInEuropeanCalander,
        dateOfExpiredInEuropeanCalander:
          certeficate.dateOfExpiredInEuropeanCalander,
        profilePicture: certeficate.profilePicture,
        approverFirstName: approver.firstName,
        approverMiddleName: approver.middleName,
        approverLastName: approver.lastName,
        approverSignature: url,
      };
      setCerteficateData(wholeCerteficateData);
      setCerteficateModal(true);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleClear = () => {
    sign.clear();
  };
  const handleSave = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    toast.success("Your signature set successfully");
  };

  console.log("certeficate", certeficateData);
  console.log("sign data", sign);
  console.log("url for image", url);

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
          <InputLabel htmlFor="agentName" sx={{ marginBottom: 1 }}>
            Agent Name
          </InputLabel>
          <TextField
            fullWidth
            name="agentName"
            value={certeficate?.agentName}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel htmlFor="address" sx={{ marginBottom: 1 }}>
            Address
          </InputLabel>
          <TextField
            fullWidth
            name="address"
            value={certeficate?.address}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel htmlFor="level" sx={{ marginBottom: 1 }}>
            Level
          </InputLabel>
          <TextField
            fullWidth
            name="level"
            value={certeficate?.level}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel
            htmlFor="dateOfIssuedInEuropeanCalander"
            sx={{ marginBottom: 1 }}
          >
            Date Of Issued In European Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfIssuedInEuropeanCalander"
            type="date"
            value={certeficate?.dateOfIssuedInEuropeanCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel
            htmlFor="dateOfExpiredInEuropeanCalander"
            sx={{ marginBottom: 1 }}
          >
            Date Of Expired In European Calander
          </InputLabel>
          <TextField
            fullWidth
            name="dateOfExpiredInEuropeanCalander"
            type="date"
            value={certeficate?.dateOfExpiredInEuropeanCalander}
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel htmlFor="approvedBy" sx={{ marginBottom: 1 }}>
            Approved By
          </InputLabel>
          <TextField
            fullWidth
            name="approvedBy"
            value={
              approver?.firstName +
              " " +
              approver?.middleName +
              " " +
              approver?.lastName
            }
            onChange={handleFormChange}
            sx={{ backgroundColor: "#F6F5F5", marginBottom: 3 }}
          />
          <InputLabel htmlFor="digitalsignature" sx={{ marginBottom: 1 }}>
            Your signature
          </InputLabel>
          <Box>
            <Box
              sx={{
                width: "96%",
                margin: "auto",
                height: "200px",
                border: "3px solid #112846",
              }}
            >
              <SignatureCanvas
                penColor="#112846"
                canvasProps={{
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={(data) => setSign(data)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <ClearButton fullWidth onClick={handleClear}>
                Clear
              </ClearButton>
              <SaveButton fullWidth onClick={handleSave}>
                Save
              </SaveButton>
            </Box>
          </Box>
          ,
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
            certeficateData={certeficateData}
            setCerteficateModal={setCerteficateModal}
          />
        </CerteficateModalWrapper>
      </CerteficateModalContainer>
    </Box>
  );
};

export default CerteficateComponent;
