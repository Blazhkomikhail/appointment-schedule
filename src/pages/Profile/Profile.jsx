import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import SideMenu from "../../components/SideMenu";
import { Typography, Box, TextField, Checkbox, FormGroup, FormControlLabel, InputAdornment } from '@mui/material';
import { ReactComponent as SlackIcon } from '../../assets/slack-icon.svg';
import { ReactComponent as GithubIcon } from '../../assets/github-icon.svg';
import UserService from "../../api/UserService";
import Workflow from "./Workflow/"
import styles from "./styles.module.scss";

const Profile = () => {
  const {userData} = useSelector(store => store);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isMember, setIsMember] = useState(false);
 
  useEffect(() => {
    dispatch({type: "PROFILE_PAGE_LOAD"})
  }, [dispatch]);
  
  useEffect(() => {
    if (Object.keys(userData).length) {
      setProfileData(userData);
      setIsMember(userData.isCoreTeamMember);
    }
  }, [userData]);

  useEffect(() => {
    if (!profileData.appIdentityUserID) return;

    UserService.patchUserData(
      profileData.appIdentityUserID, 
      "isCoreTeamMember", 
      {
        from: !isMember,
        to: isMember,
      });
  }, [isMember, profileData.appIdentityUserID])

  const onFieldChange = (e) => {
    const {name, value} = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }


  const onFieldBlur = (e) => {
    const {name, value} = e.target;
    UserService.patchUserData(
      profileData.appIdentityUserID, 
      name, 
      {
        from: userData.name,
        to: value,
      });
  }

  const prepairDate = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  }

  return (
    <div className={styles.container}>
      <SideMenu profile/>
      <div className={styles.content}>
        <Typography variant="h5" gutterBottom component="h5" sx={{fontWeight: "bold"}}> 
          My Profile
        </Typography>

        <Box component="div" sx={{
          marginBottom: "20px",
          padding: "16px 19px 24px 20px",
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #ebeeef",
          borderRadius: "4px",
          width: "100%",
        }}>
          <Box component="div" sx={{borderRight: "1px solid #EBEEEF", marginRight: "20px", width: "100%" }}>
            <Typography variant="subtitle1" gutterBottom component="span" sx={{fontWeight: "bold"}}>
              General info
            </Typography>

            <div style={{width: "100%", display: "flex", flexDirection: "column", flex: "1 0 auto"}}>
              <FormGroup 
                row
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  gap: "20px"
                }}
              >
                <TextField
                  value={profileData.firstName || ""}
                  id="standard-basic"
                  variant="standard"
                  label="First name"
                  name="firstName"
                  onChange={(e) => onFieldChange(e)}
                  sx={{ width: 223 }}
                  onBlur={(e) => onFieldBlur(e)}
                />
                  <TextField
                  value={profileData.lastName || ""}
                  id="standard-basic"
                  variant="standard"
                  label="Last name"
                  name="lastName"
                  onChange={(e) => onFieldChange(e)}
                  sx={{ width: 223 }}
                  onBlur={(e) => onFieldBlur(e)}
                />
                 <TextField
                    id="datetime-local"
                    variant="standard"
                    label="Date of birth"
                    type="date"
                    value={prepairDate(profileData.dateOfBirth)}
                    name="dateOfBirth"
                    onChange={(e) => onFieldChange(e)}
                    sx={{ width: 223 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onBlur={(e) => onFieldBlur(e)}
                  />
              </FormGroup>
              <FormGroup 
                row
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  gap: "20px"
                }}
              >
                <TextField
                  value={profileData.email || ""}
                  id="standard-basic"
                  variant="standard"
                  label="Email"
                  sx={{ width: 315 }}
                  name="email"
                  onChange={(e) => onFieldChange(e)}
                  onBlur={(e) => onFieldBlur(e)}
                />
                <TextField
                  value={profileData.personalEmail || ""}
                  id="standard-basic"
                  variant="standard"
                  label="Personal email"
                  sx={{ width: 315 }}
                  name="personalEmail"
                  onChange={(e) => onFieldChange(e)}
                  onBlur={(e) => onFieldBlur(e)}
                />
                <TextField
                  value={profileData.mobilePhone || ""}
                  id="standard-basic"
                  variant="standard"
                  label="Mobile phone"
                  sx={{ width: 315 }}
                  name="mobilePhone"
                  onChange={(e) => onFieldChange(e)}
                  onBlur={(e) => onFieldBlur(e)}
                />
              </FormGroup>
              <FormGroup 
                row
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  gap: "20px"
                }}
              >
                
                <TextField
                  value={prepairDate(profileData.startDate)}
                  id="datetime-local"
                  variant="standard"
                  type="date"
                  label="Start date"
                  name="startDate"
                  sx={{ width: 223 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => onFieldChange(e)}
                  onBlur={(e) => onFieldBlur(e)}
                />
                <TextField
                  value={profileData.absences || ""}
                  id="standard-basic"
                  variant="standard"
                  label="Absences"
                  name="absences"
                  sx={{ width: 223 }}
                  onChange={(e) => onFieldChange(e)}
                  onBlur={(e) => onFieldBlur(e)}
                />

                <FormControlLabel control={
                  <Checkbox 
                    checked={isMember}
                    onChange={() => setIsMember((prevState) => !prevState)}
                  />
                  } 
                  label="Core team member" 
                />
              </FormGroup>
            </div>
          </Box>
          <Box component="div" sx={{minWidth: "384px"}}>
            <Typography variant="subtitle2" component="div" sx={{fontWeight: "bold", marginBottom: 2}}>
              My accounts
            </Typography>

            <FormGroup>
              <TextField
                id="input-with-icon-textfield"
                label="Slack"
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SlackIcon />
                    
                  </InputAdornment>
                ),
                }}
                variant="standard"
                placeholder="Enter you slack user name"
                sx={{ marginBottom: 2 }}
              />
              <TextField
                id="input-with-icon-textfield"
                label="Github"
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GithubIcon />
                  </InputAdornment>
                ),
                }}
                variant="standard"
                placeholder="Enter your github user name"
              />
            </FormGroup>
          </Box>
        
        </Box>
        <Workflow />
      </div>
    </div>
  );
};

export default Profile;