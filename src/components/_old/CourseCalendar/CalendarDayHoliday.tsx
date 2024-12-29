import * as React from "react";

import { CalendarItem, filterHolidayCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayHoliday: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const holidayCalendarItems = filterHolidayCalendarItems(calendarItems);

  if (holidayCalendarItems.length === 0) {
    return null;
  }

  return holidayCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid
          key={indexCurrent}
          item
          xs={12}
          sx={{
            borderLeftColor: "orange",
            borderLeftStyle: "solid",
            borderLeftWidth: 5,
            paddingLeft: 1,
          }}
        >
          {itemCurrent.title}
        </Grid>
      );
    },
  );
};
