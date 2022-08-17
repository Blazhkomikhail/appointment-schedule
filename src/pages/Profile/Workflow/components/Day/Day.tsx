import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { IWorklogItem } from "../../../../../models/responce/WorklogResponce";
import WorklogCard from "../WorkLogCard/WorklogCard";
import { v4 as uuid } from "uuid";
import styles from "./styles.module.scss";

const Day = ({
  dayName,
  dayNumber,
}: {
  dayName: string;
  dayNumber: number;
}) => {
  const [cardsData, setCardsData] = useState<IWorklogItem[]>([]);
  const { workLogData } = useSelector(
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
        dayOfWeek: dayNumber,
        id: uuid(),
        fromTime: "",
        toTime: "",
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
              key={id || `${fromTime}_idx`}
              fromTime={fromTime}
              toTime={toTime}
              cardId={id}
              onCardRemove={onCardRemove}
              dayAppointments={cardsData}
              setErrorCard={setErrorCardStyles}
              isError={hasConflictTime}
              resetError={resetError}
              // validateTime={validateTime}
              // errorText={errorMessage}
              // errorSource={errorSource}
            />
          )
        )}
      </div>
      <button className={styles.add_card_btn} onClick={onAddCardButtonClick} />
    </Paper>
  );
};

export default Day;
