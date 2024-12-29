"use client";

import * as React from "react";

import { CalendarGridWeek } from "@/components/CourseCalendar/CalendarGridWeek";
import { calendarWeeks } from "@/data/CalendarData";
import { Grid } from "@mui/material";

export const CALENDAR_DATE_FORMAT = "EEE MMM d";

export const CourseCalendar: React.FunctionComponent = () => {
  return (
    <Grid container>
      {calendarWeeks().map((calendarWeekCurrent, calendarWeekIndex: number) => {
        return (
          <React.Fragment key={calendarWeekIndex}>
            <CalendarGridWeek
              labelWeek={(() => {
                return `Week ${calendarWeekIndex + 1}`;
              })()}
              calendarWeek={calendarWeekCurrent}
            />
          </React.Fragment>
        );
      })}
    </Grid>
  );
};
