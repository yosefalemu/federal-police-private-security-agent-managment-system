import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Textarea from "@mui/joy/Textarea";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminFile,
  setAgentFile,
  setConfirmId,
} from "../../redux-toolkit/slices/fileSilce";
import toast from "react-hot-toast";
import {
  setAllRequestDocument,
  setCurrentDocument,
} from "../../redux-toolkit/slices/document";
import PendingIcon from "@mui/icons-material/Pending";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const ConfirmModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const ConfirmModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const DeclineModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DeclineModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const ConfirmButton = styled(Button)({
  background: "#112846",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#192E77",
  },
});

const CancelButton = styled(Button)({
  background: "red",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#c9302c",
  },
});

const AllScreenerRequestList = () => {
  const dispatch = useDispatch();
  const { requestDocuments } = useSelector((state) => state.document);
  const { _id, email, emailPass } = useSelector((state) => state.user.user);
  const [allRequests, setAllRequests] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [rejectionReason, setRejectReason] = useState("");
  const [confirmId, setConfirmId] = useState("");
  const [confirmRequestId, setConfirmRequestId] = useState("");
  const [deleteRequestId, setDeleteRequestId] = useState("");
  const [connectorRequestId, setConnectorRequestId] = useState("");

  useEffect(() => {
    const getAllRequestScreenerRequestList = () => {
      axios
        .get("http://localhost:5000/api/v1/documents/getunchecked", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setAllRequests(response.data.documents);
          dispatch(setAllRequestDocument(response.data.documents));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRequestScreenerRequestList();
  }, [confirmId]);

  const handleConfirmRequest = () => {
    axios
      .patch(
        `http://localhost:5000/api/v1/documents/checkdocument/${confirmId}`,
        { checked: true, checkedBy: _id, newUpdate: false },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        setConfirmId("");
        setConfirmRequestId(connectorRequestId);
        toast.success("request done successfully");
        setTimeout(() => {
          setConfirmModal(false);
        }, 4000);
      })
      .catch((error) => {
        toast.error("error while requesting");
        setTimeout(() => {
          setConfirmModal(false);
        }, 4000);
        console.log(error);
      });
  };

  const handleRejectRequest = () => {
    axios
      .patch(
        `http://localhost:5000/api/v1/documents/rejectDocument/${confirmId}`,
        {
          text: rejectionReason,
          newUpdate: false,
          senderEmail: email,
          emailPass,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        setConfirmId("");
        toast.success("Request Rejected successfully");
        setDeleteRequestId(connectorRequestId);
        setTimeout(() => {
          setConfirmModal(false);
          setDeclineModal(false);
        }, 4000);
      })
      .catch((error) => {
        toast.error("Error while declining request");
        setTimeout(() => {
          setConfirmModal(false);
        }, 4000);
        console.log(error);
      });
  };
  console.log("allRequests", allRequests);
  console.log("scrrenner items", requestDocuments);

  const AllScreenerRequestListToDisplay = requestDocuments
    .map((item) => {
      if (item._id === deleteRequestId) {
        return { ...item, status: "rejected" };
      }
      return item;
    })
    .filter((item) => item._id !== confirmRequestId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <Box>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", sm: "table-cell" },
                  width: "15%",
                }}
              >
                Agent Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", md: "table-cell" },
                  width: "15%",
                }}
              >
                First Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "15%" }}>
                Middle Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  width: "10%",
                  textAlign: "center",
                }}
              >
                Status
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                New Version
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", lg: "table-cell" },
                  width: "5%",
                }}
              >
                Details
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  width: "12%",
                }}
              >
                Agent File
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Admin File
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "5%" }}>
                Confirm
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "5%" }}>
                Decline
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllScreenerRequestListToDisplay?.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    width: "15%",
                  }}
                >
                  {item.agentName}
                </TableCell>
                <TableCell
                  sx={{
                    width: "15%",
                  }}
                >
                  {item.firstName}
                </TableCell>
                <TableCell
                  sx={{
                    width: "15%",
                  }}
                >
                  {item.middleName}
                </TableCell>
                <TableCell
                  sx={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  {item.status === "pending" ? (
                    <Box sx={{ color: "orange" }}>
                      <PendingIcon color="red" />
                    </Box>
                  ) : (
                    <Box sx={{ color: "red" }}>
                      <CloseIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    width: "12%",
                  }}
                >
                  {item.newUpdate === "true" ? (
                    <Box sx={{ textAlign: "center", color: "green" }}>
                      <ThumbUpIcon />
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: "center", color: "red" }}>
                      <ThumbDownIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    component={Link}
                    to="/screenerrequest/applicationdetail"
                    onClick={() => {
                      dispatch(setCurrentDocument(item._id));
                    }}
                  >
                    <SettingsAccessibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "12%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    component={Link}
                    to="/screenerrequest/agentfile"
                    onClick={() => {
                      dispatch(setAgentFile(item?.agentFile));
                    }}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "12%", textAlign: "center" }}>
                  <IconButton
                    component={Link}
                    to="/screenerrequest/adminfile"
                    sx={{ color: "#EF9630" }}
                    onClick={() => {
                      dispatch(setAdminFile(item?.ownerFile));
                    }}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  <IconButton
                    disabled={item.status === "rejected"}
                    sx={{
                      color: "green",
                      "&:disabled": {
                        cursor: "not-allowed",
                        pointerEvents: "all !important",
                        color: "#00800080",
                      },
                    }}
                    onClick={() => {
                      setConfirmId(item?._id);
                      setConnectorRequestId(item?._id);
                      setConfirmModal(true);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </TableCell>

                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  <IconButton
                    disabled={item.status === "rejected"}
                    sx={{
                      color: "red",
                      "&:disabled": {
                        cursor: "not-allowed",
                        pointerEvents: "all !important",
                        color: "#FF000080",
                      },
                    }}
                    onClick={() => {
                      setConfirmId(item?._id);
                      setConnectorRequestId(item?._id);
                      setDeclineModal(true);
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <ConfirmModalContainer
                  open={confirmModal}
                  onClose={() => setConfirmModal(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ConfirmModalWrapper
                    width={{ xs: "90%", sm: "70%", md: "50%", lg: "25%" }}
                  >
                    <Box>
                      <Typography textAlign={"center"} fontSize={24}>
                        Are you sure?
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <CancelButton
                          variant="contained"
                          onClick={() => setConfirmModal(false)}
                        >
                          Cancel
                        </CancelButton>
                        <ConfirmButton
                          variant="contained"
                          onClick={() => {
                            handleConfirmRequest();
                          }}
                        >
                          Confirm
                        </ConfirmButton>
                      </Box>
                    </Box>
                  </ConfirmModalWrapper>
                </ConfirmModalContainer>
                <DeclineModalContainer
                  open={declineModal}
                  onClose={() => setDeclineModal(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <DeclineModalWrapper
                    width={{ xs: "90%", sm: "70%", md: "50%", lg: "55%" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h5"
                        textAlign={"center"}
                        color={"#112846"}
                      >
                        Decline Reason
                      </Typography>
                      <Textarea
                        minRows={6}
                        sx={{ fontSize: "18px", marginBottom: "20px" }}
                        placeholder="Send to decline reason to manager"
                        onChange={(e) => setRejectReason(e.target.value)}
                      />

                      <ConfirmButton
                        variant="contained"
                        onClick={() => {
                          handleRejectRequest();
                        }}
                      >
                        Confirm
                      </ConfirmButton>
                    </Box>
                  </DeclineModalWrapper>
                </DeclineModalContainer>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllScreenerRequestList;
