import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  // TextField,
  // Checkbox,
  // FormGroup,
  // FormControlLabel,
  // InputAdornment,
} from "@mui/material";
import { IWorklogItem } from "../../../models/responce/WorklogResponce";
import WorklogCard from "./components/WorkLogCard/WorklogCard";
import Day from "./components/Day/Day";
import days from "./helpers/days";

const Workflow = () => {
  const { workLogData } = useSelector(
    (store: { userData: {}; workLogData: IWorklogItem[] }) => store
  );

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

      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 20 }}
      >
        {days.map(({ name, dayOfWeek }) => (
          <Day key={name} dayName={name} dayNumber={dayOfWeek} />
        ))}
      </div>
    </Box>
  );
};

export default Workflow;
