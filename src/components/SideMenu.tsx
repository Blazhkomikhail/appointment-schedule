import * as React from "react";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const SideMenu = ({ profile = false }) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "64px",
        height: "100vh",
        background: "#003367",
        color: "#dadada",
      }}
    >
      <IconButton color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      <IconButton color="inherit" aria-label="dashboard">
        <DashboardOutlinedIcon />
      </IconButton>

      <IconButton
        color="inherit"
        sx={{ color: profile ? "#fff" : "inherit" }}
        aria-label="dashboard"
      >
        <PermContactCalendarIcon />
      </IconButton>
    </List>
  );
};

export default SideMenu;
