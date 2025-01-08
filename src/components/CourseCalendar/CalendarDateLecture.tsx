import * as React from "react";

import { CalendarItemAdditionalResourceReadings } from "@/components/CourseCalendar/CalendarItemAdditionalResourceReadings";
import { CalendarItemAssignments } from "@/components/CourseCalendar/CalendarItemAssignments";
import { CalendarItemAways } from "@/components/CourseCalendar/CalendarItemAways";
import { CalendarItemContentNonstandard } from "@/components/CourseCalendar/CalendarItemContentNonstandard";
import { CalendarItemGuests } from "@/components/CourseCalendar/CalendarItemGuests";
import { CalendarItemReadingsStandard } from "@/components/CourseCalendar/CalendarItemReadingsStandard";
import { CalendarItemTimeAndLocations } from "@/components/CourseCalendar/CalendarItemTimeAndLocations";
import { UnderDevelopment } from "@/components/UnderDevelopment";
import { formatCalendarDate, parseCalendarDate } from "@/data/CalendarData";
import {
  CalendarDate,
  CalendarItem,
  filterAssignmentCalendarItems,
  filterAwayCalendarItems,
  LectureCalendarItem,
} from "@/types/CalendarData";
import { idAnchorText } from "@/utils/idAnchorText";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import { Box, Collapse, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarDays } from "date-fns";

import { CALENDAR_DATE_FORMAT } from "./CourseCalendar";

export const CalendarDateLecture: React.FunctionComponent<{
  calendarDate: CalendarDate;
  lectureCalendarItem: LectureCalendarItem;
  calendarItems: CalendarItem[];
}> = ({ calendarDate, lectureCalendarItem, calendarItems }) => {
  const [expanded, setExpanded] = React.useState<boolean>(
    ((): boolean => {
      const dateCalendar = parseCalendarDate(calendarDate);
      const dateNow = Date.now();

      return differenceInCalendarDays(dateCalendar, dateNow) >= 0;
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

  const assignmentCalendarItems = filterAssignmentCalendarItems(calendarItems);
  const awayCalendarItems = filterAwayCalendarItems(calendarItems);

  return (
    <Grid
      item
      xs={12}
      key={calendarDate}
      sx={{ marginBottom: 2, marginTop: 2 }}
    >
      <Paper sx={{ padding: 2 }}>
        <Grid container>
          <Grid item xs={2}>
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
                id={idAnchorText(
                  formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT),
                )}
                component="h2"
                sx={{ typography: "h3" }}
              >
                {formatCalendarDate(calendarDate, CALENDAR_DATE_FORMAT)}
              </Typography>
            </Box>
          </Grid>
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
                justifyContent: "space-between",
              }}
            >
              <Typography
                id={idAnchorText(lectureCalendarItem.title)}
                component="h2"
                sx={{ typography: "h3" }}
              >
                {lectureCalendarItem.title}
              </Typography>
              <ExpandCircleDownOutlined
                onClick={toggleExpanded}
                sx={{ transform: rotation }}
              />
            </Box>
          </Grid>
        </Grid>
        <Collapse in={expanded} mountOnEnter unmountOnExit>
          <Grid container sx={{ marginTop: 2 }}>
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
              <CalendarItemTimeAndLocations
                calendarItem={lectureCalendarItem}
              />
            </Grid>
            <Grid
              item
              xs={10}
              sx={{
                "& > :first-child": {
                  marginTop: 0,
                  marginBottom: 0,
                },
              }}
            >
              <CalendarItemGuests calendarItem={lectureCalendarItem} />
              {lectureCalendarItem.tbd ? <UnderDevelopment /> : null}
              <CalendarItemAways awayCalendarItems={awayCalendarItems} />
              <CalendarItemAssignments
                assignmentCalendarItems={assignmentCalendarItems}
              />
              <CalendarItemReadingsStandard
                calendarItem={lectureCalendarItem}
              />
              <CalendarItemContentNonstandard
                calendarItem={lectureCalendarItem}
              />
              <CalendarItemAdditionalResourceReadings
                calendarItem={lectureCalendarItem}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
    </Grid>
  );
};
