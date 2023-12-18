import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";

const drawerWidth = "230px";

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "#112846",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  minWidth: 56,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 56,
  [theme.breakpoints.up("sm")]: {
    width: 56,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  width: 56,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: "ease-in-out 0.5s",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LogOutContainer = styled(ListItem)({
  position: "absolute",
  bottom: "0",
  left: "0",
  borderTop: "1px solid white",
});

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const location = useLocation();
  const { role } = useSelector((state) => state.user.user);
  console.log(role);

  const isActive = (route) => location.pathname === `/${route}`;

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open} transitionDuration={600}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ height: "100%", position: "relative", padding: "2" }}>
          {role === "admin" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("home") ? "lightgray" : "transparent",
              }}
              component={Link}
              to="/home"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon sx={{ color: "white", fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Requests"
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem
            disablePadding
            sx={{
              display: "block",
              padding: { md: "0px 5px 0px 0px" },
              color: "black",
              background: isActive("profile") ? "lightgray" : "transparent",
            }}
            component={Link}
            to="/profile"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "white", fontSize: "28px" }} />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                sx={{
                  opacity: open ? 1 : 0,
                  display: { xs: "none", md: "block" },
                  color: "white",
                }}
              />
            </ListItemButton>
          </ListItem>
          {role === "admin" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("agentslist")
                  ? "lightgray"
                  : "transparent",
              }}
              component={Link}
              to="/agentslist"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SecurityIcon sx={{ color: "white", fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Agents"
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {/* {role === "admin" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("allemployee")
                  ? "lightgray"
                  : "transparent",
              }}
              component={Link}
              to="/allemployee"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "white", fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="All Employees"
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )} */}

          {/* {(role === "admin" || "manager" || "agent") && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("agentemployee")
                  ? "lightgray"
                  : "transparent",
              }}
              component={Link}
              to="/agentemployee"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon sx={{ color: "white", fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Employees"
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )} */}

          {role === "agent" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("addemployee")
                  ? "lightgray"
                  : "transparent",
              }}
              component={Link}
              to="/addemployee"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <GroupAddIcon sx={{ color: "white", fontSize: "28px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Add Employee"
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "white",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <LogOutContainer
            disablePadding
            sx={{ display: "block" }}
            onClick={handleLogOut}
          >
            <Divider />
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  display: { xs: "none", md: "block" },
                  color: "red",
                }}
              />
            </ListItemButton>
          </LogOutContainer>
        </List>
      </Drawer>
    </Box>
  );
}
