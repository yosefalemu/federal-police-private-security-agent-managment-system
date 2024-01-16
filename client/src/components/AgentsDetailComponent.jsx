import { Box, Typography, styled, ListItem, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import EachScreener from "./AdminComponents/EachScreener";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const AgentsDetailComponent = () => {
  const { role } = useSelector((state) => state.user.user);
  const { currentAgentId } = useSelector((state) => state.agent);
  const [agent, setAgent] = useState({});

  console.log("role here", role);

  useEffect(() => {
    const getSingleAgent = () => {
      axios
        .get(`http://localhost:5000/api/v1/agents/${currentAgentId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("each agents", response.data);
          setAgent(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleAgent();
  }, [currentAgentId]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(`${PF}uploads/${agent?.agentLogo}`);

  return (
    <Box sx={{ position: "relative" }}>
      {role === "admin" && (
        <Box
          component={Link}
          to="/agentslist"
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
      <Typography variant="h4" textAlign={"center"} color={"#112846"}>
        Agent's Details
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
              {agent?.agentLogo && (
                <img
                  src={`${PF}uploads/${agent.agentLogo}`}
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
              {agent?.agentUniform && (
                <img
                  src={`${PF}uploads/${agent.agentUniform}`}
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
                {agent?.agentName}
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
                {agent?.firstName}
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
                {agent?.middleName}
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
                {agent?.lastName}
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
                {agent?.email}
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
                {agent?.phoneNumber}
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
                {agent?.address?.city}
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
                {agent?.address?.woreda}
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
                {agent?.address?.kebele}
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
                {agent?.address?.houseNumber}
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
                  Screened By
                </Typography>
                <Typography
                  variant="body1"
                  flex={4}
                  sx={{ color: "#112846" }}
                  fontWeight={400}
                >
                  <EachScreener screenerId={agent?.checkedBy} />
                </Typography>
              </ListItemForModal>
            )}
            {role === "admin" && (
              <ListItemForModal>
                <Typography
                  variant="h6"
                  flex={4}
                  sx={{ color: "#112846" }}
                  fontWeight={500}
                >
                  Approved By
                </Typography>
                <Typography
                  variant="body1"
                  flex={4}
                  sx={{ color: "#112846" }}
                  fontWeight={400}
                >
                  <EachScreener screenerId={agent?.approvedBy} />
                </Typography>
              </ListItemForModal>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default AgentsDetailComponent;
