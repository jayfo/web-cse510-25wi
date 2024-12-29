import * as React from "react";

import { CalendarItemSlides } from "@/components/CourseCalendar/CalendarItemSlides";
import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { CalendarItem, filterStudioCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayStudio: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const studioCalendarItems = filterStudioCalendarItems(calendarItems);

  if (studioCalendarItems.length === 0) {
    return null;
  }

  return studioCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid
          key={indexCurrent}
          item
          xs={12}
          sx={{
            borderLeftColor: "lightblue",
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
