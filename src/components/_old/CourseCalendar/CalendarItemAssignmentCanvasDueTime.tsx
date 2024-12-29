import * as React from "react";

import { CalendarItem } from "@/types/CalendarData";
import { Box } from "@mui/material";

export const CalendarItemAssignmentCanvasDueTime: React.FunctionComponent<{
  calendarItem: CalendarItem;
}> = ({ calendarItem }) => {
  const calendarItemSubmitCanvasTime = (() => {
    if (
      calendarItem.type == "assignment" &&
      "submission" in calendarItem &&
      calendarItem.submission == "canvas"
    ) {
      return calendarItem.submitCanvasTime;
    } else {
      return undefined;
    }
  })();

  if (!calendarItemSubmitCanvasTime) {
    return null;
  }

  return (
    <Box sx={{ fontSize: "0.875rem" }}>
      {`Due ${calendarItemSubmitCanvasTime}`}
    </Box>
  );
};
