import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Modal,
  styled,
  Button,
  Typography,
} from "@mui/material";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeFrom, setFrom } from "../../redux-toolkit/slices/agents";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import toast from "react-hot-toast";
import Textarea from "@mui/joy/Textarea";

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

const AllUsers = () => {
  const dispatch = useDispatch();
  const senderEmail = useSelector((state) => state.user.user.email);
  const emailPass = useSelector((state) => state.user.user.emailPass);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [persmission, setPersmission] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllEmployeeList = () => {
      axios
        .get("http://localhost:5000/api/v1/users", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllEmployeeList();
  }, [userId]);

  console.log("users", users);

  const sortedUsers = [...users]
    .filter((user) =>
      (user?.firstName + user?.middleName + user?.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  useEffect(() => {
    dispatch(removeFrom());
  }, []);

  const handleUpdateUserPersmission = () => {
    const dataToBeUpdated = {
      persmission,
      email,
      text,
      senderEmail,
      emailPass,
      firstName,
      middleName,
      lastName,
    };
    if (persmission === "blocked") {
      if (!text) {
        toast.error("please provide reason");
        return;
      }
    }
    axios
      .patch(
        `http://localhost:5000/api/v1/users/updateUserByAdmin/${userId}`,
        { dataToBeUpdated },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUserId("");
        setText("");
        toast.success("User updated successfully");
        setTimeout(() => {
          setConfirmModal(false);
          setDeclineModal(false);
          navigate("/allusers");
        }, 4000);

        console.log("updated data with permission", response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Can't update the user");
        setTimeout(() => {
          setConfirmModal(false);
          navigate("/allusers");
        }, 4000);
      });
  };

  if (users.length === 0) {
    return <Box>No Users</Box>;
  }
  return (
    <Box>
      <Box
        sx={{
          marginX: "auto",
          marginBottom: "10px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "80%", md: "50%" },
        }}
      >
        <TextField
          type="text"
          fullWidth
          placeholder="Search by name with out space"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", sm: "table-cell" },
                  width: "12%",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#112846",
                  display: { xs: "none", md: "table-cell" },
                  width: "12%",
                }}
              >
                Middle Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Last Name
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "5%" }}>Edit</TableCell>
              <TableCell
                sx={{ color: "#112846", width: "15%", textAlign: "center" }}
              >
                Edit Permission
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "5%" }}>
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers?.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.firstName}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.middleName}
                  </TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ width: "5%" }}>
                    <IconButton
                      sx={{ color: "orange" }}
                      onClick={() => {
                        navigate(`/allusers/editemployee/${item._id}`);
                        dispatch(setFrom("allemployee"));
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: "15%", textAlign: "center" }}>
                    {item.persmission === "allowed" ? (
                      <IconButton
                        sx={{ color: "orange" }}
                        onClick={() => {
                          setUserId(item?._id);
                          setPersmission("blocked");
                          setEmail(item?.email);
                          setFirstName(item?.firstName);
                          setMiddleName(item?.middleName);
                          setLastName(item?.lastName);
                          setDeclineModal(true);
                        }}
                      >
                        <DoDisturbIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ color: "green" }}
                        onClick={() => {
                          setUserId(item?._id);
                          setPersmission("allowed");
                          setEmail(item?.email);
                          setFirstName(item?.firstName);
                          setMiddleName(item?.middleName);
                          setLastName(item?.lastName);
                          setConfirmModal(true);
                        }}
                      >
                        <ThumbUpAltIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "5%" }}>
                    <IconButton
                      sx={{ color: "blue" }}
                      onClick={() => {
                        navigate(`/allusers/${item._id}`);
                        dispatch(setFrom("allemployee"));
                      }}
                    >
                      <SettingsAccessibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
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
              Are you sure to update user permissions?
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
                onClick={handleUpdateUserPersmission}
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
            <Typography variant="h5" textAlign={"center"} color={"#112846"}>
              Decline Reason
            </Typography>
            <Textarea
              minRows={7}
              sx={{ fontSize: "18px", marginBottom: "20px" }}
              placeholder="Send to decline reason"
              onChange={(e) => setText(e.target.value)}
            />

            <ConfirmButton
              variant="contained"
              onClick={handleUpdateUserPersmission}
            >
              Confirm
            </ConfirmButton>
          </Box>
        </DeclineModalWrapper>
      </DeclineModalContainer>
    </Box>
  );
};

export default AllUsers;
