import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  styled,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserFail,
  loginUserStart,
  loginUserSuccess,
} from "../redux-toolkit/slices/userSlice";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

const LoginButton = styled(Button)({
  marginTop: "20px",
  background: "#112846",
  color: "#fff",
  variant: "contained",
  "&:hover": {
    background: "#192E77",
  },
});
const LogInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingUser, errorUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleLogin = () => {
    dispatch(loginUserStart());
    axios
      .post("http://localhost:5000/api/v1/auth/login", user, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        dispatch(loginUserSuccess(response.data));
        toast.success("Logged in");
        setTimeout(() => {
          navigate("/profile");
        }, 4000);
      })
      .catch((error) => {
        dispatch(loginUserFail());
        toast.error(error?.response?.data?.msg);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <LoginHeader />
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ width: "30%", padding: "20px 30px 80px 30px" }}>
          <Typography
            component="h1"
            variant="h4"
            textAlign={"center"}
            color={"#112846"}
            fontWeight={700}
            sx={{ marginBottom: "30px" }}
          >
            Login
          </Typography>
          {loadingUser && (
            <Box textAlign={"center"}>
              <ClipLoader
                color={"#36d7b7"}
                loading={loadingUser}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          )}
          <Box>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={handleFormChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleFormChange}
            />
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </LoginButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LogInPage;
