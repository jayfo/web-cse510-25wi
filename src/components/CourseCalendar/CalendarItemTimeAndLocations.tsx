import * as React from "react";

import { CalendarItem } from "@/types/CalendarData";
import { Box } from "@mui/material";

export const CalendarItemTimeAndLocations: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  const calendarItemTimeAndLocations = (() => {
    if ("timeAndLocation" in calendarItem) {
      return [calendarItem.timeAndLocation];
    } else if ("timeAndLocations" in calendarItem) {
      return calendarItem.timeAndLocations;
    } else {
      return undefined;
    }
  })();

  return (
    calendarItemTimeAndLocations &&
    calendarItemTimeAndLocations.map(
      (timeAndLocationCurrent, indexCurrent): React.ReactElement => {
        return (
          <Box key={indexCurrent} sx={{ fontSize: "0.875rem" }}>
            <Box>{timeAndLocationCurrent.time}</Box>
            <Box>{timeAndLocationCurrent.location}</Box>
          </Box>
        );
      },
    )
  );
};
