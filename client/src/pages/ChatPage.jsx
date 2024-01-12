import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import truncateText from "../utils/truncate";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import AgentListForChat from "../components/AgentListForChat";
import axios from "axios";
import EachConversation from "../components/EachConversation";
import Messages from "../components/Messages";
import AdminListForChat from "../components/AdminListForChat";
import { removeCurrentConversation } from "../redux-toolkit/slices/conversation";

const CreateButton = styled(Button)({
  background: "#112846",
  transition: "transform 0.3s ease-in-out",
  color: "white",
  height: "100%",
  "&:hover": {
    background: "#112846",
    transform: "scale(0.98)",
  },
});

const ListModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const ListModalWrapper = styled(Box)({
  background: "#fff",
  height: "80vh",
  borderRadius: "5px",
  padding: "20px",
});

const ChatPage = () => {
  const dispatch = useDispatch();
  const { role, _id } = useSelector((state) => state.user.user);
  const { conversationId } = useSelector((state) => state.conversation);
  const [listModal, setListModal] = useState(false);
  const [adminListModal, setAdminListModal] = useState(false);
  const [conversationList, setConversationList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversationList = () => {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/v1/conversation/${_id}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setConversationList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    };
    getConversationList();
  }, []);

  useEffect(() => {
    if (conversationId) {
      const getMessage = async () => {
        await axios
          .get(`http://localhost:5000/api/v1/message/${conversationId}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            setMessages(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getMessage();
    }
  }, [conversationId, newMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    dispatch(removeCurrentConversation());
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationId: conversationId,
      sender: _id,
      text: newMessage,
    };
    axios
      .post("http://localhost:5000/api/v1/message/createMessage", message, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setMessages([...messages, response.data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("conversation list", conversationList);
  const sortedConversation = [...conversationList]
    .filter((conversation) => {
      return conversation.participants
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log("serarch terms", searchTerm);
  console.log(messages);
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "66px 8px 32px 10px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                sx={{
                  background: "#f3f6f4",
                  height: "calc(100vh - 128px)",
                  borderRadius: "5px",
                }}
                padding={2}
              >
                <Box
                  sx={{
                    height: "20%",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    color={"#112846"}
                  >
                    Conversations
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Search by name"
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
                      inputProps={{
                        style: {
                          height: "10px",
                        },
                      }}
                    />
                    {role === "admin" ? (
                      <CreateButton
                        variant="outlined"
                        onClick={() => setListModal(true)}
                      >
                        New
                      </CreateButton>
                    ) : role === "agent" ? (
                      <CreateButton
                        variant="outlined"
                        onClick={() => setAdminListModal(true)}
                      >
                        New
                      </CreateButton>
                    ) : null}
                  </Box>
                </Box>

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
                  {sortedConversation?.map((item, index) => (
                    <EachConversation conversation={item} key={index} />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                sx={{ background: "#f3f6f4", height: "calc(100vh - 128px)" }}
                padding={2}
              >
                {conversationId ? (
                  <Box sx={{ height: "100%" }}>
                    <Box
                      ref={scrollRef}
                      sx={{
                        height: "70%",
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px",
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
                      {messages?.map((item) => {
                        return (
                          <Box ref={scrollRef}>
                            <Messages item={item} own={item.sender === _id} />
                          </Box>
                        );
                      })}
                    </Box>
                    <TextField
                      type="text"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ background: "#fff" }}
                      value={newMessage}
                      placeholder={!newMessage ? "Write something" : newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment>
                            <IconButton onClick={handleMessageSubmit}>
                              <SendIcon />
                            </IconButton>
                            <IconButton>
                              <UploadFileIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography>Select conversation and start chat</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          <ListModalContainer
            open={listModal}
            onClose={() => setListModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ListModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "25%" }}
            >
              <Typography
                variant="h5"
                margin={2}
                padding={0}
                textAlign={"center"}
                color={"#112846"}
              >
                Select chat and start conversation
              </Typography>
              <AgentListForChat setListModal={setListModal} />
            </ListModalWrapper>
          </ListModalContainer>
          <ListModalContainer
            open={adminListModal}
            onClose={() => setAdminListModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ListModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
            >
              <Typography
                variant="h5"
                margin={2}
                padding={0}
                textAlign={"center"}
                color={"#112846"}
              >
                Select chat and start conversation
              </Typography>
              <AdminListForChat setAdminListModal={setAdminListModal} />
            </ListModalWrapper>
          </ListModalContainer>
        </Box>
      </Box>
    </>
  );
};

export default ChatPage;
