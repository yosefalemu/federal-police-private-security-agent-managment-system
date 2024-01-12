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
} from "@mui/material";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import DescriptionIcon from "@mui/icons-material/Description";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setAdminFile,
  setAgentFile,
} from "../../redux-toolkit/slices/fileSilce";
import GroupsIcon from "@mui/icons-material/Groups";
import { setCurrentAgentId } from "../../redux-toolkit/slices/agents";
import SearchIcon from "@mui/icons-material/Search";

const AgentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllAgentsList = () => {
      axios
        .get("http://localhost:5000/api/v1/agents", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setAgents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllAgentsList();
  }, []);

  const handleSetAgentFile = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:5000/api/v1/documents/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setAgentFile(response?.data?.agentFile));
        navigate("/agentsfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetAdminFile = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:5000/api/v1/documents/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setAdminFile(response?.data?.ownerFile));
        navigate("/adminfile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortedAgents = [...agents]
    .filter((agent) =>
      agent?.agentName
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

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
                Employees
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAgents?.map((item, index) => (
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
                    onClick={() => {
                      dispatch(setCurrentAgentId(item._id));
                      navigate("/agentdetail");
                    }}
                  >
                    <SettingsAccessibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "12%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    onClick={() => {
                      handleSetAgentFile(item?.documentId);
                    }}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "12%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    onClick={() => {
                      handleSetAdminFile(item?.documentId);
                    }}
                  >
                    <DescriptionIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ width: "12%", textAlign: "center" }}>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    onClick={() => {
                      dispatch(setCurrentAgentId(item._id));
                      navigate(`/agentslist/${item._id}`);
                    }}
                  >
                    <GroupsIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AgentsList;
