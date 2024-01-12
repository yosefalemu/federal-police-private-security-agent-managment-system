import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import truncateText from "../utils/truncate";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  removeCurrentConversation,
  setConversationId,
} from "../redux-toolkit/slices/conversation";
import { format } from "timeago.js";

const EachConversation = ({ conversation }) => {
  console.log(conversation);
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user.user);
  const [senderInfo, setSenderInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberOfUnviewedMessages, setNumberOfUnviewedMessages] = useState(0);
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [messages, setMessages] = useState([]);
  const senderId = conversation.members?.find((item) => item !== _id);
  console.log(senderId);

  useEffect(() => {
    if (senderId) {
      const getSenderInfo = () => {
        const id = senderId;
        axios
          .get(`http://localhost:5000/api/v1/users/getsingle/${id}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            setSenderInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getSenderInfo();
    }
  }, [senderId]);

  useEffect(() => {
    const requestInfo = { isViewed: false, currentUserId: _id };
    const getUnviewedMessages = () => {
      axios
        .post(
          `http://localhost:5000/api/v1/message/getunviewed/${conversation._id}`,
          requestInfo,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          setNumberOfUnviewedMessages(response.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUnviewedMessages();
  }, []);

  useEffect(() => {
    const getAllMessages = () => {
      axios
        .get(`http://localhost:5000/api/v1/message/${conversation._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setMessages(response.data);
          setNumberOfMessages(response.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllMessages();
  }, []);

  const handleUpdateMessage = (conversation) => {
    console.log("to be updated", conversation);
    dispatch(setConversationId(conversation?._id));
    axios
      .post(
        `http://localhost:5000/api/v1/message/getunviewed/${conversation?._id}`,
        { isViewed: false, currentUserId: _id },
        { withCredentials: true }
      )
      .then((response) => {
        response?.data?.map(async (item) => {
          console.log("to be updated", item);
          await axios
            .patch(
              `http://localhost:5000/api/v1/message/updateView/${item._id}`,
              { isViewed: true },
              { withCredentials: true }
            )
            .then((response) => {
              console.log("updated messages", response);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(removeCurrentConversation());
  }, []);
  const lastMessage = messages[numberOfMessages - 1];
  console.log(senderId);
  console.log("senderInfo", senderInfo);
  console.log("length", numberOfUnviewedMessages);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        background: "lightgray",
        borderRadius: "5px",
        padding: "5px 10px",
        position: "relative",
        marginBottom: "8px",
      }}
      onClick={() => {
        console.log("you clicked me");
        handleUpdateMessage(conversation);
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "6px",
          right: "6px",
          background: "red",
          color: "white",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          display: numberOfUnviewedMessages > 0 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          fontSize: "12px",
        }}
      >
        {numberOfUnviewedMessages}
      </Typography>
      <Box>
        <img
          src={`${PF}uploads/${senderInfo?.profilePicture}`}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="body1">{`${senderInfo?.firstName} ${senderInfo?.middleName} ${senderInfo.lastName}`}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            {truncateText(lastMessage?.text ? lastMessage?.text : "")}
          </Typography>
          <Typography variant="body3" sx={{ fontSize: "12px" }}>
            {`${format(lastMessage?.updatedAt)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EachConversation;
