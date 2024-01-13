import { Box, Typography, styled, ListItem, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const ApplicationComponent = () => {
  const { role } = useSelector((state) => state.user.user);
  const { currentDocument } = useSelector((state) => state.document);
  const [document, setDocument] = useState({});

  console.log("role here", role);

  useEffect(() => {
    const getSingleDocument = () => {
      axios
        .get(`http://localhost:5000/api/v1/documents/${currentDocument}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setDocument(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleDocument();
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //   console.log(`${PF}uploads/${agent?.agentLogo}`);

  return (
    <Box sx={{ position: "relative" }}>
      {role === "screener" && (
        <Box
          component={Link}
          to="/screenerrequest"
          sx={{
            position: "absolute",
            top: "0px",
            left: "0px",
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
      )}
      {role === "admin" && (
        <Box
          component={Link}
          to="/adminRequest"
          sx={{
            position: "absolute",
            top: "0px",
            left: "0px",
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
      )}
      <Typography variant="h4" textAlign={"center"} color={"#112846"}>
        Application Detail
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
                Agents Logo
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              {document?.agentLogo && (
                <img
                  src={`${PF}uploads/${document.agentLogo}`}
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
              )}
            </Box>
          </Box>
          <hr style={{ margin: "20px 0px" }}></hr>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              color={"#112846"}
              sx={{ position: "absolute", top: "0px", right: "0px" }}
            >
              Agents Uniform
            </Typography>
            <Box sx={{ width: "300px", height: "300px" }}>
              {document?.agentUniform && (
                <img
                  src={`${PF}uploads/${document?.agentUniform}`}
                  alt="test"
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "contain",
                    border: "1px solid #112846",
                  }}
                />
              )}
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
                Agent Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.agentName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Owner First Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.firstName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Owner Middle Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.middleName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Owner Last Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.lastName}
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
                {document?.dateOfBirth}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Owner National Id:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.nationalId}
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
                {document?.email}
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
                {document?.phoneNumber}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                City:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.address?.city}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Woreda
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.address?.woreda}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Kebele
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.address?.kebele}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                House Number
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {document?.address?.houseNumber}
              </Typography>
            </ListItemForModal>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicationComponent;
