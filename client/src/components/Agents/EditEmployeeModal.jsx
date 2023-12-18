import {
  Modal,
  styled,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

const EditEmployeeModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const EditEmployeeModalWrapper = styled(Box)({
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

const EditEmployeeModal = ({ editModal, setEditModal }) => {
  return (
    <EditEmployeeModalContainer
      open={editModal}
      onClose={() => setEditModal(false)}
    >
      <EditEmployeeModalWrapper sx={{ width: { xs: "60%", md: "50%" } }}>
        <Box sx={{ width: "80%", margin: "auto", padding: "10px 0px" }}>
          <Typography variant="h4" textAlign={"center"} color={"#112846"}>
            Update Employee
          </Typography>
          <TextField
            id="employee_first_name"
            type="text"
            label="Employee First Name"
            name="employee_first_name"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            id="employee_last_name"
            label="Employee Last Name"
            name="employee_last_name"
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
            id="relative"
            label="Relative"
            name="relative"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <UpdateButton variant="contained" size="large" fullWidth>
            Update
          </UpdateButton>
        </Box>
      </EditEmployeeModalWrapper>
    </EditEmployeeModalContainer>
  );
};

export default EditEmployeeModal;
