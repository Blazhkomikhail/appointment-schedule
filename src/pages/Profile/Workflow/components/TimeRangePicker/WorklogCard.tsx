import { useState, useEffect } from "react";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { TextField } from "@mui/material";
import styles from "./styles.module.scss";

const WorklogCard = ({
  fromTime,
  toTime,
  cardId,
  onCardRemove,
}: {
  fromTime: string;
  toTime: string;
  cardId: string;
  onCardRemove: (id: string) => void;
}) => {
  const [startTime, setStartTime] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: "",
    minutes: "",
  });
  const [endTime, setEndTime] = useState<{ hours: string; minutes: string }>({
    hours: "",
    minutes: "",
  });

  useEffect(() => {
    if (!fromTime || !toTime) return;
    const [startHours, startMinutes] = fromTime.split(":");
    const [endHours, endMinutes] = toTime.split(":");

    setStartTime({
      hours: startHours,
      minutes: startMinutes,
    });
    setEndTime({
      hours: endHours,
      minutes: endMinutes,
    });
  }, [fromTime, toTime]);

  const onStartTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 2) return;
    setStartTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onEndTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.length > 2) return;
    setEndTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.worklog_card}>
      <span
        style={{ fontSize: "12px", color: "#95A2A7", marginBottom: "10px" }}
      >
        start/ end time
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              marginRight: "3px",
            }}
          >
            <input
              type="number"
              name="hours"
              data-time-type="start"
              value={startTime.hours}
              onChange={(e) => onStartTimeInputChange(e)}
              className={styles.time_input}
              placeholder="06"
            />
            :
            <input
              type="number"
              name="minutes"
              data-time-type="start"
              value={startTime.minutes}
              onChange={(e) => onStartTimeInputChange(e)}
              className={styles.time_input}
              placeholder="00"
            />
          </div>
          -
          <div
            style={{
              display: "flex",
              marginLeft: "3px",
            }}
          >
            <input
              type="number"
              name="hours"
              value={endTime.hours}
              onChange={(e) => onEndTimeInputChange(e)}
              className={styles.time_input}
              placeholder="20"
            />
            :
            <input
              type="number"
              name="minutes"
              data-time-type="end"
              value={endTime.minutes}
              onChange={(e) => onEndTimeInputChange(e)}
              className={styles.time_input}
              placeholder="00"
            />
          </div>
        </div>
        <div className={styles.clock_wrapper}>
          <button
            className={styles.clear_button}
            onClick={() => onCardRemove(cardId)}
          />
        </div>
      </div>
      {/* <TextField
        value={fromTime.hours}
        type="number"
        id="standard-basic"
        variant="standard"
        name="hours"
        inputProps={{ maxLength: 2, disableUnderline: true }}
        onChange={(e) => console.log(e)}
        sx={{ width: 20 }}
      />
      :
      <TextField
        value={fromTime.hours}
        type="number"
        id="standard-basic"
        variant="standard"
        name="minutes"
        inputProps={{ maxLength: 2, disableUnderline: true }}
        onChange={(e) => console.log(e)}
        sx={{ width: 20 }}
      /> */}
      {/* <TimePicker
        label="Time"
        value={fromTime}
        onChange={(newValue) => setFromTime(newValue)}
        renderInput={(params: any) => <TextField {...params} />}
        ampm={false}
      />
      <TimePicker
        label="Time"
        value={toTime}
        onChange={(newValue) => setToTime(newValue)}
        renderInput={(params: any) => <TextField {...params} />}
      /> */}
    </div>
  );
};

export default WorklogCard;
