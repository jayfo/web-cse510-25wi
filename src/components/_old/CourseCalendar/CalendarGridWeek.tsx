"use client";

import * as React from "react";

import { CalendarGridDay } from "@/components/CourseCalendar/CalendarGridDay";
import { calendarItemsForDate, parseCalendarDate } from "@/data/CalendarData";
import { CalendarWeek } from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarDays } from "date-fns";

export const CalendarGridWeek: React.FunctionComponent<{
  labelWeek: string;
  calendarWeek: CalendarWeek;
}> = ({
  calendarWeek,
  labelWeek,
  // TODO: Pass and filter calendar items
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(
    ((): boolean => {
      const dateNow = Date.now();

      return (
        differenceInCalendarDays(
          parseCalendarDate(calendarWeek.startDate),
          dateNow,
        ) >= -6
      );
    })(),
  );

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const rotation = (() => {
    if (expanded) {
      return "rotate(180deg)";
    } else {
      return "rotate(0deg)";
    }
  })();

  return (
    <Grid item xs={12} sx={{ marginBottom: 2, marginTop: 2 }}>
      <Paper sx={{ padding: 2 }}>
        <Grid container>
          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                height: 1,
                "& > :first-child": {
                  marginTop: 0,
                  marginBottom: 0,
                },
              }}
            >
              <Typography
                id={idAnchorText(labelWeek)}
                component="h2"
                sx={{ typography: "h3" }}
              >
                {labelWeek}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <ExpandCircleDownOutlined
                onClick={toggleExpanded}
                sx={{ transform: rotation }}
              />
            </Box>
          </Grid>
        </Grid>
        <Collapse in={expanded} mountOnEnter unmountOnExit>
          <Grid container>
            {calendarWeek.dates.map((calendarDateCurrent) => {
              const calendarItemsCurrent =
                calendarItemsForDate(calendarDateCurrent);

              return (
                <React.Fragment key={calendarDateCurrent}>
                  <CalendarGridDay
                    calendarDate={calendarDateCurrent}
                    calendarItems={calendarItemsCurrent}
                  />
                </React.Fragment>
              );
            })}
          </Grid>
        </Collapse>
      </Paper>
    </Grid>
  );
};
