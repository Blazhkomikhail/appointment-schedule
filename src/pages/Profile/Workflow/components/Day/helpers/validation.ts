import {Time} from "./timeType";
import checkIfSomeTimeFieldEmpty from "../../../helpers/checkIfSomeTimeFieldEmpty";
import workDaySchedule from "../../../../../../helpers/constants/workDaySchedule";
import {IWorklogItem} from "../../../../../../models/responce/WorklogResponce";

interface ICheckersReturnData {
  isValid: boolean;
  source: {
    start: boolean;
    end: boolean;
  };
  errorText: string;
}

export const isAllFieldsFilled = (
  startTime: Time,
  endTime: Time
): ICheckersReturnData => {
  const isSomeStartEmpty = checkIfSomeTimeFieldEmpty(
    startTime.hours,
    startTime.minutes
  );
  const isSomeEndEmpty = checkIfSomeTimeFieldEmpty(
    endTime.hours,
    endTime.minutes
  );

  return {
    isValid: !isSomeStartEmpty && !isSomeEndEmpty,
    source: {
      start: isSomeStartEmpty,
      end: isSomeEndEmpty,
    },
    errorText: "Please fill all fields",
  };
};

export const checkStartTimeMoreThanEndTime = (
  startTime: Time,
  endTime: Time
): ICheckersReturnData => {
  const isValidValue =
    Number(endTime.hours) < Number(startTime.hours) ||
    (Number(startTime.hours) === Number(endTime.hours) &&
      Number(startTime.minutes) > Number(endTime.minutes));

  return {
    isValid: !isValidValue,
    source: {
      start: true,
      end: false,
    },
    errorText: "Start time can not be less then end time",
  };
};

export const checkStartTimeEqualToEndTime = (
  startTime: Time,
  endTime: Time
): ICheckersReturnData => {
  const isValidValue =
    Number(startTime.hours) === Number(endTime.hours) &&
      Number(startTime.minutes) === Number(endTime.minutes);

  return {
    isValid: !isValidValue,
    source: {
      start: true,
      end: false,
    },
    errorText: "Start time can not be equal to the end time",
  };
};

export const checkIsTimeValueValid = (
  startTime: Time,
  endTime: Time
): ICheckersReturnData => {
  const checkIsLengthMinValid = (timeData: Time) =>
    [timeData.hours, timeData.minutes].every(
      (item) => Number(item) >= 0 && item.length === 2
    );

  const isStartInvalid =
    Number(startTime.hours) > 23 ||
    Number(startTime.minutes) > 59 ||
    !checkIsLengthMinValid(startTime);

  const isEndInvalid =
    Number(endTime.hours) > 23 ||
    Number(endTime.minutes) > 59 ||
    !checkIsLengthMinValid(endTime);

  return {
    isValid: !isStartInvalid && !isEndInvalid,
    source: {
      start: isStartInvalid,
      end: isEndInvalid,
    },
    errorText: "Invalid value",
  };
};

export const checkWorkScheduleHours = (
  startTime: Time,
  endTime: Time
): ICheckersReturnData => {
  const isStartInvalid =
    Number(startTime.hours) < Number(workDaySchedule.start.hours) ||
    (Number(startTime.hours) === Number(workDaySchedule.start.hours) &&
      Number(startTime.minutes) < Number(workDaySchedule.start.minutes));

  const isEndInvalid =
    Number(endTime.hours) > Number(workDaySchedule.end.hours) ||
    (Number(endTime.hours) === Number(workDaySchedule.end.hours) &&
      Number(endTime.minutes) > Number(workDaySchedule.end.minutes));

  return {
    isValid: !isStartInvalid && !isEndInvalid,
    errorText: `Working hours from ${workDaySchedule.start.hours}:${workDaySchedule.start.minutes} to ${workDaySchedule.end.hours}:${workDaySchedule.end.minutes}`,
    source: {
      start: isStartInvalid,
      end: isEndInvalid,
    },
  };
};

const checkTimeSlots = (
  newStartTime: Time,
  newEndTime: Time,
  daySlotsData: IWorklogItem
  ) => {
    // daySlotsData.some()
    const MIN_MINUTES_DELAY = 5;
    const {fromTime, toTime} = daySlotsData;
    const [startTimeHours, startTimeMinutes] = fromTime.split(":").map(Number);
    const [endTimeHours, endTimeMinutes] = toTime.split(":").map(Number);
    const [newStartTimeHours, newStartTimeMinutes] = [newStartTime.hours, newStartTime.minutes].map(Number);
    const [newEndTimeHours, newEndTimeMinutes] = [newEndTime.hours, newEndTime.minutes].map(Number);

    if (newStartTimeHours > startTimeHours) {

      return newStartTimeHours > endTimeHours ||
        (newStartTimeHours === endTimeHours && newStartTimeMinutes - endTimeMinutes >= MIN_MINUTES_DELAY) ?
        'valid1' : 'invalid1';

    } else if (newStartTimeHours === startTimeHours) {

      if (newStartTimeMinutes < startTimeMinutes) {

          if (newEndTimeHours === startTimeHours) {
            return startTimeMinutes - newEndTimeMinutes >= MIN_MINUTES_DELAY ?
              'valid2' : 'invalid2';
          } else return 'invalid3';

      } else {

          if (newStartTimeHours === endTimeHours) {
             return newStartTimeMinutes - endTimeMinutes >= MIN_MINUTES_DELAY ?
                  "valid6" : "invalid6";
          } else return "invalid 4"

      };

    } else {

      return newEndTimeHours < startTimeHours ||
        (newEndTimeHours === startTimeHours && startTimeMinutes - newEndTimeMinutes >= MIN_MINUTES_DELAY) ?
          'valid4' : 'invalid5';

    }
}