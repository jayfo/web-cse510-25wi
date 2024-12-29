import * as React from "react";

import { ok as assert } from "assert";

import { CalendarDayAssignments } from "@/components/CourseCalendar/CalendarDayAssignments";
import { CalendarDayEvent } from "@/components/CourseCalendar/CalendarDayEvent";
import { CalendarDayHoliday } from "@/components/CourseCalendar/CalendarDayHoliday";
import { CalendarDayLecture } from "@/components/CourseCalendar/CalendarDayLecture";
import { CalendarDayOfficeHour } from "@/components/CourseCalendar/CalendarDayOfficeHour";
import { CalendarDayStudio } from "@/components/CourseCalendar/CalendarDayStudio";
import { formatCalendarDate, parseCalendarDate } from "@/data/CalendarData";
import {
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  filterAssignmentCalendarItems,
  HolidayCalendarItem,
} from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";

import { CALENDAR_DATE_FORMAT } from "./CourseCalendar";

export const CalendarGridDay: React.FunctionComponent<{
  calendarDate: CalendarDate;
  calendarItems: CalendarItem[];
}> = ({ calendarDate, calendarItems }) => {
  if (calendarItems.length === 0) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Grid
        id={idAnchorText(
          formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT),
        )}
        container
        sx={{ marginTop: 2 }}
      >
        <Grid
          item
          xs={2}
          sx={{
            "& > :first-child": {
              marginTop: 0,
              marginBottom: 0,
            },
          }}
        >
          <Typography component="h3" sx={{ typography: "h4", lineHeight: 1.5 }}>
            {formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT)}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={10}
          sx={{
            "& > :first-child": {
              marginTop: 0,
              marginBottom: 0,
            },
            "& > .MuiGrid-item": {
              marginBottom: 2,
            },
          }}
        >
          <CalendarDayHoliday calendarItems={calendarItems} />

          <CalendarDayEvent calendarItems={calendarItems} />
          <CalendarDayLecture calendarItems={calendarItems} />
          <CalendarDayStudio calendarItems={calendarItems} />

          <CalendarDayAssignments calendarItems={calendarItems} />

          <CalendarDayOfficeHour calendarItems={calendarItems} />
        </Grid>
      </Grid>
    </Grid>
  );
};
