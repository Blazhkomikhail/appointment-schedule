import * as React from "react";
import {
  Typography,
  Box,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";

const Workflow = () => {
  // useEffect(() => {

  // },[])

  return (
    <Box
      component="div"
      sx={{
        padding: "16px 19px 24px 20px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ebeeef",
        borderRadius: "4px",
        width: "100%",
      }}
    >
      <Typography
        variant="subtitle1"
        gutterBottom
        component="span"
        sx={{ fontWeight: "bold" }}
      >
        Work logs
      </Typography>

      <div></div>
    </Box>
  );
};

export default Workflow;
