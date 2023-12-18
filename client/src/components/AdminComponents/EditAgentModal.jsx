import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const AgentEditModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const AgentEditModalWrapper = styled(Box)({
  background: "#fff",
  height: "90vh",
  overflowY: "scroll",
  borderRadius: "5px",
  padding: "20px",
  "&::-webkit-scrollbar": {
    width: "0px",
  },
});
const UpdateButton = styled(Button)({
  marginTop: "20px",
  background: "#112846",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#192E77",
  },
});

const EditAgentModal = ({ editModal, setEditModal }) => {
  return (
    <AgentEditModalContainer
      open={editModal}
      onClose={() => setEditModal(false)}
    >
      <AgentEditModalWrapper sx={{ width: { xs: "60%", md: "50%" } }}>
        <Box sx={{ width: "80%", margin: "auto", padding: "10px 0px" }}>
          <Typography variant="h4" textAlign={"center"} color={"#112846"}>
            Update Agent
          </Typography>
          <TextField
            id="agent_name"
            type="text"
            label="Agent Name"
            name="agent_name"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="manager_name"
            label="Manager Name"
            name="manager_name"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="address"
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="startDate"
            label="Start Date"
            name="startDate"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <UpdateButton variant="contained" size="large" fullWidth>
            Update
          </UpdateButton>
        </Box>
      </AgentEditModalWrapper>
    </AgentEditModalContainer>
  );
};

export default EditAgentModal;
