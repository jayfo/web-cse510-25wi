import * as React from "react";

import { ok as assert } from "assert";

import { formatCalendarDate } from "@/data/CalendarData";
import {
  CalendarDate,
  CalendarItem,
  filterAssignmentCalendarItems,
  HolidayCalendarItem,
} from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { Grid, Typography } from "@mui/material";

import { CALENDAR_DATE_FORMAT } from "./CourseCalendar";

export const CalendarDateHoliday: React.FunctionComponent<{
  calendarDate: CalendarDate;
  holidayCalendarItem: HolidayCalendarItem;
  calendarItems: CalendarItem[];
}> = ({ calendarDate, holidayCalendarItem, calendarItems }) => {
  const assignmentCalendarItems = filterAssignmentCalendarItems(calendarItems);

  assert(
    assignmentCalendarItems.length === 0,
    `assignmentCalendarItems.length for ${calendarDate} is ${assignmentCalendarItems.length}`,
  );

  return (
    <Grid
      item
      container
      key={calendarDate}
      sx={{ marginLeft: 2, marginRight: 2 }}
    >
      <Grid item xs={2}>
        <Typography
          id={idAnchorText(
            formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT),
          )}
          component="h2"
          sx={{ typography: "h3", color: "#aaaaaa" }}
        >
          {formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT)}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          id={idAnchorText(holidayCalendarItem.title)}
          component="h2"
          sx={{ typography: "h3", color: "#aaaaaa" }}
        >
          {`Holiday: ${holidayCalendarItem.title}`}
        </Typography>
      </Grid>
    </Grid>
  );
};
