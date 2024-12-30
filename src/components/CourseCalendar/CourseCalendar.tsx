"use client";

import * as React from "react";
import { Fragment } from "react";

import { ok as assert } from "assert";

import { CalendarDateAssignments } from "@/components/CourseCalendar/CalendarDateAssignments";
import { CalendarDateHoliday } from "@/components/CourseCalendar/CalendarDateHoliday";
import { CalendarDateLecture } from "@/components/CourseCalendar/CalendarDateLecture";
import { calendarDates, calendarItemsForDate } from "@/data/CalendarData";
import {
  CalendarDate,
  filterAssignmentCalendarItems,
  filterHolidayCalendarItems,
  filterLectureCalendarItems,
} from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CALENDAR_DATE_FORMAT = "EEE MMM d";

export const CourseCalendar: React.FunctionComponent = () => {
  function renderCalendarDate(
    calendarDateCurrent: CalendarDate,
  ): React.ReactNode {
    const dateCalendarItems = calendarItemsForDate(calendarDateCurrent);
    const assignmentCalendarItems =
      filterAssignmentCalendarItems(dateCalendarItems);
    const holidayCalendarItems = filterHolidayCalendarItems(dateCalendarItems);
    const lectureCalendarItems = filterLectureCalendarItems(dateCalendarItems);

    if (lectureCalendarItems.length > 0) {
      assert(
        lectureCalendarItems.length === 1,
        `lectureCalendarItems.length for ${calendarDateCurrent} is ${lectureCalendarItems.length}`,
      );

      return (
        <CalendarDateLecture
          calendarDate={calendarDateCurrent}
          lectureCalendarItem={lectureCalendarItems[0]}
          calendarItems={dateCalendarItems}
        />
      );
    } else if (holidayCalendarItems.length > 0) {
      assert(
        holidayCalendarItems.length === 1,
        `holidayCalendarItems.length for ${calendarDateCurrent} is ${holidayCalendarItems.length}`,
      );

      return (
        <CalendarDateHoliday
          calendarDate={calendarDateCurrent}
          holidayCalendarItem={holidayCalendarItems[0]}
          calendarItems={dateCalendarItems}
        />
      );
    } else if (assignmentCalendarItems.length > 0) {
      assert(
        dateCalendarItems.length === assignmentCalendarItems.length,
        `Unexpected calendar items for ${calendarDateCurrent}`,
      );

      return (
        <CalendarDateAssignments
          calendarDate={calendarDateCurrent}
          assignmentCalendarItems={assignmentCalendarItems}
        />
      );
    } else {
      assert(
        dateCalendarItems.length === 0,
        `Unhandled calendarItems for ${calendarDateCurrent}`,
      );

      return null;
    }
  }

  return (
    <Grid container>
      {calendarDates()
        .filter((calendarDateCurrent: CalendarDate) => {
          return calendarItemsForDate(calendarDateCurrent).length > 0;
        })
        .map((calendarDateCurrent: CalendarDate, calendarDateIndex: number) => {
          return (
            <Fragment key={calendarDateIndex}>
              {renderCalendarDate(calendarDateCurrent)}
            </Fragment>
          );
        })}
    </Grid>
  );
};

// function renderAdditionalResources(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.additionalResources) {
//         return (
//             <Box>
//                 <h3>Additional Optional Resources</h3>
//                 <ul>
//                     {calendarDateCurrent.additionalResources.map(readingCurrent => (
//                         <li key={readingCurrent.title}>
//                             <p><FormattedReading reading={readingCurrent}/></p>
//                         </li>
//                     ))}
//                 </ul>
//             </Box>
//         )
//     } else {
//         return null;
//     }
// }
//
// function renderAwayJames(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.awayJames) {
//         return (
//             <Alert severity='info' sx={{marginBottom: 1}}>
//                 James will be away.
//             </Alert>
//         );
//     } else {
//         return null;
//     }
// }
//
// function renderContent(calendarDateCurrent: CalendarDate) {
//     if ('readingsStandard' in calendarDateCurrent) {
//         return (
//             <Box>
//                 <p>Read the framing paper:</p>
//                 <ul>
//                     <li>
//                         <p><FormattedReading reading={calendarDateCurrent.readingsStandard.framing}/></p>
//                     </li>
//                 </ul>
//                 <p>Select one additional reading:</p>
//                 <ul>
//                     {calendarDateCurrent.readingsStandard.instances.map(readingCurrent => (
//                         <li key={readingCurrent.title}>
//                             <p><FormattedReading reading={readingCurrent}/></p>
//                         </li>
//                     ))}
//                 </ul>
//                 <h3>Standard Reading Format</h3>
//                 <p>Post a reading report in the appropriate thread(s), by 11:59pm the night before class:</p>
//                 <p><CourseInformationLink linkName={'linkDiscussion'}/></p>
//             </Box>
//         );
//     } else if ('contentNonstandard' in calendarDateCurrent) {
//         // Non-standard content rendered in an outside component
//         return calendarDateCurrent.contentNonstandard;
//     }
// }
//
// function renderVirtual(calendarDateCurrent: CalendarDate) {
//     if (calendarDateCurrent.virtual) {
//         return (
//             <Alert severity='info' sx={{marginBottom: 1}}>
//                 Class will be conducted via Zoom, using meeting information provided by email and in Canvas.
//             </Alert>
//         );
//     } else {
//         return null;
//     }
// }
//
