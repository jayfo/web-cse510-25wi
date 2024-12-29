import * as React from "react";

import { CalendarItemSlides } from "@/components/CourseCalendar/CalendarItemSlides";
import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { CalendarItem, filterEventCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayEvent: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const eventCalendarItems = filterEventCalendarItems(calendarItems);

  if (eventCalendarItems.length === 0) {
    return null;
  }

  return eventCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid
          key={indexCurrent}
          item
          xs={12}
          sx={{
            borderLeftColor: "lavender",
            borderLeftStyle: "solid",
            borderLeftWidth: 5,
            paddingLeft: 1,
          }}
        >
          <b>{`${itemCurrent.title}`}</b>
          <CalendarItemTimeAndLocations calendarItem={itemCurrent} />
          <CalendarItemSlides calendarItem={itemCurrent} />
        </Grid>
      );
    },
  );
};
