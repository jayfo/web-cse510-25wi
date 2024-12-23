import * as React from "react";

import { Reading } from "@/types/Reading";

/**
 * Store calendar dates as YYYY-MM-DD strings (e.g., "2023-09-28").
 */
export type CalendarDate = string;

/**
 * One or more dates associated with a calendar item.
 */
export type BaseCalendarItemDate = {
  date: CalendarDate;
};

export type BaseCalendarItemDates =
  | BaseCalendarItemDate
  | {
      dates: CalendarDate[];
    };

/**
 * One or more guests potentially associated with a calendar item.
 */
export type BaseCalendarItemGuests =
  | {}
  | {
      guest: {
        name: string;
        link?: string;
      };
    }
  | {
      guests: {
        name: string;
        link?: string;
      }[];
    };

/**
 * One or more times and locations potentially associated with a calendar item.
 */
export type BaseCalendarItemTimeAndLocations =
  | {}
  | {
      timeAndLocation: {
        time: string;
        location: string;
      };
    }
  | {
      timeAndLocations: {
        time: string;
        location: string;
      }[];
    };

/**
 * Calendar item types.
 */

export type AssignmentCalendarItemSubmission =
  | {}
  | {
      submission: "canvas";
      submitCanvasTime: string;
      submitCanvasLink: string;
    };

export type AssignmentCalendarItem = {
  type: "assignment";
  title: string;
  link?: string;
} & BaseCalendarItemDate &
  AssignmentCalendarItemSubmission;

export type HolidayCalendarItem = {
  type: "holiday";
  title: string;
} & BaseCalendarItemDates;

export type LectureCalendarItemContent =
  | {}
  | { contentNonstandard: React.ReactNode }
  | {
      readingsStandard: {
        framing: Reading;
        instances: Reading[];
      };
    };

export type LectureCalendarItemAdditionalResourceReadings =
  | {}
  | { additionalResourceReadings: Reading[] };

export type LectureCalendarItem = {
  type: "lecture";
  title: string;
} & BaseCalendarItemDates &
  BaseCalendarItemGuests &
  BaseCalendarItemTimeAndLocations &
  LectureCalendarItemContent &
  LectureCalendarItemAdditionalResourceReadings;

export type CalendarItem =
  | AssignmentCalendarItem
  | HolidayCalendarItem
  | LectureCalendarItem;

export function filterAssignmentCalendarItems(
  calendarItems: CalendarItem[],
): AssignmentCalendarItem[] {
  return calendarItems.filter((calendarItemCurrent: CalendarItem): boolean => {
    return calendarItemCurrent.type === "assignment";
  }) as AssignmentCalendarItem[];
}

export function filterHolidayCalendarItems(
  calendarItems: CalendarItem[],
): HolidayCalendarItem[] {
  return calendarItems.filter((calendarItemCurrent: CalendarItem): boolean => {
    return calendarItemCurrent.type === "holiday";
  }) as HolidayCalendarItem[];
}

export function filterLectureCalendarItems(
  calendarItems: CalendarItem[],
): LectureCalendarItem[] {
  return calendarItems.filter((calendarItemCurrent: CalendarItem): boolean => {
    return calendarItemCurrent.type === "lecture";
  }) as LectureCalendarItem[];
}
