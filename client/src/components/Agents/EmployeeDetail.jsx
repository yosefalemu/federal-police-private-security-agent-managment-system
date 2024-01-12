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

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState({});
  const [agent, setAgent] = useState({});
  const { currentAgentId } = useSelector((state) => state.agent);
  const { role } = useSelector((state) => state.user.user);
  const { from } = useSelector((state) => state.agent);
  console.log(id);
  useEffect(() => {
    const getSingleAgentEmployee = () => {
      axios
        .get(`http://localhost:5000/api/v1/employees/getsingle/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSingleAgentEmployee();
  }, []);

  useEffect(() => {
    if (employees?.agentId) {
      const getSingleAgent = () => {
        axios
          .get(`http://localhost:5000/api/v1/agents/${employees?.agentId}`, {
            withCredentials: true,
          })
          .then((response) => {
            setAgent(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      getSingleAgent();
    }
  }, [employees.agentId]);
  console.log("employee", employees);
  console.log("agent employee detail", agent);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Box sx={{ padding: "50px 0px 0px 10px", position: "relative" }}>
      {role === "agent" && (
        <Box
          component={Link}
          to="/agentemployee"
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
      )}
      {role === "admin" && (
        <Box
          component={Link}
          to={`/agentslist/${currentAgentId}`}
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
      )}
      {from === "allemployee" && (
        <Box
          component={Link}
          to={"/allemployee"}
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
          onClick={() => {
            dispatch(removeFrom());
          }}
        >
          <KeyboardBackspaceIcon />
          Back
        </Box>
      )}
      <Typography variant="h4" textAlign={"center"} color={"#112846"}>
        Employee's Details
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
                src={`${PF}uploads/${employees.profilePicture}`}
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
              Employee Id
            </Typography>
            <Box sx={{ width: "300px", height: "150px" }}>
              <img
                src={`${PF}uploads/${employees.employeeId}`}
                alt="test"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  border: "3px solid #112846",
                }}
              />
            </Box>
          </Box>
          <hr style={{ margin: "20px 0px" }}></hr>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h5" color={"#112846"}>
              Cosigner Id
            </Typography>
            <Box sx={{ width: "300px", height: "150px" }}>
              <img
                src={`${PF}uploads/${employees.cosignerId}`}
                alt="test"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  border: "3px solid #112846",
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
                {employees.firstName}
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
                {employees.middleName}
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
                {employees.lastName}
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
                {employees.email}
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
                {employees.phoneNumber}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={500}
              >
                Status:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#112846" }}
                fontWeight={400}
              >
                {employees.status}
              </Typography>
            </ListItemForModal>
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
                {agent.agentName}
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
                  {employees?.nationalId}
                </Typography>
              </ListItemForModal>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeDetail;
