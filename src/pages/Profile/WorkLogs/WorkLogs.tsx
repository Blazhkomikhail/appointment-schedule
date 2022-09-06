import { Typography, Box } from "@mui/material";
import Day from "./components/Day/Day";
import days from "./helpers/days";

const WorkLogs = () => (
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

    <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
      {days.map(({ name, dayOfWeek }) => (
        <Day key={name} dayName={name} dayNumber={dayOfWeek} />
      ))}
    </div>
  </Box>
);

export default WorkLogs;
