import * as React from "react";

import { AwayCalendarItem } from "@/types/CalendarData";
import { Alert } from "@mui/material";

export const CalendarItemAways: React.FunctionComponent<{
  awayCalendarItems: AwayCalendarItem[];
}> = ({ awayCalendarItems }) => {
  return (
    awayCalendarItems &&
    awayCalendarItems.map((awayCurrent, indexCurrent): React.ReactElement => {
      return (
        <Alert key={indexCurrent} severity="info" sx={{ marginTop: 1 }}>
          Away:{" " + awayCurrent.title}
        </Alert>
      );
    })
  );
};
