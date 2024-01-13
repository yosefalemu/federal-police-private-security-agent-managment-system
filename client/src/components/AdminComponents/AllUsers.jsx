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
  const { role } = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [persmission, setPersmission] = useState("");
  const [email, setEmail] = useState("");

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
  }, []);

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
    const dataToBeUpdated = { persmission, email };
    axios
      .patch(
        `http://localhost:5000/api/v1/users/updateUserByAdmin/${userId}`,
        { dataToBeUpdated },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success("User updated successfully");
        setTimeout(() => {
          setConfirmModal(false);
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
                Email
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "12%" }}>
                Phone Number
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>Edit</TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>
                Permission
              </TableCell>
              <TableCell sx={{ color: "#112846", width: "3%" }}>
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
                    {item.email}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {item.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ width: "3%" }}>
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
                  <TableCell sx={{ width: "3%" }}>
                    {item.persmission === "allowed" ? (
                      <IconButton
                        sx={{ color: "green" }}
                        onClick={() => {
                          setUserId(item?._id);
                          setPersmission("blocked");
                          setEmail(item?.email);
                          setConfirmModal(true);
                        }}
                      >
                        <ThumbUpAltIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ color: "orange" }}
                        onClick={() => {
                          setUserId(item?._id);
                          setPersmission("allowed");
                          setEmail(item?.email);
                          setConfirmModal(true);
                        }}
                      >
                        <DoDisturbIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: "3%" }}>
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
    </Box>
  );
};

export default AllUsers;
