import { Box, Modal, styled } from "@mui/material";
import React from "react";

const AgentDetailModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const AgentDetailModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const DetailAgentModal = ({ detailModal, setDetailModal }) => {
  console.log(detailModal);
  return (
    <AgentDetailModalContainer
      open={detailModal}
      onClose={() => setDetailModal(false)}
    >
      <AgentDetailModalWrapper>Test</AgentDetailModalWrapper>
    </AgentDetailModalContainer>
  );
};

export default DetailAgentModal;
