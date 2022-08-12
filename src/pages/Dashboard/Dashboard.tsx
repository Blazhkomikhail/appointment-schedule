import * as React from "react";
import { useNavigate } from "react-router-dom";
import comingSoonImg from "../../assets/coming-soon-img.png";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AuthService from "../../api/AuthService";
import SideMenu from "../../components/SideMenu";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  const onLogoutButtonClick = () => {
    AuthService.logout()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      })
      .finally(() => navigate("/"));
  };

  return (
    <div className={styles.container}>
      <SideMenu />

      <div className={styles.content}>
        <img src={comingSoonImg} alt="Login person" />
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 300,
            fontSize: "40px",
            marginTop: "56px",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </Typography>
        <Button
          onClick={() => navigate("/my-profile")}
          variant="contained"
          sx={{
            marginTop: "20px",
            marginBottom: "25px",
            width: 305,
            height: 36,
            whiteSpace: "nowrap",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          Edit my profile and my worklog
        </Button>

        <Button variant="text" onClick={onLogoutButtonClick}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
