import * as React from "react";

import { CalendarItem } from "@/types/CalendarData";

export const CalendarItemContentNonstandard: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  if ("contentNonstandard" in calendarItem) {
    return calendarItem.contentNonstandard;
  } else {
    return undefined;
  }
};
