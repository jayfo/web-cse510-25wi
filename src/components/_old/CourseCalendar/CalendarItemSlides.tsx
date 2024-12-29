import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { CalendarItem } from "@/types/CalendarData";
import { Box } from "@mui/material";

export const CalendarItemSlides: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  const calendarItemSlides = (() => {
    if ("slides" in calendarItem) {
      return calendarItem.slides;
    } else {
      return undefined;
    }
  })();

  if (!calendarItemSlides) {
    return null;
  }

  return (
    <Box sx={{ fontSize: "0.875rem" }}>
      [<AppLink href={calendarItemSlides}>slides</AppLink>]
    </Box>
  );
};
