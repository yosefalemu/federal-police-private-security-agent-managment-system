import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const ChatListForSceAndAdmin = ({ setAdminListModal }) => {
  const [agentList, setAgentList] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { _id, firstName, middleName, lastName } = useSelector(
    (state) => state.user.user
  );

  console.log("function", setAdminListModal);

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

  useEffect(() => {
    const getAllUsersList = () => {
      setLoading(true);
      axios
        .get("http://localhost:5000/api/v1/users", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data.users);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    };
    getAllUsersList();
  }, []);
  const userList = users.filter(
    (item) => item?._id !== _id && item.role !== "agent"
  );
  const chatList = [...userList, ...agentList];

  console.log("chat list", chatList);

  const handleStartConversation = async (
    userId,
    recieverFirstName,
    recieverMiddleName,
    recieverLastName
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
            recieverFirstName +
            " " +
            recieverMiddleName +
            " " +
            recieverLastName,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        setAdminListModal(false);
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
      {chatList?.map((item, index) => (
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
              item.role === "admin" || item.role === "screener"
                ? item._id
                : item.userId,
              item?.firstName,
              item?.middleName,
              item?.lastName
            )
          }
        >
          <Box>
            <img
              src={`${PF}uploads/${item?.profilePicture}`}
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
          <Box>
            {item?.role === "admin" || item?.role === "screener"
              ? item?.firstName + " " + item?.middleName + " " + item?.lastName
              : item?.agentName}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChatListForSceAndAdmin;
