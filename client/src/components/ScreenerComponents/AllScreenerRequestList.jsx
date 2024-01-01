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
import { setCurrentDocument } from "../../redux-toolkit/slices/document";

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
  const { confirmId } = useSelector((state) => state.file);
  const [allRequests, setAllRequests] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [rejectionReason, setRejectReason] = useState("");
  useEffect(() => {
    const getAllRequestScreenerRequestList = () => {
      axios
        .get("http://localhost:5000/api/v1/documents/getunchecked", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setAllRequests(response.data.documents);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllRequestScreenerRequestList();
  }, []);

  const handleConfirmRequest = () => {
    axios
      .patch(
        `http://localhost:5000/api/v1/documents/checkdocument/${confirmId}`,
        { checked: true },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
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

  const handleDeclinedRequest = () => {
    axios
      .patch(
        `http://localhost:5000/api/v1/documents/rejectDocument/${confirmId}`,
        { text: rejectionReason },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
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

  console.log("allRequests", allRequests);
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
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Last Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  width: "10%",
                  textAlign: "center",
                }}
              >
                Phone
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
            {allRequests?.map((item, index) => (
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
                    width: "12%",
                  }}
                >
                  {item.lastName}
                </TableCell>
                <TableCell
                  sx={{
                    width: "10%",
                  }}
                >
                  {item.phoneNumber}
                </TableCell>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    component={Link}
                    to="/applicationdetail"
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
                    to="/agentsfile"
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
                    to="/adminfile"
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
                    sx={{ color: "green" }}
                    onClick={() => {
                      dispatch(setConfirmId(item?._id));
                      setConfirmModal(true);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "5%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => {
                      dispatch(setConfirmId(item?._id));
                      setDeclineModal(true);
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
              <ConfirmButton variant="contained" onClick={handleConfirmRequest}>
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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "35%" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            <Typography>Decline Reason</Typography>
            <Textarea
              minRows={5}
              sx={{ fontSize: "18px", marginBottom: "20px" }}
              placeholder="Send to decline reason to manager"
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <ConfirmButton variant="contained" onClick={handleDeclinedRequest}>
              Confirm
            </ConfirmButton>
          </Box>
        </DeclineModalWrapper>
      </DeclineModalContainer>
    </Box>
  );
};

export default AllScreenerRequestList;
