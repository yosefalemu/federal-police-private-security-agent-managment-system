import { Box, List, Typography, styled, ListItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSelector, useDispatch } from "react-redux";
import { removeFrom } from "../../redux-toolkit/slices/agents";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { currentAgentId } = useSelector((state) => state.agent);
  const { role } = useSelector((state) => state.user.user);
  console.log(id);
  useEffect(() => {
    const getSingleAgentEmployee = () => {
      axios
        .get(`http://localhost:5000/api/v1/users/getsingle/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleAgentEmployee();
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Box sx={{ padding: "50px 0px 0px 10px", position: "relative" }}>
      <Box
        component={Link}
        to="/allusers"
        sx={{
          position: "absolute",
          top: "40px",
          left: "20px",
          background: "#112846",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 20px 10px 10px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <KeyboardBackspaceIcon />
        Back
      </Box>

      <Typography variant="h4" textAlign={"center"} color={"#112846"}>
        User's Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            flex: "1",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <Box>
              <Typography variant="h5" color={"#112846"}>
                Profile picture
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              <img
                src={`${PF}uploads/${user?.profilePicture}`}
                alt="test"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #112846",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: "1", padding: "20px" }}>
          <List>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                First Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.firstName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Middle Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.middleName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Last Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.lastName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Email:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.email}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Phone Number:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.phoneNumber}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Date Of Birth:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.dateOfBirth}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Role:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {user?.role}
              </Typography>
            </ListItemForModal>
            {role === "admin" && (
              <ListItemForModal>
                <Typography
                  variant="h6"
                  flex={4}
                  sx={{ color: "#112846" }}
                  fontWeight={500}
                >
                  National Id:
                </Typography>
                <Typography
                  variant="body1"
                  flex={4}
                  sx={{ color: "#112846" }}
                  fontWeight={400}
                >
                  {user?.nationalId}
                </Typography>
              </ListItemForModal>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;
