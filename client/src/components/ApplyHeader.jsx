import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function ApplyHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        style={{
          backgroundColor: "#fff",
          color: "black",
          height: "70px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "230px",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              alt="FederalPolice"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Federal_Police_Commission_of_Ethiopia_Coat_of_Arms_and_Logo.jpg/220px-Federal_Police_Commission_of_Ethiopia_Coat_of_Arms_and_Logo.jpg"
              sx={{ width: 65, height: 65 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                color: "#112846",
                fontWeight: "600",
                fontSize: "24px",
              },
            }}
          >
            Private Security Agent HR Managment System
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
