import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const AgentListForChat = ({ setListModal }) => {
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { _id, firstName, middleName, lastName } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    const getAllAgentsList = () => {
      setLoading(true);
      axios
        .get("http://localhost:5000/api/v1/agents", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setAgentList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    };
    getAllAgentsList();
  }, []);

  const handleStartConversation = async (
    userId,
    agentFirstName,
    agentMiddleName,
    agentLastName
  ) => {
    await axios
      .post(
        "http://localhost:5000/api/v1/conversation/createConversation",
        {
          senderId: _id,
          recieverId: userId,
          participants:
            firstName +
            " " +
            middleName +
            " " +
            lastName +
            " " +
            agentFirstName +
            " " +
            agentMiddleName +
            " " +
            agentLastName,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setListModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Box
      sx={{
        height: "80%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
        },
      }}
    >
      {loading && (
        <Box textAlign={"center"}>
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      )}
      {agentList.map((item, index) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "35px",
            background: "lightgray",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "auto",
            marginBottom: "15px",
          }}
          key={index}
          onClick={() =>
            handleStartConversation(
              item?.userId,
              item?.firstName,
              item?.middleName,
              item?.lastName
            )
          }
        >
          <Box>
            <img
              src={`${PF}uploads/${item?.agentLogo}`}
              alt="test"
              crossOrigin="anonymous"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #112846",
              }}
            />
          </Box>
          <Box>{item?.agentName}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default AgentListForChat;
