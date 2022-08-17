import { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Time } from "../Day/helpers/timeType";
import checkIfSomeTimeFieldEmpty from "../../helpers/checkIfSomeTimeFieldEmpty";
import ErrorTooltip from "../../../../../components/ErrorTooltip";
import {
  isAllFieldsFilled,
  checkStartTimeMoreThanEndTime,
  checkStartTimeEqualToEndTime,
  checkIsTimeValueValid,
  checkWorkScheduleHours,
  checkTimeSlots,
} from "../Day/helpers/validation";
import { IWorklogItem } from "../../../../../models/responce/WorklogResponce";
import styles from "./styles.module.scss";

interface IProps {
  fromTime: string;
  toTime: string;
  cardId: string;
  onCardRemove: (id: string) => void;
  dayAppointments: IWorklogItem[];
  setErrorCard: (id: string) => void;
  resetError: () => void;
  isError: boolean;
}

const WorklogCard: React.FC<IProps> = ({
  fromTime,
  toTime,
  cardId,
  onCardRemove,
  dayAppointments,
  setErrorCard,
  isError,
  resetError,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
  const errorSourceInit = {
    start: false,
    end: false,
  };
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorSource, setErrorSource] = useState(errorSourceInit);

  useEffect(() => {
    const [startHours, startMinutes] = fromTime.split(":");
    const [endHours, endMinutes] = toTime.split(":");
    const isSomeFieldEmtpty = checkIfSomeTimeFieldEmpty(
      startHours,
      startMinutes,
      endHours,
      endMinutes
    );
    if (isSomeFieldEmtpty) {
      setIsEditMode(true);
    }
  }, [fromTime, toTime]);

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
    resetErrors();
    if (value.length > 2) return;
    setStartTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onEndTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    resetErrors();
    if (value.length > 2) return;
    setEndTime((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetErrors = () => {
    setErrorMessage("");
    setErrorSource(errorSourceInit);
    resetError();
  };

  const validateTime = (startTime: Time, endTime: Time) => {
    const checkersData = [
      isAllFieldsFilled(startTime, endTime),
      checkIsTimeValueValid(startTime, endTime),
      checkStartTimeEqualToEndTime(startTime, endTime),
      checkStartTimeMoreThanEndTime(startTime, endTime),
      checkWorkScheduleHours(startTime, endTime),
      checkTimeSlots(startTime, endTime, dayAppointments),
    ];

    const errorIndex = checkersData.findIndex((item) => !item.isValid);

    if (errorIndex === -1) {
      resetErrors();
      return;
    }

    setErrorMessage(checkersData[errorIndex].errorText);
    setErrorSource(checkersData[errorIndex].source);

    if (checkersData[errorIndex].conflictCardId) {
      setErrorCard(checkersData[errorIndex].conflictCardId || "");
    }
  };

  return (
    <div
      className={styles.worklog_card}
      style={{
        borderBottom: isError ? "1px solid #f34f53" : "1px solid #c9c9c9",
      }}
    >
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
          <ErrorTooltip
            className={styles.error_tooltip}
            title={errorMessage}
            open={errorSource.start}
          >
            <div
              style={{
                display: "flex",
                marginRight: "3px",
                outline: errorSource.start ? "1px solid #d32f2f" : "none",
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
          </ErrorTooltip>
          -
          <ErrorTooltip
            className={styles.error_tooltip}
            title={errorMessage}
            open={errorSource.end}
          >
            <div
              style={{
                display: "flex",
                marginLeft: "3px",
                outline: errorSource.end ? "1px solid #d32f2f" : "none",
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
          </ErrorTooltip>
        </div>
        <div className={styles.clock_wrapper}>
          <button
            className={styles.clear_button}
            onClick={() => onCardRemove(cardId)}
          />
          {isEditMode && (
            <button
              className={styles.edit_mode_button}
              onClick={() => validateTime(startTime, endTime)}
            >
              <CheckIcon
                color="success"
                sx={{ width: "16px", height: "16px" }}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorklogCard;
