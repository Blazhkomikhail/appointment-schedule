import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { IWorklogItem } from "../../../../../models/WorklogResponce";
import WorklogCard from "../WorkLogCard/WorklogCard";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.scss";
import WorklogService from "../../../../../api/WorklogService";

const Day = ({
  dayName,
  dayNumber,
}: {
  dayName: string;
  dayNumber: number;
}) => {
  const [cardsData, setCardsData] = useState<IWorklogItem[]>([]);
  const { userData, workLogData } = useSelector(
    (store: { userData: {}; workLogData: IWorklogItem[] }) => store
  );

  useEffect(() => {
    if (!workLogData.length) return;
    setCardsData(
      workLogData
        .filter((item) => item.dayOfWeek === dayNumber)
        .sort(
          (a, b) =>
            Number(a.fromTime.split(":")[0]) - Number(b.fromTime.split(":")[0])
        )
    );
  }, [workLogData, dayNumber]);

  const onAddCardButtonClick = () => {
    setCardsData((prevState) => [
      ...prevState,
      {
        userCrmProfileID: null,
        dayOfWeek: dayNumber,
        id: uuid(),
        fromTime: "",
        toTime: "",
        createdManualy: true,
      },
    ]);
  };

  const onCardRemove = (cardId: string) => {
    setCardsData((prevState) => prevState.filter((item) => item.id !== cardId));
  };

  const setErrorCardStyles = (id: string) => {
    setCardsData((prevState) =>
      prevState.map((card) =>
        card.id === id ? { ...card, hasConflictTime: true } : card
      )
    );
  };

  const resetError = () => {
    setCardsData((prevState) =>
      prevState.map((card) => ({ ...card, hasConflictTime: false }))
    );
  };

  const createNewCard = (cardId: string, fromTime: string, toTime: string) => {
    const newWorklogData = {
      id: cardId,
      isActive: true,
      userCrmProfileID: "some3242",
      dayOfWeek: dayNumber,
      fromTime,
      toTime,
      userCrmProfile: { ...userData },
    };

    setCardsData((prevState) =>
      prevState
        .map((slot) =>
          slot.id === cardId ? { ...slot, fromTime, toTime } : slot
        )
        .sort(
          (a, b) =>
            Number(a.fromTime.split(":")[0]) - Number(b.fromTime.split(":")[0])
        )
    );
    WorklogService.createWorklog(newWorklogData);
  };

  return (
    <Paper elevation={0} sx={{ width: 223, flexShrink: 0 }}>
      <Typography variant="subtitle2" gutterBottom component="div">
        {dayName}
      </Typography>
      <div
        style={{
          borderBottom: "1px solid #c9c9c9",
          width: "100%",
          marginBottom: 20,
        }}
      />
      <div>
        {cardsData.map(
          ({ id, fromTime, toTime, hasConflictTime = false }, idx) => (
            <WorklogCard
              key={id || `${fromTime}_${idx}`}
              fromTime={fromTime}
              toTime={toTime}
              cardId={id}
              onCardRemove={onCardRemove}
              dayAppointments={cardsData}
              setErrorCard={setErrorCardStyles}
              isError={hasConflictTime}
              resetError={resetError}
              createNewCard={createNewCard}
            />
          )
        )}
      </div>
      <button className={styles.add_card_btn} onClick={onAddCardButtonClick} />
    </Paper>
  );
};

export default Day;
