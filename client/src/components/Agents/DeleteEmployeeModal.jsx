import { Modal, styled, Box, Typography, Button } from "@mui/material";
import React from "react";

const DeleteEmployeeModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DeleteEmployeeModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});
const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "25px",
  justifyContent: "space-evenly",
  marginTop: "20px",
});

const DeleteEmployeeModal = ({ deleteModal, setDeleteModal }) => {
  return (
    <DeleteEmployeeModalContainer
      open={deleteModal}
      onClose={() => setDeleteModal(false)}
    >
      <DeleteEmployeeModalWrapper>
        <Typography textAlign={"center"}>Are you sure?</Typography>
        <ButtonContainer>
          <Button variant="contained" onClick={() => setDeleteModal(false)}>
            cancel
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </ButtonContainer>
      </DeleteEmployeeModalWrapper>
    </DeleteEmployeeModalContainer>
  );
};

export default DeleteEmployeeModal;
