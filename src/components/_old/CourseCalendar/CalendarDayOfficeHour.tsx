import * as React from "react";

import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import {
  CalendarItem,
  filterOfficeHourCalendarItems,
} from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayOfficeHour: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const officeHourCalendarItems = filterOfficeHourCalendarItems(calendarItems);

  if (officeHourCalendarItems.length === 0) {
    return null;
  }

  return officeHourCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid
          key={indexCurrent}
          item
          xs={12}
          sx={{
            borderLeftColor: "lightgoldenrodyellow",
            borderLeftStyle: "solid",
            borderLeftWidth: 5,
            paddingLeft: 1,
          }}
        >
          <b>{`${itemCurrent.title}`}</b>
          <CalendarItemTimeAndLocations calendarItem={itemCurrent} />
        </Grid>
      );
    },
  );
};
