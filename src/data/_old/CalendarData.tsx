import * as React from "react";

import { ok as assert } from "assert";

import { CourseStoreLink } from "@/components/links/CourseStoreLink";
import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  OfficeHourCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

const TIME_AND_LOCATION_LECTURE = {
  time: "10:00 to 11:20",
  location: "CSE2 G10",
};

const TIME_AND_LOCATIONS_SECTION = [
  {
    time: "11:30 - 12:20",
    location: "MGH 058",
  },
  {
    time: "1:30 - 2:20",
    location: "MGH 058",
  },
];

const TIME_AND_LOCATION_EXAM_QA = {
  time: "4:00 to 5:00",
  location: "Zoom",
};

const TIME_AND_LOCATION_POSTER_SESSION = {
  time: "11:00 to 12:00",
  location: "CSE Atrium",
};

const TIME_AND_LOCATION_OFFICE_HOUR_JESSE = {
  time: "12:00 to 1:00",
  location: "CSE2 152",
};

const TIME_AND_LOCATION_OFFICE_HOUR_KATELYN = {
  time: "3:00 to 4:00",
  location: "CSE2 152",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.officeHours,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  studios: StudioCalendarItem[];
  events: EventCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2024-09-25", "Wed"),
    end: verifyCalendarDate("2024-12-09", "Mon"),
  },

  holidays: [
    {
      type: "holiday",
      title: "Veterans Day",
      date: verifyCalendarDate("2024-11-11", "Mon"),
    },
    {
      type: "holiday",
      title: "Thanksgiving",
      date: verifyCalendarDate("2024-11-28", "Thu"),
    },
    {
      type: "holiday",
      title: "Native American Heritage Day",
      date: verifyCalendarDate("2024-11-29", "Fri"),
    },
  ],

  lectures: [
    {
      type: "lecture",
      date: verifyCalendarDate("2024-09-26", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction and Overview",
      slides: "https://canvas.uw.edu/files/124292361/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-01", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction to Critique",
      slides: "https://canvas.uw.edu/files/124470186/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-03", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Diamond",
      slides: "https://canvas.uw.edu/files/124602714/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-08", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Research",
      slides: "https://canvas.uw.edu/files/124808608/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-10", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design of Everyday Things",
      slides: "https://canvas.uw.edu/files/125129909/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-15", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design of Everyday Things",
      slides: "https://canvas.uw.edu/files/125129909/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-17", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Task Analysis",
      slides: "https://canvas.uw.edu/files/125310883/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-10-22", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Storyboarding and Paper Prototyping",
      slides: "https://canvas.uw.edu/files/125517925/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-11-05", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Models and Human Performance",
      slides: "https://canvas.uw.edu/files/126193990/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-11-07", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Inspection and Usability Testing",
      slides: "https://canvas.uw.edu/files/126329737/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-11-12", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Patterns and Interface Implementation",
      slides: "https://canvas.uw.edu/files/126569767/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-11-14", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "History",
      slides: "https://canvas.uw.edu/files/126691264/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2024-11-21", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Designing for Diverse Needs",
      slides: "https://canvas.uw.edu/files/127038308/",
    },
  ],

  studios: [
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-09-27", "Fri"),
        verifyCalendarDate("2024-10-04", "Fri"),
        verifyCalendarDate("2024-10-11", "Fri"),
        verifyCalendarDate("2024-10-18", "Fri"),
        verifyCalendarDate("2024-10-25", "Fri"),
        verifyCalendarDate("2024-11-08", "Fri"),
        verifyCalendarDate("2024-11-15", "Fri"),
        verifyCalendarDate("2024-11-22", "Fri"),
        verifyCalendarDate("2024-12-06", "Fri"),
      ],
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
      title: "Studio",
    },
    {
      type: "studio",
      dates: [verifyCalendarDate("2024-10-24", "Thu")],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
      slides: "https://canvas.uw.edu/files/125633734/",
    },
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2024-11-26", "Tue"),
        verifyCalendarDate("2024-12-03", "Tue"),
        verifyCalendarDate("2024-12-05", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
    },
    {
      type: "studio",
      title: "Design Presentations",
      dates: [
        verifyCalendarDate("2024-10-29", "Tue"),
        verifyCalendarDate("2024-10-31", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "studio",
      title: "Design Presentations",
      date: verifyCalendarDate("2024-11-01", "Fri"),
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
    },
  ],

  events: [
    {
      type: "event",
      title: "Exam Q&A",
      date: verifyCalendarDate("2024-11-18", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_EXAM_QA,
      slides: "https://canvas.uw.edu/files/126571016/",
    },
    {
      type: "event",
      title: "Exam",
      date: verifyCalendarDate("2024-11-19", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "event",
      title: "Poster Session",
      date: verifyCalendarDate("2024-12-09", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_POSTER_SESSION,
    },
  ],

  officeHours: [
    {
      type: "officeHour",
      title: "Office Hour: Katelyn",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_KATELYN,
      dates: [
        verifyCalendarDate("2024-10-02", "Wed"),
        verifyCalendarDate("2024-10-09", "Wed"),
        verifyCalendarDate("2024-10-16", "Wed"),
        verifyCalendarDate("2024-10-23", "Wed"),
        verifyCalendarDate("2024-10-30", "Wed"),
        verifyCalendarDate("2024-11-06", "Wed"),
        verifyCalendarDate("2024-11-13", "Wed"),
        verifyCalendarDate("2024-11-20", "Wed"),
        verifyCalendarDate("2024-12-04", "Wed"),
      ],
    },
    {
      type: "officeHour",
      title: "Office Hour: Jesse",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_JESSE,
      dates: [
        verifyCalendarDate("2024-10-03", "Thu"),
        verifyCalendarDate("2024-10-10", "Thu"),
        verifyCalendarDate("2024-10-17", "Thu"),
        verifyCalendarDate("2024-10-24", "Thu"),
        verifyCalendarDate("2024-10-31", "Thu"),
        verifyCalendarDate("2024-11-07", "Thu"),
        verifyCalendarDate("2024-11-14", "Thu"),
        verifyCalendarDate("2024-11-21", "Thu"),
        verifyCalendarDate("2024-12-05", "Thu"),
      ],
    },
  ],

  assignments: {
    //
    // Assignment 0
    //
    assignment_0: {
      type: "assignment",
      title: "Assignment 0: Introduction Slide",
      link: SiteLinks.assignment_0_top.href,
      date: verifyCalendarDate("2024-10-02", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634757",
    },

    //
    // Milestone 1
    //
    assignment_1_1: {
      type: "assignment",
      title: "Assignment 1.1: Individual Brainstorm",
      link: SiteLinks.assignment_1_1_top.href,
      date: verifyCalendarDate("2024-09-26", "Thu"),
      submission: "canvas",
      submitCanvasTime: "10:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9635629",
    },
    assignment_1_2: {
      type: "assignment",
      title: "Assignment 1.2: Group Proposals",
      link: SiteLinks.assignment_1_2_top.href,
      date: verifyCalendarDate("2024-09-30", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634760",
    },
    assignment_1_3: {
      type: "assignment",
      title: "Assignment 1.3: Final Proposal",
      link: SiteLinks.assignment_1_3_top.href,
      date: verifyCalendarDate("2024-10-03", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634761",
    },
    assignment_1_4: {
      type: "assignment",
      title: "Assignment 1.4: Design Ideation",
      link: SiteLinks.assignment_1_4_top.href,
      date: verifyCalendarDate("2024-10-04", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9636906",
    },
    milestone_1_report: {
      type: "assignment",
      title: "Milestone 1: Report",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2024-10-07", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9636932",
    },

    //
    // Milestone 2
    //
    assignment_2_1: {
      type: "assignment",
      title: "Assignment 2.1: Design Research Plan",
      link: SiteLinks.assignment_2_1_top.href,
      date: verifyCalendarDate("2024-10-10", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9730292",
    },
    assignment_2_2: {
      type: "assignment",
      title: "Assignment 2.2: Design Research Check-In",
      link: SiteLinks.assignment_2_2_top.href,
      date: verifyCalendarDate("2024-10-17", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9730293",
    },
    milestone_2_report: {
      type: "assignment",
      title: "Milestone 2: Report",
      link: SiteLinks.milestone_2_report_top.href,
      date: verifyCalendarDate("2024-10-21", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9755342",
    },

    //
    // Milestone 3
    //
    assignment_3_1: {
      type: "assignment",
      title: "Assignment 3.1: Task Review",
      link: SiteLinks.assignment_3_1_top.href,
      date: verifyCalendarDate("2024-10-23", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9759789",
    },
    assignment_3_2: {
      type: "assignment",
      title: "Assignment 3.2: Design Review",
      link: SiteLinks.assignment_3_2_top.href,
      date: verifyCalendarDate("2024-10-28", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9764927",
    },
    // assignment_3_3: {
    //   type: "assignment",
    //   title: "Assignment 3.3: Design Presentations",
    //   link: SiteLinks.assignment_3_3_top.href,
    //   // date: verifyCalendarDate("2024-10-28", "Mon"),
    // },
    assignment_3_4: {
      type: "assignment",
      title: "Assignment 3.4: Scenarios and Storyboards",
      link: SiteLinks.assignment_3_4_top.href,
      date: verifyCalendarDate("2024-11-05", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9776564",
    },
    milestone_3_report: {
      type: "assignment",
      title: "Milestone 3: Report",
      link: SiteLinks.milestone_3_report_top.href,
      date: verifyCalendarDate("2024-11-08", "Fri"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9776723",
    },

    //
    // Milestone 4
    //
    assignment_4_1: {
      type: "assignment",
      title: "Assignment 4.1: Paper Prototype",
      link: SiteLinks.assignment_4_1_top.href,
      date: verifyCalendarDate("2024-11-12", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9793018",
    },
    assignment_4_2: {
      type: "assignment",
      title: "Assignment 4.2: Heuristic Evaluation",
      link: SiteLinks.assignment_4_2_top.href,
      date: verifyCalendarDate("2024-11-14", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9793114",
    },
    assignment_4_3: {
      type: "assignment",
      title: "Assignment 4.3: Usability Testing",
      link: SiteLinks.assignment_4_3_top.href,
      date: verifyCalendarDate("2024-11-25", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9795140",
    },
    milestone_4_report: {
      type: "assignment",
      title: "Milestone 4: Report",
      link: SiteLinks.milestone_4_report_top.href,
      date: verifyCalendarDate("2024-11-27", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9795144",
    },

    //
    // Milestone 5
    //
    assignment_5_digital_mockup: {
      type: "assignment",
      title: "Assignment 5: Digital Mockup",
      link: SiteLinks.assignment_5_digital_mockup_top.href,
      date: verifyCalendarDate("2024-12-02", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821454",
    },
    assignment_5_poster_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2024-12-02", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821457",
    },
    assignment_5_poster_final: {
      type: "assignment",
      title: "Assignment 5: Final Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2024-12-04", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9821486",
    },
    assignment_5_web_post_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2024-12-04", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
    },
    assignment_5_web_post_final: {
      type: "assignment",
      title: "Assignment 5: Final Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2024-12-06", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
    },
  },
};
