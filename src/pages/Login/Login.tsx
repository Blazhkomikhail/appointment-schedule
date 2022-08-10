import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-img.png";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LoginPageLabel } from "../../models/responce/LabelsResponse";
import LabelsService from "../../api/LabelsService";
import { Skeleton } from "@mui/material";
import AuthService from "../../api/AuthService";
import languageID from "../../helpers/constants/languageID";
import PinInput from "react-pin-input";
import Alert from "@mui/material/Alert";
import styles from "./styles.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [labels, setLabels] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [loginScreenNumber, setLoginScreenNumber] = useState<number>(1);

  enum ScreenType {
    login = 1,
    pin = 2,
  }

  useEffect(() => {
    const firstScreenlabels = [
      "login",
      "login-title",
      "send-code",
      "copyrights",
    ];
    const secondScreenlabels = [
      "invalid-login",
      "code-title",
      "submit",
      "spam-info",
    ];

    LabelsService.getLoginPageLabels(
      ["labelKey", "title"],
      loginScreenNumber === ScreenType.login
        ? firstScreenlabels
        : secondScreenlabels
    )
      .then((resp) =>
        setLabels(() => {
          const result: LoginPageLabel = {};
          resp.forEach(({ labelKey, title }) => (result[labelKey] = title));
          return result;
        })
      )
      .then(() => setIsLoading(false));
  }, [loginScreenNumber, ScreenType.login]);

  const onButtonClick = () => {
    if (loginScreenNumber === ScreenType.login) {
      AuthService.generatePassword(email, languageID)
        .then((resp) => {
          if (resp.data === "done") {
            setLoginScreenNumber(2);
          }
        })
        .catch((err) => {
          if (err.response.data === "no-email") {
            setIsError(true);
            setErrorText("The email is incorrect");
          }
        });
    } else {
      AuthService.loginWithCode(email, pin, languageID)
        .then((resp) => {
          if (resp.status === 200) {
            localStorage.setItem("token", resp.data.jwt.token);
            localStorage.setItem("refreshToken", resp.data.jwt.refreshToken);
            navigate("/dashboard");
          }
        })
        .catch((err) => setAlertText(err.response.data));
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__playground_side}>
        <h2 className={styles.login__playground_title}>Playground</h2>
        <img
          className={styles.login__playground_image}
          src={loginImage}
          alt="Login person"
        />
      </div>
      <div className={styles.login__form_side}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: loginScreenNumber === ScreenType.login ? 200 : 300,
            width: 370,
          }}
        >
          <Typography variant="h6" component="h4">
            {labels.login || "Login"}
          </Typography>

          {alertText && <Alert severity="error">{alertText}</Alert>}

          {labels["code-title"] && (
            <Typography
              variant="caption"
              display="block"
              sx={{
                fontSize: "14px",
              }}
            >
              {labels["code-title"]}
            </Typography>
          )}

          {loginScreenNumber === ScreenType.login && (
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              label={labels["login-title"]}
              variant="standard"
              helperText={errorText}
              error={isError}
            />
          )}

          {loginScreenNumber === ScreenType.pin && (
            <PinInput
              length={6}
              focus
              type="numeric"
              onChange={(value) => setPin(value)}
            />
          )}

          {isLoading && (
            <Skeleton
              variant="rectangular"
              width={117}
              height={36}
              animation="wave"
              sx={{
                alignSelf: "flex-end",
                borderRadius: "4px",
              }}
            />
          )}

          {!isLoading && (
            <Button
              onClick={onButtonClick}
              variant="contained"
              sx={{
                alignSelf: "flex-end",
                width: 117,
                height: 36,
                whiteSpace: "nowrap",
              }}
            >
              {labels["send-code"] || labels.submit}
            </Button>
          )}

          {loginScreenNumber === ScreenType.pin && (
            <Typography
              variant="caption"
              display="block"
              sx={{
                color: "#95a2a7",
                fontSize: "12px",
              }}
            >
              {labels["spam-info"] ||
                "If you do not receive the confirmation message within a few minutes, please check your Spam or Bulk E-Mail folder"}
            </Typography>
          )}
        </Box>
      </div>
      <Typography
        variant="caption"
        display="block"
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translate(-50%)",
          color: "#95a2a7",
          fontSize: "12px",
        }}
      >
        {labels.copyrights}
      </Typography>
    </div>
  );
};

export default Login;
