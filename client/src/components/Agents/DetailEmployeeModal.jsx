import { Modal, styled, Box } from "@mui/material";
import React from "react";

const DetailEmployeeModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DetailEmployeeModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const DetailEmployeeModal = ({ detailModal, setDetailModal }) => {
  return (
    <DetailEmployeeModalContainer
      open={detailModal}
      onClose={() => setDetailModal(false)}
    >
      <DetailEmployeeModalWrapper>Test</DetailEmployeeModalWrapper>
    </DetailEmployeeModalContainer>
  );
};

export default DetailEmployeeModal;
